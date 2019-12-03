import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    watchlist: []
};

const getters = {
    getWatchlist: state => state.watchlist
};

const mutations = {
    SET_WATCHLIST(state, payload) {
        state.watchlist = payload;
    }
};

const actions = {
    GET_WATCHLIST: ({ commit, rootState }, payload) => {
        /**
         * @params {interval}
         */
        return new Promise((resolve, reject) => {
            return api
                .get(`/users/${rootState.auth.loggedUser.chakaID}/watchlists`, { ...payload })
                .then(
                    resp => {
                        if (resp.status === 200) {
                            // commit("REQ_SUCCESS", null, { root: true });
                            // const {instruments} = resp.data.data.watchlistDetails;
                            // console.log('HELLO GOODRESULT HERE TTTTTTTTTTTTTTTnew',resp.data.data.watchlistDetails )
                            commit("SET_WATCHLIST", resp.data.data.watchlistDetails.instruments);
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
    GET_WATCHLIST_CHART: ({ commit, rootState }, payload) => {
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
    }
};
export default {
    state,
    actions,
    getters,
    mutations
};
