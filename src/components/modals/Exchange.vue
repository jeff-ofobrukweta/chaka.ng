<template>
    <modal-kyc @updated="handleUpdate" @close="showKYC = false" v-if="showKYC" />
    <modal @close="closeModal" v-else-if="exchangeStatus === 'PENDING'">
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
    <modal @close="closeModal" v-else-if="exchangeStatus === 2">
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
                                    ref="buyBtn"
                                    type="button"
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
                                    ref="buyBtn"
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
    <modal :close-on-click="false" @close="closeModal" v-else>
        <template slot="header">Funds Exchange</template>
        <div class="modal__exchange">
            <div class="modal__exchange--currency">
                <h4>Local</h4>
                <hr />
                <div class="modal__exchange--money">
                    <div>
                        <h4
                            class="cursor-context"
                            :title="
                                getAccountSummary.localAvailableToTrade
                                    | kobo
                                    | currency('NGN', true)
                            "
                        >
                            {{
                                getAccountSummary.localAvailableToTrade ||
                                    "-" | kobo | currency("NGN")
                            }}
                        </h4>
                        <p><small>Available To Trade</small></p>
                    </div>
                    <div>
                        <h4
                            class="cursor-context"
                            :title="
                                getAccountSummary.localAvailableToWithdraw
                                    | kobo
                                    | currency('NGN', true)
                            "
                        >
                            {{
                                getAccountSummary.localAvailableToWithdraw ||
                                    "-" | kobo | currency("NGN")
                            }}
                        </h4>
                        <p><small>Available To Withdraw</small></p>
                    </div>
                </div>
            </div>
            <div class="modal__exchange--currency">
                <h4>Global</h4>
                <hr />
                <div class="modal__exchange--money">
                    <div>
                        <h4
                            class="cursor-context"
                            :title="
                                getAccountSummary.globalAvailableToTrade
                                    | kobo
                                    | currency('USD', true)
                            "
                        >
                            {{
                                getAccountSummary.globalAvailableToTrade ||
                                    "-" | kobo | currency("USD")
                            }}
                        </h4>
                        <p><small>Available To Trade</small></p>
                    </div>
                    <div>
                        <h4
                            class="cursor-context"
                            :title="
                                getAccountSummary.globalAvailableToWithdraw
                                    | kobo
                                    | currency('USD', true)
                            "
                        >
                            {{
                                getAccountSummary.globalAvailableToWithdraw ||
                                    "-" | kobo | currency("USD")
                            }}
                        </h4>
                        <p><small>Available To Withdraw</small></p>
                    </div>
                </div>
            </div>
        </div>
        <form class="modal-form" @submit.prevent="exchangeWallet">
            <div class="modal-form__group">
                <label class="form__label"
                    >Amount<currency-input
                        :currency="itemData.currency"
                        placeholder="Enter Amount"
                        v-model="itemData.amount"
                        :error-message="errors.amount"
                            @reset="handleReset"
                /></label>
            </div>
            <error-block type="exchange" />
            <br />

            <section>
                <p class="grey-cool">
                    If you exchange before 2.00pm, your exchange will be processed today. After
                    2.00pm, it will be processed in up to 1 business day.
                </p>
                <br />
                <p>
                    <small class="grey-dark"
                        >EXCHANGE RATE:&nbsp;
                        <span v-if="itemData.currency === 'NGN'"
                            >₦{{ getExchangeRate.sell }} - $1.00</span
                        >
                        <span v-else>$1.00 - ₦{{ getExchangeRate.buy }}</span></small
                    >
                </p>
                <p v-if="itemData.amount">
                    You're now requesting a
                    <template v-if="itemData.currency === 'NGN'">
                        <span>naira to dollar exchange to an amount of</span>
                        <span class="green">
                            {{ (itemData.amount / getExchangeRate.sell) | currency("USD") }}</span
                        >
                    </template>
                    <template v-else>
                        <span>dollar to naira exchange to an amount of</span>
                        <span class="green">
                            {{
                                (itemData.amount / (1 / getExchangeRate.buy)) | currency("NGN")
                            }}</span
                        >
                    </template>
                </p>
                <br />
            </section>

            <section class="modal__exchange--dropdown">
                <div class="modal__exchange--hero">
                    <label>From</label>
                    <select class="form__select" v-model="itemData.fromWallet">
                        <option value="local">Nigerian Naira (NGN)</option>
                        <option value="global">US Dollars (USD)</option>
                    </select>
                </div>
                <div class="modal__exchange--hero">
                    <label>To</label>
                    <select class="form__select" disabled v-model="itemData.toWallet">
                        <option value="global">US Dollars (USD)</option>
                        <option value="local">Nigerian Naira (NGN)</option>
                    </select>
                </div>
            </section>
            <div class="modal-form__buttons">
                <action-button
                    type="submit"
                    :pending="loading"
                    :disabled="Object.keys(errors).length > 0 || !itemData.amount"
                    :classes="['btn-block', 'btn__primary']"
                    >Exchange</action-button
                >
            </div>
        </form>
    </modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import KYCTitles from "../../services/kyc/kycTitles";
import CurrencyInput from "../form/CurrencyInput";

export default {
    name: "exchange-modal",
    components: {
        CurrencyInput
    },
    data() {
        return {
            itemData: { currency: "NGN", fromWallet: "local", toWallet: "global" },
            loading: false,
            selectedCurrency: null,
            errors: {},
            showKYC: false,
            selectedField: {},
            allNextKYC: KYCTitles.titles
        };
    },
    computed: {
        ...mapGetters(["getExchangeRate", "getAccountSummary", "getLoggedUser", "getNextKYC"]),
        paystackValue() {
            if (!this.itemData.amount) return 0;
            if (this.itemData.amount > 2500) {
                return (this.itemData.amount + 100) / (1 - 0.015);
            }
            return this.itemData.amount / (1 - 0.015);
        },
        exchangeStatus() {
            if (
                this.getLoggedUser.localKycStatus === "PENDING" &&
                this.getLoggedUser.globalKycStatus === "PENDING"
            )
                return "PENDING";
            return this.getLoggedUser.globalKycStatus === "COMPLETE";
        }
    },
    methods: {
        ...mapActions(["GET_EXCHANGE_RATE", "GET_ACCOUNT_SUMMARY", "EXCHANGE_WALLET"]),
        ...mapMutations(["SET_FUND_MODAL"]),
        closeModal() {
            this.$emit("close");
        },
        exchangeWallet() {
            if (!this.itemData.amount) {
                this.$set(this.errors, "amount", "Amount is required");
            } else if (Number.isNaN(+this.itemData.amount)) {
                this.$set(this.errors, "quantity", "Invalid amount");
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.loading = true;
            const payload = { ...this.itemData };
            payload.amount *= 100;
            this.EXCHANGE_WALLET(payload).then(resp => {
                this.loading = false;
                if (resp) {
                    this.$emit("close", true);
                }
            });
        },
        handleStep(step) {
            if (step.kyc) {
                this.showKYC = true;
                return true;
            }
        },
        handleUpdate() {
            this.GET_LOGGED_USER().then(() => {
                if (this.exchangeStatus !== 1) {
                    this.showKYC = false;
                } else {
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
        this.GET_EXCHANGE_RATE();
        setTimeout(() => {
            this.itemData.currency = "NGN";
            this.itemData.fromWallet = "local";
            this.itemData.toWallet = "global";
        }, 500);
        await this.GET_ACCOUNT_SUMMARY();
    },
    watch: {
        "itemData.fromWallet": function(val) {
            if (val === "local") {
                this.selectedCurrency = "NGN";
                this.itemData.currency = this.selectedCurrency;
                this.itemData.toWallet = "global";
            } else {
                this.selectedCurrency = "USD";
                this.itemData.currency = this.selectedCurrency;
                this.itemData.toWallet = "local";
            }
        }
    }
};
</script>
