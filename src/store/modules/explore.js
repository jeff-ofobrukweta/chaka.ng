import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    exploreNews: [],
    exploreLearn: [],
    exploreCollections: [],
    singleCollection: [],
    collectionStocks: [],
    selectedCollection: {}
};

const getters = {
    getExploreNews: state => state.exploreNews,
    getExploreLearn: state => state.exploreLearn,
    getExploreCollections: state => state.exploreCollections,
    getSingleCollection: state => state.singleCollection,
    getCollectionStocks: state => state.collectionStocks,
    getSelectedCollection: state => state.selectedCollection
};

const mutations = {
    SET_EXPLORE_NEWS(state, payload) {
        state.exploreNews = payload;
    },
    SET_EXPLORE_LEARN(state, payload) {
        state.exploreLearn = payload;
    },
    SET_EXPLORE_COLLECTIONS(state, payload) {
        state.exploreCollections = payload;
    },
    SET_SINGLE_COLLECTION(state, payload) {
        state.singleCollection = payload;
    },
    SET_COLLECTION_STOCKS(state, payload) {
        state.collectionStocks = payload;
    },
    SET_SELECTED_COLLECTION(state, payload) {
        state.selectedCollection = payload;
    }
};

const actions = {
    GET_EXPLORE_NEWS: ({ commit }, payload) => {
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api.get(`/news/explore/editorials`, { ...payload }).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        // commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_EXPLORE_NEWS", resp.data.data.articles);
                        resolve(true);
                        return true;
                    } else {
                        errorFn(resp, "explore");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "explore");
                    resolve(false);
                }
            );
        });
    },
    GET_EXPLORE_COLLECTIONS: ({ commit }, payload) => {
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api.get(`/news/explore/collections`, payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        // commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_EXPLORE_COLLECTIONS", resp.data.collections);
                        resolve(true);
                        return true;
                    } else {
                        errorFn(resp, "explore");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "explore");
                    resolve(false);
                }
            );
        });
    },
    GET_EXPLORE_LEARN: ({ commit }, payload) => {
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api.get(`/news/explore/learn`, payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        // commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_EXPLORE_LEARN", resp.data.data.articles);
                        resolve(true);
                        return true;
                    } else {
                        errorFn(resp, "explore");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "explore");
                    resolve(false);
                }
            );
        });
    },
    GET_SINGLE_COLLECTION: ({ commit, state }) => {
        /**
         * @param payload: an array pf stock symbols
         */
        const temp = state.collectionStocks.join(",");
        return new Promise((resolve, reject) => {
            return api.get(`/instruments/?symbols=${temp}`).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("SET_SINGLE_COLLECTION", resp.data.data.instruments);
                        resolve(true);
                        return true;
                    } else {
                        errorFn(resp, "explore-collection");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "explore-collection");
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
