import api from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

const state = {
    articles: []
};

const getters = {
    getNews: state => state.articles
};

const mutations = {
    SET_NEWS(state, payload) {
        state.articles = payload;
    }
};

const actions = {
    GET_ARTICULE_NEWS: ({ commit }, payload) =>
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        new Promise((resolve, reject) => api.get('/news', { ...payload }).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    commit('SET_NEWS', resp.data.data.articles);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'news');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'explore');
                resolve(false);
            }
        ))

};

export default {
    state,
    actions,
    getters,
    mutations
};
