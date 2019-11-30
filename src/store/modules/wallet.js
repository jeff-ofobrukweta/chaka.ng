import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    exchangeRate: {}
};

const getters = {
    getExchangeRate: state => state.exchangeRate
};

const mutations = {
    SET_EXCHANGE_RATE(state, payload) {
        state.exchangeRate = payload;
    }
};

const actions = {
    WITHDRAW_WALLET: ({ commit, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/withdraw/`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            resolve(true);
                        } else {
                            errorFn(resp, "withdraw");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "withdraw");
                        resolve(false);
                    }
                );
        });
    },
    FUND_WALLET: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/deposit/`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            dispatch("GET_ACCOUNT_SUMMARY", null, { root: true }).then(() => {
                                resolve(true);
                            });
                        } else {
                            errorFn(resp, "fund");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "fund");
                        resolve(false);
                    }
                );
        });
    },
    EXCHANGE_WALLET: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/transfer/`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            dispatch("GET_ACCOUNT_SUMMARY", null, { root: true }).then(() => {
                                resolve(true);
                            });
                        } else {
                            errorFn(resp, "exchange");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "exchange");
                        resolve(false);
                    }
                );
        });
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
