import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    kyc: {},
    nextKYC: {},
    countryCodes: []
};

const getters = {
    getKYC: state => state.kyc,
    getCountryCodes: state => state.countryCodes
};

const mutations = {
    SET_KYC(state, payload) {
        state.kyc = payload;
    },
    SET_NEXT_KYC(state, payload) {
        state.nextKYC = payload;
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
    GET_NEXT_KYC: ({ commit, rootState }, payload) => {
        /**
         * @params {context}
         */
        return new Promise((resolve, reject) => {
            return api
                .get(`/users/${rootState.auth.loggedUser.chakaID}/fetch-next-kyc`, { ...payload })
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("SET_NEXT_KYC", resp.data.data);
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
    UPDATE_KYC: ({ dispatch, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            return api.patch(`/users/${rootState.auth.loggedUser.chakaID}/kyc`, payload).then(
                resp => {
                    if (resp.status === 200) {
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
    UPLOAD_KYC_FILE: ({ dispatch, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            return api
                .patch(`/users/${rootState.auth.loggedUser.chakaID}/kyc/upload-file`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
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
    RESOLVE_BVN: ({ dispatch, rootState }) => {
        return new Promise((resolve, reject) => {
            return api.post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/resolve-bvn`).then(
                resp => {
                    if (resp.status === 200) {
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
    USE_BVN_PHONE: ({ commit, rootState }) => {
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/update-phone-name-dob`)
                .then(
                    resp => {
                        if (resp.status === 200) {
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
    RESOLVE_DOB: ({ commit, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/resolve-dob`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
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
    RESOLVE_OTP: ({ commit, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/resolve-otp`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
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
    GET_COUNTRY_CODES: async ({ commit }) => {
        commit("resetReq", null, { root: true });
        commit("reqInit", null, { root: true });
        try {
            const response = await fetch("https://restcountries.eu/rest/v2/all", {
                method: "GET"
            });
            const result = await response.json();
            commit("SET_COUNTRY_CODES", result);
            errorFn(error.response, "kyc");
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
