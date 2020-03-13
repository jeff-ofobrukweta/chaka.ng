<template>
    <modal-kyc @updated="handleUpdate" @close="showKYC = false" v-if="showKYC" />

    <modal @close="closeModal" v-else-if="isBuyValid !== 3">
        <template slot="header">{{ modalTitle }}</template>
        <PendingKYC @close="closeModal" :is-buy-valid="isBuyValid" :instrument="instrument" @step="handleStep" />
    </modal>
    <modal v-else :close-on-click="false" @close="closeModal" class="modal__buy">
        <template slot="header">Buy {{ instrument.name }} stock</template>
        <section class="modal__buy--details">
            <div class="modal__buy-left">
                <div class="modal__buy--image">
                    <img class="modal__buy--img" :src="instrument.logoUrl" :alt="symbol" />
                </div>
                <div class="modal__buy--symbol">
                    <p>{{ instrument.symbol }}</p>
                    <p>
                        <img
                            :src="
                                `https://chaka-storage.s3-eu-west-1.amazonaws.com/images/ui/flags/${instrument.countryCode ? instrument.countryCode.toLowerCase() : 'zz'}-flag.svg`
                            "
                            class="watchlist-explore__symbol"
                            alt="US"
                            width="24px"
                        />
                    </p>
                </div>
            </div>
            <template v-if="!showTerms">
                <div class="modal__buy--current">
                    <p><small>CURRENT STOCK PRICE:</small></p>
                    <p v-if="Object.keys(instrument).length <= 0">-</p>
                    <p v-else>
                        <span class="cursor-context modal__buy--price">{{ getMarketData.ask | currency(currency, true) }}</span
                        >&nbsp;&nbsp;
                        <img v-if="instrument.derivedPrice >= 0" :src="require('../../assets/img/green-arrow.svg')" alt="Growth" />
                        <img v-else :src="require('../../assets/img/red-arrow.svg')" alt="Growth" />
                        <span :class="[+instrument.derivedPrice >= 0 ? 'green' : 'red']">
                            <small
                                >{{ +instrument.derivedPrice >= 0 ? "+" : "" }}{{ +instrument.derivedPrice | units(2) }} ({{
                                    +instrument.derivedPricePercentage | units(2)
                                }}%)</small
                            ></span
                        >
                        <span v-if="marketDataLoading"><img src="../../assets/img/loader.gif" class="loader__small--inline" alt="Loader"/></span>
                    </p>
                </div>
                <div class="modal__buy--current">
                    <p><small>AVAILABLE AMOUNT:</small></p>
                    <p v-if="currency === 'NGN'" class="cursor-context modal__buy--price" :title="getAccountSummary.localAvailableToTrade | kobo | currency('NGN', true)">
                        {{ getAccountSummary.localAvailableToTrade | kobo | currency("NGN") }}
                    </p>
                    <p v-else class="cursor-context modal__buy--price" :title="getAccountSummary.globalAvailableToTrade | kobo | currency('USD', true)">
                        {{ getAccountSummary.globalAvailableToTrade | kobo | currency("USD") }}
                    </p>
                </div>
            </template>
        </section>
        <form class="modal-form" @submit.prevent="validateBuy" v-if="!showTerms">
            <template v-if="orderType === 'MARKET'">
                <div class="modal__buy-round" v-if="currency === 'USD'">
                    <a
                        class="modal__buy-round--button"
                        :class="{ active: amount === itemData.amountCash }"
                        @click="switchValue(amount)"
                        v-for="amount in dollarButtons"
                        :key="amount"
                        >${{ amount }}</a
                    >
                </div>
                <div class="modal__buy-round" v-else>
                    <a
                        class="modal__buy-round--button"
                        :class="{ active: amount === itemData.amountCash }"
                        @click="switchValue(amount)"
                        v-for="amount in nairaButtons"
                        :key="amount"
                        >&#8358;{{ amount }}</a
                    >
                </div>
            </template>
            <div class="modal-form__group">
                <label class="form__label" v-if="orderType === 'MARKET'"
                    >Amount
                    <currency-input
                        :currency="currency"
                        placeholder="Enter Amount"
                        v-model="itemData.amountCash"
                        :disabled="Object.keys(getMarketData).length <= 0"
                        @reset="clearErrors"
                        @input="onTypeAmount"
                        :error-message="errors.amountCash"
                    />
                </label>
                <label class="form__label" v-else
                    >Limit Order Price
                    <currency-input
                        :currency="currency"
                        placeholder="Enter Limit Order Price"
                        v-model="itemData.price"
                        :disabled="Object.keys(getMarketData).length <= 0"
                        @reset="clearErrors"
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
                        @reset="clearErrors"
                        @input="onTypeQuantity"
                        placeholder="Quantity"
                        :error-message="errors.quantity"
                /></label>
            </div>
            <error-block type="pre-order" />
            <error-block type="market-data" />
            <div>
                <a class="primary" @click="switchOrder('LIMIT')" v-if="orderType === 'MARKET'">Switch to Limit Order</a>
                <a class="primary" @click="switchOrder('MARKET')" v-else>Switch to Market Order</a>
            </div>
            <div class="modal-form__buttons">
                <action-button type="submit" :pending="loading" :disabled="Object.keys(getMarketData).length <= 0 || !isFormValid" :classes="['btn-block', 'btn__primary']"
                    >Buy</action-button
                >
            </div>
        </form>
        <template v-else>
            <form @submit.prevent="buyInstrument">
                <div class="stock-vdr" v-if="currency === 'USD'">
                    <div class="stock-vdr__flex">
                        <div class="stock-vdr__box stock-vdr__right">
                            <p>
                                {{ getPreOrder.marketData ? getPreOrder.marketData.ask : "-" }}
                            </p>
                            <p>
                                <span>{{ getPreOrder.marketData ? getPreOrder.marketData.bestAskExchange : "-" }}</span
                                >--
                                <span>{{ getPreOrder.marketData ? getPreOrder.marketData.askSize : "-" }}</span>
                            </p>
                        </div>
                        <div class="stock-vdr__box">
                            <p>
                                {{ getPreOrder.marketData ? getPreOrder.marketData.bid : "-" }}
                            </p>
                            <p>
                                <span>{{ getPreOrder.marketData ? getPreOrder.marketData.bidSize : "-" }}</span
                                >--
                                <span>{{ getPreOrder.marketData ? getPreOrder.marketData.bestBidExchange : "-" }}</span>
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
                                {{ getPreOrder.marketData ? getPreOrder.marketData.timeOffset : "-" || "-" | date }}
                            </p>
                        </div>
                    </div>
                    <div class="stock-vdr__flex">
                        <div class="stock-vdr__box">
                            <p>
                                {{ getPreOrder.marketData ? getPreOrder.marketData.lastTrade : "-" || "-" | currency(currency) }}
                            </p>
                        </div>
                        <div class="stock-vdr__box stock-vdr__right">
                            <p>
                                <span>{{ getPreOrder.marketData ? getPreOrder.marketData.lastTradeExchange : "-" }}</span
                                >--
                                <span>{{ getPreOrder.marketData ? getPreOrder.marketData.lastTradeSize : "-" }}</span>
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
                            <h5>{{ getPreOrder.quantity | units(2, true) }}</h5>
                        </div>
                    </div>
                    <div class="stock-vdr__flex">
                        <div class="stock-vdr__box">
                            <p>Investment</p>
                        </div>
                        <div class="stock-vdr__box stock-vdr__right">
                            <h5>{{ getPreOrder.investment | kobo | currency(currency, true) }}</h5>
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
                                {{ getPreOrder.estimatedTotal | kobo | currency(currency, true) }}
                            </h5>
                        </div>
                    </div>
                </div>
                <error-block type="buy" />
                <div class="form-group">
                    <div class="stock-vdr__buttons">
                        <button class="btn btn-block btn__primary--outline" type="button" @click.stop="showTerms = false">
                            Back
                        </button>
                        <action-button type="submit" :pending="loading" :classes="['btn-block', 'btn__primary']">Confirm Buy</action-button>
                    </div>
                </div>
                <div class="form-info text-center" v-if="getPreOrder.goodFaithViolation">
                    <small>There's been a Good Faith Violation on your trading account. Please check your email to learn more.</small>
                </div>
            </form>
        </template>
    </modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import KYCTitles from "../../services/kyc/kycTitles";
import CurrencyInput from "../form/CurrencyInput";

export default {
    name: "buy-modal",
    components: {
        CurrencyInput,
        PendingKYC: () => import("./PendingKYC")
    },
    data() {
        return {
            itemData: {},
            loading: false,
            marketDataLoading: false,
            showTerms: false,
            orderType: "MARKET",
            showResponse: false,
            isQuantity: true,
            errors: {},
            showKYC: false,
            selectedField: {},
            allNextKYC: KYCTitles.titles,
            dollarButtons: [10, 20, 30, 50, 100],
            nairaButtons: [1000, 2000, 5000, 10000, 50000]
        };
    },
    computed: {
        ...mapGetters(["getBuyModal", "getAccountSummary", "getMarketData", "getPreOrder", "getLoggedUser", "getNextKYC"]),
        isBuyValid() {
            if (this.instrument.currency === "NGN") {
                if (this.getLoggedUser.localKycStatus === "NONE") return 1;
                if (this.getLoggedUser.localKycStatus === "PENDING") return 2;
                return 3;
            }
            if (this.getLoggedUser.globalKycStatus === "NONE") return 1;
            if (this.getLoggedUser.globalKycStatus === "PENDING") return 2;
            return 3;
        },
        isFormValid() {
            return Object.keys(this.errors).length <= 0;
        },
        symbol() {
            return this.instrument.symbol;
        },
        currency() {
            return this.getBuyModal.currency || this.instrument.currency;
        },
        instrument() {
            return this.getBuyModal.instrument;
        },
        stockPage() {
            return this.getBuyModal.stockPage;
        },
        modalTitle() {
            if (this.currency === "NGN") return "Processing Local Verification";
            return "Processing Global Verification";
        }
    },
    methods: {
        ...mapActions(["GET_ACCOUNT_SUMMARY", "BUY_INSTRUMENT", "GET_MARKET_DATA", "GET_PRE_ORDER"]),
        ...mapMutations(["SET_MARKET_DATA", "SET_SELL_ORDER", "SET_BUY_ORDER", "RESET_REQ", "SET_FUND_MODAL"]),
        closeModal(action) {
            this.$emit("close", action);
        },
        switchOrder(value) {
            this.orderType = value;
            this.clearErrors();
        },
        validateBuy() {
            this.RESET_REQ();
            if (this.orderType === "MARKET") {
                if (!this.itemData.amountCash) {
                    this.$set(this.errors, "amountCash", "Amount is required");
                } else if (Number.isNaN(+this.itemData.amountCash)) {
                    this.$set(this.errors, "quantity", "Invalid quantity");
                }
            } else if (!this.itemData.price) {
                this.$set(this.errors, "price", "Limit price is required");
            } else if (Number.isNaN(+this.itemData.price)) {
                this.$set(this.errors, "quantity", "Invalid quantity");
            }
            if (!this.itemData.quantity) {
                this.$set(this.errors, "quantity", "Quantity is required");
            } else if (Number.isNaN(+this.itemData.quantity)) {
                this.$set(this.errors, "quantity", "Invalid quantity");
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            const { isQuantity } = this;
            const payload = {
                currency: this.currency,
                instrumentSymbol: this.symbol,
                orderSide: "BUY",
                orderType: this.orderType
            };
            if (this.orderType === "LIMIT") {
                payload.price = +this.itemData.price * 100;
                payload.quantity = +this.itemData.quantity;
            } else {
                payload.amountCash = +this.itemData.amountCash * 100;
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
        buyInstrument() {
            let value = {};
            if (this.orderType === "MARKET") {
                if (this.isQuantity) {
                    const { price, amountCash, ...newTemp } = this.itemData;
                    newTemp.quantity = +newTemp.quantity;
                    value = newTemp;
                } else {
                    const { price, quantity, ...newTemp } = this.itemData;
                    newTemp.amountCash *= 100;
                    value = newTemp;
                }
            } else {
                const { amountCash, ...newTemp } = this.itemData;
                newTemp.price *= 100;
                newTemp.quantity = +newTemp.quantity;
                value = newTemp;
            }
            this.loading = true;
            this.BUY_INSTRUMENT(value).then(resp => {
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
            this.itemData.quantity = +e;
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
            this.$set(this.itemData, "amountCash", +e);
            if (Object.keys(this.getMarketData).length > 0) {
                this.isQuantity = false;
                if (this.currency === "NGN" && this.orderType === "MARKET") {
                    this.itemData.quantity = +e / +this.getMarketData.dayMax;
                } else {
                    this.itemData.quantity = +e / +this.getMarketData.ask;
                }
            }
        },
        switchValue(amount) {
            if (!this.marketDataLoading) {
                this.onTypeAmount(amount);
            }
        },
        clearErrors() {
            this.errors = {};
        },
        handleStep(step) {
            this.step = step;
            if (step.kyc) {
                this.showKYC = true;
                return true;
            }
        },
        handleUpdate() {
            this.GET_LOGGED_USER().then(() => {
                if (this.isBuyValid !== 1) {
                    this.showKYC = false;
                }
            });
            return true;
        },
        showFund() {
            this.SET_FUND_MODAL(true);
            this.$emit("close");
        }
    },
    async mounted() {
        this.RESET_REQ();
        this.SET_BUY_ORDER({});
        this.SET_SELL_ORDER({});
        if (this.isBuyValid === 3) {
            this.marketDataLoading = true;
            await this.GET_MARKET_DATA(this.symbol);
            this.marketDataLoading = false;
            await this.GET_ACCOUNT_SUMMARY();
        }
    },
    beforeDestroy() {
        this.SET_MARKET_DATA({});
    }
};
</script>
