import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    exchangeRate: {},
    walletTx: {}
};

const getters = {
    getExchangeRate: state => state.exchangeRate,
    getWalletTx: state => state.walletTx
};

const mutations = {
    SET_EXCHANGE_RATE(state, payload) {
        state.exchangeRate = payload;
    },
    SET_WALLET_TX(state, payload) {
        state.walletTx = payload;
    }
};

const actions = {
    WITHDRAW_WALLET: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise(resolve =>
            api.post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/withdraw/`, payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_WALLET_TX", resp.data.data.transaction);
                        dispatch("GET_ACCOUNT_SUMMARY", null, { root: true }).then(() => {
                            resolve(true);
                            return true;
                        });
                    } else {
                        errorFn(resp, "withdraw");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "withdraw");
                    resolve(false);
                }
            )
        );
    },
    FUND_WALLET: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise(resolve =>
            api.post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/deposit/`, payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        const ammount = parseFloat(resp.data.data.transaction.txAmount)/ 100;
                        const currency = String(resp.data.data.transaction.currency);
                        fbq('track', 'fund', {currency: currency, value: ammount});
                        commit("SET_WALLET_TX", resp.data.data.transaction);
                        dispatch("GET_ACCOUNT_SUMMARY", null, { root: true }).then(() => {
                            resolve(true);
                            return true;
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
            )
        );
    },
    EXCHANGE_WALLET: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise(resolve =>
            api.post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/transfer/`, payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_WALLET_TX", resp.data.data.transaction);
                        dispatch("GET_ACCOUNT_SUMMARY", null, { root: true }).then(() => {
                            resolve(true);
                            return true;
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
            )
        );
    },
    GET_EXCHANGE_RATE: ({ commit }) =>
        new Promise(resolve =>
            api.get("/currency-rates/today").then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("SET_EXCHANGE_RATE", resp.data.data.rate);
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, "exchange");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "exchange");
                    resolve(false);
                }
            )
        )
};

export default {
    state,
    actions,
    getters,
    mutations
};
