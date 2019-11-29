import API_CONTEXT from '../../services/apiService/api';

const state = {
    instrument:{}
};

const getters = {
    getSingleinstrument: (state) => state.instrument
};

const mutations = {
    SET_SINGLE_INSTRUMENT(state, instrument) {
        console.log('>>>>>>>>>>SET_SINGLE_INSTRUMENT>>>>>>>>>>>>>>',instrument)
        state.instrument = instrument;
    }
};

const actions = {
    async GET_SINGLESTOCK_INSTRUMENT({ commit }, params) {
		await API_CONTEXT.get(`/instruments/${params.instrumentID}`)
			.then((response) => {
                const { instrument } = response.data.data;
                console.log('>>>>>>>>>>GET_SINGLESTOCK_INSTRUMENT>>>>>>>>>>>>>>',instrument)
                commit('SET_SINGLE_INSTRUMENT',instrument);
                // console.log('inside vuex store',chart);
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
			});
    },
};

export default {
    state,
    actions,
    getters,
    mutations
};
