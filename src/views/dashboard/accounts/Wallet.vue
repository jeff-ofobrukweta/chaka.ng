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
                                {{ checkForNegative(getAccountSummary.localAvailableToWithdraw, "NGN")
                                }}<i @click="showLocalWarning = !showLocalWarning" class="hint" v-if="negativeLocal"
                                    ><svg class="hint-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM8 13.8125C4.79063 13.8125 2.1875 11.2094 2.1875 8C2.1875 4.79063 4.79063 2.1875 8 2.1875C11.2094 2.1875 13.8125 4.79063 13.8125 8C13.8125 11.2094 11.2094 13.8125 8 13.8125Z"
                                            fill="#CECECE"
                                        />
                                        <path
                                            d="M7.25 5.25C7.25 5.44891 7.32902 5.63968 7.46967 5.78033C7.61032 5.92098 7.80109 6 8 6C8.19891 6 8.38968 5.92098 8.53033 5.78033C8.67098 5.63968 8.75 5.44891 8.75 5.25C8.75 5.05109 8.67098 4.86032 8.53033 4.71967C8.38968 4.57902 8.19891 4.5 8 4.5C7.80109 4.5 7.61032 4.57902 7.46967 4.71967C7.32902 4.86032 7.25 5.05109 7.25 5.25ZM8.375 7H7.625C7.55625 7 7.5 7.05625 7.5 7.125V11.375C7.5 11.4437 7.55625 11.5 7.625 11.5H8.375C8.44375 11.5 8.5 11.4437 8.5 11.375V7.125C8.5 7.05625 8.44375 7 8.375 7Z"
                                            fill="#CECECE"
                                        />
                                    </svg>
                                </i>
                            </h3>
                            <p><small>You can Withdraw</small></p>

                            <transition name="kyc-navbar">
                                <p v-if="showLocalWarning && negativeLocal">
                                    <mark class="warning"> You’ve used some of your unsettled balance to buy stocks. It takes 2-3 business days for sold funds to settle.</mark>
                                    <small
                                        >Please see
                                        <a class="underline primary" href="https://chaka.crunch.help/trading-investing-stocks/what-is-good-faith-violations" target="_blank"
                                            >Good Faith Violations for more.</a
                                        >&nbsp;<a href="#" class="underline primary" @click.prevent="showLocalWarning = false">Hide</a>
                                    </small>
                                </p>
                            </transition>
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
                                {{ checkForNegative(getAccountSummary.globalAvailableToWithdraw, "USD")
                                }}<i @click="showGlobalWarning = !showGlobalWarning" class="hint" v-if="negativeGlobal"
                                    ><svg class="hint-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM8 13.8125C4.79063 13.8125 2.1875 11.2094 2.1875 8C2.1875 4.79063 4.79063 2.1875 8 2.1875C11.2094 2.1875 13.8125 4.79063 13.8125 8C13.8125 11.2094 11.2094 13.8125 8 13.8125Z"
                                            fill="#CECECE"
                                        />
                                        <path
                                            d="M7.25 5.25C7.25 5.44891 7.32902 5.63968 7.46967 5.78033C7.61032 5.92098 7.80109 6 8 6C8.19891 6 8.38968 5.92098 8.53033 5.78033C8.67098 5.63968 8.75 5.44891 8.75 5.25C8.75 5.05109 8.67098 4.86032 8.53033 4.71967C8.38968 4.57902 8.19891 4.5 8 4.5C7.80109 4.5 7.61032 4.57902 7.46967 4.71967C7.32902 4.86032 7.25 5.05109 7.25 5.25ZM8.375 7H7.625C7.55625 7 7.5 7.05625 7.5 7.125V11.375C7.5 11.4437 7.55625 11.5 7.625 11.5H8.375C8.44375 11.5 8.5 11.4437 8.5 11.375V7.125C8.5 7.05625 8.44375 7 8.375 7Z"
                                            fill="#CECECE"
                                        />
                                    </svg>
                                </i>
                            </h3>
                            <p><small>You can Withdraw</small></p>

                            <transition name="kyc-navbar">
                                <p v-if="showGlobalWarning && negativeGlobal">
                                    <mark class="warning"> You’ve used some of your unsettled balance to buy stocks. It takes 2-3 business days for sold funds to settle.</mark>
                                    <small
                                        >Please see
                                        <a class="underline primary" href="https://chaka.crunch.help/trading-investing-stocks/what-is-good-faith-violations" target="_blank"
                                            >Good Faith Violations for more.</a
                                        >&nbsp;<a href="#" class="underline primary" @click.prevent="showGlobalWarning = false">Hide</a></small
                                    >
                                </p>
                            </transition>
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
        BankCard: () => import("../../../components/accounts/BankCard"),
        

    },
    data() {
        return {
            showKYC: false,
            step: null,
            negativeLocal: false,
            negativeGlobal: false,
            showLocalWarning: true,
            showGlobalWarning: true
        };
    },
    computed: {
        ...mapGetters(["getAccountSummary", "getNextKYC", "getUserCards"]),
        pageAvailable() {
            return Object.keys(this.getAccountSummary).length > 0;
        },
        tempCards() {
            const cards = [...tempCards];
            return cards.splice(0, 14);
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
        },
        checkForNegative(value, currency) {
            const temp = this.$options.filters.currency(Math.abs(value / 100), currency, true);
            if (+value < 0) {
                if (currency === "NGN") {
                    this.negativeLocal = true;
                } else {
                    this.negativeGlobal = true;
                }
                return `(${temp})`;
            }
            return temp;
        }
    },
    async mounted() {
        await this.GET_ACCOUNT_SUMMARY();
        this.GET_USER_CARDS();
    }
};
</script>
