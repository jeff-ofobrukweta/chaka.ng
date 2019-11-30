import API_CONTEXT from "../../services/apiService/api";

const state = {
    instrument: {},
    singlestockpositions: []
    // preOrder: {}
};

const getters = {
    getSingleinstrument: state => state.instrument,
    getPositionsWithparams: state => symbol => {
        const filtered = state.singlestockpositions.filter(position => position.symbol === symbol);
        if (filtered) {
            console.log(">>>>>>>getPositionsWithparams>>>>>>>>>>", filtered);
            return filtered;
        }
        return false;
    }
    // getPreOrder: state => state.preOrder
};

const mutations = {
    SET_SINGLE_INSTRUMENT(state, instrument) {
        state.instrument = instrument;
    },
    SET_CURRENTSTOCK_POSITIONS(state, positions) {
        let singlestockpositions = {};
        singlestockpositions = positions;
        state.singlestockpositions = singlestockpositions.position;
    }
    // SET_PRE_ORDER(state, payload) {
    //     state.preOrder = payload;
    // }
};

const actions = {
    async GET_SINGLESTOCK_INSTRUMENT({ commit }, params) {
        console.log("lllllllllllllll", params);
        await API_CONTEXT.get(`/instruments/${params.instrumentID}`)
            .then(response => {
                const { instrument } = response.data.data;
                console.log(">>>>>>>>>>GET_SINGLESTOCK_INSTRUMENT>>>>>>>>>>>>>>", instrument);
                commit("SET_SINGLE_INSTRUMENT", instrument);
                // console.log('inside vuex store',chart);
            })
            .catch(error => {
                console.log(`::::::::::::::::::::${error}`);
            });
    },
    async GET_CURRENT_STOCK_POSITION({ commit, rootState }) {
        // console.log('on mount..................',rootState.auth)
        await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions/`)
            .then(response => {
                const { position } = response.data.data;
                console.log(">>>>>>>>>>GET_CURRENT_STOCK_POSITION>>>>>>>>>>>>>>", position);
                commit("SET_CURRENTSTOCK_POSITIONS", position);
                // console.log('inside vuex store',chart);
            })
            .catch(error => {
                console.log(`::::::::::::::::::::${error}`);
            });
    }
    // GET_PRE_ORDER: ({ commit }) => {
    //     return new Promise((resolve, reject) => {
    //         return api.get(
    //             "/currency-rates/today".then(
    //                 resp => {
    //                     if (resp.status === 200) {
    //                         commit("SET_EXCHANGE_RATE", resp.data.data.rate).then(() => {
    //                             resolve(true);
    //                         });
    //                     } else {
    //                         errorFn(resp, "exchange");
    //                         resolve(false);
    //                     }
    //                 },
    //                 error => {
    //                     errorFn(error.response, "exchange");
    //                     resolve(false);
    //                 }
    //             )
    //         );
    //     });
    // }
};

export default {
    state,
    actions,
    getters,
    mutations
};
