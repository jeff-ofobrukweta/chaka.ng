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
                    <kyc-button
                        ref="fundBtn"
                        type="button"
                        :classes="['btn-block', 'btn--lg', 'btn__primary']"
                        action="fund"
                        @step="handleStep"
                        >Fund</kyc-button
                    >
                    <kyc-button
                        ref="exchangeBtn"
                        type="button"
                        :classes="['btn-block', 'btn--lg', 'btn__primary--dark']"
                        action="global"
                        @step="handleStep"
                        >Exchange</kyc-button
                    >
                    <button
                        @click="showWithdraw"
                        class="btn btn-block btn--lg btn__primary--outline"
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </section>

        <modal-kyc
            :requiredFields="selectedField.fields"
            :title="selectedField.title"
            @updated="handleUpdate"
            @close="showKYC = false"
            v-if="showKYC"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import KYCTitles from "../../../services/kyc/kycTitles";

export default {
    name: "accounts-wallet",
    data() {
        return {
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
        ...mapMutations(["SET_FUND_MODAL", "SET_WITHDRAW_MODAL", "SET_EXCHANGE_MODAL"]),
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
            }
            if (step.type === "fund") {
                this.SET_FUND_MODAL(true);
            } else if (step.type === "global") {
                this.SET_EXCHANGE_MODAL(true);
            }
        },
        handleUpdate() {
            // this.showKYC = false;
            if (this.step === "fund") {
                this.$refs.fundBtn.$el.click();
                return true;
            }
            if (this.step === "global") {
                this.$refs.exchangeBtn.$el.click();
            }
        },
        showWithdraw() {
            this.SET_WITHDRAW_MODAL(true);
        }
    },
    async mounted() {
        await this.GET_ACCOUNT_SUMMARY();
    }
};
</script>
