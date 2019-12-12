<template>
    <section class="kyc-nav__section">
        <div class="kyc-nav container">
            <div class="kyc-nav__text kyc-nav__text--center">
                <h5>Start Trading Soon</h5>
                <p>
                    <small
                        >Your documents are under review. You would be approved for trading
                        shortly.</small
                    >
                </p>
                <div class="kyc-nav__popular">
                    <p><small>Most Popular Today</small></p>
                </div>
                <div>
                    <button class="btn btn__white btn-block kyc-nav__fund" @click="showFund = true">
                        <small>Fund Wallet</small>
                    </button>
                </div>
            </div>
        </div>
        <fund-modal :showModal="showFund" @close="closeFundBtn" v-if="showFund" />
        <wallet-success @close="showSuccess = false" v-if="showSuccess" />
    </section>
</template>

<script>
export default {
    name: "kyc-pending",
    data() {
        return {
            showFund: false,
            showSuccess: false
        };
    },
    computed: {},
    methods: {
        closeFundBtn(e) {
            if (e) this.showSuccess = true;
            this.showFund = false;
        }
    }
};
</script>
