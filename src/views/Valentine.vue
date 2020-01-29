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
                                <select name="interval" v-model="itemData.interval" class="val-form__select" :class="{ 'is-invalid': errors.interval }" @focus="errors = {}">
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
                                <b class="val-banner__b" :class="{ 'is-invalid': errors.symbol }"
                                    >Please select <span class="val-red">ONE</span> of the Portfolio/ETFs provided <span v-if="errors.symbol" class="val-red">**</span></b
                                >
                            </p>
                            <template v-if="searchStocks.length > 0">
                                <div v-for="(portfolio, i) in searchStocks" :key="i" class="val-banner__check" @click="setActive(portfolio.symbol)">
                                    <div class="val-banner__check--box" :class="{ active: activePortfolio === portfolio.symbol }"></div>
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
                                <a target="_blank" href="https://play.google.com/store/apps/details?id=ng.chaka.android">
                                    <img src="../assets/img/playstore.svg" alt="Play Store" />
                                </a></div
                        ></template>
                        <div v-else class="d-md-none v2-mobile__store v2-mobile__store--dark" data-aos="fade-left" data-aos-delay="200">
                            <img src="../assets/img/appstore-dark.svg" alt="App Store" />
                            <a target="_blank" href="https://play.google.com/store/apps/details?id=ng.chaka.android">
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
                            <div class="modal-flex">
                                <div class="modal-text">
                                    <p><strong>YOU GET</strong></p>
                                    <div>
                                        <h1>
                                            {{ (getValResult.capital + getValResult.netEarning) | kobo | currency("USD", true) }}
                                        </h1>
                                        <p class="modal-text__net-earning mb-3" :class="colorClass">({{ getValResult.netEarningPercentage }})</p>
                                    </div>
                                    <p>
                                        {{ getValResult.message }}
                                    </p>
                                </div>
                                <div class="modal-image">
                                    <img :src="getValResult.imageUrl" alt="Sample" />
                                </div>
                            </div>
                            <div class="modal-socials">
                                <div><p>Share your result</p></div>
                                <a class="modal__share-button whatsapp" target="_blank" :href="whatsappLink" data-size="large"
                                    ><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.5959 10.2593L12.5899 10.2995C11.1413 9.7126 10.9898 9.63442 10.8027 9.86252C10.673 10.0205 10.2948 10.3787 10.1809 10.4847C10.0656 10.5891 9.95095 10.5972 9.7553 10.5249C9.55767 10.4446 8.92329 10.2759 8.1723 9.72973C7.58733 9.30405 7.19471 8.78199 7.07876 8.62136C6.88575 8.35042 7.28957 8.31187 7.65715 7.74643C7.72303 7.63399 7.68943 7.54564 7.64068 7.46586C7.59128 7.38554 7.198 6.59843 7.03331 6.28466C6.87521 5.97196 6.71249 6.01158 6.59062 6.01158C6.21118 5.98481 5.93384 5.98909 5.68944 6.19578C4.6262 7.14566 4.89432 8.12553 5.80406 9.16751C7.59194 11.0694 8.5445 11.4196 10.2863 11.9058C10.7566 12.0273 11.1855 12.0102 11.5247 11.9706C11.9029 11.9219 12.6888 11.5845 12.8528 11.207C13.0208 10.8295 13.0208 10.5163 12.9714 10.444C12.9226 10.3717 12.7935 10.3316 12.5959 10.2593V10.2593Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M13.97 4.01213C9.48475 -0.323706 2.06183 2.82099 2.05892 8.93771C2.05892 10.1604 2.37917 11.3527 2.98933 12.4056L2 16L5.69542 15.0364C10.3067 17.5271 15.9977 14.2197 16 8.94121C16 7.08858 15.2767 5.34503 13.9612 4.03488L13.97 4.01213ZM14.8345 8.92196C14.831 13.3745 9.94325 16.1552 6.0775 13.8825L5.8675 13.7577L3.68 14.3264L4.26625 12.2002L4.12683 11.9815C1.72117 8.15198 4.485 3.14706 9.042 3.14706C10.5902 3.14706 12.0432 3.7508 13.1376 4.84453C14.2313 5.92893 14.8345 7.38199 14.8345 8.92196V8.92196Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <span>Whatsapp</span></a
                                >
                                <a class="modal__share-button twitter" target="_blank" :href="twitterLink" data-size="large"
                                    ><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.05075 6.19219L9.08223 6.71122L8.55762 6.64767C6.64804 6.40404 4.97978 5.57782 3.56334 4.1902L2.87085 3.50169L2.69248 4.01013C2.31477 5.14353 2.55609 6.34048 3.343 7.14552C3.76269 7.5904 3.66826 7.65396 2.9443 7.38914C2.69248 7.3044 2.47215 7.24085 2.45116 7.27263C2.37772 7.34677 2.62953 8.31069 2.82888 8.69202C3.10168 9.22165 3.65777 9.74068 4.26631 10.0479L4.78043 10.2915L4.17188 10.3021C3.58432 10.3021 3.56334 10.3127 3.62629 10.5351C3.83613 11.2236 4.66502 11.9545 5.58833 12.2723L6.23884 12.4947L5.67227 12.8337C4.83289 13.321 3.84662 13.5964 2.86036 13.6175C2.38821 13.6281 2 13.6705 2 13.7023C2 13.8082 3.28005 14.4014 4.02499 14.6344C6.25983 15.3229 8.91435 15.0264 10.9079 13.8506C12.3243 13.0138 13.7408 11.3507 14.4018 9.74068C14.7585 8.88269 15.1152 7.315 15.1152 6.56293C15.1152 6.07567 15.1467 6.01211 15.7343 5.42953C16.0805 5.09056 16.4058 4.71983 16.4687 4.6139C16.5736 4.41264 16.5632 4.41264 16.0281 4.59272C15.1362 4.91049 15.0103 4.86812 15.451 4.39146C15.7762 4.0525 16.1645 3.43813 16.1645 3.25806C16.1645 3.22628 16.0071 3.27924 15.8287 3.37458C15.6398 3.4805 15.2202 3.63939 14.9054 3.73472L14.3388 3.91479L13.8247 3.56524C13.5414 3.37458 13.1427 3.16273 12.9329 3.09917C12.3978 2.95087 11.5794 2.97206 11.0967 3.14154C9.7852 3.6182 8.95632 4.84694 9.05075 6.19219Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <span>Twitter</span></a
                                >
                                <!-- <a
                                    class="modal__share-button instagram"
                                    target="_blank"
                                    :href="instagramLink"
                                    data-size="large"
                                    ><svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.9644 6.11605C15.9316 5.37217 15.8113 4.86077 15.6389 4.41762C15.4611 3.94724 15.1876 3.52611 14.8292 3.17601C14.4791 2.82048 14.0551 2.54421 13.59 2.36921C13.1442 2.19689 12.6354 2.0766 11.8914 2.0438C11.1418 2.00823 10.9039 2 9.00272 2C7.10159 2 6.86363 2.00823 6.11684 2.04102C5.37282 2.07382 4.86131 2.19422 4.41819 2.36644C3.94761 2.54421 3.5264 2.8177 3.17624 3.17601C2.82063 3.52611 2.54442 3.95002 2.36928 4.41495C2.19693 4.86077 2.07661 5.3694 2.04381 6.11327C2.00823 6.8627 2 7.10062 2 9.00139C2 10.9022 2.00823 11.1401 2.04103 11.8867C2.07384 12.6306 2.19426 13.142 2.36661 13.5852C2.54442 14.0555 2.82063 14.4767 3.17624 14.8268C3.5264 15.1823 3.95039 15.4586 4.41541 15.6336C4.86131 15.8059 5.37004 15.9262 6.11416 15.959C6.86085 15.9919 7.09892 16 9.00005 16C10.9012 16 11.1391 15.9919 11.8859 15.959C12.63 15.9262 13.1415 15.8059 13.5846 15.6336C14.5256 15.2698 15.2697 14.5259 15.6335 13.5852C15.8057 13.1393 15.9262 12.6306 15.959 11.8867C15.9918 11.1401 16 10.9022 16 9.00139C16 7.10062 15.9972 6.8627 15.9644 6.11605ZM14.7034 11.832C14.6733 12.5158 14.5584 12.885 14.4627 13.1311C14.2274 13.741 13.7433 14.2251 13.1332 14.4603C12.887 14.556 12.5151 14.6709 11.8339 14.7009C11.0953 14.7338 10.8738 14.7419 9.0055 14.7419C7.13718 14.7419 6.91289 14.7338 6.17699 14.7009C5.49313 14.6709 5.12385 14.556 4.87766 14.4603C4.57409 14.3482 4.29777 14.1704 4.07348 13.9379C3.84097 13.7109 3.66317 13.4374 3.55097 13.1339C3.45523 12.8877 3.34037 12.5158 3.31034 11.8348C3.27743 11.0964 3.26931 10.8748 3.26931 9.00684C3.26931 7.13887 3.27743 6.91463 3.31034 6.17898C3.34037 5.49525 3.45523 5.12603 3.55097 4.87989C3.66317 4.57627 3.84097 4.30011 4.07626 4.07576C4.30322 3.84329 4.57676 3.66552 4.88044 3.55345C5.12663 3.45773 5.49869 3.34289 6.17977 3.31276C6.91834 3.27996 7.13995 3.27174 9.00817 3.27174C10.8793 3.27174 11.1008 3.27996 11.8367 3.31276C12.5205 3.34289 12.8898 3.45773 13.136 3.55345C13.4396 3.66552 13.7159 3.84329 13.9402 4.07576C14.1727 4.30278 14.3505 4.57627 14.4627 4.87989C14.5584 5.12603 14.6733 5.49792 14.7034 6.17898C14.7362 6.9174 14.7445 7.13887 14.7445 9.00684C14.7445 10.8748 14.7362 11.0936 14.7034 11.832Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M9 5C6.79171 5 5 6.79159 5 9C5 11.2084 6.79171 13 9 13C11.2084 13 13 11.2084 13 9C13 6.79159 11.2084 5 9 5ZM9 11.5947C7.56737 11.5947 6.4053 10.4327 6.4053 9C6.4053 7.56725 7.56737 6.4053 9 6.4053C10.4327 6.4053 11.5947 7.56725 11.5947 9C11.5947 10.4327 10.4327 11.5947 9 11.5947V11.5947Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M14 5C14 5.55223 13.5523 6 12.9999 6C12.4477 6 12 5.55223 12 5C12 4.44764 12.4477 4 12.9999 4C13.5523 4 14 4.44764 14 5V5Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <span>Instagram</span></a
                                > -->
                                <a class="modal__share-button facebook" target="_blank" :href="facebookLink" data-size="large"
                                    ><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.3438 16V8.99918H12.2763L12.5324 6.58666H10.3438L10.347 5.37917C10.347 4.74995 10.4068 4.41279 11.3106 4.41279H12.5187V2H10.5859C8.26429 2 7.44714 3.17033 7.44714 5.13846V6.58693H6V8.99945H7.44714V16H10.3438Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <span>Facebook</span></a
                                >
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
        },
        // instagramLink() {
        //     return "https://twitter.com/intent/tweet?text=This is my relationship net-worth. Find out yours https://chaka.ng/relationship-calculator";
        // },
        facebookLink() {
            return "https://web.facebook.com/sharer/sharer.php?u=https://chaka.ng/relationship-calculator&hashtag=%23valentine&_rdc=1&_rdr";
        },
        twitterLink() {
            return "https://twitter.com/intent/tweet?text=This is my relationship net-worth. Find out yours https://chaka.ng/relationship-calculator";
        },
        whatsappLink() {
            return "https://api.whatsapp.com/send?text=This is my relationship net-worth. Find out yours https://chaka.ng/relationship-calculator";
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
            .small,
            h1 {
                display: inline-block;
            }
        }
        @include tablet {
            flex: 0 0 40%;
            max-width: 40%;
        }

        p {
            line-height: 2;
        }

        &__net-earning {
            font-size: 2rem;
            font-weight: bold;
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
.small {
    font-size: 1.325rem;
}
</style>
