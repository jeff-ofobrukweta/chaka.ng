<template>
    <modal :close-on-click="false" @close="closeModal">
        <template slot="header">Fund Account</template>
        <template slot="subheader">
            <div class="modal-sub__box">
                <div class="modal-sub">
                    <button
                        class="btn"
                        @click="switchCurrency('NGN')"
                        :class="{ active: currency === 'NGN' }"
                    >
                        ₦&nbsp;&nbsp;Naira Funding
                    </button>
                    <button
                        class="btn"
                        @click="switchCurrency('USD')"
                        :class="{ active: currency === 'USD' }"
                    >
                        $&nbsp;&nbsp;Dollar Funding
                    </button>
                </div>
            </div>
        </template>
        <form class="modal-form" @submit.prevent="fundWallet">
            <div class="modal-form__group">
                <label class="form__label"
                    >Amount
                    <form-input
                        type="number"
                        name="amount"
                        v-model="itemData.amount"
                        :error-message="issues.amount"
                        @reset="handleReset"
                        placeholder="Amount"
                /></label>
                <div class="form-info">
                    <small>**Allow up to 1 business day</small>
                </div>
            </div>
            <error-block type="fund" />
            <div class="modal-form__buttons">
                <action-button
                    type="submit"
                    :disabled="!itemData.amount || Object.keys(issues).length > 0"
                    :pending="loading"
                    :classes="['btn-block', 'btn__primary']"
                    >Fund</action-button
                >
            </div>
        </form>

        <section>
            <p v-if="currency === 'USD'">
                <small class="grey-dark"
                    >EXCHANGE RATE:&nbsp; <span>₦{{ getExchangeRate.sell }} - $1.00</span></small
                >
            </p>
            <p>
                You're now requesting a funds transfer
                <span v-if="itemData.amount"
                    >of <span class="green">{{ actualValue | currency("NGN") }}</span></span
                >
                into your wallet
            </p>
            <p>
                Total amount to be debited (including PAYSTACK fees)
                <span class="green">{{ paystackValue | currency("NGN") }}</span>
            </p>
            <br />
            <p>To fund your account manually (without PAYSTACK fees), make a transfer to:</p>
            <p><span class="grey-dark">Account Holder:&nbsp;</span>Citi Investment Capital</p>
            <p><span class="grey-dark">Bank Name:&nbsp;</span>GTBank</p>
            <p><span class="grey-dark">Account Number:&nbsp;</span>0467937290</p>
            <br />
            <p>
                <small class="grey-dark">
                    Please put your User ID (in the Accounts section) in the Comments section of
                    your transfer request. Email
                    <a class="link" href="mailto:payments@chaka.ng">payments@chaka.ng</a> after
                    completion to confirm manual transfer</small
                >
            </p>
        </section>
    </modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
// import fundValidation from "../../services/validations/wallet";
export default {
    name: "fund-modal",
    data() {
        return {
            itemData: {},
            loading: false,
            message: null,
            issues: {},
            currency: "NGN"
        };
    },
    computed: {
        ...mapGetters(["getLoggedUser", "getExchangeRate"]),
        paystackValue() {
            if (!this.itemData.amount) return 0;
            if (this.actualValue > 2500) {
                return (+this.actualValue + 100) / (1 - 0.015);
            }
            return +this.actualValue / (1 - 0.015);
        },
        actualValue() {
            if (!this.itemData.amount) return 0;
            if (this.currency === "NGN") return this.itemData.amount;
            return this.itemData.amount * this.getExchangeRate.sell;
        }
    },
    methods: {
        ...mapActions(["GET_LOGGED_USER", "FUND_WALLET", "GET_EXCHANGE_RATE"]),
        ...mapMutations(["RESET_REQ"]),
        closeModal() {
            this.$emit("close");
        },
        fundWallet() {
            if (typeof +this.itemData.amount !== "number") {
                this.$set(this.issues, "amount", "Invalid number input");
                return false;
            }
            if (+this.itemData.amount < 500 && this.currency === "NGN") {
                this.$set(this.issues, "amount", "Minimum funding amount is ₦500");
                return false;
            }
            if (+this.itemData.amount < 10 && this.currency === "USD") {
                this.$set(this.issues, "amount", "Minimum funding amount is $10");
                return false;
            }
            this.loading = true;
            const handler = PaystackPop.setup({
                key: process.env.VUE_APP_PAYSTACK_KEY,
                email: this.getLoggedUser.email,
                amount: Math.ceil(this.paystackValue) * 100,
                firstname: this.getLoggedUser.UserKYC.firstname,
                lastname: this.getLoggedUser.UserKYC.lastname,
                metadata: {
                    service_charge: (Math.ceil(this.paystackValue) - this.itemData.amount) * 100
                },
                onClose: () => {
                    this.loading = false;
                },
                callback: response => {
                    const data = {
                        amount: this.actualValue * 100,
                        source: "PAYSTACK",
                        reference: response.reference,
                        currency: this.currency
                    };
                    this.FUND_WALLET(data).then(resp => {
                        this.loading = false;
                        if (resp) {
                            /**
                             * close fund modal
                             * show success modal
                             */
                            this.$emit("close", true);
                        }
                        return false;
                    });
                }
            });
            handler.openIframe();
            this.RESET_REQ();
            return true;
        },
        switchCurrency(currency) {
            this.currency = currency;
        },
        handleReset() {
            this.issues = {};
        }
    },
    mounted() {
        if (this.$refs.input) this.$refs.input.focus();
        this.GET_LOGGED_USER();
        this.GET_EXCHANGE_RATE();
    }
};
</script>
