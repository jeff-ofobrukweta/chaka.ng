<template>
    <modal no-header @close="closeModal">
        <div class="form-half form-half__margin">
            <div class="form__image stock-vdr__center">
                <svg
                    width="83"
                    height="83"
                    viewBox="0 0 83 83"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M41.029 0C18.3668 0 0.00195312 18.3697 0.00195312 41.027C0.00195312 63.6868 18.3691 82.054 41.029 82.054C63.6862 82.054 82.0534 63.6868 82.0534 41.027C82.0534 18.3723 63.6862 0 41.029 0ZM41.029 74.3613C22.6182 74.3613 7.69464 59.4378 7.69464 41.027C7.69464 22.6162 22.6208 7.69269 41.029 7.69269C59.4371 7.69269 74.3607 22.6162 74.3607 41.027C74.3607 59.4378 59.4374 74.3613 41.029 74.3613ZM57.1527 23.5752C55.4089 22.5342 53.1807 23.1521 52.1782 24.9598L38.4212 49.6709L30.7595 40.3449C29.3723 38.7474 27.5287 37.9193 25.7876 38.9603C24.0438 40.0038 23.3233 42.5143 24.4517 44.1247L35.1136 57.1019C35.911 58.1378 36.8212 58.7585 37.7727 58.9355L37.7804 58.951L37.8779 58.9561C38.0934 58.9894 41.3141 59.5843 42.7013 57.1022L58.4917 28.7399C59.4936 26.929 58.8964 24.6187 57.1527 23.5752Z"
                        fill="#3DB39E"
                    />
                </svg>
            </div>
            <h5 class="stock-vdr__center">Your Giftcard was {{ title }} successfully</h5>
            <div class="stock-vdr__modal">
                <p class="text-center grey-cool">
                    You have successfully sent a
                    <strong>{{ giftcard.amountCash | currency(giftcard.currency, true) }}</strong>
                    giftcard to be redeemed by <strong>{{ giftcard.receiverEmail }}</strong> with
                    redeem code <strong>{{ value.redeemCode }}</strong> by
                    {{ giftcard.redeemDate | date }}
                </p>
            </div>
            <div class="text-center">
                <br />
                <button type="button" class="btn btn__primary--outline" @click="closeModal()">
                    Close
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'gift-success',
    computed: {
        ...mapGetters(['getGiftSuccess', 'getRedeemSuccess']),
        giftcard() {
            return this.value.giftcardData;
        },
        value() {
            if (Object.keys(this.getGiftSuccess).length > 0) return this.getGiftSuccess;
            return this.getRedeemSuccess;
        },
        title() {
            if (Object.keys(this.getGiftSuccess).length > 0) return 'created';
            return 'redeemed';
        }
    },
    methods: {
        ...mapMutations(['SET_GIFT_SUCCESS', 'SET_REDEEM_SUCCESS', 'MODAL_OPENED']),
        closeModal() {
            this.MODAL_OPENED(false);
            this.$emit('close');
        }
    },
    beforeDestroy() {
        this.SET_GIFT_SUCCESS({});
        this.SET_REDEEM_SUCCESS({});
    },
    mounted() {
        console.log('I got here', this.getGiftSuccess);
    }
};
</script>
