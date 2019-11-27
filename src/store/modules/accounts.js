import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    accountSummary: {}
};

const getters = {
    getAccountSummary: state => state.accountSummary
};

const mutations = {
    SET_ACCOUNT_SUMMARY(state, payload) {
        state.accountSummary = payload;
    }
};

const actions = {
    GET_ACCOUNT_SUMMARY: ({ commit }, payload = { currency: "ngn" }) => {
        // commit("RESET_REQ", null, { root: true });
        // commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api.get("/users/:chakaID/summary/?currency=ngn", { ...payload }).then(
                resp => {
                    if (resp.status === 200) {
                        // commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_ACCOUNT_SUMMARY", resp.data.data);
                    } else {
                        errorFn(resp, "accounts");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "accounts");
                    resolve(false);
                }
            );
        });
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
