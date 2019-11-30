<template>
    <modal :close-on-click="false" @close="closeModal" class="modal__buy">
        <template slot="header">Buy {{ instrument.name }}</template>
        <section class="modal__buy--details">
            <div class="modal__buy-left">
                <div class="modal__buy--image">
                    <img class="modal__buy--img" :src="instrument.logoUrl" />
                </div>
                <div class="modal__buy--symbol">
                    <p>{{ instrument.symbol }}</p>
                    <p>
                        <img
                            :src="
                                require(`../../assets/img/flags/${
                                    instrument.country ? instrument.country.toLowerCase() : 'zz'
                                }-flag.svg`)
                            "
                            class="watchlist-explore__symbol"
                            alt="US"
                            width="24px"
                        />
                    </p>
                </div>
            </div>
            <div>
                <p class="grey-cool"><small>CURRENT STOCK PRICE</small></p>
                <p>
                    <span
                        class="cursor-context modal__buy--price"
                        :title="instrument.price | currency(instrument.currency, true)"
                        >{{ instrument.price | currency(instrument.currency) }}</span
                    >&nbsp;&nbsp;
                    <img
                        v-if="instrument.change >= 0"
                        src="../../assets/img/watchlist-up.svg"
                        alt="Growth"
                    />
                    <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
                    <span :class="[instrument.change >= 0 ? 'green' : 'red']">
                        <span>{{ instrument.change >= 0 ? "+" : "" }}</span>
                        <small
                            >{{ instrument.change | units(2) }} ({{
                                instrument.percent | units(2)
                            }}%)</small
                        ></span
                    >
                </p>
            </div>
            <div>
                <p class="grey-cool"><small>AVAILABLE AMOUNT</small></p>
                <p
                    v-if="currency === 'NGN'"
                    class="cursor-context modal__buy--price"
                    :title="getAccountSummary.localWallet.availableBalance | currency('NGN', true)"
                >
                    {{ getAccountSummary.localWallet.availableBalance | currency("NGN") }}
                </p>
                <p
                    v-else
                    class="cursor-context modal__buy--price"
                    :title="getAccountSummary.globalWallet.availableBalance | currency('USD', true)"
                >
                    {{ getAccountSummary.globalWallet.availableBalance | currency("USD") }}
                </p>
            </div>
        </section>
        <form class="modal-form" @submit.prevent="fundWallet">
            <div class="modal-form__group">
                <label class="form__label" v-if="orderType === 'MARKET'"
                    >Amount
                    <form-input
                        type="number"
                        name="amount"
                        v-model="itemData.amount"
                        placeholder="Amount"
                /></label>
                <label class="form__label" v-else
                    >Limit Order Price
                    <form-input
                        type="number"
                        name="limit"
                        v-model="itemData.price"
                        placeholder="Limit Order Price"
                /></label>
            </div>
            <div class="modal-form__group">
                <label class="form__label"
                    >Share Quantity
                    <form-input
                        type="number"
                        name="quantity"
                        v-model="itemData.quantity"
                        placeholder="Quantity"
                /></label>
            </div>
            <div>
                <a class="primary" @click="switchOrder('LIMIT')" v-if="orderType === 'MARKET'"
                    >Switch to Limit Order</a
                >
                <a class="primary" @click="switchOrder('MARKET')" v-else>Switch to Market Order</a>
            </div>
            <div class="modal-form__buttons">
                <action-button
                    type="submit"
                    :pending="loading"
                    :classes="['btn-block', 'btn__primary']"
                    >Buy</action-button
                >
            </div>
        </form>
    </modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "buy-modal",
    props: {
        currency: {
            type: String,
            required: true
        },
        symbol: {
            type: String,
            required: true
        },
        instrument: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            itemData: {},
            loading: false,
            orderType: "MARKET"
        };
    },
    computed: {
        ...mapGetters(["getAccountSummary"])
    },
    methods: {
        ...mapActions(["GET_ACCOUNT_SUMMARY"]),
        closeModal() {
            this.$emit("close");
        },
        switchOrder(value) {
            this.orderType = value;
        },
        fundWallet() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                console.log(this.itemData);
            }, 3000);
        }
    },
    async mounted() {
        await this.GET_ACCOUNT_SUMMARY();
    }
};
</script>
