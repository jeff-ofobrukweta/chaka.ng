<template>
    <modal :close-on-click="false" @close="closeModal">
        <template slot="header">Fund Account</template>
        <template slot="subheader">
            <div class="modal-sub__box">
                <div class="modal-sub">
                    <button class="btn" @click="switchCurrency('NGN')" :class="{ active: currency === 'NGN' }" :disabled="loading">
                        ₦
                    </button>
                    <button class="btn" @click="switchCurrency('USD')" :class="{ active: currency === 'USD' }" :disabled="loading">
                        $
                    </button>
                </div>
            </div>
        </template>
        <div class="modal-form">
            <div class="modal-form__group">
                <label class="form__label">Select Payment Mode <span class="form-error" v-if="issues.source">*required</span></label>
                <div class="modal-fund__images">
                    <img @click="switchMethod('PAYSTACK')" :class="{ active: activeMethod === 'PAYSTACK' }" src="../../assets/img/paystack.png" alt="Pay with paystack" />
                    <!-- TO-DO:: Put back when interswitch is ready -->
                    <!-- <img
                        @click="switchMethod('INTERSWITCH')"
                        :class="{ active: activeMethod === 'INTERSWITCH' }"
                        src="../../assets/img/quickteller.png"
                        alt="Pay with quickteller"
                    /> -->
                    <div @click="switchMethod('BANK')" :class="{ active: activeMethod === 'BANK' }">
                        Bank Transfer
                    </div>
                </div>
            </div>
        </div>

        <template v-if="activeMethod === 'BANK'">
            <div class="modal-form" v-if="currency === 'NGN'">
                <br />
                <p>To fund your account manually (without charges), make a transfer to:</p>
                <p><span class="grey-dark">Account Holder:&nbsp;</span>Citi Investment Capital</p>
                <p><span class="grey-dark">Bank Name:&nbsp;</span>GTBank</p>
                <p><span class="grey-dark">Account Number:&nbsp;</span>0467937290</p>
                <br />
                <p>
                    <small class="grey-dark">
                        Please put <mark>{{ getLoggedUser.chakaID }}</mark> in the comments section of your transfer request. Email
                        <a class="link" href="mailto:payments@chaka.ng">payments@chaka.ng</a> after completion to confirm manual transfer</small
                    >
                </p>
            </div>
            <div class="modal-form" v-else>
                <br />
                <p class="form-info">
                    Please note that if you use an international card, your transaction may incur other bank charges that can slightly decrease the funding amount deposited.
                </p>
                <br />
                <p>
                    To fund your account through a domiciliary account transfer (without PAYSTACK fees), make a transfer to:
                </p>
                <p><span class="grey-dark">Account Holder:&nbsp;</span>CITI INV CAP LTD/114 DOLLAR AC</p>
                <p><span class="grey-dark">Bank Name:&nbsp;</span>Guaranty Trust Bank</p>
                <p><span class="grey-dark">Account Number:&nbsp;</span>0536097685</p>
                <br />
                <p>
                    <small class="grey-dark">
                        Please put <mark>{{ getLoggedUser.chakaID }}</mark> in the comments section of your transfer request. Email
                        <a class="link" href="mailto:payments@chaka.ng">payments@chaka.ng</a> after completion to confirm manual transfer</small
                    >
                </p>
            </div>
        </template>
        <template v-else>
            <form class="modal-form" @submit.prevent="fundWallet">
                <div class="modal-form__group">
                    <label class="form__label"
                        >Amount<currency-input :currency="currency" placeholder="Enter Amount" v-model="itemData.amount" :error-message="issues.amount" @reset="handleReset" />
                    </label>
                </div>
                <!-- TO-DO:: Put back when saved cards is ready -->
                <!-- <div class="modal-form__group" v-if="getUserCards.length > 0">
                    <label class="form__label">Select Card</label>
                    <div
                        class="modal-dropdown dropdown"
                        :class="{ active: accountHover }"
                        ref="accounts"
                        @click="accountHover = !accountHover"
                    >
                        <div class="modal-dropdown__title pointer">
                            <span>{{ bankTitle || "" }}</span>
                            <img
                                v-if="selectedCard === 'input'"
                                class="modal-dropdown__card--image"
                                :src="require('../../assets/img/credit-card.svg')"
                                alt="Credit card"
                            />
                            <template v-else-if="Object.keys(selectedCard).length > 0">
                                <img
                                    v-if="selectedCard.cardType.startsWith('master')"
                                    class="modal-dropdown__card--image"
                                    :src="require('../../assets/img/mastercard.svg')"
                                    alt="Master card"/>
                                <img
                                    v-else-if="selectedCard.cardType.startsWith('visa')"
                                    class="modal-dropdown__card--image"
                                    :src="require('../../assets/img/visa.png')"
                                    alt="Visa"/>
                                <img
                                    v-else
                                    class="modal-dropdown__card--image"
                                    :src="require('../../assets/img/verve.png')"
                                    alt="Verve"
                            /></template>
                        </div>
                        <div class="dropdown-content modal-dropdown__content">
                            <div class="modal-dropdown__card" @click="selectedCard = 'input'">
                                <div class="modal-dropdown__card--name">
                                    <img
                                        class="modal-dropdown__card--image"
                                        src="../../assets/img/credit-card.svg"
                                        alt="Credit card"
                                    />
                                    <span>Add New Card</span>
                                </div>
                            </div>
                            <div
                                v-for="(card, i) in getUserCards"
                                :key="i"
                                class="modal-dropdown__card"
                                @click="selectedCard = card"
                            >
                                <div class="modal-dropdown__card--name">
                                    <img
                                        v-if="card.cardType.startsWith('master')"
                                        class="modal-dropdown__card--image"
                                        :src="require('../../assets/img/mastercard.svg')"
                                        alt="Master card"
                                    />
                                    <img
                                        v-else-if="card.cardType.startsWith('visa')"
                                        class="modal-dropdown__card--image"
                                        :src="require('../../assets/img/visa.png')"
                                        alt="Visa"
                                    />
                                    <img
                                        v-else-if="card.cardType.startsWith('verve')"
                                        class="modal-dropdown__card--image"
                                        :src="require('../../assets/img/verve.png')"
                                        alt="Visa"
                                    />
                                    <img
                                        v-else
                                        class="modal-dropdown__card--image"
                                        :src="require('../../assets/img/credit-card.svg')"
                                        alt="Verve"
                                    />
                                    <span>{{ card.bank }}</span>
                                </div>
                                <p>**** **** ****{{ card.lastFourDigits }}</p>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="form-info">
                    <small>**Allow up to 1 business day</small>
                </div>
                <error-block type="fund" />
                <div class="modal-form__buttons">
                    <action-button type="submit" :disabled="Object.keys(issues).length > 0" :pending="loading" :classes="['btn-block', 'btn__primary']">Fund</action-button>
                </div>
            </form>

            <section v-if="currency === 'NGN'">
                <p class="text-center">Local Cards: <mark>1.5% + &#8358;100</mark></p>
                <p class="text-center">Int'l Cards: <mark>3.9% + &#8358;100</mark></p>
            </section>

            <section v-else>
                <p class="text-center">
                    <small class="grey-dark"
                        >EXCHANGE RATE:&nbsp; <span>₦{{ getExchangeRate.sell }} - $1.00</span></small
                    >
                </p>
                <p class="text-center">Local Cards: <mark>1.5% + &#8358;100</mark></p>
                <p class="text-center">Int'l Cards: <mark>3.9% + &#8358;100</mark></p>
            </section>
            <form method="post" action="https://webpay.interswitchng.com/collections/w/pay" style="margin-left: 28px">
                <strong>Redirect URL:</strong> <input name="site_redirect_url" value="./" /> <strong>Pay Item ID:</strong> <input name="pay_item_id" value="3121516" />
                <strong>Transaction Reference</strong> <input name="txn_ref" value="1545060437742" /> <strong>Amount:</strong> <input name="amount" value="10000" />
                <strong>Currency:</strong> <input name="currency" value="566" /> <strong>Customer Name</strong> <input name="cust_name" value="Blank Limited" />
                <strong>Payment Item Name</strong> <input name="pay_item_name" value="Item A" /> <strong>Display Mode:</strong> <input name="display_mode" value="PAGE" />
                <strong>Merchant Code</strong> <input name="merchant_code" value="MX12296" /> <strong>Hit submit and complete the transaction</strong>
                <input type="submit" value="Submit Form" />
            </form>
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
            flag: "START",
            activeMethod: null,
            accountHover: false,
            selectedCard: {}
        };
    },
    computed: {
        ...mapGetters(["getLoggedUser", "getExchangeRate", "getNextKYC", "getWalletTx", "getUserCards"]),
        // paystackValue() {
        //     if (!this.itemData.amount) return 0;
        //     if (this.actualValue > 2500) {
        //         const total = (+this.actualValue + 100) / (1 - 0.015);
        //         const fees = total - this.actualValue;
        //         if (fees >= 2000) {
        //             return this.actualValue + 2000;
        //         }
        //         return total;
        //     }
        //     return +this.actualValue / (1 - 0.015);
        // },
        actualValue() {
            if (!this.itemData.amount) return 0;
            if (this.currency === "NGN") return this.itemData.amount;
            return this.itemData.amount * this.getExchangeRate.sell;
        },
        // canFundGlobal() {
        //     if (this.getLoggedUser.globalKycStatus === "NONE") return 1;
        //     if (this.getLoggedUser.globalKycStatus === "PENDING") return 2;
        //     return 3;
        // },
        fundPayload() {
            const payload = {
                amount: +this.actualValue * 100,
                currency: this.currency,
                source: this.activeMethod,
                flag: this.flag
            };
            if (Object.keys(this.selectedCard).length > 0) {
                payload.card = this.selectedCard.id;
            }
            if (this.flag === "START") {
                return payload;
            }
            payload.reference = this.getWalletTx.reference;
            return payload;
        },
        bankTitle() {
            if (this.selectedCard === "input") return "Add New Card";
            if (Object.keys(this.selectedCard).length > 0) return this.selectedCard.bank;
            return "- Select Card -";
        }
    },
    methods: {
        ...mapActions(["GET_LOGGED_USER", "FUND_WALLET", "GET_EXCHANGE_RATE", "GET_USER_CARDS"]),
        ...mapMutations(["RESET_REQ"]),
        closeModal() {
            this.$emit("close");
        },
        fundWallet() {
            if (!this.fundPayload.source) {
                this.$set(this.issues, "source", true);
            }
            if (!this.itemData.amount) {
                this.$set(this.issues, "amount", "Amount is required");
                return false;
            }
            if (typeof +this.itemData.amount !== "number") {
                this.$set(this.issues, "amount", "Invalid number input");
                return false;
            }
            if (+this.itemData.amount < 1000 && this.currency === "NGN") {
                this.$set(this.issues, "amount", "Minimum funding amount is ₦1000");
                return false;
            }
            if (+this.itemData.amount < 10 && this.currency === "USD") {
                this.$set(this.issues, "amount", "Minimum funding amount is $10");
                return false;
            }
            if (Object.keys(this.issues).length > 0) {
                return false;
            }
            this.loading = true;
            this.flag = "START";
            this.FUND_WALLET(this.fundPayload).then(resp => {
                if (resp) {
                    if (Object.keys(this.selectedCard).length > 0) {
                        this.loading = false;
                        this.$emit("close", true);
                        return true;
                    }
                    this.makeTransaction();
                } else {
                    this.loading = false;
                }
            });
            return true;
        },
        makeTransaction() {
            const handler = PaystackPop.setup({
                key: process.env.VUE_APP_PAYSTACK_KEY,
                email: this.getLoggedUser.email,
                amount: this.actualValue * 100,
                firstname: this.getLoggedUser.UserKYC.firstname,
                lastname: this.getLoggedUser.UserKYC.lastname,
                ref: this.getWalletTx.reference,
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
        switchMethod(method) {
            this.issues = {};
            if (method === this.activeMethod) {
                this.activeMethod = null;
            } else this.activeMethod = method;
        },
        blurFunction() {
            this.accountHover = false;
        },
        handleReset() {
            this.issues = {};
        }
    },
    async mounted() {
        if (this.$refs.input) this.$refs.input.focus();
        this.activeMethod = "PAYSTACK";
        /**
         * TO-DO:: Put back when saved cards is ready
         */
        // await this.GET_USER_CARDS();
        // this.GET_LOGGED_USER();
        this.GET_EXCHANGE_RATE();
    }
};
</script>

<style lang="scss" scoped>
.dropdown-content {
    position: absolute;
    min-width: 200px;
    z-index: -200;
    opacity: 0;
    top: 50px;
    left: -90px;
    max-height: 0;
    height: 0;
    background-color: $white;
    // box-shadow: 0px 7px 64px rgba($color: $black, $alpha: 0.07);
    transition: all 100ms;
    border-radius: 3px;

    .modal-dropdown__card {
        display: none;
    }
}

.dropdown.active .dropdown-content {
    opacity: 1;
    z-index: 1;
    max-height: 300px;
    height: auto;
    border-color: $primary;
    overflow-y: auto;
    box-shadow: 6px 14px 15px rgba($color: $box-shadow, $alpha: 0.3);
    width: 100%;
    left: 0;
    top: 1.5rem;
    .modal-dropdown__card {
        display: flex;
    }
}
</style>
