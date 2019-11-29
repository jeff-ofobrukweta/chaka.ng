import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    exploreNews: [],
    exploreLearn: [],
    exploreCollections: []
};

const getters = {
    getExploreNews: state => state.exploreNews,
    getExploreLearn: state => state.exploreLearn,
    getExploreCollections: state => state.exploreCollections
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
    }
};

const actions = {
    GET_EXPLORE_NEWS: ({ commit }, payload) => {
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api.get(`/news/explore/editorials`, { ...payload }).then(
                resp => {
                    if (resp.status === 200) {
                        // commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_EXPLORE_NEWS", resp.data.data.articles);
                        resolve(true);
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
                    if (resp.status === 200) {
                        // commit("REQ_SUCCESS", null, { root: true });
                        if (resp.data.data)
                            commit("SET_EXPLORE_COLLECTIONS", resp.data.data.collections);
                        resolve(true);
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
                    if (resp.status === 200) {
                        // commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_EXPLORE_LEARN", resp.data.data.articles);
                        resolve(true);
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
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
