<template>
    <modal-kyc @updated="handleUpdate" @close="showKYC = false" v-if="showKYC" />
    <modal @close="closeModal" v-else-if="isSellValid === 'PENDING'">
        <template slot="header">Final Step</template>
        <div>
            <div class="kyc-modal">
                <div class="text-center mb-3">
                    <p class="kyc-modal__small">
                        You have completed your submissions and your verification is processing. You
                        can now fund your wallet.
                    </p>
                    <br />
                    <h5 class="grey-cool">Most Popular Today</h5>
                    <div class="kyc-modal__popular">
                        <div class="kyc-modal__popular--div">
                            <div>
                                <img
                                    src="../../assets/img/dp.png"
                                    class="kyc-modal__popular--logo"
                                    alt=""
                                />
                            </div>
                            <h5>Netflix</h5>
                            <div>
                                <img
                                    src="../../assets/img/flags/us-flag.svg"
                                    class="kyc-modal__popular--flag"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="kyc-modal__popular--div">
                            <div>
                                <img
                                    src="../../assets/img/dp.png"
                                    class="kyc-modal__popular--logo"
                                    alt=""
                                />
                            </div>
                            <h5>Netflix</h5>
                            <div>
                                <img
                                    src="../../assets/img/flags/us-flag.svg"
                                    class="kyc-modal__popular--flag"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                    </div>
                </div>
            </div>
        </div>
    </modal>
    <modal @close="closeModal" v-else-if="isSellValid === 2">
        <template v-if="instrument.currency === 'NGN'">
            <template slot="header">Processing Local Verification</template>
            <div>
                <div class="kyc-modal">
                    <div class="text-center mb-3">
                        <div class="mb-3">
                            <svg
                                width="150"
                                height="152"
                                viewBox="0 0 150 152"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M148.5 75.5744C148.5 116.495 115.582 149.649 75 149.649C34.4178 149.649 1.5 116.495 1.5 75.5744C1.5 34.6534 34.4178 1.5 75 1.5C115.582 1.5 148.5 34.6534 148.5 75.5744Z"
                                    stroke="#3DB39E"
                                    stroke-width="3"
                                />
                                <path
                                    d="M125.003 77.1215C104.521 101.604 68.4861 70.3457 48.6757 97.1905L47.5378 93.156V93.1388C43.5895 79.0181 39.6412 64.8916 35.693 50.7595C35.3136 49.4146 34.9516 48.0698 34.5723 46.725C54.3826 19.8801 90.4343 51.1388 110.9 26.656C111.9 25.4491 112.848 25.9664 112.641 27.725C112.538 28.5526 112.417 29.3801 112.314 30.1905C111.124 38.8112 109.676 46.4664 108.021 53.3974C107.555 55.3457 107.089 57.225 106.59 59.0698C106.558 59.2004 106.535 59.3328 106.521 59.4664C106.502 59.9496 106.698 60.4164 107.055 60.7422C112.19 65.4008 117.876 69.4134 123.986 72.6905C124.469 72.9319 124.934 73.156 125.4 73.3629C126.193 73.7077 126.003 75.9146 125.003 77.1215V77.1215Z"
                                    fill="#E64C3C"
                                />
                                <path
                                    d="M125.002 77.1215C104.519 101.604 68.4849 70.3457 48.6745 97.1905C48.2952 95.8457 45.3125 95.6905 44.9332 94.3457V94.3284C40.9849 80.2077 37.0366 66.0813 33.0883 51.9491C32.709 50.6043 34.9504 48.0698 34.5711 46.725C54.3814 19.8801 90.4332 51.1388 110.899 26.656C111.899 25.4491 112.847 25.9664 112.64 27.725C112.537 28.5526 112.416 29.3801 112.312 30.1905C111.123 38.8112 109.675 46.4664 108.019 53.3974C107.554 55.3457 107.088 57.225 106.588 59.0698C106.557 59.2004 106.534 59.3328 106.519 59.4664C106.501 59.9496 106.697 60.4164 107.054 60.7422C112.189 65.4008 117.875 69.4134 123.985 72.6905C124.468 72.9319 124.933 73.156 125.399 73.3629C126.192 73.7077 126.002 75.9146 125.002 77.1215V77.1215Z"
                                    fill="#3DB39E"
                                />
                                <path
                                    d="M29.0077 43.2376L29.2457 43.1711C30.3085 42.8742 31.4458 43.0117 32.4073 43.5533C33.3688 44.0949 34.0758 44.9963 34.3727 46.0592L55.4116 121.377C55.9062 123.147 54.8717 124.984 53.101 125.478L51.26 125.993C49.4893 126.487 47.6529 125.453 47.1583 123.682L26.1195 48.3646C25.5012 46.1513 26.7943 43.8559 29.0076 43.2376L29.0077 43.2376Z"
                                    fill="#CF976A"
                                />
                            </svg>
                        </div>
                        <p class="kyc-modal__small">
                            Your profile is being verified for local trading. You can now fund your
                            Naira or Dollar wallet.
                        </p>
                        <br />
                        <div>
                            <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                        </div>
                        <div class="mt-2" v-if="getLoggedUser.globalKycStatus === 'NONE'">
                            <small>
                                <kyc-button
                                    ref="sellBtn"
                                    :classes="['underline']"
                                    tag="a"
                                    action="global"
                                    @step="handleStep"
                                    >Continue Global Verification</kyc-button
                                ></small
                            >
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <template slot="header">Processing Global Verification</template>
            <div>
                <div class="kyc-modal">
                    <div class="text-center mb-3">
                        <div class="mb-3">
                            <svg
                                width="150"
                                height="152"
                                viewBox="0 0 150 152"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M148.5 75.5744C148.5 116.495 115.582 149.649 75 149.649C34.4178 149.649 1.5 116.495 1.5 75.5744C1.5 34.6534 34.4178 1.5 75 1.5C115.582 1.5 148.5 34.6534 148.5 75.5744Z"
                                    stroke="#3DB39E"
                                    stroke-width="3"
                                />
                                <path
                                    d="M125.003 77.1215C104.521 101.604 68.4861 70.3457 48.6757 97.1905L47.5378 93.156V93.1388C43.5895 79.0181 39.6412 64.8916 35.693 50.7595C35.3136 49.4146 34.9516 48.0698 34.5723 46.725C54.3826 19.8801 90.4343 51.1388 110.9 26.656C111.9 25.4491 112.848 25.9664 112.641 27.725C112.538 28.5526 112.417 29.3801 112.314 30.1905C111.124 38.8112 109.676 46.4664 108.021 53.3974C107.555 55.3457 107.089 57.225 106.59 59.0698C106.558 59.2004 106.535 59.3328 106.521 59.4664C106.502 59.9496 106.698 60.4164 107.055 60.7422C112.19 65.4008 117.876 69.4134 123.986 72.6905C124.469 72.9319 124.934 73.156 125.4 73.3629C126.193 73.7077 126.003 75.9146 125.003 77.1215V77.1215Z"
                                    fill="#E64C3C"
                                />
                                <path
                                    d="M125.002 77.1215C104.519 101.604 68.4849 70.3457 48.6745 97.1905C48.2952 95.8457 45.3125 95.6905 44.9332 94.3457V94.3284C40.9849 80.2077 37.0366 66.0813 33.0883 51.9491C32.709 50.6043 34.9504 48.0698 34.5711 46.725C54.3814 19.8801 90.4332 51.1388 110.899 26.656C111.899 25.4491 112.847 25.9664 112.64 27.725C112.537 28.5526 112.416 29.3801 112.312 30.1905C111.123 38.8112 109.675 46.4664 108.019 53.3974C107.554 55.3457 107.088 57.225 106.588 59.0698C106.557 59.2004 106.534 59.3328 106.519 59.4664C106.501 59.9496 106.697 60.4164 107.054 60.7422C112.189 65.4008 117.875 69.4134 123.985 72.6905C124.468 72.9319 124.933 73.156 125.399 73.3629C126.192 73.7077 126.002 75.9146 125.002 77.1215V77.1215Z"
                                    fill="#3DB39E"
                                />
                                <path
                                    d="M29.0077 43.2376L29.2457 43.1711C30.3085 42.8742 31.4458 43.0117 32.4073 43.5533C33.3688 44.0949 34.0758 44.9963 34.3727 46.0592L55.4116 121.377C55.9062 123.147 54.8717 124.984 53.101 125.478L51.26 125.993C49.4893 126.487 47.6529 125.453 47.1583 123.682L26.1195 48.3646C25.5012 46.1513 26.7943 43.8559 29.0076 43.2376L29.0077 43.2376Z"
                                    fill="#CF976A"
                                />
                            </svg>
                        </div>
                        <p class="kyc-modal__small">
                            Your profile is being verified for global trading. You can now fund your
                            Naira or Dollar wallet.
                        </p>
                        <br />
                        <div>
                            <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                        </div>
                        <div class="mt-2" v-if="getLoggedUser.localKycStatus === 'NONE'">
                            <small>
                                <kyc-button
                                    ref="sellBtn"
                                    type="button"
                                    :classes="['underline']"
                                    tag="a"
                                    action="local"
                                    @step="handleStep"
                                    >Continue Global Verification</kyc-button
                                ></small
                            >
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </modal>
    <modal :close-on-click="false" @close="closeModal" v-else class="modal__buy">
        <template slot="header">Sell {{ instrument.name }} stock</template>
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
            <template v-if="!showTerms">
                <div class="modal__buy--current">
                    <p><small>CURRENT STOCK PRICE:</small></p>
                    <p v-if="getSingleinstrument.length <= 0">-</p>
                    <p v-else>
                        <span
                            class="cursor-context modal__buy--price"
                            :title="
                                getSingleinstrument[0].askPrice
                                    | currency(instrument.currency, true)
                            "
                            >{{
                                getSingleinstrument[0].askPrice | currency(instrument.currency)
                            }}</span
                        >&nbsp;&nbsp;
                        <img
                            v-if="getSingleinstrument[0].derivedPrice >= 0"
                            :src="require('../../assets/img/green-arrow.svg')"
                            alt="Growth"
                        />
                        <img v-else :src="require('../../assets/img/red-arrow.svg')" alt="Growth" />
                        <span
                            :class="[+getSingleinstrument[0].derivedPrice >= 0 ? 'green' : 'red']"
                        >
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
                    <p><small>AVAILABLE QUANTITY:</small></p>
                    <p
                        class="cursor-context modal__buy--price"
                        :title="maxQuantity | units(2, true)"
                    >
                        {{ maxQuantity | units }} Units
                    </p>
                </div>
            </template>
        </section>
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
                <a class="primary" @click="switchOrder('MARKET')" v-else>Switch to Market Order</a>
            </div>
            <div class="modal-form__buttons">
                <action-button
                    type="submit"
                    :pending="loading"
                    :disabled="Object.keys(getMarketData).length <= 0 || !isFormValid"
                    :classes="['btn-block', 'btn__primary']"
                    >Sell</action-button
                >
            </div>
        </form>
        <template v-else>
            <form @submit.prevent="sellInstrument">
                <div class="stock-vdr">
                    <div class="stock-vdr__flex">
                        <div class="stock-vdr__box stock-vdr__right">
                            <p>
                                {{ getPreOrder.marketData ? getPreOrder.marketData.bid : "-" }}
                            </p>
                            <p>
                                <span>{{
                                    getPreOrder.marketData
                                        ? getPreOrder.marketData.bestAskExchange
                                        : "-"
                                }}</span
                                >--
                                <span>{{
                                    getPreOrder.marketData ? getPreOrder.marketData.bidSize : "-"
                                }}</span>
                            </p>
                        </div>
                        <div class="stock-vdr__box">
                            <p>
                                {{ getPreOrder.marketData ? getPreOrder.marketData.bid : "-" }}
                            </p>
                            <p>
                                <span>{{
                                    getPreOrder.marketData ? getPreOrder.marketData.bidSize : "-"
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
                <error-block type="sell" />
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
    </modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import KYCTitles from "../../services/kyc/kycTitles";

export default {
    name: "sell-modal",
    props: {
        currency: {
            type: String,
            required: true
        },
        instrument: {
            type: Object,
            required: true
        },
        maxQuantity: {
            type: Number,
            required: true
        },
        stockPage: {
            type: Boolean
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
            errors: {},
            showKYC: false,
            selectedField: {},
            allNextKYC: KYCTitles.titles
        };
    },
    computed: {
        ...mapGetters([
            "getAccountSummary",
            "getMarketData",
            "getPreOrder",
            "getLoggedUser",
            "getNextKYC",
            "getSingleinstrument",
            "getglobalstocksowned",
            "getlocalstocksowned"
        ]),
        isSellValid() {
            if (
                this.getLoggedUser.localKycStatus === "PENDING" &&
                this.getLoggedUser.globalKycStatus === "PENDING"
            )
                return "PENDING";
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
        }
    },
    methods: {
        ...mapActions([
            "GET_ACCOUNT_SUMMARY",
            "SELL_INSTRUMENT",
            "GET_SINGLESTOCK_INSTRUMENT",
            "GET_MARKET_DATA",
            "GET_PRE_ORDER"
        ]),
        ...mapMutations([
            "SET_MARKET_DATA",
            "SET_SELL_ORDER",
            "SET_BUY_ORDER",
            "RESET_REQ",
            "SET_SINGLE_INSTRUMENT",
            "SET_FUND_MODAL"
        ]),
        closeModal() {
            if (!this.stockPage) this.SET_SINGLE_INSTRUMENT([]);
            this.$emit("close");
        },
        switchOrder(value) {
            this.orderType = value;
            this.clearErrors();
        },
        validateSell() {
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
                orderSide: "SELL",
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
        sellInstrument() {
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
            this.SELL_INSTRUMENT(value).then(resp => {
                this.loading = false;
                if (resp) {
                    /**
                     * close buy modal
                     * show success modal
                     */
                    if (!this.stockPage) this.SET_SINGLE_INSTRUMENT([]);
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
                        this.itemData.amountCash = e * this.getMarketData.bid;
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
                    this.itemData.quantity = +e / +this.getMarketData.bid;
                }
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
                if (this.isSellValid !== 1) {
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
        this.GET_MARKET_DATA(this.symbol);
        this.GET_SINGLESTOCK_INSTRUMENT({ symbols: this.symbol });
        await this.GET_ACCOUNT_SUMMARY();
    },
    beforeDestroy() {
        this.SET_MARKET_DATA({});
    }
};
</script>
