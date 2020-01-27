import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    valResult: []
};

const getters = {
    getValResult: state => state.valResult
};

const mutations = {
    SET_VAL_RESULT(state, payload) {
        state.valResult = payload;
    }
};

const actions = {
    GET_VAL_RESULT: ({ commit }, payload) =>
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        new Promise(resolve =>
            api.get("/offers/relationship-calculator", { ...payload }).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("SET_VAL_RESULT", resp.data.data.relationshipResult);
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, "val");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "val");
                    resolve(false);
                }
            )
        )
};

export default {
    state,
    actions,
    getters,
    mutations
};
