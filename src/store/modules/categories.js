import API_CONTEXT from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

const state = {
    tags: [],
    instrumentslists: [],
    instrumentpayload: {},
    singlestockpricedata: []
};

const getters = {
    gettagslistsArray: state => state.tags,
    getInstrumentsListArray: state => state.instrumentslists,
    getInstrumentsPayload: state => state.instrumentpayload
};

const mutations = {
    SET_TAGS_LISTS(state, tags) {
        state.tags = tags;
    },
    SET_INSTRUMENT_BY_TAGS(state, instruments) {
        state.instrumentslists = instruments;
    },
    SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(state, payload) {
        state.instrumentpayload = payload;
    }
};

const actions = {
    async GET_TAGS_CATEGORIES({ commit }, payload) {
        return new Promise((resolve, reject) => API_CONTEXT.get('/tags', { ...payload })
            .then((response) => {
                if (response.status >= 200 && response.status < 400) {
                    commit('SET_TAGS_LISTS', response.data.tags);
                    resolve(true);
                    return true;
                }
                errorFn(response, 'tags');
                resolve(false);
            })
            .catch((error) => {
                errorFn(error.response, 'tags');
                resolve(false);
            }));
    },
    async GET_INSTRUMENT_BY_TAGS({ commit }, params) {
        return new Promise((resolve, reject) => API_CONTEXT.get('/instruments/', params)
            .then((response) => {
                if (response.status >= 200 && response.status < 400) {
                    const { instruments } = response.data.data;
                    commit('SET_INSTRUMENT_BY_TAGS', instruments);
                    resolve(true);
                    return true;
                }
                errorFn(response, 'tag-instruments');
                resolve(false);
            })
            .catch((error) => {
                errorFn(error.response, 'tag-instruments');
                resolve(false);
            }));
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
