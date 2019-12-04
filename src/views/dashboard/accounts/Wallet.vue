<template>
    <div>
        <section class="accounts__title">
            <h3>Wallets</h3>
        </section>
        <section class="accounts-wallet">
            <div class="accounts-wallet__value">
                <div>
                    <div><img src="../../../assets/img/portfolio1-dark.svg" alt="Wallet" /></div>
                    <h2
                        class="cursor-context"
                        :title="getAccountSummary.netWorth | kobo | currency('NGN', true)"
                    >
                        {{ getAccountSummary.netWorth | kobo | currency("NGN") }}
                    </h2>
                    <p><small>My Portfolio Value</small></p>
                    <div class="accounts-wallet__graphics">
                        <img src="../../../assets/img/wallet1.svg" alt="Wallet" />
                        <img src="../../../assets/img/wallet2.svg" alt="Wallet" />
                    </div>
                </div>
            </div>
            <div class="accounts-wallet__text">
                <div class="accounts-wallet__currency">
                    <h3>Local</h3>
                    <hr />
                    <div class="accounts-wallet__money">
                        <div>
                            <h3 v-if="!getAccountSummary.localWallet" class="cursor-context">-</h3>
                            <h3
                                v-else
                                class="cursor-context"
                                :title="
                                    getAccountSummary.localWallet.availableBalance
                                        | kobo
                                        | currency('NGN', true)
                                "
                            >
                                {{
                                    getAccountSummary.localWallet.availableBalance
                                        | kobo
                                        | currency("NGN")
                                }}
                            </h3>
                            <p><small>Available Cash</small></p>
                        </div>
                        <div>
                            <h3
                                class="cursor-context"
                                :title="
                                    getAccountSummary.localPendingBalance
                                        | kobo
                                        | currency('NGN', true)
                                "
                            >
                                {{ getAccountSummary.localPendingBalance | kobo | currency("NGN") }}
                            </h3>
                            <p><small>Pending Cash</small></p>
                        </div>
                        <div>
                            <h3
                                class="cursor-context"
                                :title="
                                    getAccountSummary.localStocksValue
                                        | kobo
                                        | currency('NGN', true)
                                "
                            >
                                {{ getAccountSummary.localStocksValue | kobo | currency("NGN") }}
                            </h3>
                            <p><small>Stock Value</small></p>
                        </div>
                    </div>
                </div>
                <div class="accounts-wallet__currency">
                    <h3>Global</h3>
                    <hr />
                    <div class="accounts-wallet__money">
                        <div>
                            <h3 v-if="!getAccountSummary.globalWallet" class="cursor-context">-</h3>
                            <h3
                                v-else
                                class="cursor-context"
                                :title="
                                    getAccountSummary.globalWallet.availableBalance
                                        | kobo
                                        | currency('USD', true)
                                "
                            >
                                {{
                                    getAccountSummary.globalWallet.availableBalance
                                        | kobo
                                        | currency("USD")
                                }}
                            </h3>
                            <p><small>Available Cash</small></p>
                        </div>
                        <div>
                            <h3
                                class="cursor-context"
                                :title="
                                    getAccountSummary.globalPendingBalance
                                        | kobo
                                        | currency('USD', true)
                                "
                            >
                                {{
                                    getAccountSummary.globalPendingBalance | kobo | currency("USD")
                                }}
                            </h3>
                            <p><small>Pending Cash</small></p>
                        </div>
                        <div>
                            <h3
                                class="cursor-context"
                                :title="
                                    getAccountSummary.globalStocksValue
                                        | kobo
                                        | currency('USD', true)
                                "
                            >
                                {{ getAccountSummary.globalStocksValue | kobo | currency("USD") }}
                            </h3>
                            <p><small>Stock Value</small></p>
                        </div>
                    </div>
                </div>
                <div class="accounts-wallet__buttons">
                    <KYCButton
                        ref="fundBtn"
                        type="button"
                        :classes="['btn-block', 'btn--lg', 'btn__primary']"
                        action="fund"
                        @step="handleStep"
                        >Fund</KYCButton
                    >
                    <KYCButton
                        ref="exchangeBtn"
                        type="button"
                        :classes="['btn-block', 'btn--lg', 'btn__primary--dark']"
                        action="global"
                        @step="handleStep"
                        >Exchange</KYCButton
                    >
                    <button
                        @click="showWithdraw = true"
                        class="btn btn-block btn--lg btn__primary--outline"
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </section>
        <fund-modal :showModal="showFund" @close="closeFundBtn" v-if="showFund" />
        <exchange-modal :showModal="showExchange" @close="closeExchangeBtn" v-if="showExchange" />
        <withdraw-modal :showModal="showWithdraw" @close="closeWithdrawBtn" v-if="showWithdraw" />
        <wallet-success @close="showSuccess = false" v-if="showSuccess" />

        <modal @close="showKYC = false" v-if="showKYC">
            <template slot="header">{{ selectedField.title }}</template>
            <ModalKYC :requiredFields="selectedField.fields" @updated="handleUpdate" />
        </modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import KYCButton from "../../../components/form/KYCButton";
import ModalKYC from "../../../components/kyc/ModalKYC";
import KYCTitles from "../../../services/kyc/kycTitles";
export default {
    name: "accounts-wallet",
    components: {
        KYCButton,
        ModalKYC
    },
    data() {
        return {
            showFund: false,
            showWithdraw: false,
            showExchange: false,
            showSuccess: false,
            showKYC: false,
            selectedField: {},
            step: null,
            allNextKYC: KYCTitles.titles
        };
    },
    computed: {
        ...mapGetters(["getAccountSummary", "getNextKYC"]),
        pageAvailable() {
            return Object.keys(this.getAccountSummary).length > 0;
        }
    },
    methods: {
        ...mapActions(["GET_ACCOUNT_SUMMARY"]),
        handleStep(step) {
            this.step = step.type;
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
            } else if (step.type === "fund") {
                this.showFund = true;
            } else if (step.type === "global") {
                this.showExchange = true;
            }
        },
        handleUpdate() {
            this.showKYC = false;
            if (this.step === "fund") {
                this.$refs.fundBtn.$el.click();
                return true;
            } else if (this.step === "global") {
                this.$refs.exchangeBtn.$el.click();
            }
        },
        closeFundBtn(e) {
            if (e) this.showSuccess = true;
            this.showFund = false;
        },
        closeWithdrawBtn(e) {
            if (e) this.showSuccess = true;
            this.showWithdraw = false;
        },
        closeExchangeBtn(e) {
            if (e) this.showSuccess = true;
            this.showExchange = false;
        }
    },
    async mounted() {
        await this.GET_ACCOUNT_SUMMARY();
    }
};
</script>
