import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import auth from "./modules/auth";
import accounts from "./modules/accounts";
import explore from "./modules/explore";
import kyc from "./modules/kyc";
import portfolio from "./modules/portfolio";
import stamps from "./modules/stamps";
import wallet from "./modules/wallet";
import watchlist from "./modules/watchlist";
import categories from "./modules/categories";
import graphs from "./modules/graphs";
import singlestock from "./modules/singlestock";
import news from "./modules/news";
import modals from "./modules/modals";
import socials from "./modules/social";

Vue.use(Vuex);

const persist = new VuexPersistence({
    storage: localStorage
});

let interval = null;
const debug = process.env.VUE_APP_NODE_ENV !== "production";

const initialState = {
    status: "",
    errorLog: {},
    progressbar: 0,
    windowWidth: "",
    modalOpened: false,
    auth: { ...auth.state },
    explore: { ...explore.state },
    kyc: { ...kyc.state },
    portfolio: { ...portfolio.state },
    stamps: { ...stamps.state },
    wallet: { ...wallet.state },
    watchlist: { ...watchlist.state },
    categories: { ...watchlist.state },
    graphs: { ...graphs.state },
    singlestock: { ...graphs.state },
    accounts: { ...accounts.state },
    news: { ...news.state },
    modals: { ...modals.state },
    socials:{...socials.state}
};

export default new Vuex.Store({
    state: {
        status: "",
        errorLog: {},
        progressbar: 0,
        windowWidth: "",
        modalOpened: false
    },
    getters: {
        getStatus: state => state.status,
        getProgressbar: state => state.progressbar,
        getWindowWidth: state => state.windowWidth,
        getErrorLog: state => state.errorLog,
        isModalOpened: state => state.modalOpened
    },
    mutations: {
        LOGOUT: state => {
            localStorage.removeItem("AUTH_TOKEN");
            state.loggedUser = {};
        },
        BEGIN_LOADER: state => {
            if (state.progressbar === 0) state.progressbar = 30;
            state.progressbar += 5;
        },
        END_LOADER: (state, payload) => {
            state.progressbar = payload;
        },
        SET_WINDOW_WIDTH: (state, width) => {
            state.windowWidth = width;
        },
        REQ_INIT: state => {
            state.status = "loading";
        },
        REQ_SUCCESS: state => {
            state.status = "success";
        },
        REQ_ERROR: state => {
            state.status = "error";
        },
        LOG_ERROR: (state, error) => {
            state.errorLog = error;
        },
        MODAL_OPENED: (state, payload) => {
            state.modalOpened = payload;
        },
        RESET_REQ: state => {
            state.status = "";
            state.errorLog = {};
        },
        RESET_ALL: state => {
            Object.keys(state).forEach(key => {
                try {
                    Object.assign(state[key], initialState[key]);
                } catch (error) {}
            });
        }
    },
    actions: {
        START_LOADER: ({ state, commit }) => {
            interval = setInterval(() => {
                if (state.progressbar < 80) {
                    commit("BEGIN_LOADER");
                }
            }, 500);
        },
        STOP_LOADER: ({ commit }) => {
            clearInterval(interval);
            setTimeout(() => {
                commit("END_LOADER", 100);
            }, 200);
            setTimeout(() => {
                commit("END_LOADER", 0);
            }, 1000);
        }
    },
    modules: {
        auth,
        accounts,
        explore,
        kyc,
        portfolio,
        stamps,
        wallet,
        watchlist,
        categories,
        graphs,
        singlestock,
        news,
        modals,
        socials
    },
    strict: debug,
    plugins: [persist.plugin]
});
