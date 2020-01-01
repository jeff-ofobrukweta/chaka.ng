import api from "../../services/apiService/api";
import errorFn from "../../services/apiService/error";

const state = {
    buyModal: {},
    sellModal: {},
    exchangeModal: false,
    fundModal: false,
    withdrawModal: false,
    saleSuccess: false,
    walletSuccess: false,
    mostPopular: []
};

const getters = {
    getBuyModal: state => state.buyModal,
    getSellModal: state => state.sellModal,
    getExchangeModal: state => state.exchangeModal,
    getFundModal: state => state.fundModal,
    getWithdrawModal: state => state.withdrawModal,
    getSaleSuccess: state => state.saleSuccess,
    getWalletSuccess: state => state.walletSuccess,
    getMostPopular: state => {
        const push = [];
        state.mostPopular.filter(el => {
            if (el.currency === "USD" && push.length === 0) {
                push.push(el);
            }
        });
        state.mostPopular.filter(el => {
            if (el.currency === "NGN" && push.length === 1) {
                push.push(el);
            }
        });
        return push;
    }
};

const mutations = {
    SET_BUY_MODAL(state, payload) {
        state.buyModal = payload;
    },
    SET_SELL_MODAL(state, payload) {
        state.sellModal = payload;
    },
    SET_EXCHANGE_MODAL(state, payload) {
        state.exchangeModal = payload;
    },
    SET_FUND_MODAL(state, payload) {
        state.fundModal = payload;
    },
    SET_WITHDRAW_MODAL(state, payload) {
        state.withdrawModal = payload;
    },
    SET_SALE_SUCCESS(state, payload) {
        state.saleSuccess = payload;
    },
    SET_WALLET_SUCCESS(state, payload) {
        state.walletSuccess = payload;
    },
    SET_MOST_POPULAR(state, payload) {
        state.mostPopular = payload;
    },
    RESET_MODALS(state) {
        state.buyModal = {};
        state.sellModal = {};
        state.exchangeModal = false;
        state.fundModal = false;
        state.withdrawModal = false;
        state.saleSuccess = false;
        state.walletSuccess = false;
    }
};

const actions = {
    GET_MOST_POPULAR: ({ commit }) =>
        new Promise(resolve =>
            api.get("/tags/slug/most-popular/instruments/").then(
                resp => {
                    if (resp.status >= 200 && resp.status < 400) {
                        commit("SET_MOST_POPULAR", resp.data.data.tag.Instruments);
                        resolve(true);
                        return true;
                    }
                    errorFn(resp, "most-popular");
                    resolve(false);
                },
                error => {
                    errorFn(error.response, "most-popular");
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
