<template>
    <main class="main" role="main">
        <section class="val-banner">
            <form @submit.prevent="getResult">
                <div class="container">
                    <div class="val-banner__row">
                        <div class="val-banner__text">
                            <h2>
                                "Bae and I have been together for
                                <input
                                    type="number"
                                    class="val-form__input"
                                    name="duration"
                                    placeholder="1"
                                    :class="{ 'is-invalid': errors.duration }"
                                    @focus="errors = {}"
                                    @input="checkDuration"
                                    v-model="itemData.duration"
                                />&nbsp;
                                <select
                                    name="interval"
                                    v-model="itemData.interval"
                                    class="val-form__select"
                                    :class="{ 'is-invalid': errors.interval }"
                                    @focus="errors = {}"
                                    @change="checkDuration"
                                >
                                    <option value="M">Months</option>
                                    <option value="Y" selected>Years</option> </select
                                >.<br />In this period,
                                <select name="" class="val-form__select" @focus="errors = {}">
                                    <option value="B">Bae has given me</option>
                                    <option value="I" selected>I've given bae</option></select
                                ><br />$
                                <select
                                    v-if="amount !== 'manual'"
                                    name="amount-select"
                                    v-model="amount"
                                    class="val-form__select"
                                    @change="checkGiftValue"
                                    :class="{ 'is-invalid': errors.amount }"
                                    @focus="errors = {}"
                                >
                                    <option value="160" selected>Airpod ($160)</option>
                                    <option value="1000">iPhone ($1,000)</option>
                                    <option value="1800">MacBook ($1,800)</option>
                                    <option value="3000">Car ($3,000)</option>
                                    <option value="50000">House ($50,000)</option>
                                    <option value="manual">Enter your gift value</option></select
                                >
                                <input
                                    v-if="amount === 'manual'"
                                    type="number"
                                    class="val-form__input"
                                    name="amount"
                                    placeholder="1000"
                                    :class="{ 'is-invalid': errors.amount }"
                                    @focus="errors = {}"
                                    v-model="itemData.amount"
                                />
                                worth of gifts."
                            </h2>
                            <p class="mt-2 mb-1">
                                <b class="val-banner__b" :class="{ 'is-invalid': errors.symbol }"
                                    >Select the asset that represents you and bae <span v-if="errors.symbol" class="val-red">**</span></b
                                >
                            </p>
                            <template v-if="searchStocks.length > 0">
                                <select name="stock-select" v-model="itemData.symbol" @focus="errors = {}" class="val-form__stock" :class="{ 'is-invalid': errors.amount }">
                                    <option :value="stock.symbol" selected v-for="(stock, i) in searchStocks" :key="i">{{ stock.name }}</option>
                                </select>
                            </template>
                            <template v-else>
                                <small
                                    >Oops! No stocks related to <strong>{{ search }}</strong></small
                                >
                                <br />
                            </template>
                            <p class="val-banner__or">OR</p>
                            <div>
                                <input
                                    placeholder="Enter Stock/ETF of Choice"
                                    type="text"
                                    name="search"
                                    class="form__input val-form__search"
                                    v-model="search"
                                    :class="{ inactive: searchStocks.length <= 0 }"
                                    @input="startSearch"
                                    autocomplete="off"
                                />
                            </div>
                            <error-block type="val" />
                        </div>
                        <div class="val-form__btn" v-if="getWindowWidth === 'mobile'">
                            <button class="btn" type="submit">
                                <span>See Results</span
                                ><svg v-if="!loading" width="84" height="27" viewBox="0 0 84 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 13.7556H81M81 13.7556L68.5981 2M81 13.7556L68.5981 25" stroke="white" stroke-width="4" />
                                </svg>
                                <img v-else :src="require('../assets/img/loader.gif')" alt="Loader" width="27px" />
                            </button>
                        </div>
                        <div class="val-banner__image" data-aos="fade-left" data-aos-duration="1000">
                            <img
                                src="../assets/img/val-lovers.png"
                                data-sizes="auto"
                                :data-src="require('../assets/img/val-lovers.png')"
                                :data-srcset="require('../assets/img/val-lovers.png')"
                                class="lazyload"
                                alt="Val Lovers"
                            />
                        </div>
                    </div>
                    <div class="val-form__btn" v-if="getWindowWidth !== 'mobile'">
                        <button class="btn" type="submit">
                            <span>See Results</span
                            ><svg v-if="!loading" width="84" height="27" viewBox="0 0 84 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 13.7556H81M81 13.7556L68.5981 2M81 13.7556L68.5981 25" stroke="white" stroke-width="4" />
                            </svg>
                            <img v-else :src="require('../assets/img/loader.gif')" alt="Loader" width="27px" />
                        </button>
                    </div>
                </div>
            </form>
        </section>

        <section class="section v2-mobile">
            <div class="container">
                <div class="row v2-mobile__row">
                    <div class="v2-mobile__image" data-aos="zoom-in-up" v-if="getWindowWidth === 'desktop'">
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/chaka-mobile.png')"
                            :data-srcset="require('../assets/img/chaka-mobile.png')"
                            class="lazyload"
                            alt="Chaka Mobile App"
                        />
                    </div>
                    <div class="v2-mobile__text">
                        <h2 class="hero__title" data-aos="fade-left">
                            Get the
                            <span class="val-red">app</span> now
                        </h2>
                        <div>
                            <a
                                href="https://play.google.com/store/apps/details?id=ng.chaka.android"
                                target="_blank"
                                rel="noreferrer noopener"
                                class="v2-mobile__active v2-mobile__active--val"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <img src="../assets/img/playstore.svg" data-aos="fade-up" data-aos-delay="250" alt="Play Store" />
                            </a>
                        </div>
                        <p class="hero__text v2-mobilie__text" data-aos="fade-left" data-aos-delay="200">
                            Keep your opportunities closer
                        </p>
                        <template v-if="getWindowWidth !== 'mobile'">
                            <div class="v2-mobile__store--logo" data-aos="fade-left" data-aos-delay="250">
                                <img src="../assets/img/val/logo-white.svg" alt="Chaka" />
                            </div>
                            <div class="d-none d-md-block v2-mobile__store v2-mobile__store--light" data-aos="fade-left" data-aos-delay="200">
                                <img src="../assets/img/appstore.svg" alt="App Store" />
                            </div>
                        </template>
                        <div v-else class="d-md-none v2-mobile__store v2-mobile__store--dark" data-aos="fade-left" data-aos-delay="200">
                            <img src="../assets/img/appstore-dark.svg" alt="App Store" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <email-subscribe />
    </main>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import "aos/dist/aos.css";
import EventBus from "../event-bus";
import AOS from "aos";
import html2canvas from "html2canvas";

export default {
    name: "Valentine",
    components: {
        EmailSubscribe: () => import("../components/EmailSubscription")
    },
    data() {
        return {
            message: null,
            amount: 0,
            errors: {},
            itemData: {},
            loading: false,
            search: null,
            activePortfolio: null,
            allPortfolios: [
                {
                    name: "Apple Inc",
                    symbol: "AAPL"
                },
                {
                    name: "Netflix Inc.",
                    symbol: "NFLX"
                },
                {
                    name: "Tesla Inc.",
                    symbol: "TSLA"
                },
                {
                    name: "Guaranty Trust Bank",
                    symbol: "GUARANTY"
                },
                {
                    name: "S&P 500 (SPDR ETF)",
                    symbol: "SPY"
                }
            ],
            finalImage: null,
            tempUrl: null
        };
    },
    computed: {
        ...mapGetters(["getWindowWidth", "getSearchInstruments"]),
        searchStocks() {
            if (this.search) {
                const splice = [...this.getSearchInstruments].splice(0, 5);
                return splice;
            }
            return this.allPortfolios;
        }
    },
    methods: {
        ...mapActions(["SEARCH_INSTRUMENTS", "GET_VAL_RESULT"]),
        ...mapMutations(["MODAL_OPENED", "RESET_REQ", "RESET_ALL", "SET_CAN_SHARE"]),
        async startSearch() {
            this.itemData.symbol = null;
            const payload = { query: this.search };
            await this.SEARCH_INSTRUMENTS(payload);
            if (this.searchStocks.length > 0) {
                this.itemData.symbol = this.searchStocks[0].symbol;
            }
        },
        getResult() {
            this.RESET_REQ();
            if (!this.itemData.duration) {
                this.$set(this.errors, "duration", true);
            }
            if (!this.itemData.amount) {
                this.$set(this.errors, "amount", true);
            }
            if (!this.itemData.symbol) {
                this.$set(this.errors, "symbol", true);
            }
            if (!this.itemData.interval) {
                this.$set(this.errors, "interval", true);
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.loading = true;
            const payload = { ...this.itemData };
            payload.amount *= 100;
            this.encrypt();
            mixpanel.track("LOVE_PAGE_RESULT");
            this.SET_CAN_SHARE(true);
            this.$router.push({ name: "valentine-result", params: { code: this.encrypted } });
        },
        checkGiftValue() {
            if (this.amount !== "manual") {
                this.itemData.amount = this.amount;
            }
        },
        checkDuration() {
            if ((this.itemData.interval === "Y" && this.itemData.duration > 5) || (this.itemData.interval === "M" && this.itemData.duration > 60)) {
                setTimeout(() => {
                    this.itemData.duration = this.itemData.interval === "M" ? 60 : 5;
                }, 500);
            }
        },
        cipher(salt) {
            const textToChars = text => text.split("").map(c => c.charCodeAt(0));
            const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
            const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

            return text =>
                text
                    .split("")
                    .map(textToChars)
                    .map(applySaltToChar)
                    .map(byteHex)
                    .join("");
        },
        encrypt() {
            const cipher = this.cipher(process.env.VUE_APP_CRYPTO_KEY);
            const text = Object.values(this.itemData).map(el => el);
            this.encrypted = cipher(text.join("|"));
        }
    },
    mounted() {
        mixpanel.track("LOVE_PAGE");
        document.title = "Chaka - Relationship Net worth Calculator";
        document.getElementsByTagName("meta").keywords.content =
            "nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse";
        document.getElementsByTagName("meta").description.content =
            "Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.";
        this.itemData.interval = "Y";
        this.amount = 1000;
        this.checkGiftValue();
        this.itemData.symbol = "AAPL";
    },
    created() {
        AOS.init({
            duration: 400,
            delay: 100,
            easing: "ease-in-out",
            mirror: false,
            startEvent: "DOMContentLoaded",
            anchorPlacement: "top-center",
            once: true,
            offset: 50
        });
        this.RESET_ALL();
    }
};
</script>

<style lang="scss" scoped>
.modal {
    &-container {
        padding: 0;
        @include tablet {
            max-width: 848px;
        }
    }
    &-body {
        margin: 0;
        padding: 2rem 3rem;

        @include mobile {
            padding: 2rem 1.5rem;
        }
    }
    &-flex {
        display: flex;
        flex-wrap: wrap;
    }
    &-image {
        display: flex;
        align-items: flex-end;
        img {
            object-fit: contain;
            width: 100%;
            height: 100%;
            max-height: 350px;
            padding-left: 2rem;
            object-position: right;

            @include mobile {
                object-fit: cover;
                object-position: center;
                padding: 0;
                border-radius: 6px;
                margin-bottom: 1rem;
            }
        }
        flex: 0 0 100%;
        @include mobile {
            height: 200px;
            width: 100%;
        }
        @include tablet {
            flex: 0 0 60%;
            max-width: 60%;
        }
    }
    &-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1 {
            word-break: break-word;
        }
        @include mobile {
            order: 1;
        }
        @include tablet {
            h1 {
                display: inline-block;
            }
        }
        @include tablet {
            flex: 0 0 40%;
            max-width: 40%;
        }

        &__box {
            margin-bottom: 1rem;
        }

        &__message {
            line-height: 2;
        }

        &__net-earning {
            font-size: 2rem;
            font-weight: bold;
            line-height: 1.2;
        }

        &__powered {
            text-align: right;
            font-size: 0.725rem;

            svg {
                vertical-align: text-top;
                margin-left: 2px;
            }
        }
    }
    &-socials {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 1rem 0.5rem 1.5rem;
        border: 1px solid $primary;
        max-width: 500px;
        margin: 2rem auto 0;
        box-shadow: 0px 0px 30px 5px rgba($color: $box-shadow, $alpha: 0.425);

        & > div {
            flex: 0 0 100%;
            text-align: center;
            margin-bottom: 1rem;
        }
    }
    &__underlay {
        background-color: rgba($color: $black, $alpha: 0.625);
    }
}
</style>
