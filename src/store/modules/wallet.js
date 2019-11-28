import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {};

const getters = {};

const mutations = {};

const actions = {
    WITHDRAW_WALLET: ({ commit, rootState }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/withdraw/`, payload)
                .then(
                    resp => {
                        if (resp.status === 200) {
                            commit("REQ_SUCCESS", null, { root: true });
                            resolve(true);
                        } else {
                            errorFn(resp, "withdraw");
                            resolve(false);
                        }
                    },
                    error => {
                        errorFn(error.response, "withdraw");
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
