import Vue from 'vue';
import api from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

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
        commit('RESET_REQ', null, { root: true });
        commit('REQ_INIT', null, { root: true });
        return new Promise(resolve => api.get(`/users/${rootState.auth.loggedUser.chakaID}/watchlists`, { ...payload }).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    commit('REQ_SUCCESS', null, { root: true });
                    commit('SET_WATCHLIST', resp.data.data.watchlistDetails.instruments);
                    commit('SET_CACHE_WATCHLIST', resp.data.data.watchlistDetails.instruments);
                    resolve(true);
                } else {
                    errorFn(resp, 'watchlist');
                    resolve(false);
                }
            },
            (error) => {
                if (error.response) {
                    if (
                        error.response.data.message
                            === 'Data unavailable for selected day/interval'
                    ) {
                        commit('SET_WATCHLIST', state.cacheWatchlist);
                    }
                }
                errorFn(error.response, 'watchlist');
                resolve(false);
            }
        ));
    },
    GET_WATCHLIST_CHART: ({}, payload) =>
        /**
         * @params {interval, symbol}
         */
        new Promise(resolve => api.get('/instruments/charts', { ...payload }).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    resolve(resp.data.data);
                    return true;
                }
                errorFn(resp, 'watchlist-chart');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'watchlist-chart');
                resolve(false);
            }
        )),
    ADD_TO_WATCHLIST: ({ commit, dispatch, rootState }, payload) => {
        /**
         * @params {symbols}
         */
        commit('RESET_REQ', null, { root: true });
        commit('REQ_INIT', null, { root: true });
        return new Promise(resolve => api
            .patch(`/users/${rootState.auth.loggedUser.chakaID}/watchlists/`, { ...payload })
            .then(
                (resp) => {
                    if (resp.status >= 200 && resp.status < 400) {
                        Vue.toasted.show(
                            `${payload.symbols} has been added to your watchlist successfully`,
                            {
                                type: 'success'
                            }
                        );
                        commit('REQ_SUCCESS', null, { root: true });
                        dispatch('GET_WATCHLIST');
                        resolve(true);
                        return true;
                    }
                    Vue.toasted.show(
                        `An error occurred adding ${payload.symbols} to your watchlist`,
                        {
                            type: 'error'
                        }
                    );
                    errorFn(resp, 'add-watchlist');
                    resolve(false);
                },
                (error) => {
                    Vue.toasted.show(
                        `An error occurred adding ${payload.symbols} to your watchlist`,
                        {
                            type: 'error'
                        }
                    );
                    errorFn(error.response, 'add-watchlist');
                    resolve(false);
                }
            ));
    },
    REMOVE_FROM_WATCHLIST: ({ commit, dispatch, rootState }, payload) => {
        /**
         * @params {symbols}
         */
        commit('RESET_REQ', null, { root: true });
        commit('REQ_INIT', null, { root: true });
        return new Promise(resolve => api
            .delete(`/users/${rootState.auth.loggedUser.chakaID}/watchlists/`, { ...payload })
            .then(
                (resp) => {
                    if (resp.status >= 200 && resp.status < 400) {
                        Vue.toasted.show(
                            `${payload.symbols} has been removed from your watchlist successfully`,
                            {
                                type: 'success'
                            }
                        );
                        commit('REQ_SUCCESS', null, { root: true });
                        dispatch('GET_WATCHLIST');
                        resolve(true);
                        return true;
                    }
                    Vue.toasted.show(
                        `An error occurred removing ${payload.symbols} from your watchlist`,
                        {
                            type: 'error'
                        }
                    );
                    errorFn(resp, 'remove-watchlist');
                    resolve(false);
                },
                (error) => {
                    Vue.toasted.show(
                        `An error occurred removing ${payload.symbols} from your watchlist`,
                        {
                            type: 'error'
                        }
                    );
                    errorFn(error.response, 'remove-watchlist');
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
