import API_CONTEXT from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

const state = {
    tags: [],
    instrumentslists: [],
    instrumentpayload: {
        name: 'Most Popular',
        slug: 'most-popular'
    },
    singlestockpricedata: [],
    pagination: {}
};

const getters = {
    gettagslistsArray: state => state.tags,
    getInstrumentsListArray: state => state.instrumentslists,
    getInstrumentsPayload: state => state.instrumentpayload,
    getpagination: state => state.pagination
};

const mutations = {
    SET_TAGS_LISTS(state, tags) {
        state.tags = tags;
    },
    SET_INSTRUMENT_BY_TAGS(state, instruments) {
        state.instrumentslists = instruments;
    },
    SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(state, payload) {
        console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMM', payload);
        state.instrumentpayload = payload;
    },
    SET_INSTRUMENT_PAGENATION(state, paginate) {
        state.pagination = paginate;
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
        return new Promise((resolve, reject) => API_CONTEXT.get(`/tags/slug/${params.slug}/instruments/`)
            .then((response) => {
                if (response.status >= 200 && response.status < 400) {
                    const { Instruments } = response.data.data.tag;
                    const { pagination } = response.data;
                    commit('SET_INSTRUMENT_BY_TAGS', Instruments);
                    commit('SET_INSTRUMENT_PAGENATION', pagination);
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
