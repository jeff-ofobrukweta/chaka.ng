import jwtDecode from "jwt-decode";
import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    loggedUser: {},
    loggedIn: false
};

const getters = {
    getLoggedUser: state => state.loggedUser,
    isLoggedIn: state => {
        if (Object.keys(state.loggedUser).length > 0 || state.loggedIn) return true;
        return false;
    }
};

const mutations = {
    SET_LOGGED_USER(state, payload) {
        state.loggedUser = payload;
    },
    SET_LOGGED_IN(state, payload) {
        state.loggedIn = payload;
    }
};

const actions = {
    REGISTER: ({ commit }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        mixpanel.identify(payload.email) // In sign up
        return new Promise(resolve =>
            api.post("/auth/signup", payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, "register");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "register");
                    resolve(false);
                }
            )
        );
    },
    FORGOT_PASSWORD: ({ commit }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise(resolve =>
            api.post("/auth/reset-password/", payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, "forgot-password");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "forgot-password");
                    resolve(false);
                }
            )
        );
    },
    RESET_PASSWORD: ({ commit }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise(resolve =>
            api.post("/auth/reset-password/confirm/", payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, "reset-password");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "reset-password");
                    resolve(false);
                }
            )
        );
    },
    CONFIRM_EMAIL: ({ commit }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise(resolve =>
            api.post("/auth/confirm-email-token/", payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, "confirm-email");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "confirm-email");
                    resolve(false);
                }
            )
        );
    },
    LOGIN: ({ commit }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        mixpanel.identify(payload.email) // In sign up
        return new Promise(resolve =>
            api.post("/auth/login", payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        localStorage.setItem("AUTH_TOKEN", resp.data.data.token);
                        localStorage.setItem("REFRESH_TOKEN", resp.data.data.refreshToken);
                        commit("SET_LOGGED_IN", true);
                        commit("REQ_SUCCESS", null, { root: true });
                        console.log('email meant here new 2>>>>>>>>>>>>>',resp)
                        fbq('track', 'login');
                        resolve(true);
                        return true;
                    } else {
                        errorFn(resp, "login");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "login");
                    resolve(false);
                }
            )
        );
    },
    SOCIAL_LOGIN: ({ commit }, payload) => {
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        mixpanel.identify(payload.email) // In sign up
        return new Promise(resolve =>
            api.post("/auth/social-auth", payload).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        // localStorage.setItem("AUTH_TOKEN", resp.data.data.token);
                        // localStorage.setItem("REFRESH_TOKEN", resp.data.data.refreshToken);
                        // commit("SET_LOGGED_IN", true);
                        // commit("REQ_SUCCESS", null, { root: true });
                        // console.log('email meant here new 2>>>>>>>>>>>>>',resp)
                        fbq('track', 'login');
                        resolve(true);
                        return true;
                    } else {
                        errorFn(resp, "login");
                        resolve(false);
                    }
                },
                error => {
                    errorFn(error.response, "login");
                    resolve(false);
                }
            )
        );
    },
    GET_LOGGED_USER: ({ commit }) => {
        const token = jwtDecode(localStorage.getItem("AUTH_TOKEN"));
        commit("RESET_REQ", null, { root: true });
        commit("REQ_INIT", null, { root: true });
        return new Promise(resolve =>
            api.get(`/users/${token.user.chakaID}`).then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("REQ_SUCCESS", null, { root: true });
                        commit("SET_LOGGED_USER", resp.data.data.user);
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, "login");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "login");
                    resolve(false);
                }
            )
        );
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
