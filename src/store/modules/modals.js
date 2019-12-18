const state = {
    buyModal: {},
    sellModal: {},
    exchangeModal: false,
    fundModal: false,
    withdrawModal: false,
    saleSuccess: false,
    walletSuccess: false,
    kycModal: {}
};

const getters = {
    getBuyModal: state => state.buyModal,
    getSellModal: state => state.sellModal,
    getExchangeModal: state => state.exchangeModal,
    getFundModal: state => state.fundModal,
    getWithdrawModal: state => state.withdrawModal,
    getKycModal: state => state.kycModal,
    getSaleSuccess: state => state.saleSuccess,
    getWalletSuccess: state => state.walletSuccess
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
    SET_KYC_MODAL(state, payload) {
        state.kycModal = payload;
    },
    SET_SALE_SUCCESS(state, payload) {
        state.saleSuccess = payload;
    },
    SET_WALLET_SUCCESS(state, payload) {
        state.walletSuccess = payload;
    }
};

const actions = {};

export default {
    state,
    actions,
    getters,
    mutations
};
