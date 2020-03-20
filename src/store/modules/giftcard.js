import api from '../../services/apiService/api';
import errorFn from '../../services/apiService/error';

const state = {
    giftSuccess: {
        // redeemCode: "TESTBCJDBSV",
        // giftcardData: {
        //     status: "UNREDEEMED",
        //     id: 125,
        //     senderEmail: "test@me.com",
        //     receiverEmail: "janet@chaka.ng",
        //     amountCash: 1000,
        //     currency: "NGN",
        //     paymentReference: "PAYSTACK-T209911774863815",
        //     redeemDate: "2020-01-22T16:29:42.897Z",
        //     InstrumentId: 7021,
        //     updatedAt: "2020-01-22T16:29:42.893Z",
        //     createdAt: "2020-01-22T16:29:42.893Z",
        //     senderPhone: null,
        //     receiverPhone: null,
        //     ReceiverId: null,
        //     redeemCodeEncr: null
        // }
    },
    redeemSuccess: {
        redeemCode: 'TESTBCJDBSV',
        giftcardData: {
            status: 'UNREDEEMED',
            id: 125,
            senderEmail: 'test@me.com',
            receiverEmail: 'janet@chaka.ng',
            amountCash: 1000,
            currency: 'NGN',
            paymentReference: 'PAYSTACK-T209911774863815',
            redeemDate: '2020-01-22T16:29:42.897Z',
            InstrumentId: 7021,
            updatedAt: '2020-01-22T16:29:42.893Z',
            createdAt: '2020-01-22T16:29:42.893Z',
            senderPhone: null,
            receiverPhone: null,
            ReceiverId: null,
            redeemCodeEncr: null
        }
    }
};

const getters = {
    getGiftSuccess: state => state.giftSuccess,
    getRedeemSuccess: state => state.redeemSuccess
};

const mutations = {
    SET_GIFT_SUCCESS(state, payload) {
        state.giftSuccess = payload;
    },
    SET_REDEEM_SUCCESS(state, payload) {
        state.redeemSuccess = payload;
    }
};

const actions = {
    CREATE_GIFTCARD: ({ commit }, payload) => {
        commit('RESET_REQ', null, { root: true });
        commit('REQ_INIT', null, { root: true });
        return new Promise(resolve => api.post('/giftcards', { ...payload }).then(
            (resp) => {
                commit('REQ_SUCCESS', null, { root: true });
                if (resp.status >= 200 && resp.status < 400) {
                    commit('SET_GIFT_SUCCESS', resp.data.data);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'gift');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'gift');
                resolve(false);
            }
        ));
    },
    REDEEM_GIFTCARD: ({ commit }, payload) => {
        /**
         * @param {
            instrumentSymbol,
            receiverEmail,
            redeemCode
        }
         */
        commit('RESET_REQ', null, { root: true });
        commit('REQ_INIT', null, { root: true });
        return new Promise(resolve => api.post('/giftcards/redeem', { ...payload }).then(
            (resp) => {
                commit('REQ_SUCCESS', null, { root: true });
                if (resp.status >= 200 && resp.status < 400) {
                    commit('SET_REDEEM_SUCCESS', resp.data.data);
                    resolve(true);
                    return true;
                }
                errorFn(resp, 'gift');
                resolve(false);
            },
            (error) => {
                errorFn(error.response, 'gift');
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
