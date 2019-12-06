<template>
    <modal :close-on-click="false" @close="closeModal" class="modal__buy">
        <template slot="header">Buy {{ instrument.name }} stock</template>
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
            <div class="modal__buy--current">
                <p><small>CURRENT STOCK PRICE:</small></p>
                <p v-if="getSingleinstrument.length <= 0">-</p>
                <p v-else>
                    <span
                        class="cursor-context modal__buy--price"
                        :title="
                            getSingleinstrument[0].askPrice | currency(instrument.currency, true)
                        "
                        >{{ getSingleinstrument[0].askPrice | currency(instrument.currency) }}</span
                    >&nbsp;&nbsp;
                    <img
                        v-if="getSingleinstrument[0].derivedPrice >= 0"
                        :src="require('../../assets/img/green-arrow.svg')"
                        alt="Growth"
                    />
                    <img v-else :src="require('../../assets/img/red-arrow.svg')" alt="Growth" />
                    <span :class="[+getSingleinstrument[0].derivedPrice >= 0 ? 'green' : 'red']">
                        <small
                            >{{ +getSingleinstrument[0].derivedPrice >= 0 ? "+" : ""
                            }}{{ +getSingleinstrument[0].derivedPrice | units(2) }} ({{
                                +getSingleinstrument[0].derivedPricePercentage | units(2)
                            }}%)</small
                        ></span
                    >
                </p>
            </div>
            <div class="modal__buy--current">
                <p><small>AVAILABLE AMOUNT:</small></p>
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
        <div v-if="isBuyValid === 1" class="modal-form">
            <h5 class="text-center mb-2">Verification Incomplete</h5>
            <p class="text-center">
                To continue your verification, click the button below
            </p>
            <div class="text-center mt-3">
                <KYCButton
                    ref="buyBtn"
                    type="button"
                    :classes="['btn__primary']"
                    action="global"
                    @step="handleStep"
                    >Continue</KYCButton
                >
            </div>

            <modal @close="showKYC = false" v-if="showKYC">
                <template slot="header">{{ selectedField.title }}</template>
                <ModalKYC :requiredFields="selectedField.fields" @updated="handleUpdate" />
            </modal>
        </div>
        <div v-else-if="isBuyValid === 2" class="modal-form">
            <h5 class="text-center mb-2">Your Verification is Under Review</h5>
            <p class="text-center">
                You will be notified through email when your account gets activated for global
                transactions
            </p>
        </div>
        <template v-else>
            <form class="modal-form" @submit.prevent="validateBuy" v-if="!showTerms">
                <div class="modal-form__group">
                    <label class="form__label" v-if="orderType === 'MARKET'"
                        >Amount
                        <form-input
                            type="number"
                            name="amount"
                            v-model="itemData.amountCash"
                            placeholder="Amount"
                            :disabled="Object.keys(getMarketData).length <= 0"
                            @reset="clearErrors"
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
                        :disabled="Object.keys(getMarketData).length <= 0 || !isFormValid"
                        :classes="['btn-block', 'btn__primary']"
                        >Buy</action-button
                    >
                </div>
            </form>
            <template v-else>
                <form @submit.prevent="buyInstrument">
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
                                <h5>-{{ getPreOrder.fees | kobo | currency(currency) }}</h5>
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
                                >Confirm Buy</action-button
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
import KYCButton from "../form/KYCButton";
import ModalKYC from "../kyc/ModalKYC";
import KYCTitles from "../../services/kyc/kycTitles";
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
    components: {
        ModalKYC,
        KYCButton
    },
    data() {
        return {
            itemData: {},
            loading: false,
            showTerms: false,
            orderType: "MARKET",
            showResponse: false,
            isQuantity: true,
            errors: {},
            showSuccess: false,
            showKYC: false,
            selectedField: {},
            allNextKYC: KYCTitles.titles
        };
    },
    computed: {
        ...mapGetters([
            "getAccountSummary",
            "getSingleinstrument",
            "getMarketData",
            "getPreOrder",
            "getLoggedUser",
            "getNextKYC"
        ]),
        isBuyValid() {
            if (this.instrument.currency === "NGN") {
                if (this.getLoggedUser.localKycStatus === "NONE") return 1;
                else if (this.getLoggedUser.localKycStatus === "PENDING") return 2;
                return 3;
            }
            if (this.getLoggedUser.globalKycStatus === "NONE") return 1;
            else if (this.getLoggedUser.globalKycStatus === "PENDING") return 2;
            return 3;
        },
        isFormValid() {
            return Object.keys(this.errors).length <= 0;
        }
    },
    methods: {
        ...mapActions([
            "GET_ACCOUNT_SUMMARY",
            "BUY_INSTRUMENT",
            "GET_MARKET_DATA",
            "GET_PRE_ORDER",
            "GET_SINGLESTOCK_INSTRUMENT"
        ]),
        ...mapMutations([
            "SET_MARKET_DATA",
            "SET_SELL_ORDER",
            "SET_BUY_ORDER",
            "RESET_REQ",
            "SET_SINGLE_INSTRUMENT"
        ]),
        closeModal() {
            this.$emit("close");
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
            } else {
                if (!this.itemData.price) {
                    this.$set(this.errors, "price", "Limit price is required");
                } else if (Number.isNaN(+this.itemData.price)) {
                    this.$set(this.errors, "quantity", "Invalid quantity");
                }
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
        buyInstrument() {
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
        clearErrors() {
            this.errors = {};
        },
        handleStep(step) {
            if (step.kyc) {
                this.showKYC = true;
                this.allNextKYC.forEach(element => {
                    element.fields.forEach(el => {
                        if (el === this.getNextKYC.nextKYC[0]) {
                            this.selectedField = element;
                            this.selectedField.fields = this.getNextKYC.nextKYC;
                        }
                    });
                });
                return true;
            } else if (step.type === "global") {
                // this.showGlobal = true;
            }
        },
        handleUpdate() {
            this.showKYC = false;
            this.GET_LOGGED_USER().then(() => {
                if (this.isBuyValid === 1) {
                    this.$refs.buyBtn.$el.click();
                }
            });
            return true;
        }
    },
    async mounted() {
        this.RESET_REQ();
        this.SET_BUY_ORDER({});
        this.SET_SELL_ORDER({});
        this.GET_MARKET_DATA(this.symbol || this.instrument.symbol);
        this.GET_SINGLESTOCK_INSTRUMENT({ symbols: this.symbol|| this.instrument.symbol });
        await this.GET_ACCOUNT_SUMMARY();
    },
    beforeDestroy() {
        this.SET_MARKET_DATA({});
        this.SET_SINGLE_INSTRUMENT([]);
    }
};
</script>
