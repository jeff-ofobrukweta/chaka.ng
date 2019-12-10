import api from "../../services/apiService/api";

const state = {};

const getters = {};

const mutations = {};

const actions = {
    GET_STAMPS: ({ commit, dispatch, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            return api
                .post(`/users/${rootState.auth.loggedUser.chakaID}/wallets/withdraw/`, payload)
                .then(
                    resp => {
                        // if (resp.status >= 200 && resp.status < 400) {
                        //     commit("REQ_SUCCESS", null, { root: true });
                        //     commit("SET_WALLET_TX", resp.data.data.transaction);
                        //     dispatch("GET_ACCOUNT_SUMMARY", null, { root: true }).then(() => {
                        //         resolve(true);return true
                        //     });
                        // } else {
                        //     errorFn(resp, "withdraw");
                        //     resolve(false);
                        // }
                    },
                    error => {
                        // errorFn(error.response, "withdraw");
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
