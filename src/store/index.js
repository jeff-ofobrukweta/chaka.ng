import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import auth from "./modules/auth";
import explore from "./modules/explore";
import history from "./modules/history";
import kyc from "./modules/kyc";
import portfolio from "./modules/portfolio";
import stamps from "./modules/stamps";
import statements from "./modules/statements";
import stock from "./modules/stock";
import wallet from "./modules/wallet";
import watchlist from "./modules/watchlist";

Vue.use(Vuex);

const persist = new VuexPersistence({
    storage: localStorage
});

let interval = null;
const debug = process.env.VUE_APP_NODE_ENV !== "production";

const initialState = {
    progressbar: 0,
    windowWidth: "desktop",
    auth: { ...auth.state },
    explore: { ...explore.state },
    history: { ...history.state },
    kyc: { ...kyc.state },
    portfolio: { ...portfolio.state },
    stamps: { ...stamps.state },
    statements: { ...statements.state },
    stock: { ...stock.state },
    wallet: { ...wallet.state },
    watchlist: { ...watchlist.state }
};

export default new Vuex.Store({
    state: {
        progressbar: 50,
        windowWidth: "desktop"
    },
    getters: {
        getProgressbar: state => state.progressbar,
        getWindowWidth: state => state.windowWidth
    },
    mutations: {
        BEGIN_LOADER(state) {
            if (state.progressbar === 0) state.progressbar = 30;
            state.progressbar += 5;
        },
        END_LOADER(state, payload) {
            state.progressbar = payload;
        },
        SET_WINDOW_WIDTH: (state, width) => {
            state.windowWidth = width;
        },
        RESET_ALL: state => {
            Object.keys(state).forEach(key => {
                Object.assign(state[key], initialState[key]);
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
            }, 100);
            setTimeout(() => {
                commit("END_LOADER", 0);
            }, 800);
        }
    },
    modules: {
        auth,
        explore,
        history,
        kyc,
        portfolio,
        stamps,
        statements,
        stock,
        wallet,
        watchlist
    },
    strict: debug,
    plugins: [persist.plugin]
});
