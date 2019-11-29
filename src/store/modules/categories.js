import API_CONTEXT from '../../services/apiService/api';

const state = {
    tags:[],
    instrumentslists:[],
    instrumentpayload:{},
    singlestockpricedata:[]
};

const getters = {
    gettagslistsArray: (state) => {
		return state.tags;
    },
    getInstrumentsListArray: (state)=>{
        return state.instrumentslists;
    },
    getInstrumentsPayload: (state)=>{
        return state.instrumentpayload;
    }
};

const mutations = {
    SET_TAGS_LISTS(state, tags) {
		state.tags = tags;
    },
    SET_INSTRUMENT_BY_TAGS(state, instruments){
        state.instrumentslists = instruments;
    },
    SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(state, payload){
        state.instrumentpayload = payload;
    }

};

const actions = {
    async GET_TAGS_CATEGORIES({ commit }, params) {
		await API_CONTEXT.get(`/tags`)
			.then((response) => {
                commit('SET_TAGS_LISTS',response.data.tags)
                console.log('inside vuex store',response.data.tags)
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
			});
    },
    async GET_INSTRUMENT_BY_TAGS({commit}, params) {
        console.log('params>>>first>>>>>>>>>>>>>>>>',params)
		await API_CONTEXT.get(`/instruments/`,params)
			.then((response) => {
                console.log('params>>>>>>>>>>second>>>>>>>>>',params)
                console.log('SET_INSTRUMENT_BY_TAGS',response.data.data.instruments)
                commit('SET_INSTRUMENT_BY_TAGS',response.data.data.instruments);
                console.log('this is the state>>:::::::>>>>>>::::::>>',state.instrumentslists);
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
			});
    }
    
};

export default {
    state,
    actions,
    getters,
    mutations
};
