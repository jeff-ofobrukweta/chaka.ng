<template>
    <div v-if="dummy" class="watchlist-portfolio__card loader loader-watchlist">
        <img
            src="../../assets/img/chaka-icon.svg"
            class="faded"
            alt="Chaka"
            width="90px"
            height="90px"
        />
    </div>
    <div v-else class="watchlist-portfolio__card" :class="color">
        <router-link
            class="watchlist-portfolio__left"
            :to="{ name: 'singlestock', params: { symbol: instrument.symbol } }"
        >
            <p class="watchlist-portfolio__name capitalize">{{ instrument.name }}</p>
            <p class="watchlist-portfolio__change">
                <img
                    v-if="instrument.derivedPrice >= 0"
                    src="../../assets/img/watchlist-up.svg"
                    alt="Growth"
                />
                <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
                <span>{{ instrument.derivedPrice >= 0 ? "+" : "" }}</span>
                <small
                    >{{ instrument.derivedPrice | units(2) }} ({{
                        instrument.derivedPricePercentage | units(2)
                    }}%)</small
                >
                <br />
                <!-- </p>
            <p> -->
                <strong
                    class="cursor-context"
                    :title="
                        instrument.InstrumentDynamic.askPrice
                            | kobo
                            | currency(instrument.currency, true)
                    "
                    >{{
                        instrument.InstrumentDynamic.askPrice | kobo | currency(instrument.currency)
                    }}</strong
                >
            </p>
        </router-link>
        <div class="watchlist-portfolio__right">
            <div>
                <a v-if="!loading" @click="removeFromWatchlist"
                    ><img :src="require('../../assets/img/watch-open.svg')" alt="Watch"
                /></a>
                <img
                    v-else
                    :src="require('../../assets/img/loader.gif')"
                    alt="Loading"
                    width="18px"
                />
            </div>
            <div>
                <kyc-button
                    ref="buyBtn"
                    type="button"
                    :classes="['watchlist-portfolio__buy']"
                    :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                    @step="handleStep"
                    tag="a"
                    >+&nbsp;Buy</kyc-button
                >
            </div>
        </div>

        <modal-kyc @updated="handleUpdate" @close="showKYC = false" v-if="showKYC" />
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    name: "watchlist-portfolio",
    props: {
        instrument: {
            type: Object,
            required: true
        },
        dummy: {
            type: Boolean
        }
    },
    data() {
        return {
            showKYC: false,
            loading: false
        };
    },
    computed: {
        ...mapGetters(["getNextKYC"]),
        color() {
            if (this.instrument.derivedPricePercentage > 25) return "dark-green";
            if (this.instrument.derivedPricePercentage > 10) return "green";
            if (this.instrument.derivedPricePercentage >= 0) return "light-green";
            if (this.instrument.derivedPricePercentage >= -5) return "light-red";
            if (this.instrument.derivedPricePercentage >= -10) return "red";
            return "dark-red";
        }
    },
    methods: {
        ...mapActions(["REMOVE_FROM_WATCHLIST"]),
        ...mapMutations(["SET_BUY_MODAL"]),
        handleStep(step) {
            if (step.kyc) {
                this.showKYC = true;
                return true;
            }
            this.showBuy();
        },
        handleUpdate(value) {
            if (value) {
                this.showBuy();
            }
        },
        showBuy() {
            this.showKYC = false;
            this.SET_BUY_MODAL({
                instrument: this.instrument,
                currency: this.instrument.currency,
                stockPage: false,
                show: true
            });
        },
        async removeFromWatchlist() {
            this.loading = true;
            const payload = { symbols: String(this.instrument.symbol) };
            await this.REMOVE_FROM_WATCHLIST(payload);
            this.loading = false;
        }
    }
};
</script>
