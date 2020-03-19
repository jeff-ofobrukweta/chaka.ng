import api from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

const state = {
    calcInstrument: {}
};

const getters = {
    getCalcInstrument: state => state.calcInstrument
};

const mutations = {
    SET_CALC_INSTRUMENT(state, payload) {
        state.calcInstrument = payload;
    }
};

const actions = {
    GET_CALC_INSTRUMENT: ({ commit }, payload) =>
        new Promise(resolve => api.get('instruments/mini-data', { ...payload }).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    commit('SET_CALC_INSTRUMENT', resp.data.data.instrument);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'calculator');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'calculator');
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
