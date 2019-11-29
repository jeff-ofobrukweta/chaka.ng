<template>
    <modal :close-on-click="false" @close="closeModal">
        <template slot="header">Funds Exchange</template>
        <div class="modal__exchange">
            <div class="modal__exchange--currency">
                <h4>Local</h4>
                <hr />
                <div class="modal__exchange--money">
                    <div>
                        <h4 class="cursor-context" :title="2243.99 | currency('NGN', true)">
                            {{ 2243.99 | currency("NGN") }}
                        </h4>
                        <p><small>Available Cash</small></p>
                    </div>
                    <div>
                        <h4 class="cursor-context" :title="2243.99 | currency('NGN', true)">
                            {{ 2243.99 | currency("NGN") }}
                        </h4>
                        <p><small>Pending Cash</small></p>
                    </div>
                    <div>
                        <h4 class="cursor-context" :title="2243.99 | currency('NGN', true)">
                            {{ 2243.99 | currency("NGN") }}
                        </h4>
                        <p><small>Stock Value</small></p>
                    </div>
                </div>
            </div>
            <div class="modal__exchange--currency">
                <h4>Global</h4>
                <hr />
                <div class="modal__exchange--money">
                    <div>
                        <h4 class="cursor-context" :title="2243.99 | currency('USD', true)">
                            {{ 2243.99 | currency("USD") }}
                        </h4>
                        <p><small>Available Cash</small></p>
                    </div>
                    <div>
                        <h4 class="cursor-context" :title="2243.99 | currency('USD', true)">
                            {{ 2243.99 | currency("USD") }}
                        </h4>
                        <p><small>Pending Cash</small></p>
                    </div>
                    <div>
                        <h4 class="cursor-context" :title="2243.99 | currency('USD', true)">
                            {{ 2243.99 | currency("USD") }}
                        </h4>
                        <p><small>Stock Value</small></p>
                    </div>
                </div>
            </div>
        </div>
        <form class="modal-form" @submit.prevent="fundWallet">
            <div class="modal-form__group">
                <label class="form__label"
                    >Amount
                    <form-input
                        type="number"
                        name="amount"
                        v-model="itemData.amount"
                        placeholder="Amount"
                /></label>
            </div>
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
                        <span v-if="itemData.currency === 'NGN'">₦{{ exchangeAsk }} - $1.00</span>
                        <span v-else>$1.00 - ₦{{ exchangeBid }}</span></small
                    >
                </p>
                <p v-if="itemData.amount">
                    You're now requesting a
                    <template v-if="itemData.currency === 'NGN'">
                        <span>naira to dollar exchange to an amount of</span>
                        <span class="green">
                            {{ (itemData.amount / exchangeAsk) | currency("USD") }}</span
                        >
                    </template>
                    <template v-else>
                        <span>dollar to naira exchange to an amount of</span>
                        <span class="green">
                            {{ (itemData.amount / (1 / exchangeBid)) | currency("NGN") }}</span
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
                    :classes="['btn-block', 'btn__primary']"
                    >Exchange</action-button
                >
            </div>
        </form>
    </modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "exchange-modal",
    data() {
        return {
            itemData: { currency: "NGN", fromWallet: "local", toWallet: "global" },
            loading: false,
            selectedCurrency: null,
            exchangeAsk: 360,
            exchangeBid: 358
        };
    },
    computed: {
        ...mapGetters(["getExchangeRate"]),
        paystackValue() {
            if (!this.itemData.amount) return 0;
            if (this.itemData.amount > 2500) {
                return (this.itemData.amount + 100) / (1 - 0.015);
            }
            return this.itemData.amount / (1 - 0.015);
        }
    },
    methods: {
        ...mapActions(["GET_EXCHANGE_RATE"]),
        closeModal() {
            this.$emit("close");
        },
        fundWallet() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                console.log(this.itemData);
            }, 3000);
        }
    },
    async mounted() {
        this.GET_EXCHANGE_RATE();
        setTimeout(() => {
            this.itemData.currency = "NGN";
            this.itemData.fromWallet = "local";
            this.itemData.toWallet = "global";
        }, 500);
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
