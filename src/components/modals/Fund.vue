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
        <template v-if="currency === 'USD' && canFundGlobal !== 3">
            <div class="modal-form" v-if="canFundGlobal === 1">
                <h5 class="text-center mb-2">Verification Incomplete</h5>
                <p class="text-center">
                    To continue your verification, click the button below
                </p>
                <div class="text-center mt-3">
                    <KYCButton
                        ref="globalBtn"
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
            <div class="modal-form" v-if="canFundGlobal === 2">
                <h5 class="text-center mb-2">Your Verification is Under Review</h5>
                <p class="text-center">
                    You will be notified through email when your account gets activated for global
                    transactions
                </p>
            </div>
        </template>
        <template v-else>
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
                        :disabled="Object.keys(issues).length > 0"
                        :pending="loading"
                        :classes="['btn-block', 'btn__primary']"
                        >Fund</action-button
                    >
                </div>
            </form>

            <section>
                <p v-if="currency === 'USD'">
                    <small class="grey-dark"
                        >EXCHANGE RATE:&nbsp;
                        <span>₦{{ getExchangeRate.sell }} - $1.00</span></small
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
                        Please put your Chaka ID (in the Accounts section) in the Comments section
                        of your transfer request. Email
                        <a class="link" href="mailto:payments@chaka.ng">payments@chaka.ng</a> after
                        completion to confirm manual transfer</small
                    >
                </p>
            </section>
        </template>
    </modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import KYCButton from "../form/KYCButton";
import ModalKYC from "../kyc/ModalKYC";
import KYCTitles from "../../services/kyc/kycTitles";
export default {
    name: "fund-modal",
    components: {
        KYCButton,
        ModalKYC
    },
    data() {
        return {
            itemData: {},
            loading: false,
            message: null,
            issues: {},
            currency: "NGN",
            showSuccess: false,
            showKYC: false,
            selectedField: {},
            allNextKYC: KYCTitles.titles
        };
    },
    computed: {
        ...mapGetters(["getLoggedUser", "getExchangeRate", "getNextKYC"]),
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
        },
        canFundGlobal() {
            if (this.getLoggedUser.globalKycStatus === "NONE") return 1;
            if (this.getLoggedUser.globalKycStatus === "PENDING") return 2;
            return 3;
        }
    },
    methods: {
        ...mapActions(["GET_LOGGED_USER", "FUND_WALLET", "GET_EXCHANGE_RATE"]),
        ...mapMutations(["RESET_REQ"]),
        closeModal() {
            this.$emit("close");
        },
        fundWallet() {
            if (!this.itemData.amount) {
                this.$set(this.issues, "amount", "Amount is required");
                return false;
            }
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
                if (this.canFundGlobal === 1) {
                    this.$refs.globalBtn.$el.click();
                }
            });
            return true;
        },
        switchCurrency(currency) {
            this.currency = currency;
            this.handleReset();
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
