<template>
    <modal :close-on-click="false" @close="closeModal">
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
                        </h4>
                        <p><small>Available Cash</small></p>
                    </div>
                    <div>
                        <h4
                            class="cursor-context"
                            :title="
                                getAccountSummary.localPendingBalance | kobo | currency('NGN', true)
                            "
                        >
                            {{ getAccountSummary.localPendingBalance | kobo | currency("NGN") }}
                        </h4>
                        <p><small>Pending Cash</small></p>
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
                        </h4>
                        <p><small>Available Cash</small></p>
                    </div>
                    <div>
                        <h4
                            class="cursor-context"
                            :title="
                                getAccountSummary.globalPendingBalance
                                    | kobo
                                    | currency('USD', true)
                            "
                        >
                            {{ getAccountSummary.globalPendingBalance | kobo | currency("USD") }}
                        </h4>
                        <p><small>Pending Cash</small></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-form" v-if="!canExchange">
            <h5 class="text-center mb-2">Your Verification is Under Review</h5>
            <p class="text-center">
                You will be notified through email when your account gets activated for global
                transactions
            </p>
        </div>
        <form v-else class="modal-form" @submit.prevent="exchangeWallet">
            <div class="modal-form__group">
                <label class="form__label"
                    >Amount
                    <form-input
                        type="number"
                        name="amount"
                        v-model="itemData.amount"
                        :error-message="errors.amount"
                        placeholder="Amount"
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
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'exchange-modal',
    data() {
        return {
            itemData: { currency: 'NGN', fromWallet: 'local', toWallet: 'global' },
            loading: false,
            selectedCurrency: null,
            errors: {}
        };
    },
    computed: {
        ...mapGetters(['getExchangeRate', 'getAccountSummary', 'getLoggedUser']),
        paystackValue() {
            if (!this.itemData.amount) return 0;
            if (this.itemData.amount > 2500) {
                return (this.itemData.amount + 100) / (1 - 0.015);
            }
            return this.itemData.amount / (1 - 0.015);
        },
        canExchange() {
            return this.getLoggedUser.globalKycStatus === 'COMPLETE';
        }
    },
    methods: {
        ...mapActions(['GET_EXCHANGE_RATE', 'GET_ACCOUNT_SUMMARY', 'EXCHANGE_WALLET']),
        closeModal() {
            this.$emit('close');
        },
        exchangeWallet() {
            if (!this.itemData.amount) {
                this.$set(this.errors, 'amount', 'Amount is required');
            } else if (Number.isNaN(+this.itemData.amount)) {
                this.$set(this.errors, 'quantity', 'Invalid amount');
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.loading = true;
            const payload = { ...this.itemData };
            payload.amount *= 100;
            this.EXCHANGE_WALLET(payload).then((resp) => {
                this.loading = false;
                if (resp) {
                    this.$emit('close', true);
                }
            });
        }
    },
    async mounted() {
        this.GET_EXCHANGE_RATE();
        setTimeout(() => {
            this.itemData.currency = 'NGN';
            this.itemData.fromWallet = 'local';
            this.itemData.toWallet = 'global';
        }, 500);
        await this.GET_ACCOUNT_SUMMARY();
    },
    watch: {
        'itemData.fromWallet': function (val) {
            if (val === 'local') {
                this.selectedCurrency = 'NGN';
                this.itemData.currency = this.selectedCurrency;
                this.itemData.toWallet = 'global';
            } else {
                this.selectedCurrency = 'USD';
                this.itemData.currency = this.selectedCurrency;
                this.itemData.toWallet = 'local';
            }
        }
    }
};
</script>
