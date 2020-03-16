import api from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

const state = {
    exchangeRate: {},
    walletTx: {},
    userCards: []
};

const getters = {
    getExchangeRate: state => state.exchangeRate,
    getWalletTx: state => state.walletTx,
    getUserCards: state => state.userCards
};

const mutations = {
    SET_EXCHANGE_RATE(state, payload) {
        state.exchangeRate = payload;
    },
    SET_WALLET_TX(state, payload) {
        state.walletTx = payload;
    },
    SET_USER_CARDS(state, payload) {
        state.userCards = payload;
    }
};

const actions = {
    WITHDRAW_WALLET: ({ commit, dispatch, rootState }, payload) => {
        commit('RESET_REQ', null, { root: true });
        commit('REQ_INIT', null, { root: true });
        return new Promise(resolve => api.post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/withdraw/`, payload).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    commit('REQ_SUCCESS', null, { root: true });
                    commit('SET_WALLET_TX', resp.data.data.transaction);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'withdraw');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'withdraw');
                resolve(false);
            }
        ));
    },
    FUND_WALLET: ({ commit, dispatch, rootState }, payload) => {
        commit('RESET_REQ', null, { root: true });
        commit('REQ_INIT', null, { root: true });
        return new Promise(resolve => api.post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/deposit/`, payload).then(
            (resp) => {
                const ammount = parseFloat(resp.data.data.transaction.txAmount) / 100;
                const currency = String(resp.data.data.transaction.currency);
                fbq('track', 'fund', { currency, value: ammount });
                if (resp.status >= 200 && resp.status < 400) {
                    commit('REQ_SUCCESS', null, { root: true });
                    commit('SET_WALLET_TX', resp.data.data.transaction);
                    dispatch('GET_ACCOUNT_SUMMARY', null, { root: true });
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'fund');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'fund');
                resolve(false);
            }
        ));
    },
    EXCHANGE_WALLET: ({ commit, dispatch, rootState }, payload) => {
        commit('RESET_REQ', null, { root: true });
        commit('REQ_INIT', null, { root: true });
        return new Promise(resolve => api.post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/transfer/`, payload).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    commit('REQ_SUCCESS', null, { root: true });
                    commit('SET_WALLET_TX', resp.data.data.transaction);
                    dispatch('GET_ACCOUNT_SUMMARY', null, { root: true });
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'exchange');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'exchange');
                resolve(false);
            }
        ));
    },
    GET_EXCHANGE_RATE: ({ commit }) => new Promise(resolve => api.get('/currency-rates/today').then(
        (resp) => {
            if (resp.status >= 200 && resp.status < 400) {
                commit('SET_EXCHANGE_RATE', resp.data.data.rate);
                resolve(true);
                return true;
            }
            errorFn(resp, 'exchange');
            resolve(false);
        },
        (error) => {
            errorFn(error.response, 'exchange');
            resolve(false);
        }
    )),
    GET_USER_CARDS: ({ commit, rootState }) => new Promise(resolve => api.get(`/users/${rootState.auth.loggedUser.chakaID}/wallets/payment-instruments`).then(
        (resp) => {
            if (resp.status >= 200 && resp.status < 400) {
                commit('SET_USER_CARDS', resp.data.data.paymentInstruments);
                resolve(true);
                return true;
            }
            errorFn(resp, 'fund');
            resolve(false);
        },
        (error) => {
            errorFn(error.response, 'fund');
            resolve(false);
        }
    )),
    DELETE_USER_CARDS: ({ commit, dispatch, rootState }, payload) => {
        commit('RESET_REQ', null, { root: true });
        commit('REQ_INIT', null, { root: true });
        new Promise(resolve => api
            .post(
                `/users/${rootState.auth.loggedUser.chakaID}/wallets/payment-instruments`,
                null,
                { cardID: payload }
            )
            .then(
                (resp) => {
                    if (resp.status >= 200 && resp.status < 400) {
                        dispatch('GET_USER_CARDS');
                        // commit("SET_USER_CARDS", resp.data.data.paymentInstruments);
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, 'delete-card');
                    resolve(false);
                },
                (error) => {
                    errorFn(error.response, 'delete-card');
                    resolve(false);
                }
            ));
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
