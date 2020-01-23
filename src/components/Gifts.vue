<template>
    <Fragment>
        <div class="app-body">
            <section class="gift__header">
                <div class="gift__header--text">
                    <h4 class="hero__title hero__title--small" v-if="!isRedeem">
                        Share the fun of shareholding with a gift of stock.
                    </h4>
                    <h4 class="hero__title hero__title--small" v-else>
                        Cheers! You’ve receieved a gift from someone
                    </h4>
                    <div v-if="getWindowWidth === 'mobile'">
                        <img src="../assets/img/gifts.svg" alt="Gifts" />
                    </div>
                    <p class="hero__text">
                        It's the gift of wealth building. Give either a specific stock or give them
                        cash and let them build their portfolio.
                    </p>
                </div>
                <div class="gift__header--image" v-if="getWindowWidth !== 'mobile'">
                    <img src="../assets/img/gifts.svg" alt="Gifts" />
                </div>
            </section>

            <form @submit.prevent="makeTransaction" novalidate v-if="!isRedeem">
                <section>
                    <div class="gift-form__box">
                        <!-- <div>
                            <label class="grey-dark"
                                >YOUR NAME<input
                                    type="text"
                                    required
                                    class="form--input"
                                    placeholder="Sender Name"
                            /></label>
                        </div> -->
                        <div>
                            <label class="grey-dark"
                                >EMAIL ADDRESS<input
                                    type="email"
                                    v-model="itemData.senderEmail"
                                    required
                                    class="form--input"
                                    :class="{ invalid: errors.senderEmail }"
                                    @focus="errors = {}"
                                    placeholder="Your Email Address"
                            /></label>
                            <p class="form-error" v-if="errors.senderEmail">
                                <small>{{ errors.senderEmail }}</small>
                            </p>
                        </div>
                        <div>
                            <label class="grey-dark"
                                >RECIPIENT EMAIL ADDRESS<input
                                    v-model="itemData.receiverEmail"
                                    type="email"
                                    required
                                    class="form--input"
                                    :class="{ invalid: errors.receiverEmail }"
                                    @focus="errors = {}"
                                    placeholder="Recipient Email Address"
                            /></label>
                            <p class="form-error" v-if="errors.receiverEmail">
                                <small>{{ errors.receiverEmail }}</small>
                            </p>
                        </div>
                    </div>
                    <!-- <div class="gift-form__box">
                        <div>
                            <label class="grey-dark"
                                >RECIPIENT NAME<input
                                    type="text"
                                    required
                                    class="form--input"
                                    placeholder="Receiver Name"
                            /></label>
                        </div>
                    </div> -->
                    <div class="gift-form__box">
                        <div>
                            <label class="grey-dark"
                                >GIFT DELIVERY DATE (OPTIONAL)<input
                                    type="date"
                                    v-model="fromDate"
                                    required
                                    class="form--input"
                                    placeholder="Recipient Email Address"
                            /></label>
                        </div>
                        <div>
                            <label class="grey-dark"
                                >OPTIONAL GIFT MESSAGE<input
                                    type="text"
                                    class="form--input"
                                    placeholder="Write a short note for the receiver"
                            /></label>
                        </div>
                    </div>
                </section>

                <section class="gift__stock--section">
                    <div class="gift__stock--title">
                        <p>
                            SELECT STOCK<span class="form-error" v-if="errors.instrumentSymbol"
                                >&nbsp;**</span
                            >
                        </p>
                        <div class="gift__stock--search">
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M10.3916 9.46977H9.72651L9.47711 9.22038C10.3084 8.30592 10.8072 7.05893 10.8072 5.72881C10.8072 2.73604 8.39639 0.325195 5.40361 0.325195C2.41084 0.325195 0 2.73604 0 5.72881C0 8.72158 2.41084 11.1324 5.40361 11.1324C6.73373 11.1324 7.98072 10.6336 8.89518 9.8023L9.14458 10.0517V10.7168L13.3012 14.8734L14.5482 13.6264L10.3916 9.46977V9.46977ZM5.40361 9.46988C3.3253 9.46988 1.66265 7.80723 1.66265 5.72892C1.66265 3.6506 3.3253 1.98795 5.40361 1.98795C7.48193 1.98795 9.14458 3.6506 9.14458 5.72892C9.14458 7.80723 7.48193 9.46988 5.40361 9.46988V9.46988Z"
                                    fill="#828282"
                                />
                            </svg>
                            <input
                                placeholder="Search"
                                type="text"
                                name="search"
                                class="form__input form__input--search"
                                v-model="search"
                                @input="startSearch"
                            />
                        </div>
                    </div>

                    <div class="gift__stock--box">
                        <template v-if="searchLoading">
                            <div v-for="i in 5" :key="i" class="gift__stock loader"></div
                        ></template>
                        <template v-else-if="filteredSearch.length > 0">
                            <div
                                class="gift__stock"
                                @click="selectStock(stock)"
                                :class="{ active: stock.symbol === selectedInstrument.symbol }"
                                v-for="(stock, i) in filteredSearch"
                                :key="i"
                            >
                                <img :src="stock.logoUrl" :alt="stock.symbol" />
                            </div>
                        </template>
                        <template v-else>
                            <div class="gift__stock--border">
                                There are no instruments starting with<br /><strong>{{
                                    search
                                }}</strong>
                            </div>
                        </template>
                    </div>
                    <br />
                </section>

                <section class="gift__amount">
                    <div class="gift__amount--left">
                        <div class="gift__choose">
                            <h5 class="grey-dark">CHOOSE AMOUNT</h5>
                            <div class="gift__choose--radio">
                                <input
                                    type="radio"
                                    name="currency"
                                    v-model="itemData.currency"
                                    value="NGN"
                                    id="naira"
                                />
                                <label class="mr-3" for="naira">Naira</label>
                                <input
                                    v-model="itemData.currency"
                                    type="radio"
                                    name="currency"
                                    value="USD"
                                    id="dollars"
                                /><label for="dollars">Dollars</label>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div>
                            <label>
                                <input
                                    :min="minValue"
                                    :max="maxValue"
                                    :step="inputStep"
                                    type="range"
                                    class="form__range"
                                    id="range"
                                    v-model="value"
                            /></label>
                        </div>
                        <br />
                        <br />
                        <div class="gift__currency">
                            <p class="grey-dark">
                                <small>{{ minValue | currency(itemData.currency, true, 0) }}</small>
                            </p>
                            <label class="primary"
                                >{{ itemData.currency === "NGN" ? "&#8358;" : "$" }}
                                <!-- <currency-input
                                    :currency="itemData.currency"
                                    placeholder="Enter Amount"
                                    v-model="itemData.amountCash"
                                    @reset="errors = {}"
                                    :error-message="errors.amountCash"
                                /> -->
                                <input
                                    type="number"
                                    name="currency"
                                    v-model="itemData.amountCash"
                                    @input="typeAmount"
                                    @blur="checkAmount"
                                />
                            </label>
                            <p class="grey-dark">
                                <small>{{ maxValue | currency(itemData.currency, true, 0) }}</small>
                            </p>
                        </div>
                    </div>
                    <div class="gift__amount--right">
                        <div v-if="selectedInstrument.logoUrl">
                            <img
                                class="gift__total--image"
                                :src="selectedInstrument.logoUrl"
                                :alt="selectedInstrument.symbol"
                            />
                        </div>
                        <div v-else>
                            <p class="gift__choice">Gift of choice</p>
                        </div>
                        <div class="gift__total">
                            <p>Amount</p>
                            <p>
                                {{ itemData.amountCash | currency(itemData.currency, true) }}
                            </p>
                        </div>
                        <div class="gift__total">
                            <p>Total</p>
                            <p>
                                {{ itemData.amountCash | currency(itemData.currency, true) }}
                            </p>
                        </div>
                    </div>
                </section>
                <error-block type="gift" />
                <section class="text-center">
                    <button
                        class="btn gift__btn btn__primary"
                        type="submit"
                        :disabled="Object.keys(errors).length > 0"
                    >
                        Buy Gift<svg
                            width="18"
                            height="10"
                            viewBox="0 0 18 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.0007 9.0649V6.85611L1.23842 6.85611C0.965729 6.85611 0.720306 6.63796 0.720306 6.338V3.96559C0.720306 3.6929 0.938459 3.44748 1.23842 3.44748L11.0007 3.44748V1.23868C11.0007 0.829648 11.4643 0.584226 11.8188 0.802379L14.5457 2.68394L17.4635 4.70185C17.7635 4.92001 17.7635 5.35631 17.4635 5.54719L14.5457 7.61964L11.8188 9.50121C11.4643 9.71936 11.0007 9.47394 11.0007 9.0649Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </section>
            </form>

            <form @submit.prevent="redeemGift" novalidate v-else>
                <section>
                    <div class="gift-form__box">
                        <div>
                            <label class="grey-dark"
                                >REDEEM CODE<input
                                    type="email"
                                    v-model="redeemData.redeemCode"
                                    required
                                    class="form--input"
                                    :class="{ invalid: errors.redeemCode }"
                                    @focus="errors = {}"
                                    placeholder="Enter your redeem code"
                            /></label>
                            <p class="form-error" v-if="errors.redeemCode">
                                <small>{{ errors.redeemCode }}</small>
                            </p>
                        </div>
                        <div></div>
                    </div>
                </section>

                <section class="gift__stock--section">
                    <div class="gift__stock--title">
                        <p>
                            SELECT STOCK<span class="form-error" v-if="errors.instrumentSymbol"
                                >&nbsp;**</span
                            >
                        </p>
                        <div class="gift__stock--search">
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M10.3916 9.46977H9.72651L9.47711 9.22038C10.3084 8.30592 10.8072 7.05893 10.8072 5.72881C10.8072 2.73604 8.39639 0.325195 5.40361 0.325195C2.41084 0.325195 0 2.73604 0 5.72881C0 8.72158 2.41084 11.1324 5.40361 11.1324C6.73373 11.1324 7.98072 10.6336 8.89518 9.8023L9.14458 10.0517V10.7168L13.3012 14.8734L14.5482 13.6264L10.3916 9.46977V9.46977ZM5.40361 9.46988C3.3253 9.46988 1.66265 7.80723 1.66265 5.72892C1.66265 3.6506 3.3253 1.98795 5.40361 1.98795C7.48193 1.98795 9.14458 3.6506 9.14458 5.72892C9.14458 7.80723 7.48193 9.46988 5.40361 9.46988V9.46988Z"
                                    fill="#828282"
                                />
                            </svg>
                            <input
                                placeholder="Search"
                                type="text"
                                name="search"
                                class="form__input form__input--search"
                                v-model="search"
                                @input="startSearch"
                            />
                        </div>
                    </div>

                    <div class="gift__stock--box">
                        <template v-if="searchLoading">
                            <div v-for="i in 5" :key="i" class="gift__stock loader"></div
                        ></template>
                        <template v-else-if="filteredSearch.length > 0">
                            <div
                                class="gift__stock"
                                @click="selectStock(stock)"
                                :class="{ active: stock.symbol === selectedInstrument.symbol }"
                                v-for="(stock, i) in filteredSearch"
                                :key="i"
                            >
                                <img :src="stock.logoUrl" :alt="stock.symbol" />
                            </div>
                        </template>
                        <template v-else>
                            <div class="gift__stock--border">
                                There are no instruments starting with<br /><strong>{{
                                    search
                                }}</strong>
                            </div>
                        </template>
                    </div>
                    <br />
                </section>

                <error-block type="gift" />

                <section class="text-center">
                    <button
                        class="btn gift__btn btn__primary"
                        type="submit"
                        :disabled="Object.keys(errors).length > 0"
                    >
                        Redeem Gift<svg
                            width="18"
                            height="10"
                            viewBox="0 0 18 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.0007 9.0649V6.85611L1.23842 6.85611C0.965729 6.85611 0.720306 6.63796 0.720306 6.338V3.96559C0.720306 3.6929 0.938459 3.44748 1.23842 3.44748L11.0007 3.44748V1.23868C11.0007 0.829648 11.4643 0.584226 11.8188 0.802379L14.5457 2.68394L17.4635 4.70185C17.7635 4.92001 17.7635 5.35631 17.4635 5.54719L14.5457 7.61964L11.8188 9.50121C11.4643 9.71936 11.0007 9.47394 11.0007 9.0649Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </section>
            </form>
        </div>

        <section class="gift__blue">
            <div class="container">
                <h6 class="section__caption">START TRADING NOW</h6>
                <h1>Why they'll love it</h1>
                <div class="gift__hero">
                    <div class="gift__hero--logos">
                        <img src="../assets/img/gift-logos.png" alt="Gift logos" />
                    </div>
                    <div class="gift__hero--text">
                        <p>
                            Its gift that keeps on growing. 10 years from now, they'll still be
                            thanking you. You can either give a specific stock or give them cash and
                            let them build their portfolio. Its More than just the gift of stock.
                            This is the gift of wealth building. Open up another shared interest
                            with your loved one
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="container">
            <h6 class="section__caption">START TRADING NOW</h6>
            <h1>Frequently Asked</h1>
            <br />
            <br />
            <FAQ topic="Stock Gifts" />
            <p>
                Have more questions? See all
                <router-link :to="{ name: 'faq' }" class="primary">FAQs</router-link> or contact us
            </p>
        </section>

        <EmailSubscribe />
    </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name: "GiftComponent",
    components: {
        Fragment,
        FAQ: () => import("./FAQ"),
        EmailSubscribe: () => import("./EmailSubscription"),
        CurrencyInput: () => import("./form/CurrencyInput")
    },
    data() {
        return {
            itemData: {
                currency: "NGN",
                instrumentSymbol: null
            },
            redeemData: {},
            value: this.minValue,
            search: null,
            searchLoading: false,
            errors: {},
            selectedInstrument: {},
            fromDate: null,
            isRedeem: true
        };
    },
    computed: {
        ...mapGetters(["getWindowWidth", "getMostPopular", "getSearchInstruments"]),
        maxValue() {
            return this.itemData.currency === "USD" ? 10000 : 5000000;
        },
        minValue() {
            return this.itemData.currency === "USD" ? 10 : 1000;
        },
        inputStep() {
            return this.itemData.currency === "USD" ? 100 : 1000;
        },
        filteredSearch() {
            const splice = [...this.getSearchInstruments].splice(0, 5);
            return splice;
        }
    },
    methods: {
        ...mapActions(["GET_MOST_POPULAR", "SEARCH_INSTRUMENTS", "CREATE_GIFTCARD", "REDEEM_GIFTCARD"]),
        ...mapMutations(["SET_GIFT_SUCCESS_MODAL"]),
        typeAmount() {
            if (
                this.itemData.amountCash > this.minValue &&
                this.itemData.amountCash <= this.maxValue
            ) {
                this.value = +this.itemData.amountCash;
            }
        },
        checkAmount() {
            if (+this.itemData.amountCash < this.minValue) {
                this.$set(this.itemData, "amountCash", this.minValue);
                return true;
            }
            if (+this.itemData.amountCash > this.maxValue) {
                this.$set(this.itemData, "amountCash", this.maxValue);
            }
            this.value = +this.itemData.amountCash;
        },
        async startSearch() {
            // if (this.search.length > 2) {
            this.searchLoading = true;
            const payload = { query: this.search };
            await this.SEARCH_INSTRUMENTS(payload);
            this.searchLoading = false;
            // }
        },
        selectStock(instrument) {
            if (instrument.symbol === this.itemData.instrumentSymbol) {
                this.selectedInstrument = {};
                const { instrumentSymbol, ...others } = this.itemData;
                this.itemData = others;
            } else {
                this.selectedInstrument = instrument;
                this.itemData.instrumentSymbol = instrument.symbol;
            }
        },
        redeemGift() {
            this.redeemData.receiverEmail = 'test@me.com'
            if (!this.redeemData.redeemCode) {
                this.$set(this.errors, "redeemCode", "Redeem code is required");
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.REDEEM_GIFTCARD(this.redeemData).then(resp=>{
                if(resp){
                    this.SET_GIFT_SUCCESS_MODAL(true)
                }
            })

            /**
             * TO-DO:: Implement redeem gift api call
             */
            console.log(this.redeemData);
        },
        makeTransaction() {
            if (!this.itemData.senderEmail) {
                this.$set(this.errors, "senderEmail", "Your email is required");
            }
            if (!this.itemData.receiverEmail) {
                this.$set(this.errors, "receiverEmail", "Receiver's email is required");
            }
            if (!this.itemData.instrumentSymbol) {
                this.$set(this.errors, "instrumentSymbol", "Stock is required");
            }
            if (!this.itemData.amountCash) {
                this.$set(this.errors, "amountCash", "Please select amount");
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            const handler = PaystackPop.setup({
                key: process.env.VUE_APP_PAYSTACK_KEY,
                email: this.itemData.senderEmail,
                amount: this.itemData.amountCash * 100,
                onClose: resp => {
                    // this.loading = false;
                    // this.flag = "CANCEL";
                    // this.FUND_WALLET(this.fundPayload);
                },
                callback: response => {
                    if (response.status === "success") {
                        this.itemData.paymentReference = response.reference;
                        this.createGift();
                        // this.flag = "SUCCESS";
                        // this.FUND_WALLET(this.fundPayload).then(resp => {
                        //     this.loading = false;
                        //     if (resp) {
                        //         this.$emit("close", true);
                        //         return true;
                        //     }
                        //     return false;
                        // });
                    }
                }
            });
            handler.openIframe();
        },
        createGift() {
            this.CREATE_GIFTCARD(this.itemData).then(resp => {
                if (resp) {
                    this.SET_GIFT_SUCCESS_MODAL(true);
                }
            });
        }
    },
    async mounted() {
        this.itemData.currency = "NGN";
        // this.itemData.senderEmail = "test@me.com";
        // this.itemData.receiverEmail = "janet@chaka.ng";
        // this.itemData.instrumentSymbol = 'AAPL'
        this.value = this.minValue;
        this.fromDate = this.$options.filters.reverseDate(Date.now());
        const payload = {
            query: "a"
        };
        await this.SEARCH_INSTRUMENTS(payload);
        /**
         * TO-DO :: Put back when most popular stocks are available
         */
        // await this.GET_MOST_POPULAR();
    },
    watch: {
        value() {
            this.itemData.amountCash = +this.value;
        },
        "itemData.currency"() {
            this.value = this.minValue;
        }
    }
};
</script>

<style lang="scss" scoped>
h1 {
    font-weight: normal;
}
</style>
