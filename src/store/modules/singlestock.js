import API_CONTEXT from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    instrument: [],
    singlestockpositions: [],
    preOrder: {},
    buyOrder: {},
    sellOrder: {},
    marketData: {}
};

const getters = {
    getSingleinstrument: state => state.instrument,
    getPositionsWithparams: state => symbol => {
        const filtered = state.singlestockpositions.filter(position => position.symbol === symbol);
        if (filtered) {
            return filtered;
        }
        return false;
    },
    getPreOrder: state => state.preOrder,
    getBuyOrder: state => state.buyOrder,
    getSellOrder: state => state.sellOrder,
    getMarketData: state => state.marketData
};

const mutations = {
    SET_SINGLE_INSTRUMENT(state, instrument) {
        state.instrument = instrument;
    },
    SET_CURRENTSTOCK_POSITIONS(state, positions) {
        let singlestockpositions = {};
        singlestockpositions = positions;
        state.singlestockpositions = singlestockpositions.position;
    },
    SET_PRE_ORDER(state, payload) {
        state.preOrder = payload;
    },
    SET_BUY_ORDER(state, payload) {
        state.buyOrder = payload;
    },
    SET_SELL_ORDER(state, payload) {
        state.sellOrder = payload;
    },
    SET_MARKET_DATA(state, payload) {
        state.marketData = payload;
    }
};

const actions = {
    async GET_SINGLESTOCK_INSTRUMENT({ commit }, params) {
        return new Promise((resolve, reject) => {
            return API_CONTEXT.get(`/instruments/?symbols=${params.symbols}`)
                .then(response => {
                    if (response.status === 200) {
                        const { instruments } = response.data.data;
                        commit("SET_SINGLE_INSTRUMENT", instruments);
                        resolve(instruments[0]);
                    }
                })
                .catch(error => {
                    console.log(`::::::::::::::::::::${error}`);
                });
        });
    },
    async GET_CURRENT_STOCK_POSITION({ commit, rootState }) {
        // console.log('on mount..................',rootState.auth)
        await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions/`)
            .then(response => {
                const { position } = response.data.data;
                commit("SET_CURRENTSTOCK_POSITIONS", position);
            })
            .catch(error => {
                console.log(`::::::::::::::::::::${error}`);
            });
    },
    BUY_INSTRUMENT: ({ commit, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return API_CONTEXT.post(
                `/users/${rootState.auth.loggedUser.chakaID}/orders/buy`,
                payload
            ).then(
                resp => {
                    if (resp.status === 200) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_BUY_ORDER", resp.data.data.order);
                        resolve(true);
                    } else {
                        errorFn(resp, "buy");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "buy");
                    resolve(false);
                }
            );
        });
    },
    SELL_INSTRUMENT: ({ commit, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return API_CONTEXT.post(
                `/users/${rootState.auth.loggedUser.chakaID}/orders/sell`,
                payload
            ).then(
                resp => {
                    if (resp.status === 200) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_SELL_ORDER", resp.data.data.order);
                        resolve(true);
                    } else {
                        errorFn(resp, "sell");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "sell");
                    resolve(false);
                }
            );
        });
    },
    GET_PRE_ORDER: ({ commit, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            return API_CONTEXT.post(
                `/users/${rootState.auth.loggedUser.chakaID}/orders/pre-order/`,
                payload
            ).then(
                resp => {
                    if (resp.status === 200) {
                        commit("SET_PRE_ORDER", resp.data.data);
                        resolve(true);
                    } else {
                        errorFn(resp, "pre-order");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "pre-order");
                    resolve(false);
                }
            );
        });
    },
    GET_MARKET_DATA: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            return API_CONTEXT.get(`/instruments/market-data?symbol=${payload}`).then(
                resp => {
                    if (resp.status === 200) {
                        commit("SET_MARKET_DATA", resp.data.data.instrument);
                        resolve(true);
                    } else {
                        errorFn(resp, "market-data");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "market-data");
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
