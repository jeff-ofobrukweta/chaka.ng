import api from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

const state = {
    valResult: [],
    canShare: false
};

const getters = {
    getValResult: state => state.valResult,
    canShare: state => state.canShare
};

const mutations = {
    SET_VAL_RESULT(state, payload) {
        state.valResult = payload;
    },
    SET_CAN_SHARE(state, payload) {
        state.canShare = payload;
    }
};

const actions = {
    GET_VAL_RESULT: ({ commit }, payload) =>
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        new Promise(resolve => api.get('/offers/relationship-calculator', { ...payload }).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    commit('SET_VAL_RESULT', resp.data.data.relationshipResult);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'val');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'val');
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
