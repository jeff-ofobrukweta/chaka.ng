<template>
    <main class="main" role="main">
        <section class="container">
            <div class="v2-app__text">
                <h1 class="hero__title">
                    Trade Global &amp; Local Stock Markets
                </h1>

                <p class="section__text">
                    Your Investment Passport. Own US, Nigerian, Chinese and global companies like Apple, Google, Dangote, Alibaba and more from any device.
                </p>
            </div>
            <div class="v2-app__links">
                <a
                    href="https://play.google.com/store/apps/details?id=ng.chaka.android"
                    target="_blank"
                    rel="noreferrer noopener"
                    class="v2-landing__app--link"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <img src="../assets/img/playstore.svg" data-aos="fade-up" data-aos-delay="250" alt="Play Store" />
                </a>
                <span class="v2-landing__app--link v2-landing__app--transparent" data-aos="fade-up" data-aos-delay="200">
                    <img src="../assets/img/appstore-dark.svg" data-aos="fade-up" data-aos-delay="250" alt="Play Store" />
                </span>
            </div>
            <div class="v2-app__top-images">
                <img
                    :data-src="require('../assets/img/fractional/grow.png')"
                    :data-srcset="require('../assets/img/fractional/grow.png')"
                    data-sizes="auto"
                    alt="Grow your portfolio"
                    v-if="getWindowWidth !== 'mobile'"
                    class="lazyload"
                />
                <img
                    :data-src="require('../assets/img/fractional/fractional.png')"
                    :data-srcset="require('../assets/img/fractional/fractional.png')"
                    data-sizes="auto"
                    alt="Welcome page"
                    class="lazyload"
                />
                <img
                    :data-src="require('../assets/img/fractional/performance.png')"
                    :data-srcset="require('../assets/img/fractional/performance.png')"
                    data-sizes="auto"
                    alt="Performance"
                    class="lazyload"
                />
            </div>
        </section>

        <section class="v2-invest">
            <div class="container">
                <div class="row v2-invest__row">
                    <div class="v2-app__dark--image" data-aos="fade-left" data-aos-duration="700">
                        <img :src="invest[investNumber].image" alt="Invest" />
                    </div>
                    <div class="v2-app__dark--text">
                        <h2 class="hero__title v2-section__title">
                            {{ invest[investNumber].title }}
                        </h2>
                        <div class="v2-invest__height">
                            <p class="section__text">{{ invest[investNumber].text }}</p>
                        </div>
                        <br />
                        <div class="v2-invest__pick">
                            <div class="v2-app__line">
                                <div class="v2-app__bar--ticker" :style="{ transform: slider }"></div>
                            </div>
                            <div class="v2-invest__selector">
                                <h6 v-for="(text, i) in invest" :key="i" v-html="text.title" @click="clearCarousel(text.id)"></h6>
                            </div>
                        </div>
                        <div class="v2-invest__mobile">
                            <div class="v2-app__bar" @click="clearCarousel(0)" :class="{ active: investNumber === 0 }"></div>
                            <div class="v2-app__bar" @click="clearCarousel(1)" :class="{ active: investNumber === 1 }"></div>
                            <div class="v2-app__bar" @click="clearCarousel(2)" :class="{ active: investNumber === 2 }"></div>
                            <div class="v2-app__bar" @click="clearCarousel(3)" :class="{ active: investNumber === 3 }"></div>
                        </div>
                    </div>
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
                            All local equities are offered through a locally licensed brokerage firm registered with the Nigerian Stock Exchange (NSE), Central Securities Clearing
                            System (CSCS) and regulated by Nigeria’s Securities and Exchanges Commission (SEC). See disclosures at bottom of page for more
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
                            All global equities are offered through a US brokerage firm that is regulated by the US Financial Industry Regulatory Authority (FINRA) and the US
                            Securities and Exchange Commission (SEC). Furthermore Dollar funds deposited and assets owned are insured by the US Securities Investor Protection
                            Corporation (SIPC) up to $500,000. See disclosures at bottom of page for more.
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
                            All website traffic is encrypted and protected by using AES bank level encryption. This provides security between your device and our servers ensuring
                            your personal and transaction details are always kept private.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="v2-integration v2-integration__app">
            <div class="mb-3">
                <h5 class="section__caption text-center">Download Today</h5>
                <div class="v2-landing__news v2-integration__app--center">
                    <a
                        href="https://play.google.com/store/apps/details?id=ng.chaka.android"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="v2-landing__app--link"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <img src="../assets/img/playstore.svg" data-aos="fade-up" data-aos-delay="250" alt="Play Store" />
                    </a>
                    <span href="#" target="_blank" rel="noreferrer noopener" class="v2-landing__app--link" data-aos="fade-up" data-aos-delay="200">
                        <img src="../assets/img/appstore.svg" data-aos="fade-up" data-aos-delay="250" alt="Play Store" />
                    </span>
                </div>
            </div>
            <div>
                <h5 class="section__caption">Featured In</h5>
                <div class="v2-landing__news">
                    <a
                        href="https://www.cnbcafrica.com/news/west-africa/2019/11/19/this-nigeria-based-tech-start-up-seeks-to-reduce-barriers-in-cross-border-investing/"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/news/cnbc.png')"
                            :data-srcset="require('../assets/img/news/cnbc.png')"
                            class="lazyload v2-landing__news--img"
                            alt="CNBC"
                        />
                    </a>
                    <a
                        href="https://techcrunch.com/2019/11/12/chaka-opens-up-global-investing-to-africas-most-populous-nation/"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/news/techcrunch.png')"
                            :data-srcset="require('../assets/img/news/techcrunch.png')"
                            class="lazyload v2-landing__news--img"
                            alt="techcrunch"
                        />
                    </a>
                    <a href="https://www.youtube.com/watch?v=ctLC7hWFtBM" target="_blank" rel="noreferrer noopener" class="v2-landing__news--link" data-aos="fade-up">
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/news/channels.png')"
                            :data-srcset="require('../assets/img/news/channels.png')"
                            class="lazyload v2-landing__news--img"
                            alt="Channels TV"
                        />
                    </a>
                    <a
                        href="https://finance.yahoo.com/news/drivewealth-partners-chaka-global-trading-110000678.html"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/news/yahoo.png')"
                            :data-srcset="require('../assets/img/news/yahoo.png')"
                            class="lazyload v2-landing__news--img"
                            alt="Yahoo!"
                        />
                    </a>
                    <a
                        href="https://businessday.ng/interview/article/our-goal-is-to-provide-borderless-trading-investment-opportunities/"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/news/business-day.png')"
                            :data-srcset="require('../assets/img/news/business-day.png')"
                            class="lazyload v2-landing__news--img"
                            alt="Business Day"
                        />
                    </a>
                    <a
                        href="https://www.marketwatch.com/press-release/drivewealth-partners-with-chaka-new-global-trading-platform-in-nigeria-to-increase-access-to-us-stock-market-2019-10-16"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/news/market-watch.svg')"
                            :data-srcset="require('../assets/img/news/market-watch.svg')"
                            class="lazyload v2-landing__news--img"
                            alt="Market Watch"
                        />
                    </a>
                    <a
                        href="https://guardian.ng/business-services/hedging-against-local-risks-through-global-markets/"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/news/the-guardian.png')"
                            :data-srcset="require('../assets/img/news/the-guardian.png')"
                            class="lazyload v2-landing__news--img"
                            alt="Guardian"
                        />
                    </a>
                    <a
                        href="https://www.youtube.com/watch?v=qngEAo-D_dk"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/news/arise-news.png')"
                            :data-srcset="require('../assets/img/news/arise-news.png')"
                            class="lazyload v2-landing__news--img"
                            alt="Arise News"
                        />
                    </a>
                    <a
                        href="https://www.thisdaylive.com/index.php/2019/10/18/chaka-global-trading-platform-launched-in-nigeria/"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/news/thisday.png')"
                            :data-srcset="require('../assets/img/news/thisday.png')"
                            class="lazyload v2-landing__news--img"
                            alt="This Day"
                        />
                    </a>
                    <a
                        href="https://www.financemagnates.com/forex/products/chaka-teams-up-with-drivewealth-to-offer-us-equities-in-nigeria/"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="v2-landing__news--link"
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        <img
                            data-sizes="auto"
                            :data-src="require('../assets/img/news/finance-magnates.svg')"
                            :data-srcset="require('../assets/img/news/finance-magnates.svg')"
                            class="lazyload v2-landing__news--img"
                            alt="Finance Magnates"
                        />
                    </a>
                </div>
            </div>
        </section>

        <email-subscribe />
    </main>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import auth from "../services/validations/auth";
import homeAbroad from "../assets/img/fractional/home-abroad.png";
import fractional from "../assets/img/fractional/fractional.png";
import minimums from "../assets/img/fractional/low-minimums.png";
import grow from "../assets/img/fractional/grow.png";
import "aos/dist/aos.css";
import AOS from "aos";

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
                    title: "Home & Abroad",
                    text: `First-class access to stocks listed on the NG & US stock exchanges as well as global blue-chip companies from around the world.`,
                    image: homeAbroad,
                    id: 0
                },
                {
                    title: "Fractional Investing",
                    text: `Invest in any global stock with any amount of money, no matter the price per share.`,
                    image: fractional,
                    id: 1
                },
                {
                    title: "Low Minimums, Low Fees",
                    text: `Start trading with as low as $10 or N1, 000 and make unlimited trades with industry-low fees on global and local stocks.`,
                    image: minimums,
                    id: 2
                },
                {
                    title: "Fund in Naira & Dollars",
                    text: `Deposit money in Dollars or Naira through your favourite channels, including your bank cards, bank transfers, and through your domiciliary account.`,
                    image: grow,
                    id: 3
                }
            ],
            itemData: {},
            loading: false,
            message: null,
            errors: {},
            interval: null,
            grow: null,
            minimums: null,
            fractional: null
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
        ...mapMutations(["RESET_REQ"]),
        clearCarousel(num) {
            clearInterval(this.interval);
            this.investNumber = num;
            setTimeout(() => {
                setInterval(this.startCarousel, 5000);
            }, 10000);
        },
        startCarousel() {
            if (this.investNumber === 3) {
                this.investNumber = 0;
            } else {
                this.investNumber += 1;
            }
        }
    },
    mounted() {
        document.title = "Chaka - Your Investment Passport to Trade Nigerian, US & International Stock Markets";
        document.getElementsByTagName("meta").keywords.content =
            "nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse";
        document.getElementsByTagName("meta").description.content =
            "Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.";

        mixpanel.track("GETAPP_PAGE"); //tracks the getapppage
        this.interval = setInterval(this.startCarousel, 5000);
        this.fractional = fractional;
        this.minimums = minimums;
        this.grow = grow;
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
