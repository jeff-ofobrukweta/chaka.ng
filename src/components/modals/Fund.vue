<template>
    <div>
        <modal :close-on-click="false" @close="closeModal">
            <template slot="header">Fund Account</template>
            <template slot="subheader">
                <div class="modal-sub__box">
                    <div class="modal-sub">
                        <button class="btn" @click="switchCurrency('USD')" :class="{ active: currency === 'USD' }" :disabled="loading">
                            $
                        </button>
                        <button class="btn" @click="switchCurrency('NGN')" :class="{ active: currency === 'NGN' }" :disabled="loading">
                            ₦
                        </button>
                    </div>
                </div>
            </template>
            <div class="modal-form">
                <div class="modal-form__group">
                    <label class="form__label">Select Payment Mode <span class="form-error" v-if="issues.source">*required</span></label>
                    <div class="modal-fund__images">
                        <!-- <img
                            @click="switchMethod('INTERSWITCH')"
                            :class="{ active: activeMethod === 'INTERSWITCH', 'no-hover': loading }"
                            src="../../assets/img/quickteller.png"
                            alt="Pay with quickteller"
                        /> -->
                        <img
                            @click="switchMethod('MONNIFY')"
                            :class="{ active: activeMethod === 'MONNIFY', 'no-hover': loading }"
                            src="../../assets/img/monify.png"
                            alt="Pay with monnify"
                        />
                        <div @click="switchMethod('BANK')" :class="{ active: activeMethod === 'BANK', 'no-hover': loading }">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)">
                                    <path d="M10.8398 7.33752H12.4803V11.2656H10.8398V7.33752Z" fill="#8A939A" />
                                    <path d="M7.73303 7.33752H9.37366V11.2656H7.73303V7.33752Z" fill="#8A939A" />
                                    <path d="M4.62631 7.33752H6.26694V11.2656H4.62631V7.33752Z" fill="#8A939A" />
                                    <path d="M1.51971 7.33752H3.16023V11.2656H1.51971V7.33752Z" fill="#8A939A" />
                                    <path
                                        d="M13.0273 6.10706V5.6969H0.972839V6.10706C0.972839 6.3336 1.15645 6.51721 1.383 6.51721H12.6171C12.8436 6.51721 13.0273 6.3336 13.0273 6.10706Z"
                                        fill="#8A939A"
                                    />
                                    <path
                                        d="M13.5896 12.0859H0.410583C0.184036 12.0859 0.000427246 12.2695 0.000427246 12.4961V13.5898C0.000427246 13.8164 0.184036 14 0.410583 14H13.5896C13.8162 14 13.9998 13.8164 13.9998 13.5898V12.4961C13.9998 12.2695 13.8162 12.0859 13.5896 12.0859Z"
                                        fill="#8A939A"
                                    />
                                    <path
                                        d="M0.410149 4.87659H13.5898C13.7733 4.87659 13.9345 4.75471 13.9845 4.57816C14.0344 4.4016 13.9611 4.21329 13.8048 4.11716L7.21499 0.0608826C7.08319 -0.0202942 6.91688 -0.0202942 6.78497 0.0608826L0.195138 4.11716C0.0388732 4.21339 -0.0343993 4.4016 0.0155883 4.57816C0.0655761 4.75471 0.226754 4.87659 0.410149 4.87659V4.87659ZM6.7212 2.41245H7.27887C7.50541 2.41245 7.68902 2.59605 7.68902 2.8226C7.68902 3.04915 7.50541 3.23276 7.27887 3.23276H6.7212C6.49466 3.23276 6.31105 3.04915 6.31105 2.8226C6.31105 2.59605 6.49466 2.41245 6.7212 2.41245V2.41245Z"
                                        fill="#8A939A"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Bank
                        </div>
                        <img
                            @click="switchMethod('PAYSTACK')"
                            :class="{ active: activeMethod === 'PAYSTACK', 'no-hover': loading }"
                            src="../../assets/img/paystack.png"
                            alt="Pay with paystack"
                        />
                    </div>
                </div>
            </div>

            <template v-if="activeMethod === 'BANK'">
                <div class="modal-form" v-if="currency === 'NGN'">
                    <p class="text-center"><mark class="warning">For Naira Payments Only</mark></p>
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
                    <p class="text-center"><mark class="warning">For Dollar Payments Only</mark></p>
                    <br />

                    <p>
                        To fund your account through a domiciliary account transfer (without fees), make a transfer to:
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
            <template v-else-if="activeMethod === 'INTERSWITCH'">
                <form class="modal-form" @submit.prevent="fundWallet" v-if="!showISWButton">
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
                <div v-show="showISWButton" class="ISWDiv-box">
                    <div class="ISWDiv" id="ISWDiv">
                        <p>Click the button below to confirm payment of {{ itemData.amount | currency(currency) }}</p>
                    </div>
                    <div class="ISWDiv-loading"><img :src="require('../../assets/img/loader.gif')" alt="Loading" width="28px" /></div>
                </div>

                <section class="text-center" v-if="currency === 'USD'">
                    <p class="form-info">
                        Please note that if you use an international card, your transaction may incur other bank charges that can slightly decrease the funding amount deposited.
                    </p>
                    <br />
                    <p class="mb-1">
                        <small class="grey-dark"
                            >EXCHANGE RATE:&nbsp; <span>₦{{ getExchangeRate.sell }} - $1.00</span></small
                        >
                    </p>
                </section>
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

                <section class="text-center">
                    <template v-if="currency === 'USD'">
                        <p class="form-info">
                            Please note that if you use an international card, your transaction may incur other bank charges that can slightly decrease the funding amount
                            deposited.
                        </p>
                        <br />
                        <p class="mb-1">
                            <small class="grey-dark"
                                >EXCHANGE RATE:&nbsp; <span>₦{{ getExchangeRate.sell }} - $1.00</span></small
                            >
                        </p>
                    </template>
                    <template v-if="activeMethod === 'PAYSTACK'">
                        <div class="mark">
                            <p class="text-center">Paystack Fees</p>
                            <p>Local Cards: 1.5% + &#8358;100 (Capped at &#8358;2000)</p>
                            <p>Int'l Cards: 3.9% + &#8358;100</p>
                        </div>
                    </template>
                    <template v-else-if="activeMethod === 'MONNIFY'">
                        <div class="mark">
                            <p class="text-center">Monnify Fees</p>
                            <p>Cards: 1.3% (Capped at &#8358;2000)</p>
                            <p>Bank Transfer: 0.75% (Capped at &#8358;200)</p>
                        </div>
                    </template>
                </section>
            </template>
            <form hidden id="form1" method="post" action="https://qa.interswitchng.com/collections/w/pay">
                <input name="site_redirect_url" :value="currentRoute" />
                <input name="pay_item_id" value="7202960" />
                <input name="txn_ref" id="tranRef" :value="getWalletTx.reference" />
                <input name="amount" :value="actualValue * 100" />
                <input name="currency" :value="iswCurrency" />

                <input name="cust_name" :value="userName" />
                <input name="cust_email" :value="getLoggedUser.email" />
                <input name="cust_mobile_no" value="08029075365" />
                <input name="pay_item_name" value="Item A" />
                <input name="display_merchant_name" value="Chaka Technologies" />

                <input name="display_mode" value="PAGE" />
                <input name="merchant_code" value="MX13948" />

                <input type="submit" value="Submit Form" />
            </form>
        </modal>
    </div>
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
            currency: "USD",
            flag: "START",
            activeMethod: null,
            accountHover: false,
            selectedCard: {},
            showISWPayment: false,
            currentRoute: null,
            showISWButton: false
        };
    },
    computed: {
        ...mapGetters(["getLoggedUser", "getExchangeRate", "getWalletTx", "getUserCards"]),
        actualValue() {
            if (!this.itemData.amount) return 0;
            if (this.currency === "NGN") return this.itemData.amount;
            return this.itemData.amount * this.getExchangeRate.sell;
        },
        userName() {
            return this.getLoggedUser.UserKYC.firstname ? `${this.getLoggedUser.UserKYC.firstname} ${this.getLoggedUser.UserKYC.lastname}` : this.getLoggedUser.email;
        },
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
        },
        iswCurrency() {
            if (this.currency === "USD") return 840;
            return 566;
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
                    if (this.fundPayload.source === "PAYSTACK") {
                        this.payWithPaystack();
                    } else if (this.fundPayload.source === "MONNIFY") {
                        this.payWithMonnify();
                    } else {
                        this.createISWScript();
                    }
                } else {
                    this.loading = false;
                }
            });
            return true;
        },
        payWithPaystack() {
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
        payWithMonnify() {
            MonnifySDK.initialize({
                amount: this.actualValue,
                currency: "NGN",
                reference: this.getWalletTx.reference,
                customerFullName: this.userName,
                customerEmail: this.getLoggedUser.email,
                customerMobileNumber: this.getLoggedUser.phone,
                apiKey: process.env.VUE_APP_MONNIFY_KEY,
                contractCode: process.env.VUE_APP_MONNIFY_CONTRACT_CODE,
                paymentDescription: "Chaka Technologies",
                isTestMode: process.env.VUE_APP_MONNIFY_TEST_MODE,
                onComplete: response => {
                    if (response.paymentStatus === "PAID") {
                        this.flag = "SUCCESS";
                        const payload = { ...this.fundPayload };
                        payload.transactionreference = response.transactionReference;
                        this.FUND_WALLET(payload).then(resp => {
                            this.loading = false;
                            if (resp) {
                                this.$emit("close", true);
                                return true;
                            }
                            return false;
                        });
                    } else if (response.paymentStatus === "USER_CANCELLED") {
                        this.loading = false;
                        this.flag = "CANCEL";
                        this.FUND_WALLET(this.fundPayload);
                    } else {
                        this.flag = "FAIL";
                        this.FUND_WALLET(this.fundPayload).then(resp => {
                            this.loading = false;
                            return false;
                        });
                    }
                },
                onClose: data => {
                    this.loading = false;
                    if (this.flag === "START") {
                        this.flag = "CANCEL";
                        this.FUND_WALLET(this.fundPayload);
                    }
                }
            });
        },
        payWithISW() {
            const data = localStorage.isISWBack;
            if (data !== "undefined") {
                localStorage.setItem("isISWBack", "undefined");
                const response = JSON.parse(data);
                this.showISWButton = false;
                if (response.resp === "00") {
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
        },
        createISWScript() {
            const div = document.querySelector("#ISWDiv");
            const aTag = document.createElement("a");
            aTag.setAttribute("data-isw-payment-button", true);
            aTag.setAttribute("data-isw-ref", process.env.VUE_APP_ISW_REF);

            const script = document.createElement("script");
            script.setAttribute("data-isw-trans-amount", this.actualValue * 100);
            script.setAttribute("type", "text/javascript");
            script.setAttribute("data-isw-customer-ref", this.getWalletTx.reference);
            script.setAttribute("data-isw-customer-callback", "ISWCallback");
            script.setAttribute("src", process.env.VUE_APP_ISW_URL);

            aTag.appendChild(script);
            div.appendChild(aTag);

            this.loading = false;
            this.showISWButton = true;
        },
        submitForm() {
            document.getElementById("form1").submit();
        },
        switchCurrency(currency) {
            this.showISWButton = false;
            this.currency = currency;
            this.handleReset();
        },
        switchMethod(method) {
            this.RESET_REQ();
            this.showISWButton = false;
            this.issues = {};
            if (!this.loading) this.activeMethod = method;
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
        this.activeMethod = "MONNIFY";
        /**
         * TO-DO:: Put back when saved cards is ready
         */
        // await this.GET_USER_CARDS();
        // this.GET_LOGGED_USER();
        this.GET_EXCHANGE_RATE();
        localStorage.setItem("isISWBack", "undefined");
        window.addEventListener("storage", () => {
            if (localStorage.isISWBack && localStorage.isISWBack !== "undefined") {
                this.loading = true;
                this.payWithISW();
                return true;
            }
        });
    },
    beforeDestroy() {
        localStorage.removeItem("isISWBack");
        window.removeEventListener("storage", () => {});
        const iframe = document.querySelector("iframe");
        const div = document.querySelector("#ISWDiv");
        if (div) {
            if (div.contains(iframe)) {
                div.removeChild(iframe);
            }
        }
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

.ISWDiv {
    color: $grey-cool;
    text-align: center;
    position: relative;
    z-index: 1;
    p {
        margin-bottom: 1rem;
    }
    &-loading {
        position: absolute;
        text-align: center;
        bottom: 6px;
        left: 0;
        right: 0;
    }
    &-box {
        position: relative;
        min-height: 90px;
    }
}
.no-hover {
    cursor: no-drop;
}
</style>
