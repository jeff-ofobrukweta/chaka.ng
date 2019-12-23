<template>
    <main class="main" role="main">
        <section class="v2-landing container">
            <div class=" v2-landing__vector">
                <span class="v2-landing__vector--span">
                    <img
                        src="../assets/img/landing-vector.svg"
                        :data-srcset="require('../assets/img/landing-vector.svg')"
                        class="v2-landing__vector--img"
                        alt="Landing Vector"
                    />
                </span>
            </div>
            <div class="w-100">
                <div class="row">
                    <div class="v2-landing__text">
                        <div class="v2-width__md">
                            <div data-aos="fade" class="v2-landing__hero">
                                <h5 class="section__caption">
                                    Your Investment Passport
                                </h5>
                                <h1 class="hero__title">
                                    Trade Global &amp; Local Stock Markets
                                </h1>

                                <p class="hero__text">
                                    Your Investment Passport. Own US, Nigerian, Chinese and global
                                    companies like Apple, Google, Dangote, Alibaba and more from any
                                    device.
                                </p>
                            </div>
                            <br />
                            <br />
                            <form
                                class="v2-landing__form row v2-layer__signup"
                                @submit.prevent="register"
                            >
                                <div class="v2-landing__input">
                                    <input
                                        v-model="itemData.email"
                                        type="email"
                                        name="email"
                                        @focus="errors = {}"
                                        placeholder="Email"
                                    />
                                    <p class="form-error" v-if="errors.email">
                                        <small>{{ errors.email }}</small>
                                    </p>
                                </div>
                                <div class="v2-landing__input">
                                    <input
                                        type="password"
                                        name="password"
                                        @focus="errors = {}"
                                        placeholder="Create Password"
                                        v-model="itemData.password"
                                    />
                                    <div class="form-info text-left" v-if="!errors.password">
                                        <small
                                            >**Password should contain at least one uppercase
                                            character, number or symbol and at least 7
                                            characters</small
                                        >
                                    </div>
                                    <p class="form-error" v-if="errors.password">
                                        <small>{{ errors.password }}</small>
                                    </p>
                                </div>
                                <div class=" v2-landing__btn">
                                    <button class="v2-btn v2-btn__primary w-100" type="submit">
                                        Get Started
                                        <svg
                                            width="12"
                                            height="6"
                                            viewBox="0 0 12 6"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.8009 5.51985V4.05865L0.342752 4.05865C0.162356 4.05865 0 3.91433 0 3.71589V2.14646C0 1.96606 0.144317 1.8037 0.342752 1.8037L6.8009 1.8037V0.342503C6.8009 0.0719098 7.10757 -0.0904461 7.34209 0.0538701L9.14604 1.2986L11.0763 2.63352C11.2747 2.77784 11.2747 3.06647 11.0763 3.19275L9.14604 4.56375L7.34209 5.80848C7.10757 5.9528 6.8009 5.79044 6.8009 5.51985Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <error-block type="register" />
                            </form>
                        </div>
                    </div>
                    <div class="v2-landing__image-box">
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/landing-phone.png')"
                            :data-srcset="require('../assets/img/landing-phone.png')"
                            data-aos="fade-right"
                            class="lazyload v2-landing__phone"
                            alt="Landing Phone"
                        />
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/landing-desktop.png')"
                            :data-srcset="require('../assets/img/landing-desktop.png')"
                            data-aos="fade-left"
                            class="lazyload v2-landing__desktop"
                            alt="Landing Desktop"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section class="section v2-layer container">
            <div class="row v2-layer__featured">
                <div class="v2-layer__column">
                    <div class="v2-layer__stocks">
                        <h5 class="section__caption">Invest in 4000+ Stocks Including</h5>
                        <div class="v2-layer__invest">
                            <img
                                class="v2-layer__invest--img"
                                src="../assets/img/icons/APPLE.svg"
                                alt="Alibaba"
                                data-aos="zoom-in-up"
                                data-aos-delay="100"
                            />
                            <img
                                class="v2-layer__invest--img"
                                src="../assets/img/icons/GTB.svg"
                                alt="GTBank"
                                data-aos="zoom-in-up"
                                data-aos-delay="150"
                            />
                            <img
                                class="v2-layer__invest--img"
                                src="../assets/img/icons/manu.png"
                                alt="Alibaba"
                                data-aos="zoom-in-up"
                                data-aos-delay="170"
                            />
                            <img
                                class="v2-layer__invest--img"
                                src="../assets/img/icons/GOOGLE.png"
                                alt="Alibaba"
                                data-aos="zoom-in-up"
                                data-aos-delay="200"
                            />
                            <img
                                class="v2-layer__invest--img"
                                src="../assets/img/icons/DANGOTE.png"
                                alt="Dangote"
                                data-aos="zoom-in-up"
                                data-aos-delay="210"
                            />
                        </div>
                    </div>
                    <div class="v2-layer__stocks">
                        <h5 class="section__caption">Invest in funds from</h5>
                        <div class="v2-layer__logos">
                            <div data-aos="fade-up">
                                <img
                                    class="v2-layer__logos--img"
                                    src="../assets/img/etfs/blackrock.png"
                                    alt="Black Rock"
                                />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="50">
                                <img
                                    class="v2-layer__logos--img"
                                    src="../assets/img/etfs/vanguard.png"
                                    alt="Vanguard"
                                />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="150">
                                <img
                                    class="v2-layer__logos--img"
                                    src="../assets/img/etfs/fidelity.png"
                                    alt="Fidelity"
                                />
                            </div>
                        </div>
                        <div class="v2-layer__logos">
                            <div data-aos="fade-up">
                                <img
                                    class="v2-layer__logos--img"
                                    src="../assets/img/etfs/msci.png"
                                    alt="MSCI"
                                />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="150">
                                <img
                                    class="v2-layer__logos--img"
                                    src="../assets/img/etfs/invesco.png"
                                    alt="Invesco"
                                />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="200">
                                <img
                                    class="v2-layer__logos--img"
                                    src="../assets/img/etfs/schwab.png"
                                    alt="Charles Schwab"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="v2-layer__image-box">
                    <img
                        data-sizes="auto"
                        :data-src="require('../assets/img/layer-phone1.png')"
                        :data-srcset="require('../assets/img/layer-phone1.png')"
                        data-aos="fade-up-right"
                        class="lazyload v2-layer__phone v2-layer__phone1"
                    />
                    <img
                        data-sizes="auto"
                        :data-src="require('../assets/img/layer-phone2.png')"
                        :data-srcset="require('../assets/img/layer-phone2.png')"
                        data-aos="fade-up-left"
                        class="lazyload v2-layer__phone v2-layer__phone2"
                    />
                    <img
                        data-sizes="auto"
                        :data-src="require('../assets/img/layer-desktop.png')"
                        :data-srcset="require('../assets/img/layer-desktop.png')"
                        data-aos="fade-down-left"
                        class="lazyload v2-layer__desktop"
                    />
                </div>
            </div>
        </section>

        <section class="section v2-pricing container">
            <div class="v2-pricing__row">
                <h5 class="grey-dark text-center">PRICING</h5>
                <div class="v2-pricing__money" v-if="getWindowWidth === 'desktop'">
                    <h2 class="dollar">$2<span class="super-text">$5</span></h2>
                    <h2 class="naira">&#8358;100</h2>
                </div>
                <h4 v-else class="v2-pricing__mobile">
                    <span class="stroke">$5</span> $2 and N100
                </h4>
                <p>Make unlimited trades with industry-low fees on global and local stocks.</p>
                <br />
                <p>
                    <router-link class="section__link flex" href :to="{ name: 'calculator' }">
                        Use Calculator
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                                fill="#000"
                            />
                        </svg>
                    </router-link>
                </p>
            </div>
        </section>

        <section class="v2-invest container">
            <div class="row v2-invest__row">
                <div class="v2-invest__image" data-aos="fade-left" data-aos-duration="700">
                    <img
                        :src="require('../assets/img/invest.png')"
                        alt="Invest"
                        v-if="investNumber === 0"
                    />
                    <img
                        :src="require('../assets/img/invest.png')"
                        alt="Invest"
                        v-else-if="investNumber === 1"
                    />
                    <img
                        :src="require('../assets/img/invest.png')"
                        alt="Invest"
                        v-else-if="investNumber === 2"
                    />
                </div>
                <div class="v2-invest__text">
                    <h2 class="hero__title v2-section__title">{{ invest[investNumber].title }}</h2>
                    <div class="v2-invest__height">
                        <p class="section__text">{{ invest[investNumber].text }}</p>
                        <!-- <div
                            class="pb-0 v2-layer__signup"
                            data-aos="fade-left"
                            data-aos-delay="0"
                            data-aos-duration="200"
                            v-if="investNumber === 0"
                        >
                            <router-link :to="{ name: 'register' }" class="v2-btn v2-btn__white">
                                Sign Up Now
                                <svg
                                    width="12"
                                    height="6"
                                    viewBox="0 0 12 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.8009 5.51985V4.05865L0.342752 4.05865C0.162356 4.05865 0 3.91433 0 3.71589V2.14646C0 1.96606 0.144317 1.8037 0.342752 1.8037L6.8009 1.8037V0.342503C6.8009 0.0719098 7.10757 -0.0904461 7.34209 0.0538701L9.14604 1.2986L11.0763 2.63352C11.2747 2.77784 11.2747 3.06647 11.0763 3.19275L9.14604 4.56375L7.34209 5.80848C7.10757 5.9528 6.8009 5.79044 6.8009 5.51985Z"
                                        fill="white"
                                    />
                                </svg>
                            </router-link>
                        </div> -->
                    </div>
                    <div class="v2-invest__pick">
                        <div class="v2-invest__bar">
                            <div
                                class="v2-invest__bar--ticker"
                                :style="{ transform: slider }"
                            ></div>
                        </div>
                        <div class="v2-invest__selector">
                            <h6 @click="investNumber = 0">Invest</h6>
                            <h6 @click="investNumber = 1">Grow</h6>
                            <h6 @click="investNumber = 2">Share Ownership</h6>
                        </div>
                    </div>
                    <div class="v2-invest__mobile">
                        <div
                            class="v2-invest__mobile--bar"
                            @click="investNumber = 0"
                            :class="{ active: investNumber === 0 }"
                        ></div>
                        <div
                            class="v2-invest__mobile--bar"
                            @click="investNumber = 1"
                            :class="{ active: investNumber === 1 }"
                        ></div>
                        <div
                            class="v2-invest__mobile--bar"
                            @click="investNumber = 2"
                            :class="{ active: investNumber === 2 }"
                        ></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="v2-countries container">
            <div class="row v2-countries__row">
                <div class="v2-countries__logos-box">
                    <div class="row">
                        <div class="v2-countries__logos">
                            <div data-aos="fade-up">
                                <img src="../assets/img/countries/nigeria.svg" alt="Nigeria" />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="340">
                                <img src="../assets/img/countries/usa.svg" alt="USA" />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="380">
                                <img src="../assets/img/countries/china.svg" alt="China" />
                            </div>
                        </div>
                        <div class="v2-countries__logos">
                            <div data-aos="fade-up">
                                <img src="../assets/img/countries/uk.svg" alt="United Kingdom" />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="340">
                                <img src="../assets/img/countries/france.svg" alt="France" />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="380">
                                <img src="../assets/img/countries/sa.svg" alt="South Africa" />
                            </div>
                        </div>
                        <div class="v2-countries__logos">
                            <div data-aos="fade-up" data-aos-delay="340">
                                <img src="../assets/img/countries/japan.svg" alt="Japan" />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="380">
                                <img src="../assets/img/countries/indonesia.svg" alt="Indonesia" />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="400">
                                <img src="../assets/img/countries/brazil.svg" alt="Brazil" />
                            </div>
                        </div>
                        <div class="v2-countries__logos">
                            <div data-aos="fade-up">
                                <img
                                    src="../assets/img/countries/europian.svg"
                                    alt="Europian Union"
                                />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="340">
                                <img src="../assets/img/countries/russia.svg" alt="Russia" />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="380">
                                <img src="../assets/img/countries/turkey.svg" alt="Turkey" />
                            </div>
                        </div>
                        <div class="v2-countries__logos">
                            <div data-aos="fade-up">
                                <img src="../assets/img/countries/canada.svg" alt="Canada" />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="320">
                                <img src="../assets/img/countries/australia.svg" alt="Australia" />
                            </div>
                            <div data-aos="fade-up" data-aos-delay="340">
                                <img src="../assets/img/countries/belgium.svg" alt="Belgium" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="v2-countries__body" data-aos="fade-left">
                    <h6 class="section__caption">No Investment Barriers</h6>
                    <h2 class="section__title v2-section__title">
                        Trade and Invest in 40+ Countries
                    </h2>
                    <p class="section__text">
                        First-class access to stocks listed on the NG &amp; US stock exchanges as
                        well as global blue-chip companies from around the world. Your limitless
                        investment passport is finally here.
                    </p>
                    <router-link class="section__link link flex" href :to="{ name: 'faq' }">
                        Learn More
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                                fill="#000"
                            />
                        </svg>
                    </router-link>
                </div>
            </div>
        </section>

        <section class="section cta container">
            <div class="cta__card-wrapper">
                <div class="cta__grid">
                    <div class="cta__card" data-aos="fade-left">
                        <div class="cta__icon">
                            <img
                                data-sizes="auto"
                                :data-src="require('../assets/img/icons/local.png')"
                                :data-srcset="require('../assets/img/icons/local.png')"
                                class="lazyload"
                                alt="Local"
                                height="100px"
                            />
                        </div>
                        <h4>Locally Regulated</h4>
                        <p class="cta__text">
                            All local equities are offered through a locally licensed brokerage firm
                            registered with the Nigerian Stock Exchange (NSE), Central Securities
                            Clearing System (CSCS) and regulated by Nigeria’s Securities and
                            Exchanges Commission (SEC). See disclosures at bottom of page for more
                        </p>
                    </div>
                    <div class="cta__card" data-aos="fade-left" data-aos-delay="500">
                        <div class="cta__icon">
                            <img
                                data-sizes="auto"
                                :data-src="require('../assets/img/icons/international.png')"
                                :data-srcset="require('../assets/img/icons/international.png')"
                                class="lazyload"
                                alt="International"
                                height="100px"
                            />
                        </div>
                        <h4>Internationally Regulated</h4>
                        <p class="cta__text">
                            All global equities are offered through a US brokerage firm that is
                            regulated by the US Financial Industry Regulatory Authority (FINRA) and
                            the US Securities and Exchange Commission (SEC). Furthermore Dollar
                            funds deposited and assets owned are insured by the US Securities
                            Investor Protection Corporation (SIPC) up to $500,000. See disclosures
                            at bottom of page for more.
                        </p>
                    </div>
                    <div class="cta__card" data-aos="fade-left" data-aos-delay="600">
                        <div class="cta__icon">
                            <img
                                data-sizes="auto"
                                :data-src="require('../assets/img/icons/encrypt.png')"
                                :data-srcset="require('../assets/img/icons/encrypt.png')"
                                class="lazyload"
                                alt="Encrypt"
                                height="100px"
                            />
                        </div>
                        <h4>Bank Level Encryption</h4>
                        <p class="cta__text">
                            All website traffic is encrypted and protected by using AES bank level
                            encryption. This provides security between your device and our servers
                            ensuring your personal and transaction details are always kept private.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="v2-integration container">
            <div class="row v2-integration__row">
                <div class="v2-countries__body">
                    <h2 class="section__title v2-section__title">Easy Integration</h2>
                    <p class="section__text">
                        Chaka's platform and API are available for both corporate and institutional
                        clients. From corporates running progressive Employee Investment Programs to
                        investment advisors, stockbrokers, and fund managers building bespoke tools,
                        Chaka is interoperable and can be integrated seamlessly into your existing
                        system.
                    </p>
                    <router-link :to="{ name: 'developers' }" class="section__link flex">
                        Contact us for more info
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                                fill="#000"
                            />
                        </svg>
                    </router-link>
                </div>
                <div class="v2-integration__image-box" data-aos="fade-down">
                    <img src="../assets/img/integration.png" alt="Easy Integration" width="100%" />
                </div>
            </div>
            <div class="v2-landing__stocks">
                <h5 class="section__caption">Featured In</h5>
                <div class="v2-landing__news">
                    <a
                        href="https://www.cnbcafrica.com/news/west-africa/2019/11/19/this-nigeria-based-tech-start-up-seeks-to-reduce-barriers-in-cross-border-investing/"
                        target="_blank"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <img
                            class="v2-landing__news--img"
                            src="../assets/img/news/cnbc.png"
                            alt="Maket-Watch"
                        />
                    </a>
                    <a
                        href="https://techcrunch.com/2019/11/12/chaka-opens-up-global-investing-to-africas-most-populous-nation/"
                        target="_blank"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        <img
                            class="v2-landing__news--img"
                            src="../assets/img/news/techcrunch.png"
                            alt="Business Day"
                        />
                    </a>
                    <a
                        href="https://www.youtube.com/watch?v=ctLC7hWFtBM"
                        target="_blank"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                    >
                        <img
                            class="v2-landing__news--img"
                            src="../assets/img/news/channels.png"
                            alt="Channels"
                        />
                    </a>
                    <a
                        href="https://finance.yahoo.com/news/drivewealth-partners-chaka-global-trading-110000678.html"
                        target="_blank"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        <img
                            class="v2-landing__news--img"
                            src="../assets/img/news/yahoo.png"
                            alt="Yahoo Finance"
                        />
                    </a>
                </div>
            </div>
        </section>

        <section class="section v2-mobile container">
            <div class="row v2-mobile__row">
                <div class="v2-mobile__image" data-aos="zoom-in-up">
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
                        <span class="primary">app</span> soon
                    </h2>
                    <p
                        class="hero__text v2-mobilie__text"
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        Keep your opportunities closer
                    </p>
                    <div class="v2-mobile__store--logo" data-aos="fade-left" data-aos-delay="250">
                        <img src="../assets/img/chaka-logo.svg" alt="Chaka" />
                    </div>
                    <div
                        class="d-none d-md-block v2-mobile__store v2-mobile__store--light"
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        <img src="../assets/img/appstore.svg" alt="App Store" />
                        <img src="../assets/img/playstore.svg" alt="Play Store" />
                    </div>
                    <div
                        class="d-md-none v2-mobile__store v2-mobile__store--dark"
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        <img src="../assets/img/appstore-dark.svg" alt="App Store" />
                        <img src="../assets/img/playstore-dark.svg" alt="Play Store" />
                    </div>
                </div>
            </div>
        </section>

        <email-subscribe />
    </main>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import auth from "../services/validations/auth";

export default {
    name: "Home",
    components: {
        EmailSubscribe: () => import("../components/EmailSubscription")
    },
    data() {
        return {
            investNumber: 0,
            invest: [
                {
                    title: "Fractional Shares",
                    text: `Invest in any global stock with any amount of money, no matter the price per share.`
                },
                {
                    title: "Low Minimums",
                    text: `Start trading with as low as $10 or N1, 000.`
                },
                {
                    title: "Grow",
                    text: `Learn more about investing with access to content from our in-house team.`
                }
            ],
            itemData: {},
            loading: false,
            message: null,
            errors: {}
        };
    },
    computed: {
        ...mapGetters(["getWindowWidth"]),
        slider() {
            const num = this.investNumber * 50;
            return `translateY(${num}px)`;
        }
    },
    methods: {
        ...mapActions(["REGISTER"]),
        ...mapMutations(["RESET_REQ"]),
        register() {
            this.RESET_REQ();
            if (!this.itemData.email) {
                this.$set(this.errors, "email", "Field is required");
            } else if (!auth.email(this.itemData.email)) {
                this.$set(this.errors, "email", "Invalid email");
            }
            if (!this.itemData.password) {
                this.$set(this.errors, "password", "Field is required");
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.loading = true;
            this.REGISTER(this.itemData).then(resp => {
                this.loading = false;
                if (resp) this.$router.push({ name: "verification-sent" });
            });
        }
    },
    mounted() {
        document.title =
            "Chaka - Your Investment Passport to Trade Nigerian, US & International Stock Markets";
        document.getElementsByTagName("meta").keywords.content =
            "nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse";
        document.getElementsByTagName("meta").description.content =
            "Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.";
    }
};
</script>

<style lang="scss" scoped>
.row {
    margin: 0;
}
</style>
