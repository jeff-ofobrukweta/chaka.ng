import API_CONTEXT from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

const state = {
    portfolioSummary: []
};

const getters = {
    getPortfolioSummary: () => state.portfolioSummary
};

const mutations = {
    SET_SUMMARY(state, summary) {
        state.portfolioSummary = summary;
    }
};

const actions = {
    async GET_SOCIAL_OAUTH_FACEBOOK({ commit, rootState }) {
        await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions/`)
            .then((response) => {
                const { positions } = response.data.data;
                
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
