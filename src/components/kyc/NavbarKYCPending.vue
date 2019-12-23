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
                    <button class="btn btn__white btn-block kyc-nav__fund" @click="showFund">
                        <small>Fund Wallet</small>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'kyc-pending',
    methods: {
        ...mapMutations(['SET_FUND_MODAL']),
        showFund() {
            this.SET_FUND_MODAL(true);
        }
    }
};
</script>
