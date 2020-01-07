<template>
    <Fragment>
        <section class="issues-with-pageloading" v-if="loading">
            <div>
                <aside class="center-fix-messg">
                    <img
                        class="middle-loader"
                        :src="require('../../assets/img/loader.gif')"
                        alt="spin"
                    />
                </aside>
            </div>
        </section>
        <section v-else class="dashboard__main">
            <div class="header-container dashboard__title">
                <section class="left-header">
                    <section class="name-country">
                        <template class="child-name-country">
                            <img
                                class="logo-company"
                                :src="getSingleinstrument.logoUrl"
                                alt="logo"
                            />
                            <aside class="item-name-country">
                                <section
                                    :title="getSingleinstrument.name || 'no name availiable'"
                                    class="stockname"
                                >
                                    {{ getSingleinstrument.name || "" | truncate(30) }}
                                </section>
                                <img
                                    class="state"
                                    :src="
                                        require(`../../assets/img/icons/flags/${countryCode}-flag.svg`)
                                    "
                                    alt="state"
                                />
                            </aside>
                        </template>
                    </section>
                    <section class="btn-wrapper">
                        <section>
                            <kyc-button
                                ref="buyBtn"
                                :classes="['buy-btn']"
                                :action="
                                    getSingleinstrument.currency === 'NGN' ? 'local' : 'global'
                                "
                                @step="handleStep"
                                next-action="buy"
                                >Buy</kyc-button
                            >
                            <button
                                v-if="checkIfStockInWatchlist.length > 0"
                                @click="OnhandleremoveFromWatchlist"
                                class="watch"
                            >
                                <img
                                    class="middle-loader"
                                    :src="require('../../assets/img/watch-close.svg')"
                                    alt="spin"
                                />
                            </button>
                            <button v-else @click="OnhandleaddToWatchlist" class="unwatch">
                                <img
                                    class="middle-loader"
                                    :src="require('../../assets/Instrument_assets/watch.png')"
                                    alt="spin"
                                />
                            </button>
                        </section>
                        <section>
                            <section class="right-header">
                                <h1 class="price">
                                    {{ getSingleinstrument.askPrice || 0.0 | currency(getSingleinstrument.currency, true)}}
                                </h1>
                                <h1
                                    :class="[
                                        getPricedetailsonblackcard.derivedPrice >= 0
                                            ? 'green'
                                            : 'red',
                                        'percentage'
                                    ]"
                                >
                                    <span class="price">{{
                                        getPricedetailsonblackcard.derivedPrice
                                    }}</span>
                                    <span class="price"
                                        >({{
                                            getPricedetailsonblackcard.derivedPricePercentage ||
                                                0.0
                                        }}%)</span
                                    >
                                </h1>
                            </section>
                        </section>
                    </section>
                </section>
            </div>
            <kyc-button
                ref="buyBtn"
                v-if="getWindowWidth === 'mobile'"
                :classes="['small-size']"
                :action="getSingleinstrument.currency === 'NGN' ? 'local' : 'global'"
                @step="handleStep"
                next-action="buy"
                >Buy</kyc-button
            >

            <!-- boom -->
            <!-- <button @click="authenticate('github')">auth Github</button>
            <button @click="authenticate('facebook')">auth Facebook</button>
            <button @click="authenticate('google')">auth Google</button>
            <button @click="authenticate('twitter')">auth Twitter</button>
            <button @click="authenticate('linkedin')">auth linkedin</button>
            <h2>Result</h2>
            <textarea v-model="token" cols="50" rows="5" />
            <textarea v-model="profile" cols="50" rows="5" /> -->
            <!-- end boom -->

            <section class="sumary">
                <div
                    v-if="getSingleinstrument.description"
                    :title="getSingleinstrument.description"
                    class="summary-cover"
                >
                    <div v-if="getSingleinstrument.description.length >= 300">
                        <section v-if="description">
                            {{ getSingleinstrument.description || "" | truncate(300)
                            }}<span
                                ><a class="expand" @click="description = !description"
                                    >see&nbsp;more</a
                                ></span
                            >
                        </section>
                        <section v-else>
                            {{ getSingleinstrument.description || ""
                            }}<span
                                ><a class="expand" @click="description = !description"
                                    >see&nbsp;less</a
                                ></span
                            >
                        </section>
                    </div>
                    <div v-else>
                        <section>
                            {{ getSingleinstrument.description || "" }}
                        </section>
                    </div>
                </div>
                <div class="no-description" v-else>No description for this stocks</div>
                <svg
                    class="tag-icon"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.5411 3.93124C15.7109 1.76146 19.234 1.76154 21.4037 3.93124L29.2662 11.7938C31.4359 13.9635 31.436 17.4866 29.2662 19.6564L19.6564 29.2662C17.4866 31.436 13.9635 31.4359 11.7938 29.2662L3.93127 21.4036C1.76157 19.2339 1.76149 15.7108 3.93127 13.541L13.5411 3.93124Z"
                        fill="#293D4A"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M32.4488 3.12882C32.5245 2.47722 32.2979 1.8271 31.8341 1.36322C31.3702 0.899333 30.72 0.672797 30.0684 0.748473C26.7883 1.12833 21.178 1.77796 17.0792 2.25265C16.1397 2.36125 15.3451 2.99811 15.034 3.89147C14.723 4.78484 14.9505 5.77747 15.6193 6.44627C18.8463 9.6733 23.5515 14.3785 26.7726 17.5996C27.4375 18.2645 28.4242 18.4905 29.3122 18.1809C30.2001 17.8718 30.8336 17.0817 30.9417 16.1475C31.4164 12.0468 32.0684 6.41727 32.4488 3.12882ZM29.0925 2.30376C28.0989 2.30376 27.292 3.11064 27.292 4.10474C27.292 5.09885 28.0989 5.90573 29.0925 5.90573C30.0866 5.90573 30.8935 5.09885 30.8935 4.10474C30.8935 3.11064 30.0866 2.30376 29.0925 2.30376Z"
                        fill="#293D4A"
                    />
                </svg>
                <!-- <button @click="handleOauth('linkedin')">linkedin</button>
                    <div v-html="getSocials"></div> -->
                <div
                    v-for="(tag, index) in getSingleinstrument.Tags"
                    :key="index"
                    class="stocktag-container"
                >
                    <div @click="setTagPayload(tag)" class="item-tag">
                        <a>{{ tag.name }}</a>
                    </div>
                </div>
            </section>
            <section class="container-graph">
                <div class="graph-container">
                    <Linegraph :instrument="getSingleinstrument" />
                </div>
                <Cardblue :instrument="getPricedetailsonblackcard || {}" />
            </section>
            <section class="container-instrument">
                <StockTable :instrument="getSingleinstrument || {}" />
            </section>
            <section class="container-stocks">
                <Horizontalchart />
                <Analysisbarchart />
            </section>
            <section class="dashboard__title">
                <h3>Similar Stocks</h3>
                <!-- <p class="dashboard__title--sub">Discover new stocks</p> -->
            </section>
            <section v-if="getWindowWidth === 'desktop'">
                <div class="instrument-base">
                    <template v-if="similarLoading">
                        <InstrumentCard dummy v-for="i in 10" :key="i" :instrument="{}" />
                    </template>
                    <template v-else-if="getSimilarStocks.length > 0">
                        <InstrumentCard
                            v-for="(instrument, index) in getSimilarStocks"
                            :key="index"
                            :instrument="instrument"
                            stock-page
                        />
                    </template>
                    <template v-else>
                        <p class="text-center">
                            There are no similar stocks for {{ getSingleinstrument.name }}
                        </p>
                    </template>
                </div>
            </section>
            <section v-else>
                <template v-if="similarLoading">
                    <InstrumentMobile v-for="i in 3" :key="i" :instrument="{}" dummy
                /></template>
                <transition-group name="kyc-navbar" v-else-if="getSimilarStocks.length > 0">
                    <section key="1">
                        <InstrumentMobile
                            v-for="(instrument, index) in getSimilarStocks"
                            :key="index"
                            :instrument="instrument"
                            stock-page
                        />
                    </section>
                </transition-group>
                <template v-else>
                    <p class="text-center">
                        There are no similar stocks for {{ getSingleinstrument.name }}
                    </p>
                </template>
            </section>
            <section class="news-container">
                <section class="dashboard__title">
                    <h3>News</h3>
                    <!-- <p class="dashboard__title--sub">Discover new stocks</p> -->
                </section>
                <section class="news-container-main">
                    <div class="news-container-main" v-if="getNews && getNews.length <= 0">
                        No current news availiable for this current stock
                    </div>
                    <div class="news-container-main" v-else>
                        <news-card :news="item" v-for="(item, index) in getNews" :key="index" />
                    </div>
                </section>
            </section>
        </section>

        <modal-kyc @updated="handleUpdate" @close="showKYC = false" v-if="showKYC" />
    </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "Singlestock",
    components: {
        Fragment,
        Linegraph: () => import("../../components/Linegraph/singlestock_linegraph"),
        Cardblue: () => import("../../components/Linegraph/blackpriceboard"),
        StockTable: () => import("../../components/singlestock/StockTable"),
        Horizontalchart: () => import("../../components/Horizontalbar/hbase"),
        Analysisbarchart: () => import("../../components/Analysisbarchart/analysisbarchartbase"),
        InstrumentCard: () => import("../../components/Instrument/InstrumentCard"),
        InstrumentMobile: () => import("../../components/watchlist/MobileWatchlist")
    },
    computed: {
        ...mapGetters([
            "getWindowWidth",
            "getSingleinstrument",
            "getPricedetailsonblackcard",
            "getSimilarStocks",
            "getlocalstocksowned",
            "getglobalstocksowned",
            "getNextKYC",
            "getWatchlist",
            "getNews",
            "getInstrumentsPayload"
        ]),
        countryCode() {
            if (this.getSingleinstrument.countryCode)
                return this.getSingleinstrument.countryCode.toLowerCase();
            return;
        }
    },
    methods: {
        ...mapActions([
            "GET_WATCHLIST",
            "GET_SIMILAR_STOCKS",
            "GET_SINGLESTOCK_INSTRUMENT",
            "GET_ARTICULE_NEWS",
            "ADD_TO_WATCHLIST",
            "REMOVE_FROM_WATCHLIST",
            "GET_SOCIAL_OAUTH_FACEBOOK"
        ]),
        ...mapMutations([
            "SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS",
            "SET_NEWS",
            "SET_SINGLE_INSTRUMENT",
            "SET_BUY_MODAL"
        ]),
        authenticate(provider) {
            const this_ = this;
            this.$auth.authenticate(provider).then(caller => {
                let token = this_.$auth.getToken();
                // getLoginStatus
                this_.token = token;
                alert(`login success with token ${token}`);
                if (provider === "facebook") {
                    this_.$http
                        .get("https://graph.facebook.com/v3.0/me?fields=id,name,email", {
                            params: { access_token: token }
                        })
                        .then(response => {
                            this_.profile = JSON.stringify(response);
                        });
                }
                if (provider === "google") {
                    this_.$http
                        .get("https://www.googleapis.com/oauth2/v1/userinfo", {
                            params: { access_token: token }
                        })
                        .then(response => {
                            this_.profile = JSON.stringify(response);
                        });
                }
                if (provider === "linkedin") {
                    this_.$http
                        .get("https://api.linkedin.com/v2/me", {
                            params: { access_token: token }
                        })
                        .then(response => {
                            this_.profile = JSON.stringify(response);
                        });
                }
            });
        },
        handleStep(step) {
            // this.step = step.type;
            this.step = step;
            if (step.kyc) {
                this.showKYC = true;
                return true;
            }
            this.showBuy();
        },
        handleOauth(type) {
            this.GET_SOCIAL_OAUTH_FACEBOOK(type);
        },
        showBuy() {
            this.showKYC = false;
            this.SET_BUY_MODAL({
                instrument: this.getSingleinstrument,
                currency: this.getSingleinstrument.currency,
                stockPage: true,
                show: true
            });
            return true;
        },
        async OnhandleaddToWatchlist() {
            // this.watchdisable = true;
            const payload = { symbols: String(this.getSingleinstrument.symbol) };
            await this.ADD_TO_WATCHLIST(payload);
            setTimeout(() => {
                // this.watchdisable = false;
                this.statusOfWatchlist = !this.statusOfWatchlist;
                this.GET_WATCHLIST().then(() => {
                    this.checkIfStockInWatchlist = [...this.getWatchlist].filter(
                        status => status.symbol == this.$route.params.symbol
                    );
                    // filter the arr at this point to get if the current stock is in the watchlist
                });
            }, 200);
        },
        async OnhandleremoveFromWatchlist() {
            // this.watchdisable = true;
            const payload = { symbols: String(this.getSingleinstrument.symbol) };
            await this.REMOVE_FROM_WATCHLIST(payload);
            //  this.watchdisable = false;
            this.statusOfWatchlist = !this.statusOfWatchlist;
            this.GET_WATCHLIST().then(() => {
                this.checkIfStockInWatchlist = [...this.getWatchlist].filter(
                    status => status.symbol == this.$route.params.symbol
                );
                // filter the arr at this point to get if the current stock is in the watchlist
            });
        },
        handleUpdate(value) {
            if (value) {
                this.showBuy();
            }
        },
        async mountedAction(symbol) {
            this.loading = true;
            this.SET_SINGLE_INSTRUMENT({});
            this.SET_NEWS([]);
            const singlestockpayload = { symbols: symbol };
            const newsSinglestockpayload = { symbol };
            this.similarLoading = true;
            this.GET_WATCHLIST().then(() => {
                this.checkIfStockInWatchlist = [...this.getWatchlist].filter(
                    number => number.symbol == symbol
                );
                // filter the arr at this point to get if the current stock is in the watchlist
            });
            await this.GET_SINGLESTOCK_INSTRUMENT(singlestockpayload);
            this.loading = false;
            this.similarLoading = false;
            this.GET_SIMILAR_STOCKS([...this.getSingleinstrument.similar] || []);
            this.GET_ARTICULE_NEWS(newsSinglestockpayload);
        },
        setTagPayload(valuePayload) {
            this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(valuePayload);
            this.$router.push({
                name: "categories",
                params: { category: this.getInstrumentsPayload.slug }
            });
        }
    },
    async mounted() {
        this.mountedAction(this.$route.params.symbol);
    },
    beforeRouteUpdate(to, from, next) {
        this.mountedAction(to.params.symbol);
        next();
    },
    beforeDestroy() {
        this.SET_NEWS([]);
        this.SET_SINGLE_INSTRUMENT({});
    },
    data() {
        return {
            step: null,
            statusOfWatchlist: true,
            showKYC: false,
            type: null,
            loading: false,
            maxQuantity: null,
            cancelStatus: {},
            similarLoading: false,
            description: true,
            watchdisable: true,
            checkIfStockInWatchlist: [],
            token: "",
            profile: "",

            news: [
                {
                    title:
                        "cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ",
                    link: "https://google.com",
                    image: "../../assets/img/news/news.png"
                },
                {
                    title:
                        "cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ",
                    link: "https://google.com",
                    image: "../../assets/img/news/news.png"
                },
                {
                    title:
                        "cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ",
                    link: "https://google.com",
                    image: "../../assets/img/news/news.png"
                },
                {
                    title:
                        "cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ",
                    link: "https://google.com",
                    image: "../../assets/img/news/news.png"
                },
                {
                    title:
                        "cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ",
                    link: "https://google.com",
                    image: "../../assets/img/news/news.png"
                }
            ]
        };
    }
};
</script>

<style src="../../assets/scss/layouts/_singlestock.scss" lang="scss" scoped />
