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
                        :disabled="loading"
                    >
                        ₦
                    </button>
                    <button
                        class="btn"
                        @click="switchCurrency('USD')"
                        :class="{ active: currency === 'USD' }"
                        :disabled="loading"
                    >
                        $
                    </button>
                </div>
            </div>
        </template>

        <!-- TO-DO: Put back if dollar funding is blocked for incomplete KYCs -->

        <!-- <template v-if="currency === 'USD' && canFundGlobal !== 3">
            <div class="modal-form" v-if="canFundGlobal === 1">
                <h5 class="text-center mb-2">Verification Incomplete</h5>
                <p class="text-center">
                    To continue your verification, click the button below
                </p>
                <div class="text-center mt-3">
                    <kyc-button
                        ref="globalBtn"
                        type="button"
                        :classes="['btn__primary']"
                        action="global"
                        @step="handleStep"
                        >Continue</kyc-button
                    >
                </div>

                <modal-kyc
                    :requiredFields="selectedField.fields"
                    :title="selectedField.title"
                    @updated="handleUpdate"
                    @close="showKYC = false"
                    v-if="showKYC"
                />
            </div>
            <div class="modal-form" v-if="canFundGlobal === 2">
                <h5 class="text-center mb-2">Your Verification is Under Review</h5>
                <p class="text-center">
                    You will be notified through email when your account gets activated for global
                    transactions
                </p>
            </div>
        </template> -->
        <template>
            <form class="modal-form" @submit.prevent="fundWallet">
                <div class="modal-form__group">
                    <label class="form__label"
                        >Amount<currency-input
                            :currency="currency"
                            placeholder="Enter Amount"
                            v-model="itemData.amount"
                            :error-message="issues.amount"
                            @reset="handleReset"
                        />
                    </label>
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

            <section v-if="currency === 'NGN'">
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
                        Please put <mark>{{ getLoggedUser.chakaID }}</mark> in the comments section
                        of your transfer request. Email
                        <a class="link" href="mailto:payments@chaka.ng">payments@chaka.ng</a> after
                        completion to confirm manual transfer</small
                    >
                </p>
            </section>

            <section v-else>
                <p>
                    <small class="grey-dark"
                        >EXCHANGE RATE:&nbsp;
                        <span>₦{{ getExchangeRate.sell }} - $1.00</span></small
                    >
                </p>
                <p>
                    Your
                    <span v-if="itemData.amount" class="green">{{
                        itemData.amount | currency("USD")
                    }}</span>
                    card transaction would be processed as an international charge<template
                        v-if="itemData.amount"
                    >
                        for <span class="green">{{ actualValue | currency("NGN") }}</span> and
                        converted to

                        <span class="green">{{ itemData.amount | currency("USD") }}</span>
                    </template>
                </p>
                <p>
                    Total amount to be debited (including PAYSTACK fees)
                    <span class="green">{{ paystackValue | currency("NGN") }}</span>
                </p>
                <p class="form-info">
                    Please note that if you use an international card, your transaction may incur
                    other bank charges that can slightly decrease the funding amount deposited.
                </p>
                <br />
                <p>
                    To fund your account through a domiciliary account transfer (without PAYSTACK
                    fees), make a transfer to:
                </p>
                <p>
                    <span class="grey-dark">Account Holder:&nbsp;</span>CITI INV CAP LTD/114 DOLLAR
                    AC
                </p>
                <p><span class="grey-dark">Bank Name:&nbsp;</span>Guaranty Trust Bank</p>
                <p><span class="grey-dark">Account Number:&nbsp;</span>0536097685</p>
                <br />
                <p>
                    <small class="grey-dark">
                        Please put <mark>{{ getLoggedUser.chakaID }}</mark> in the comments section
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

export default {
    name: "fund-modal",
    components: {
        CurrencyInput: () => import("../form/CurrencyInput")
    },
    data() {
        return {
            itemData: {},
            loading: false,
            message: null,
            issues: {},
            currency: "NGN",
            flag: "START"
        };
    },
    computed: {
        ...mapGetters(["getLoggedUser", "getExchangeRate", "getNextKYC", "getWalletTx"]),
        paystackValue() {
            if (!this.itemData.amount) return 0;
            if (this.actualValue > 2500) {
                const total = (+this.actualValue + 100) / (1 - 0.015);
                const fees = total - this.actualValue;
                if (fees >= 2000) {
                    return this.actualValue + 2000;
                }
                return total;
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
        },
        fundPayload() {
            if (this.flag === "START") {
                return {
                    amount: +this.actualValue * 100,
                    currency: this.currency,
                    source: "PAYSTACK",
                    flag: this.flag
                };
            }
            return {
                amount: +this.actualValue * 100,
                reference: this.getWalletTx.reference,
                currency: this.currency,
                source: "PAYSTACK",
                flag: this.flag
            };
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
            this.flag = "START";
            this.FUND_WALLET(this.fundPayload).then(resp => {
                this.makeTransaction();
            });
            return true;
        },
        makeTransaction() {
            const handler = PaystackPop.setup({
                key: process.env.VUE_APP_PAYSTACK_KEY,
                email: this.getLoggedUser.email,
                amount: Math.ceil(this.paystackValue) * 100,
                firstname: this.getLoggedUser.UserKYC.firstname,
                lastname: this.getLoggedUser.UserKYC.lastname,
                ref: this.getWalletTx.reference,
                metadata: {
                    service_charge: (Math.ceil(this.paystackValue) - this.itemData.amount) * 100
                },
                onClose: resp => {
                    this.loading = false;
                    this.flag = "CANCEL";
                    this.FUND_WALLET(this.fundPayload);
                },
                callback: response => {
                    if (response.status === "success") {
                        this.flag = "SUCCESS";
                        this.FUND_WALLET(this.fundPayload).then(resp => {
                            this.loading = false;
                            if (resp) {
                                this.$emit("close", true);
                                return true;
                            }
                            return false;
                        });
                    } else {
                        this.flag = "FAIL";
                        this.FUND_WALLET(this.fundPayload).then(resp => {
                            this.loading = false;
                            return false;
                        });
                    }
                }
            });
            handler.openIframe();
            this.RESET_REQ();
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
