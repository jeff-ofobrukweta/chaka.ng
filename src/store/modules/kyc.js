import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    kyc: {},
    nextKYC: {},
    nextKYCCheck: false,
    navbarNextKYC: {},
    countryCodes: []
};

const getters = {
    getKYC: state => state.kyc,
    getNextKYC: state => state.nextKYC,
    getNavbarNextKYC: state => state.navbarNextKYC,
    getCountryCodes: state => state.countryCodes
};

const mutations = {
    SET_KYC(state, payload) {
        state.kyc = payload;
    },
    SET_NEXT_KYC(state, payload) {
        state.nextKYC = payload;
    },
    SET_NAVBAR_CHECK(state, payload) {
        state.nextKYCCheck = payload;
    },
    SET_NAVBAR_NEXT_KYC(state, payload) {
        state.nextKYCCheck = payload;
    },
    SET_COUNTRY_CODES(state, payload) {
        state.countryCodes = payload;
    }
};

const actions = {
    GET_KYC: ({ commit, rootState }) => {
        return new Promise((resolve, reject) => {
            return api.get(`/users/${rootState.auth.loggedUser.chakaID}/kyc`).then(
                resp => {
                    if (resp.status === 200) {
                        commit("SET_KYC", resp.data.data.kyc);
                        resolve(true);
                    } else {
                        errorFn(resp, "kyc");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "kyc");
                    resolve(false);
                }
            );
        });
    },
    GET_NEXT_KYC: ({ commit, state, dispatch, rootState }, payload) => {
        /**
         * @params {context}
         */
        if (payload) {
            commit("SET_NAVBAR_CHECK", false);
        } else commit("SET_NAVBAR_CHECK", true);
        return new Promise((resolve, reject) => {
            return api
                .get(`/users/${rootState.auth.loggedUser.chakaID}/fetch-next-kyc`, { ...payload })
                .then(
                    resp => {
                        if (resp.status === 200) {
                            if (!state.navbarNextKYC) {
                                commit("SET_NEXT_KYC", resp.data.data);
                                commit("SET_NAVBAR_CHECK", true);
                                dispatch("GET_NEXT_KYC");
                            } else {
                                commit("SET_NAVBAR_NEXT_KYC", resp.data.data);
                            }
                            resolve(true);
                        } else {
                            errorFn(resp, "kyc");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "kyc");
                        resolve(false);
                    }
                );
        });
    },
    UPDATE_KYC: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api.patch(`/users/${rootState.auth.loggedUser.chakaID}/kyc`, payload).then(
                resp => {
                    if (resp.status === 200) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_KYC", resp.data.data.kyc);
                        dispatch("GET_NEXT_KYC").then(() => {
                            resolve(true);
                        });
                    } else {
                        errorFn(resp, "kyc");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "kyc");
                    resolve(false);
                }
            );
        });
    },
    UPDATE_KYC_NIN: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/update-nin`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            dispatch("GET_NEXT_KYC").then(() => {
                                resolve(true);
                            });
                        } else {
                            errorFn(resp, "kyc");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "kyc");
                        resolve(false);
                    }
                );
        });
    },
    UPDATE_KYC_BANK: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .patch(
                    `/users/${rootState.auth.loggedUser.chakaID}/kyc/update-bank-details`,
                    payload
                )
                .then(
                    resp => {
                        if (resp.status === 200) {
                            dispatch("GET_KYC");
                            dispatch("GET_NEXT_KYC").then(() => {
                                resolve(true);
                            });
                        } else {
                            errorFn(resp, "kyc");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "kyc");
                        resolve(false);
                    }
                );
        });
    },
    UPLOAD_KYC_FILE: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/upload-file`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            dispatch("GET_NEXT_KYC");
                            dispatch("GET_KYC").then(() => {
                                resolve(true);
                            });
                        } else {
                            errorFn(resp, "kyc");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "kyc");
                        resolve(false);
                    }
                );
        });
    },
    RESOLVE_BVN: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/resolve-bvn`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            dispatch("GET_NEXT_KYC").then(() => {
                                resolve(true);
                            });
                        } else {
                            errorFn(resp, "kyc");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "kyc");
                        resolve(false);
                    }
                );
        });
    },
    USE_BVN_PHONE: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/update-phone`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            dispatch("GET_KYC").then(() => {
                                resolve(true);
                            });
                        } else {
                            errorFn(resp, "kyc-phone");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "kyc-phone");
                        resolve(false);
                    }
                );
        });
    },
    RESOLVE_DOB: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/resolve-dob`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            dispatch("GET_KYC").then(() => {
                                resolve(true);
                            });
                        } else {
                            errorFn(resp, "kyc");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "kyc");
                        resolve(false);
                    }
                );
        });
    },
    RESOLVE_OTP: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/resolve-otp`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            dispatch("GET_NEXT_KYC").then(() => {
                                resolve(true);
                            });
                        } else {
                            errorFn(resp, "kyc-otp");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "kyc-otp");
                        resolve(false);
                    }
                );
        });
    },
    GET_COUNTRY_CODES: async ({ commit }) => {
        try {
            const response = await fetch("https://restcountries.eu/rest/v2/all", {
                method: "GET"
            });
            const result = await response.json();
            commit("SET_COUNTRY_CODES", result);
        } catch (error) {
            errorFn(error.response, "kyc");
            return false;
        }
        return true;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
