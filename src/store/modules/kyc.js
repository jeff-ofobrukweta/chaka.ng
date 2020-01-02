import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";
import EventBus from "../../event-bus";
import Vue from "vue";

const state = {
    kyc: {},
    navbarKYC: true,
    nextKYC: {},
    navbarNextKYC: {},
    kycModalAction: "DEFAULT",
    countryCodes: []
};

const getters = {
    getKYC: state => state.kyc,
    showNavbarKYC: state => state.navbarKYC,
    getNextKYC: state => state.nextKYC,
    getNavbarNextKYC: state => state.navbarNextKYC,
    getKycModalAction: state => state.kycModalAction,
    getCountryCodes: state => state.countryCodes
};

const mutations = {
    SET_KYC(state, payload) {
        state.kyc = payload;
    },
    SET_SHOW_NAVBAR_KYC(state, payload) {
        state.navbarKYC = payload;
    },
    SET_NEXT_KYC(state, payload) {
        state.nextKYC = payload;
    },
    SET_NAVBAR_NEXT_KYC(state, payload) {
        state.navbarNextKYC = payload;
    },
    SET_KYC_MODAL_ACTION(state, payload) {
        state.kycModalAction = payload;
    },
    SET_COUNTRY_CODES(state, payload) {
        state.countryCodes = payload;
    }
};

const actions = {
    GET_KYC: ({ commit, rootState }) =>
        new Promise(resolve =>
            api.get(`/users/${rootState.auth.loggedUser.chakaID}/kyc`).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("SET_KYC", resp.data.data.kyc);
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, "kyc");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "kyc");
                    resolve(false);
                }
            )
        ),
    GET_NEXT_KYC: ({ commit, dispatch, state, rootState }, payload) => {
        /**
         * @params {context}
         */
        let params = {};
        if (state.kycModalAction !== "DEFAULT") {
            params = { context: state.kycModalAction };
        } else {
            params = { ...payload };
        }
        return new Promise(resolve =>
            api
                .get(`/users/${rootState.auth.loggedUser.chakaID}/fetch-next-kyc`, { ...params })
                .then(
                    resp => {
                        if (resp.status >= 200 && resp.status < 400) {
                            commit("SET_NEXT_KYC", resp.data.data);
                            if (state.kycModalAction !== "DEFAULT") {
                                dispatch("GET_NAVBAR_NEXT_KYC");
                            } else {
                                commit("SET_NAVBAR_NEXT_KYC", resp.data.data);
                                EventBus.$emit("navbar-trigger");
                                EventBus.$emit("modal-trigger");
                            }
                            resolve(true);
                            return true;
                        }
                        errorFn(resp, "kyc");
                        resolve(false);
                    },
                    error => {
                        errorFn(error.response, "kyc");
                        resolve(false);
                    }
                )
        );
    },
    GET_NAVBAR_NEXT_KYC: ({ commit, rootState }) =>
        new Promise(resolve =>
            api.get(`/users/${rootState.auth.loggedUser.chakaID}/fetch-next-kyc`).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("SET_NAVBAR_NEXT_KYC", resp.data.data);
                        EventBus.$emit("navbar-trigger");
                        EventBus.$emit("modal-trigger");
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, "kyc");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "kyc");
                    resolve(false);
                }
            )
        ),
    UPDATE_KYC: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        const { source, ...params } = payload;
        return new Promise(resolve =>
            api.patch(`/users/${rootState.auth.loggedUser.chakaID}/kyc`, params).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_KYC", resp.data.data.kyc);
                        dispatch("GET_LOGGED_USER", null, { root: true });
                        return dispatch("GET_NEXT_KYC").then(() => {
                            if (Object.keys(payload)[0] !== "idType")
                                Vue.toasted.show(`Verification update successful`, {
                                    type: "success"
                                });
                            resolve(true);
                            return true;
                        });
                    }
                    errorFn(resp, "kyc", source);
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "kyc", source);
                    resolve(false);
                }
            )
        );
    },
    UPDATE_KYC_NIN: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        const { source, ...params } = payload;
        return new Promise(resolve =>
            api.post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/update-nin`, params).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_KYC", resp.data.data.kyc);
                        return dispatch("GET_NEXT_KYC").then(() => {
                            resolve(true);
                            return true;
                        });
                    }
                    errorFn(resp, "kyc", source);
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "kyc", source);
                    resolve(false);
                }
            )
        );
    },
    UPDATE_KYC_BANK: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        const { source, ...params } = payload;
        return new Promise(resolve =>
            api
                .patch(
                    `/users/${rootState.auth.loggedUser.chakaID}/kyc/update-bank-details`,
                    params
                )
                .then(
                    resp => {
                        if (resp.status >= 200 && resp.status < 400) {
                            commit("SET_KYC", resp.data.data.kyc);
                            return dispatch("GET_NEXT_KYC").then(() => {
                                Vue.toasted.show(`Verification update successful`, {
                                    type: "success"
                                });
                                resolve(true);
                                return true;
                            });
                        }
                        errorFn(resp, "kyc", source);
                        resolve(false);
                    },
                    error => {
                        errorFn(error.response, "kyc", source);
                        resolve(false);
                    }
                )
        );
    },
    UPLOAD_KYC_FILE: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise(resolve =>
            api.post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/upload-file`, payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        dispatch("GET_LOGGED_USER", null, { root: true });
                        dispatch("GET_KYC");
                        return dispatch("GET_NEXT_KYC").then(() => {
                            resolve(true);
                            return true;
                        });
                    }
                    errorFn(resp, "kyc");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "kyc");
                    resolve(false);
                }
            )
        );
    },
    RESOLVE_BVN: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        const { source, ...params } = payload;
        return new Promise(resolve =>
            api.post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/resolve-bvn`, params).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_KYC", resp.data.data.kyc);
                        return dispatch("GET_NEXT_KYC").then(() => {
                            Vue.toasted.show(`Verification update successful`, {
                                type: "success"
                            });
                            resolve(true);
                            return true;
                        });
                    }
                    errorFn(resp, "kyc", source);
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "kyc", source);
                    resolve(false);
                }
            )
        );
    },
    USE_BVN_PHONE: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise(resolve =>
            api.post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/update-phone`, payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        dispatch("GET_KYC");
                        return dispatch("GET_NEXT_KYC").then(() => {
                            resolve(true);
                            return true;
                        });
                    }
                    errorFn(resp, "kyc-phone");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "kyc-phone");
                    resolve(false);
                }
            )
        );
    },
    RESOLVE_OTP: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        const { source, ...params } = payload;
        return new Promise(resolve =>
            api.post(`/users/${rootState.auth.loggedUser.chakaID}/kyc/resolve-otp`, params).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        dispatch("GET_KYC");
                        return dispatch("GET_NEXT_KYC").then(() => {
                            Vue.toasted.show(`Phone confirmation successful`, {
                                type: "success"
                            });
                            resolve(true);
                            return true;
                        });
                    }
                    errorFn(resp, "kyc-otp", source);
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "kyc-otp", source);
                    resolve(false);
                }
            )
        );
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
