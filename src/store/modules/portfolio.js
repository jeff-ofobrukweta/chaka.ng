import API_CONTEXT from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

const state = {
    portfolioSummary: [],
    totalpositionsGlobalLocalOpenorderscardDetails: {},
    globalstocksowned: [],
    localstocksowned: [],
    openstocks: []
};

const getters = {
    getPortfolioSummary: (state) => state.portfolioSummary,
    // card details getter in Portfolio card
    getPortfoliopositionsCarddetails: state => state.totalpositionsGlobalLocalOpenorderscardDetails,
    // ends here
    getglobalstocksowned: state => state.globalstocksowned,
    getlocalstocksowned: state => state.localstocksowned,
    getopenstocks: state => state.openstocks
};

const mutations = {
    SET_SUMMARY(state, summary) {
        state.portfolioSummary = summary;
    },
    SET_POSITIONS_HELD_FOR_PORTFOLIOCARDS(state, details) {
        state.totalpositionsGlobalLocalOpenorderscardDetails = details;
    },

    SET_PORTFOLIO_DETAILS_TABLE_FOR_GLOBALSTOCKS_OWN(state, details) {
        state.globalstocksowned = details;
    },
    SET_PORTFOLIO_DETAILS_TABLE_FOR_LOCALSTOCKS_OWN(state, details) {
        state.localstocksowned = details;
    },
    SET_PORTFOLIO_DETAILS_TABLE_FOR_OPENSTOCKS_OWN(state, details) {
        state.openstocks = details;
    }
};

const actions = {
    async GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS({ commit, rootState }) {
        await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions/`)
            .then((response) => {
                const { positions } = response.data.data;
                commit('SET_PORTFOLIO_DETAILS_TABLE_FOR_GLOBALSTOCKS_OWN', positions.filled.global);
                commit('SET_PORTFOLIO_DETAILS_TABLE_FOR_LOCALSTOCKS_OWN', positions.filled.local);
                commit('SET_PORTFOLIO_DETAILS_TABLE_FOR_OPENSTOCKS_OWN', positions.open.orders);
                commit('SET_POSITIONS_HELD_FOR_PORTFOLIOCARDS', response.data.data);
            })
            .catch((error) => {
                errorFn(error.response, 'portfolio');
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
