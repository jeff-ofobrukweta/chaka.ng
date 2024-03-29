import api from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';
import { getRandomInteger } from '../../services/helpers';

const state = {
    buyModal: {},
    sellModal: {},
    exchangeModal: false,
    fundModal: false,
    withdrawModal: false,
    saleSuccess: false,
    walletSuccess: false,
    giftSuccessModal: false,
    downloadApp: false,
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
    getGiftSuccessModal: state => state.giftSuccessModal,
    getMostPopular: state => state.mostPopular,
    getDownloadApp: state => state.downloadApp
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
    SET_GIFT_SUCCESS_MODAL(state, payload) {
        state.giftSuccessModal = payload;
    },
    SET_MOST_POPULAR(state, payload) {
        state.mostPopular = payload;
    },
    SET_DOWNLOAD_APP(state, payload) {
        state.downloadApp = payload;
    },
    RESET_MODALS(state) {
        state.buyModal = {};
        state.sellModal = {};
        state.exchangeModal = false;
        state.fundModal = false;
        state.withdrawModal = false;
        state.saleSuccess = false;
        state.walletSuccess = false;
        state.giftSuccessModal = false;
        state.downloadApp = false;
    }
};

const actions = {
    GET_MOST_POPULAR: ({ commit }) => {
        const globals = ['AAPL', 'AMZN', 'NFLX', 'TSLA'];
        const locals = ['GUARANTY', 'ZENITHBANK', 'MTNN', 'AIRTELAFRI'];
        const payload = [globals[getRandomInteger(3)], locals[getRandomInteger(3)]];
        new Promise(resolve => api.get(`/instruments/?symbols=${payload.join(',')}`).then(
            (resp) => {
                if (resp.status >= 200 && resp.status < 400) {
                    commit('SET_MOST_POPULAR', resp.data.data.instruments);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'most-popular');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'most-popular');
                resolve(false);
            }
        ));
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
