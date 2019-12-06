import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    watchlist: [],
    cacheWatchlist: []
};

const getters = {
    getWatchlist: state => state.watchlist,
    getCacheWatchlist: state => state.cacheWatchlist
};

const mutations = {
    SET_WATCHLIST(state, payload) {
        state.watchlist = payload;
    },
    SET_CACHE_WATCHLIST(state, payload) {
        state.cacheWatchlist = payload;
    }
};

const actions = {
    GET_WATCHLIST: ({ commit, state, rootState }, payload) => {
        /**
         * @params {interval}
         */
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .get(`/users/${rootState.auth.loggedUser.chakaID}/watchlists`, { ...payload })
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            commit("SET_WATCHLIST", resp.data.data.watchlistDetails.instruments);
                            commit(
                                "SET_CACHE_WATCHLIST",
                                resp.data.data.watchlistDetails.instruments
                            );
                            resolve(true);
                        } else {
                            errorFn(resp, "watchlist");
                            resolve(false);
                        }
                    },
                    error => {
                        if (
                            error.response.data.message ===
                            "Data unavailable for selected day/interval"
                        ) {
                            commit("SET_WATCHLIST", state.cacheWatchlist);
                        }
                        errorFn(error.response, "watchlist");
                        resolve(false);
                    }
                );
        });
    },
    GET_WATCHLIST_CHART: ({}, payload) => {
        /**
         * @params {interval, symbol}
         */
        return new Promise((resolve, reject) => {
            return api.get(`/instruments/charts`, { ...payload }).then(
                resp => {
                    if (resp.status === 200) {
                        // commit("REQ_SUCCESS", null, { root: true });
                        // commit("SET_WATCHLIST", resp.data.data);
                        resolve(resp.data.data);
                    } else {
                        errorFn(resp, "watchlist");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "watchlist");
                    resolve(false);
                }
            );
        });
    },
    ADD_TO_WATCHLIST: ({ commit, rootState }, payload) => {
        /**
         * @params {symbols}
         */
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .patch(`/users/${rootState.auth.loggedUser.chakaID}/watchlists/`, { ...payload })
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            resolve(true);
                        } else {
                            errorFn(resp, "watchlist");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "watchlist");
                        resolve(false);
                    }
                );
        });
    },
    REMOVE_FROM_WATCHLIST: ({ commit, rootState }, payload) => {
        /**
         * @params {symbols}
         */
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .delete(`/users/${rootState.auth.loggedUser.chakaID}/watchlists/`, { ...payload })
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            resolve(true);
                        } else {
                            errorFn(resp, "watchlist");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "watchlist");
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
