import API_CONTEXT from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    instrument: [],
    singlestockpositions: [],
    similarStocks: [],
    preOrder: {},
    buyOrder: {},
    sellOrder: {},
    marketData: {},
    openOrders: []
};

const getters = {
    getSingleinstrument: state => state.instrument,
    getSimilarStocks: state => state.similarStocks,
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
    getMarketData: state => state.marketData,
    getOpenOrders: state => state.openOrders
};

const mutations = {
    SET_SINGLE_INSTRUMENT(state, instrument) {
        state.instrument = instrument;
    },
    SET_SIMILAR_STOCKS(state, stocks) {
        state.similarStocks = stocks;
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
    },
    SET_OPEN_ORDERS(state, payload) {
        state.openOrders = payload;
    }
};

const actions = {
    async GET_SINGLESTOCK_INSTRUMENT({ commit, dispatch }, params) {
        return new Promise((resolve, reject) => {
            return API_CONTEXT.get(`/instruments/?symbols=${params.symbols}`).then(response => {
                if (response.status === 200) {
                    const { instruments } = response.data.data;
                    commit("SET_SINGLE_INSTRUMENT", instruments);
                    if (instruments.similar)
                        dispatch("GET_SIMILAR_STOCKS", instruments[0].similar.join(","));
                    resolve(instruments[0]);
                }
            });
        });
    },
    GET_SIMILAR_STOCKS({ commit }, params) {
        return new Promise((resolve, reject) => {
            return API_CONTEXT.get(`/instruments/?symbols=${params.symbols}`).then(response => {
                if (response.status === 200) {
                    const { instruments } = response.data.data;
                    commit("SET_SIMILAR_STOCKS", instruments);
                    resolve(instruments[0]);
                }
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
                //console.log(`::::::::::::::::::::${error}`);
            });
    },
    GET_OPEN_ORDERS({ commit, rootState }) {
        return new Promise((resolve, reject) => {
            return API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/orders/open/`).then(
                response => {
                    if (response.status === 200) {
                        commit("SET_OPEN_ORDERS", response.data.data);
                        resolve(true);
                        return true;
                    }
                }
            );
        });
    },
    CANCEL_ORDER: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return API_CONTEXT.post(
                `/users/${rootState.auth.loggedUser.chakaID}/orders/${payload.orderRef}/cancel`,
                payload.reference
            ).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        dispatch("GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS");
                        resolve(true);
                        return true;
                    } else {
                        errorFn(resp, "cancel-order");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "cancel-order");
                    resolve(false);
                }
            );
        });
    },
    BUY_INSTRUMENT: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return API_CONTEXT.post(
                `/users/${rootState.auth.loggedUser.chakaID}/orders/buy`,
                payload
            ).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_BUY_ORDER", resp.data.data.order);
                        dispatch("GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS", null, { root: true });
                        resolve(true);
                        return true;
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
    SELL_INSTRUMENT: ({ commit, dispatch, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return API_CONTEXT.post(
                `/users/${rootState.auth.loggedUser.chakaID}/orders/sell`,
                payload
            ).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_SELL_ORDER", resp.data.data.order);
                        dispatch("GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS", null, { root: true });
                        resolve(true);
                        return true;
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
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("SET_PRE_ORDER", resp.data.data);
                        resolve(true);
                        return true;
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
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("SET_MARKET_DATA", resp.data.data.instrument);
                        resolve(true);
                        return true;
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
