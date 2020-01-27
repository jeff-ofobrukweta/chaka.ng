<template>
    <main class="main" role="main">
        <section class="val-banner">
            <form @submit.prevent="getResult">
                <div class="container">
                    <div class="val-banner__row">
                        <div class="val-banner__text">
                            <h2>
                                We have been together for
                                <input
                                    type="number"
                                    class="val-form__input"
                                    name="duration"
                                    placeholder="1"
                                    :class="{ 'is-invalid': errors.duration }"
                                    @focus="errors = {}"
                                    v-model="itemData.duration"
                                />&nbsp;
                                <select
                                    name="interval"
                                    v-model="itemData.interval"
                                    class="val-form__select"
                                    :class="{ 'is-invalid': errors.interval }"
                                    @focus="errors = {}"
                                >
                                    <option value="D">Days</option>
                                    <option value="W" selected>Weeks</option>
                                    <option value="M">Months</option>
                                    <option value="Y">Years</option> </select
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
                                <b class="val-banner__b" :class="{ 'is-invalid': errors.duration }"
                                    >Please select <span class="val-red">ONE</span> of the
                                    Portfolio/ETFs provided
                                    <span v-if="errors.duration" class="val-red">**</span></b
                                >
                            </p>
                            <template v-if="searchStocks.length > 0">
                                <div
                                    v-for="(portfolio, i) in searchStocks"
                                    :key="i"
                                    class="val-banner__check"
                                    @click="setActive(portfolio.symbol)"
                                >
                                    <div
                                        class="val-banner__check--box"
                                        :class="{ active: activePortfolio === portfolio.symbol }"
                                    ></div>
                                    <div class="val-banner__check--text">{{ portfolio.name }}</div>
                                </div>
                            </template>
                            <template v-else>
                                <small
                                    >Oops! No stocks related to <strong>{{ search }}</strong></small
                                >
                                <br />
                            </template>
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
                        <div class=" val-form__btn" v-if="getWindowWidth === 'mobile'">
                            <button class="btn" type="submit">
                                <span>See Results</span
                                ><svg
                                    v-if="loading"
                                    width="84"
                                    height="27"
                                    viewBox="0 0 84 27"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 13.7556H81M81 13.7556L68.5981 2M81 13.7556L68.5981 25"
                                        stroke="white"
                                        stroke-width="4"
                                    />
                                </svg>
                                <img
                                    v-else
                                    :src="require('../assets/img/loader.gif')"
                                    alt="Loader"
                                    width="27px"
                                />
                            </button>
                        </div>
                        <div
                            class="val-banner__image"
                            data-aos="fade-left"
                            data-aos-duration="1000"
                        >
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
                            ><svg
                                v-if="!loading"
                                width="84"
                                height="27"
                                viewBox="0 0 84 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 13.7556H81M81 13.7556L68.5981 2M81 13.7556L68.5981 25"
                                    stroke="white"
                                    stroke-width="4"
                                />
                            </svg>
                            <img
                                v-else
                                :src="require('../assets/img/loader.gif')"
                                alt="Loader"
                                width="27px"
                            />
                        </button>
                    </div>
                </div>
            </form>
        </section>

        <section class="section v2-mobile">
            <div class="container">
                <div class="row v2-mobile__row">
                    <div
                        class="v2-mobile__image"
                        data-aos="zoom-in-up"
                        v-if="getWindowWidth === 'desktop'"
                    >
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
                                <img
                                    src="../assets/img/playstore.svg"
                                    data-aos="fade-up"
                                    data-aos-delay="250"
                                    alt="Play Store"
                                />
                            </a>
                        </div>
                        <p
                            class="hero__text v2-mobilie__text"
                            data-aos="fade-left"
                            data-aos-delay="200"
                        >
                            Keep your opportunities closer
                        </p>
                        <template v-if="getWindowWidth !== 'mobile'">
                            <div
                                class="v2-mobile__store--logo"
                                data-aos="fade-left"
                                data-aos-delay="250"
                            >
                                <img src="../assets/img/val/logo-white.svg" alt="Chaka" />
                            </div>
                            <div
                                class="d-none d-md-block v2-mobile__store v2-mobile__store--light"
                                data-aos="fade-left"
                                data-aos-delay="200"
                            >
                                <img src="../assets/img/appstore.svg" alt="App Store" />
                                <a
                                    target="_blank"
                                    href="https://play.google.com/store/apps/details?id=ng.chaka.android"
                                >
                                    <img src="../assets/img/playstore.svg" alt="Play Store" />
                                </a></div
                        ></template>
                        <div
                            v-else
                            class="d-md-none v2-mobile__store v2-mobile__store--dark"
                            data-aos="fade-left"
                            data-aos-delay="200"
                        >
                            <img src="../assets/img/appstore-dark.svg" alt="App Store" />
                            <a
                                target="_blank"
                                href="https://play.google.com/store/apps/details?id=ng.chaka.android"
                            >
                                <img src="../assets/img/playstore-dark.svg" alt="Play Store" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <email-subscribe />

        <transition name="modal" v-if="showModal">
            <div class="modal-mask">
                <div class="modal__underlay" @click="closeModal"></div>
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-body">
                            <div class="modal-image">
                                <img src="../assets/img/val/sample.png" alt="Sample" />
                            </div>
                            <div class="modal-text">
                                <div>
                                    <p><strong>YOU GET</strong></p>
                                    <h1>
                                        {{
                                            (getValResult.capital + getValResult.netEarning)
                                                | kobo
                                                | currency("USD")
                                        }}
                                    </h1>
                                    <p class="small mb-3" :class="colorClass">
                                        ({{ getValResult.netEarningPercentage }})
                                    </p>
                                    <p>
                                        {{ getValResult.message }}
                                    </p>
                                </div>
                                <button class="modal-button">
                                    <span>Share Result</span
                                    ><svg
                                        width="19"
                                        height="11"
                                        viewBox="0 0 19 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M-0.000244141 5.17662H17.5833M17.5833 5.17662L12.8033 0.645836M17.5833 5.17662L12.8033 9.51042"
                                            stroke="white"
                                            stroke-width="1.54167"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </main>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import "aos/dist/aos.css";
import EventBus from "../event-bus";
import AOS from "aos";

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
            showModal: false
        };
    },
    computed: {
        ...mapGetters(["getWindowWidth", "getSearchInstruments", "getValResult", "getErrorLog"]),
        searchStocks() {
            if (this.search) {
                const splice = [...this.getSearchInstruments].splice(0, 5);
                return splice;
            }
            return this.allPortfolios;
        },
        colorClass() {
            if (this.getValResult.netEarning >= 0) return "green";
            return "val-red";
        }
    },
    methods: {
        ...mapActions(["SEARCH_INSTRUMENTS", "GET_VAL_RESULT"]),
        ...mapMutations(["MODAL_OPENED", "RESET_REQ"]),
        async startSearch() {
            this.resetSymbols();
            const payload = { query: this.search };
            await this.SEARCH_INSTRUMENTS(payload);
        },
        setActive(symbol) {
            this.errors = {};
            if (symbol === this.activePortfolio) {
                this.itemData.symbol = null;
                this.activePortfolio = null;
            } else {
                this.activePortfolio = symbol;
                this.itemData.symbol = symbol;
            }
        },
        closeModal() {
            EventBus.$emit("MODAL_CLOSED");
            this.MODAL_OPENED(false);
            this.showModal = false;
        },
        async getResult() {
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
            await this.GET_VAL_RESULT(payload);
            this.loading = false;
            this.showModal = true;
            this.MODAL_OPENED(true);
        },
        checkGiftValue() {
            if (this.amount !== "manual") {
                this.itemData.amount = this.amount;
            }
        },
        resetSymbols() {
            this.activePortfolio = null;
            this.itemData.symbol = null;
        }
    },
    mounted() {
        // this.MODAL_OPENED(true);
        // this.showModal = true;
        document.title = "Chaka - Relationship Net worth Calculator";
        document.getElementsByTagName("meta").keywords.content =
            "nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse";
        document.getElementsByTagName("meta").description.content =
            "Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.";
    },
    created() {
        AOS.init({
            duration: 400,
            delay: 100,
            easing: "ease-in-out",
            mirror: false,
            startEvent: "DOMContentLoaded",
            anchorPlacement: "top-center",
            // once: true,
            offset: 50
        });
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
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
    }
    &-image {
        img {
            object-fit: cover;
            object-position: left -100px;
            width: 100%;
            height: 100%;

            @include tablet {
                object-position: center;
            }
        }
        flex: 0 0 100%;
        @include mobile {
            height: 200px;
            width: 100%;
        }
        @include tablet {
            flex: 0 0 35%;
            max-width: 35%;
        }
    }
    &-text {
        h1 {
            word-break: break-word;
        }
        @include tablet {
            .small,
            h1 {
                display: inline-block;
            }
        }
        @include tablet {
            padding: 3rem 2rem;
            flex: 0 0 65%;
            max-width: 65%;
        }

        & > div {
            @include mobile {
                padding: 2rem;
                padding-bottom: 1rem;
            }
        }

        p {
            line-height: 2;
        }
    }
    &-button {
        padding: 1rem 0.5rem;
        background-color: $val-red;
        color: $white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-radius: 0;

        @include mobile {
            font-size: 1.625rem;
            justify-content: space-evenly;
        }

        @include tablet {
            margin-top: 2rem;
            width: 200px;
            // border: none;
            // border-bottom: 1px solid $val-red;
        }
    }
    &__underlay {
        background-color: rgba($color: $black, $alpha: 0.625);
    }
}
.small {
    font-size: 1.325rem;
}
</style>
