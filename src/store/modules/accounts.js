import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    accountSummary: {},
    accountHistory: [],
    ordersHistory: [],
    statements: []
};

const getters = {
    getAccountSummary: state => state.accountSummary,
    getAccountHistory: state => state.accountHistory,
    getOrdersHistory: state => state.ordersHistory,
    getStatements: state => state.statements
};

const mutations = {
    SET_ACCOUNT_SUMMARY(state, payload) {
        state.accountSummary = payload;
    },
    SET_ACCOUNT_HISTORY(state, payload) {
        state.accountHistory = payload;
    },
    SET_ORDERS_HISTORY(state, payload) {
        state.ordersHistory = payload;
    },
    SET_STATEMENTS(state, payload) {
        state.statements = payload;
    }
};

const actions = {
    GET_ACCOUNT_SUMMARY: ({ commit, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            return api.get(`/users/${rootState.auth.loggedUser.chakaID}/summary`, payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("SET_ACCOUNT_SUMMARY", resp.data.data);
                        resolve(true);
                        return true;
                    } else {
                        errorFn(resp, "accounts");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "accounts");
                    resolve(false);
                }
            );
        });
    },
    GET_ACCOUNT_HISTORY: ({ commit, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            return api
                .get(`/users/${rootState.auth.loggedUser.chakaID}/wallets/history/`, {
                    ...payload
                })
                .then(
                    resp => {
                        if (resp.status >= 200 && resp.status < 400) {
                            commit("SET_ACCOUNT_HISTORY", resp.data.data.history);
                            resolve(true);
                            return true;
                        } else {
                            errorFn(resp, "history");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "history");
                        resolve(false);
                    }
                );
        });
    },
    GET_ORDERS_HISTORY: ({ commit, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            return api
                .get(`/users/${rootState.auth.loggedUser.chakaID}/orders/`, { ...payload })
                .then(
                    resp => {
                        if (resp.status >= 200 && resp.status < 400) {
                            commit("SET_ACCOUNT_HISTORY", resp.data.data.orders);
                            resolve(true);
                            return true;
                        } else {
                            errorFn(resp, "accounts");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "accounts");
                        resolve(false);
                    }
                );
        });
    },
    GET_STATEMENTS: ({ commit, rootState }, payload) => {
        /**
         * @params {payload} reportType,fromDate, toDate
         */
        return new Promise((resolve, reject) => {
            return api
                .get(`/users/${rootState.auth.loggedUser.chakaID}/reports/`, { ...payload })
                .then(
                    resp => {
                        if (resp.status >= 200 && resp.status < 400) {
                            commit("SET_STATEMENTS", resp.data.data.reports);
                            resolve(true);
                            return true;
                        } else {
                            errorFn(resp, "statements");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "statements");
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
