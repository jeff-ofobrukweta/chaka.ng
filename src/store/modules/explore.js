import api from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

const state = {
    exploreNews: [],
    explorepaginationNewsPag:{},
    explorepaginationCollectionPag:{},
    explorepaginationLearnPag:{},
    exploreLearn: [],
    exploreCollections: [],
    singleCollection: [],
    collectionStocks: [],
    selectedCollection: {}
};

const getters = {
    getExploreNews: state => state.exploreNews,
    getExploreNewsTotal: state => state.explorepaginationNewsPag,
    getExploreCollectionsTotal: state => state.explorepaginationNewsPag,
    getExploreLearnTotal: state => state.explorepaginationLearnPag,
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
    SET_EXPLORE_NEWS_PAGINATION_TOTAL(state, payload){
        state.explorepaginationNewsPag = payload;
    },
    SET_EXPLORE_COLLECTIONS_PAGINATION_TOTAL(state, payload){
        state.explorepaginationCollectionPag = payload;
    },
    SET_EXPLORE_LEARN_PAGINATION_TOTAL(state, payload){
        state.explorepaginationLearnPag = payload;
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
     GET_EXPLORE_NEWS: async ({ commit }, payload) =>{
        console.log('this is the payload part',payload)
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        await new Promise(resolve => api.get(`/news/explore/collections?perPage=${payload.perPage}&page=${payload.page}`).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    // commit("REQ_SUCCESS", null, { root: true });
                    commit('SET_EXPLORE_NEWS_PAGINATION_TOTAL', resp.data.pagination);
                    commit('SET_EXPLORE_NEWS', resp.data.data.articles);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'explore');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'explore');
                resolve(false);
            }
        ))},
    GET_EXPLORE_COLLECTIONS: ({ commit }, payload) =>{
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        new Promise(resolve => api.get(`/news/explore/collections?perPage=${payload.perPage}&page=${payload.page}`).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    // commit("REQ_SUCCESS", null, { root: true });
                    commit('SET_EXPLORE_COLLECTIONS_PAGINATION_TOTAL', resp.data.pagination);
                    commit('SET_EXPLORE_COLLECTIONS', resp.data.data.articles);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'explore');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'explore');
                resolve(false);
            }
        ))},
    GET_EXPLORE_LEARN: ({ commit }, payload) =>{
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        new Promise(resolve => api.get('/news/explore/learn', payload).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    // commit("REQ_SUCCESS", null, { root: true });
                    commit('SET_EXPLORE_LEARN_PAGINATION_TOTAL', resp.data.data.pagination);
                    //the pagination here is not uniform from the api vheck object from api
                    commit('SET_EXPLORE_LEARN', resp.data.data.articles);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'explore');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'explore');
                resolve(false);
            }
        ))},
    GET_SINGLE_COLLECTION: ({ commit, state }) => {
        /**
         * @param payload: an array pf stock symbols
         */
        const temp = state.collectionStocks.join(',');
        return new Promise(resolve => api.get(`/instruments/?symbols=${temp}`).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    commit('SET_SINGLE_COLLECTION', resp.data.data.instruments);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'explore-collection');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'explore-collection');
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
