import API_CONTEXT from "../../services/apiService/api";

const state = {
    tags: [],
    instrumentslists: [],
    instrumentpayload: {},
    singlestockpricedata: []
};

const getters = {
    gettagslistsArray: state => {
        return state.tags;
    },
    getInstrumentsListArray: state => {
        return state.instrumentslists;
    },
    getInstrumentsPayload: state => {
        return state.instrumentpayload;
    }
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
    async GET_TAGS_CATEGORIES({ commit }, params) {
        await API_CONTEXT.get(`/tags`)
            .then(response => {
                commit("SET_TAGS_LISTS", response.data.tags);
            })
            .catch(error => {
                console.log(`::::::::::::::::::::${error}`);
            });
    },
    async GET_INSTRUMENT_BY_TAGS({ commit }, params) {
        await API_CONTEXT.get(`/instruments/`, params)
            .then(response => {
                const { instruments } = response.data.data;
                commit("SET_INSTRUMENT_BY_TAGS", instruments);
                return true;
            })
            .catch(error => {
                return false;
            });
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
