import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";
import jwtDecode from "jwt-decode";

const state = {
    loggedUser: {}
};

const getters = {
    getLoggedUser: state => state.loggedUser,
    isLoggedIn: state => {
        if (Object.keys(state.loggedUser).length > 0) return true;
        return false;
    }
};

const mutations = {
    SET_LOGGED_USER(state, payload) {
        state.loggedUser = payload;
    }
};

const actions = {
    REGISTER: ({ commit }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api.post("/auth/signup", payload).then(
                resp => {
                    if (resp.status === 200) {
                        commit("REQ_SUCCESS", null, { root: true });
                        resolve(true);
                    } else {
                        errorFn(resp, "register");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "register");
                    resolve(false);
                }
            );
        });
    },
    LOGIN: ({ commit, dispatch }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api.post(`/auth/login`, payload).then(
                resp => {
                    if (resp.status === 200) {
                        commit("REQ_SUCCESS", null, { root: true });
                        localStorage.setItem("AUTH_TOKEN", resp.data.data.token);
                        dispatch("GET_LOGGED_USER");
                        resolve(true);
                    } else {
                        errorFn(resp, "login");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "login");
                    resolve(false);
                }
            );
        });
    },
    GET_LOGGED_USER: ({ commit }) => {
        const token = jwtDecode(localStorage.getItem("AUTH_TOKEN"));
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise((resolve, reject) => {
            return api.get(`/users/${token.user.chakaID}`).then(
                resp => {
                    if (resp.status === 200) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_LOGGED_USER", resp.data.data.user);
                        resolve(true);
                    } else {
                        errorFn(resp, "login");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "login");
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
