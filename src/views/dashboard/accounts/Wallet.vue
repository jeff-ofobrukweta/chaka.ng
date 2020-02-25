<template>
    <div>
        <error-block type="accounts" />
        <section class="accounts__title">
            <h3>Wallets</h3>
        </section>
        <section class="accounts-wallet">
            <div class="accounts-wallet__value">
                <div>
                    <div><img src="../../../assets/img/portfolio1-dark.svg" alt="Wallet" /></div>
                    <h2 class="cursor-context" :title="getAccountSummary.netWorth | kobo | currency('NGN', true)">
                        {{ getAccountSummary.netWorth | kobo | currency("NGN") }}
                    </h2>
                    <p><small>Total Value</small></p>
                </div>
            </div>
            <div class="accounts-wallet__text">
                <div class="accounts-wallet__currency">
                    <h3>Local</h3>
                    <hr />
                    <div class="accounts-wallet__money">
                        <div>
                            <h3 class="cursor-context">
                                {{ getAccountSummary.localAvailableToTrade | kobo | currency("NGN", true) }}
                            </h3>
                            <p><small>Available To Trade</small></p>
                        </div>
                        <div>
                            <h3 class="cursor-context">
                                {{ getAccountSummary.localAvailableToWithdraw | kobo | currency("NGN", true) }}
                            </h3>
                            <p><small>You can Withdraw</small></p>
                        </div>
                        <div>
                            <h3 class="cursor-context">
                                {{ getAccountSummary.localPendingBalance | kobo | currency("NGN", true) }}
                            </h3>
                            <p><small>Your Incoming Cash</small></p>
                        </div>
                        <div>
                            <h3 class="cursor-context">
                                {{ getAccountSummary.localStocksValue | kobo | currency("NGN", true) }}
                            </h3>
                            <p><small>Your Stock Value</small></p>
                        </div>
                    </div>
                </div>
                <div class="accounts-wallet__currency">
                    <h3>Global</h3>
                    <hr />
                    <div class="accounts-wallet__money">
                        <div>
                            <h3 class="cursor-context">
                                {{ getAccountSummary.globalAvailableToTrade | kobo | currency("USD", true) }}
                            </h3>
                            <p><small>Available To Trade</small></p>
                        </div>
                        <div>
                            <h3 class="cursor-context">
                                {{ getAccountSummary.globalAvailableToWithdraw | kobo | currency("USD", true) }}
                            </h3>
                            <p><small>You can Withdraw</small></p>
                        </div>
                        <div>
                            <h3 class="cursor-context">
                                {{ getAccountSummary.globalPendingBalance | kobo | currency("USD", true) }}
                            </h3>
                            <p><small>Your Incoming Cash</small></p>
                        </div>
                        <div>
                            <h3 class="cursor-context">
                                {{ getAccountSummary.globalStocksValue | kobo | currency("USD", true) }}
                            </h3>
                            <p><small>Your Stock Value</small></p>
                        </div>
                    </div>
                </div>
                <div class="accounts-wallet__buttons">
                    <button @click="showFund" class="btn btn-block btn--lg btn__primary">
                        Fund
                    </button>
                    <button @click="showExchange" class="btn btn-block btn--lg btn__primary--dark">
                        Exchange
                    </button>
                    <kyc-button ref="withdrawBtn" type="button" :classes="['btn-block', 'btn--lg', 'btn__primary--outline']" action="withdraw" @step="handleStep"
                        >Withdraw</kyc-button
                    >
                </div>
            </div>
        </section>
        <br />
        <!-- <template v-if="getUserCards.length > 0">
            <section class="accounts__title">
                <h3>Payment Cards</h3>
            </section>
            <section class="accounts-card__box">
                <BankCard v-for="(card, i) in tempCards" :key="i" :card="card" />
                <div class="accounts-card">
                    <div class="accounts-card__action">
                        <img v-if="loading" :src="loader" alt="Loading" width="12px" height="12px" />
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" v-else @click="deleteCard(card.id)">
                            <line x1="36.8593" y1="37.5664" x2="12.1106" y2="12.8177" stroke="white" />
                            <line x1="37.5664" y1="12.8179" x2="12.8177" y2="37.5666" stroke="white" />
                        </svg>
                    </div>
                    <div class="accounts-card__number">
                        <div class="accounts-card__logo">
                            <div>
                                <img v-if="card.cardType.startsWith('master')" :src="require('../../../assets/img/mastercard.svg')" alt="Master card" />
                                <img v-else-if="card.cardType.startsWith('visa')" :src="require('../../../assets/img/visa.png')" alt="Visa" />
                                <img v-else-if="card.cardType.startsWith('verve')" :src="require('../../../assets/img/verve.png')" alt="Visa" />
                                <img v-else :src="require('../../../assets/img/credit-card.svg')" alt="Verve" />
                            </div>
                            <p>{{ card.bank || "" }}</p>
                        </div>
                        <p>**** **** **** {{ card.lastFourDigits }}</p>
                    </div>
                </div>
            </section>
        </template> -->

        <modal-kyc @updated="handleUpdate" @close="showKYC = false" v-if="showKYC" />
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import loader from "../../../assets/img/loader.gif";

export default {
    name: "accounts-wallet",
    components: {
        BankCard: () => import("../../../components/accounts/BankCard")
    },
    data() {
        return {
            showKYC: false,
            step: null
        };
    },
    computed: {
        ...mapGetters(["getAccountSummary", "getNextKYC", "getUserCards"]),
        pageAvailable() {
            return Object.keys(this.getAccountSummary).length > 0;
        },
        tempCards() {
            return this.getUserCards.splice(0, 14);
        }
    },
    methods: {
        ...mapActions(["GET_ACCOUNT_SUMMARY", "GET_USER_CARDS"]),
        ...mapMutations(["SET_FUND_MODAL", "SET_WITHDRAW_MODAL", "SET_EXCHANGE_MODAL"]),
        handleStep(step) {
            this.step = step;
            if (step.kyc) {
                this.showKYC = true;
                return true;
            }
            this.showWithdraw();
        },
        handleUpdate(value) {
            if (value) {
                this.showWithdraw();
            }
        },
        showWithdraw() {
            this.showKYC = false;
            this.SET_WITHDRAW_MODAL(true);
        },
        showFund() {
            this.SET_FUND_MODAL(true);
        },
        showExchange() {
            this.SET_EXCHANGE_MODAL(true);
        }
    },
    async mounted() {
        await this.GET_ACCOUNT_SUMMARY();
        this.GET_USER_CARDS();
    }
};
</script>
