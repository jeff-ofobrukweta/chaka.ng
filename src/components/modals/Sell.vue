<template>
    <modal :close-on-click="false" @close="closeModal" class="modal__buy">
        <template slot="header">Sell {{ instrument.name }}</template>
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
                                    instrument.countryCode
                                        ? instrument.countryCode.toLowerCase()
                                        : 'zz'
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
                        :title="
                            instrument.InstrumentDynamic.askPrice
                                | currency(instrument.currency, true)
                        "
                        >{{
                            instrument.InstrumentDynamic.askPrice | currency(instrument.currency)
                        }}</span
                    >&nbsp;&nbsp;
                    <img
                        v-if="instrument.derivedPrice >= 0"
                        src="../../assets/img/watchlist-up.svg"
                        alt="Growth"
                    />
                    <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
                    <span :class="[+instrument.derivedPrice >= 0 ? 'green' : 'red']">
                        <span>{{ +instrument.derivedPrice >= 0 ? "+" : "" }}</span
                        >{{ +instrument.derivedPrice | units(2) }}
                        <small :class="[+instrument.derivedPricePercentage >= 0 ? 'green' : 'red']">
                            ({{ +instrument.derivedPricePercentage | units(2) }}%)</small
                        ></span
                    >
                </p>
            </div>
            <div>
                <p class="grey-cool"><small>AVAILABLE AMOUNT</small></p>
                <p
                    v-if="currency === 'NGN'"
                    class="cursor-context modal__buy--price"
                    :title="
                        getAccountSummary.localWallet.availableBalance
                            | kobo
                            | currency('NGN', true)
                    "
                >
                    {{ getAccountSummary.localWallet.availableBalance | kobo | currency("NGN") }}
                </p>
                <p
                    v-else
                    class="cursor-context modal__buy--price"
                    :title="
                        getAccountSummary.globalWallet.availableBalance
                            | kobo
                            | currency('USD', true)
                    "
                >
                    {{ getAccountSummary.globalWallet.availableBalance | kobo | currency("USD") }}
                </p>
            </div>
        </section>
        <div v-if="!isBuyValid" class="modal-form">
            <h5 class="text-center mb-2">Your Verification is Under Review</h5>
            <p class="text-center">
                You will be notified through email when your account gets activated for global
                transactions
            </p>
        </div>
        <template v-else>
            <form class="modal-form" @submit.prevent="validateSell" v-if="!showTerms">
                <div class="modal-form__group">
                    <label class="form__label" v-if="orderType === 'MARKET'"
                        >Amount
                        <form-input
                            type="number"
                            name="amount"
                            v-model="itemData.amountCash"
                            placeholder="Amount"
                            :disabled="Object.keys(getMarketData).length <= 0"
                            @focus="clearIssues"
                            @input="onTypeAmount"
                            :error-message="errors.amountCash"
                    /></label>
                    <label class="form__label" v-else
                        >Limit Order Price
                        <form-input
                            type="number"
                            name="limit"
                            v-model="itemData.price"
                            placeholder="Limit Order Price"
                            :disabled="Object.keys(getMarketData).length <= 0"
                            @focus="clearIssues"
                            :error-message="errors.price"
                    /></label>
                </div>
                <div class="modal-form__group">
                    <label class="form__label"
                        >Share Quantity
                        <form-input
                            type="number"
                            name="quantity"
                            v-model="itemData.quantity"
                            :disabled="Object.keys(getMarketData).length <= 0"
                            @focus="clearIssues"
                            @input="onTypeQuantity"
                            placeholder="Quantity"
                            :error-message="errors.quantity"
                    /></label>
                </div>
                <error-block type="pre-order" />
                <error-block type="market-data" />
                <div>
                    <a class="primary" @click="switchOrder('LIMIT')" v-if="orderType === 'MARKET'"
                        >Switch to Limit Order</a
                    >
                    <a class="primary" @click="switchOrder('MARKET')" v-else
                        >Switch to Market Order</a
                    >
                </div>
                <div class="modal-form__buttons">
                    <action-button
                        type="submit"
                        :pending="loading"
                        :disabled="Object.keys(getMarketData).length <= 0"
                        :classes="['btn-block', 'btn__primary']"
                        >Sell</action-button
                    >
                </div>
            </form>
            <template v-else>
                <form class="modal-form" @submit.prevent="sellInstrument">
                    <div class="stock-vdr">
                        <div class="stock-vdr__flex">
                            <div class="stock-vdr__box stock-vdr__right">
                                <p>
                                    {{ getPreOrder.marketData ? getPreOrder.marketData.ask : "-" }}
                                </p>
                                <p>
                                    <span>{{
                                        getPreOrder.marketData
                                            ? getPreOrder.marketData.bestAskExchange
                                            : "-"
                                    }}</span
                                    >--
                                    <span>{{
                                        getPreOrder.marketData
                                            ? getPreOrder.marketData.askSize
                                            : "-"
                                    }}</span>
                                </p>
                            </div>
                            <div class="stock-vdr__box">
                                <p>
                                    {{ getPreOrder.marketData ? getPreOrder.marketData.bid : "-" }}
                                </p>
                                <p>
                                    <span>{{
                                        getPreOrder.marketData
                                            ? getPreOrder.marketData.bidSize
                                            : "-"
                                    }}</span
                                    >--
                                    <span>{{
                                        getPreOrder.marketData
                                            ? getPreOrder.marketData.bestBidExchange
                                            : "-"
                                    }}</span>
                                </p>
                            </div>
                        </div>

                        <div class="stock-vdr__center stock-vdr__div">
                            <p>
                                {{ getPreOrder.marketData ? getPreOrder.marketData.volume : "0" }}
                            </p>
                        </div>
                        <div class="stock-vdr__flex">
                            <div class="stock-vdr__box">
                                <p>Last Trade</p>
                            </div>
                            <div class="stock-vdr__box stock-vdr__right">
                                <p>
                                    {{
                                        getPreOrder.marketData
                                            ? getPreOrder.marketData.timeOffset
                                            : "-" || "-" | date
                                    }}
                                </p>
                            </div>
                        </div>
                        <div class="stock-vdr__flex">
                            <div class="stock-vdr__box">
                                <p>
                                    {{
                                        getPreOrder.marketData
                                            ? getPreOrder.marketData.lastTrade
                                            : "-" || "-" | currency(currency)
                                    }}
                                </p>
                            </div>
                            <div class="stock-vdr__box stock-vdr__right">
                                <p>
                                    <span>{{
                                        getPreOrder.marketData
                                            ? getPreOrder.marketData.lastTradeExchange
                                            : "-"
                                    }}</span
                                    >--
                                    <span>{{
                                        getPreOrder.marketData
                                            ? getPreOrder.marketData.lastTradeSize
                                            : "-"
                                    }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="stock__price">
                        <div class="stock-vdr__flex">
                            <div class="stock-vdr__box">
                                <p>Quantity</p>
                            </div>
                            <div class="stock-vdr__box stock-vdr__right">
                                <h5>{{ getPreOrder.quantity | units }}</h5>
                            </div>
                        </div>
                        <div class="stock-vdr__flex">
                            <div class="stock-vdr__box">
                                <p>Investment</p>
                            </div>
                            <div class="stock-vdr__box stock-vdr__right">
                                <h5>{{ getPreOrder.investment | kobo | currency(currency) }}</h5>
                            </div>
                        </div>
                        <div class="stock-vdr__flex">
                            <div class="stock-vdr__box">
                                <p>Fees</p>
                            </div>
                            <div class="stock-vdr__box stock-vdr__right">
                                <h5>{{ getPreOrder.fees | kobo | currency(currency) }}</h5>
                            </div>
                        </div>
                        <hr />
                        <div class="stock-vdr__flex">
                            <div class="stock-vdr__box">
                                <p>Estimated Total</p>
                            </div>
                            <div class="stock-vdr__box stock-vdr__right">
                                <h5>
                                    {{ getPreOrder.estimatedTotal | kobo | currency(currency) }}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <error-block type="buy" />
                    <div class="form-group">
                        <div class="stock-vdr__buttons">
                            <button
                                class="btn btn-block btn__primary--outline"
                                type="button"
                                @click.stop="showTerms = false"
                            >
                                Back
                            </button>
                            <action-button
                                type="submit"
                                :pending="loading"
                                :classes="['btn-block', 'btn__primary']"
                                >Confirm Sell</action-button
                            >
                        </div>
                    </div>
                </form>
            </template>
        </template>
    </modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
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
            showTerms: false,
            orderType: "MARKET",
            showResponse: false,
            isQuantity: true,
            errors: {}
        };
    },
    computed: {
        ...mapGetters(["getAccountSummary", "getMarketData", "getPreOrder", "getLoggedUser"]),
        isBuyValid() {
            if (this.instrument.currency === "NGN")
                return this.getLoggedUser.localKycStatus === "COMPLETE";
            return this.getLoggedUser.globalKycStatus === "COMPLETE";
        }
    },
    methods: {
        ...mapActions([
            "GET_ACCOUNT_SUMMARY",
            "SELL_INSTRUMENT",
            "GET_MARKET_DATA",
            "GET_PRE_ORDER"
        ]),
        ...mapMutations(["SET_MARKET_DATA", "SET_SELL_ORDER", "SET_BUY_ORDER"]),
        closeModal() {
            this.$emit("close");
        },
        switchOrder(value) {
            this.orderType = value;
        },
        validateSell() {
            if (Object.keys(this.itemData).length < 2) {
                return false;
            }
            const { isQuantity } = this;
            const payload = {
                currency: this.currency,
                instrumentSymbol: this.symbol,
                orderSide: "SELL",
                orderType: this.orderType
            };
            if (this.orderType === "LIMIT") {
                payload.price = this.itemData.price * 100;
                payload.quantity = this.itemData.quantity;
            } else {
                payload.amountCash = this.itemData.amountCash * 100;
            }
            this.loading = true;
            this.GET_PRE_ORDER(payload).then(resp => {
                this.loading = false;
                if (resp) {
                    this.itemData.instrumentSymbol = this.symbol;
                    this.itemData.currency = this.currency;
                    this.itemData.orderType = this.orderType;
                    this.showTerms = true;
                    this.isQuantity = isQuantity;
                    return true;
                }
                return false;
            });
        },
        sellInstrument() {
            let value = {};
            if (this.orderType === "MARKET") {
                if (this.isQuantity) {
                    const { price, amountCash, ...newTemp } = this.itemData;
                    value = newTemp;
                } else {
                    const { price, quantity, ...newTemp } = this.itemData;
                    newTemp.amountCash *= 100;
                    value = newTemp;
                }
            } else {
                const { amountCash, ...newTemp } = this.itemData;
                newTemp.price *= 100;
                value = newTemp;
            }
            this.loading = true;
            this.SELL_INSTRUMENT(value).then(resp => {
                this.loading = false;
                if (resp) {
                    /**
                     * close buy modal
                     * show success modal
                     */
                    this.$emit("close", true);
                }
            });
        },
        onTypeQuantity(e) {
            this.itemData.quantity = e;
            if (Object.keys(this.getMarketData).length > 0) {
                this.isQuantity = true;
                if (e) {
                    if (this.currency === "NGN" && this.orderType === "MARKET") {
                        this.itemData.amountCash = e * this.getMarketData.dayMax;
                    } else {
                        this.itemData.amountCash = e * this.getMarketData.ask;
                    }
                } else this.itemData.amountCash = 0;
            }
        },
        onTypeAmount(e) {
            this.itemData.amountCash = e;
            if (Object.keys(this.getMarketData).length > 0) {
                this.isQuantity = false;
                if (this.currency === "NGN" && this.orderType === "MARKET") {
                    this.itemData.quantity = +e / +this.getMarketData.dayMax;
                } else {
                    this.itemData.quantity = +e / +this.getMarketData.ask;
                }
            }
        },
        clearIssues() {
            this.errors = {};
        }
    },
    async mounted() {
        this.SET_BUY_ORDER({});
        this.SET_SELL_ORDER({});
        this.GET_MARKET_DATA(this.symbol);
        await this.GET_ACCOUNT_SUMMARY();
    },
    beforeDestroy() {
        this.SET_MARKET_DATA({});
    }
};
</script>
