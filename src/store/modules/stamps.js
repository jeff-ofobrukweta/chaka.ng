import API_CONTEXT from "../../services/apiService/api";

const state = {
  positionsObject: []
};

const getters = {
  getPositions: (state) => {
    return state.positionsObject;
}
};

const mutations = {
  SET_FETCH_POSITIONS_INSTRUMENTS(state, data) {
    let positions = {};
    positions = data.data.positions;
    state.positionsObject = positions.filled;
},
};

const actions = {
  async FETCH_POSITIONS_INSTRUMENTS({ commit, rootState }) {
    await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions/`)
        .then((response) => {
          console.log('THIS IS THE CERTIFICATE AAAAAAAAAAAAAAAAAAAAAAAAAAAAARRRRRRRRR',response)
            if (true) {
                const collection = response.data;
                commit('SET_FETCH_POSITIONS_INSTRUMENTS', collection);
                console.log('THIS IS THE CERTIFICATE AAAAAAAAAAAAAAAAAAAAAAAAAAAAARRRRRRRRR',response)
                return true;
            }
            return false;
        })
        .catch((error) => {
            return error;
        });
},
};

export default {
    state,
    actions,
    getters,
    mutations
};
