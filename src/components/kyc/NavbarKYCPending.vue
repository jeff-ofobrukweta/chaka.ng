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
                <div>
                    <p><small>Most Popular</small></p>
                </div>
                <div class="kyc-nav__popular">
                    <router-link
                        tag="div"
                        :to="{ name: 'singlestock', params: { symbol: stock.symbol } }"
                        class="kyc-nav__popular--div"
                        v-for="(stock, i) in getMostPopular"
                        :key="i"
                    >
                        <div>
                            <img
                                :src="stock.logoUrl"
                                class="kyc-nav__popular--logo"
                                :alt="stock.symbol"
                            />
                        </div>
                        <div class="text-left">
                            <h6>{{ stock.symbol | truncate(7) }}</h6>
                        </div>
                    </router-link>
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
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
    name: "kyc-pending",
    methods: {
        ...mapMutations(["SET_FUND_MODAL"]),
        ...mapActions(["GET_MOST_POPULAR"]),
        showFund() {
            this.SET_FUND_MODAL(true);
        }
    },
    computed: {
        ...mapGetters(["getMostPopular"])
    },
    mounted() {
        this.GET_MOST_POPULAR();
    }
};
</script>
