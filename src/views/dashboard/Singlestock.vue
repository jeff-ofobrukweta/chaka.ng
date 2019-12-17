<template>
    <Fragment>
        <section
            class="issues-with-pageloading"
            v-if="
                getSingleinstrument[0] == undefined ||
                    !getSingleinstrument ||
                    getSingleinstrument[0] == null
            "
        >
            <div>
                <aside class="center-fix-messg">
                    fetching the current page, try reloading the browser after sometime
                </aside>
            </div>
        </section>
        <section v-else class="dashboard__main">
            <div class="header-container dashboard__title">
                <section class="right-header">
                    <h1 class="price">
                        {{
                            getSingleinstrument[0].InstrumentDynamic.askPrice
                                | kobo
                                | currency(getSingleinstrument[0].currency)
                        }}
                    </h1>
                    <h1 class="percentage">
                        <span
                            :class="[
                                getPricedetailsonblackcard.derivedPrice < 0 ? 'red' : 'green',
                                'price'
                            ]"
                            >{{ getPricedetailsonblackcard.derivedPrice }}</span
                        >
                        <span
                            :class="[
                                getPricedetailsonblackcard.derivedPricePercentage < 0
                                    ? 'red'
                                    : 'green',
                                'price'
                            ]"
                            class="delta"
                            >({{ getPricedetailsonblackcard.derivedPricePercentage }})%</span
                        >
                    </h1>
                </section>
                <section class="left-header">
                    <section class="name-country">
                        <img
                            class="logo-company"
                            :src="getSingleinstrument[0].logoUrl"
                            alt="logo"
                        />
                        <aside class="item-name-country">
                            <section :title="getSingleinstrument[0].name" class="stockname">
                                {{ getSingleinstrument[0].name || "" | truncate(10) }}
                            </section>
                            <img
                                class="state"
                                :src="
                                    require(`../../assets/img/icons/flags/${getSingleinstrument[0].countryCode.toLowerCase()}-flag.svg`)
                                "
                                alt="state"
                            />
                        </aside>
                    </section>
                    <kyc-button
                        ref="buyBtn"
                        :classes="['buy-btn']"
                        :action="getSingleinstrument[0].currency === 'NGN' ? 'local' : 'global'"
                        @step="handleStep"
                        next-action="buy"
                        >Buy</kyc-button
                    >
                </section>
            </div>
            <kyc-button
                ref="buyBtn"
                v-if="getWindowWidth === 'mobile'"
                :classes="['small-size']"
                :action="getSingleinstrument[0].currency === 'NGN' ? 'local' : 'global'"
                @step="handleStep"
                next-action="buy"
                >Buy</kyc-button
            >
            <section class="sumary">
                <div
                    v-if="getSingleinstrument[0].description"
                    :title="getSingleinstrument[0].description"
                    class="summary-cover"
                >
                    {{ getSingleinstrument[0].description || "" | truncate(500) }}
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
                <div
                    v-for="(tag, index) in getSingleinstrument[0].Tags"
                    :key="index"
                    class="stocktag-container"
                >
                    <div class="item-tag">{{ tag.name }}</div>
                </div>
            </section>
            <section class="container-graph">
                <div class="graph-container">
                    <Linegraph :instrument="getSingleinstrument[0]" :max-quantity="maxQuantity" />
                </div>
                <Cardblue :instrument="getPricedetailsonblackcard" />
            </section>
            <section class="container-instrument">
                <StockTable
                    :getPositionsforcurrentstock="getPositionsWithparams()"
                    :instrument="getSingleinstrument[0]"
                />
            </section>
            <section class="container-stocks">
                <Horizontalchart />
                <Analysisbarchart />
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
                        />
                    </template>
                    <template v-else>
                        <p class="text-center">
                            There are no similar stocks for {{ getSingleinstrument[0].name }}
                        </p>
                    </template>
                </div>
            </section>
            <section v-else>
                <template v-if="similarLoading">
                    <InstrumentMobile v-for="i in 3" :key="i" :instrument="{}" dummy
                /></template>
                <template v-else-if="getSimilarStocks.length > 0">
                    <transition-group name="kyc-navbar">
                        <InstrumentMobile
                            v-for="(instrument, index) in getSimilarStocks"
                            :key="index"
                            :instrument="instrument"
                        />
                    </transition-group>
                </template>
                <template v-else>
                    <p class="text-center">
                        There are no similar stocks for {{ getSingleinstrument[0].name }}
                    </p>
                </template>
            </section>
            <section class="news-container">
                <h1 class="title">News</h1>
                <section class="sub-title">lorem ipsun blabala here</section>
                <section class="news-container-main">
                    <news-card :news="item" v-for="(item, index) in news" :key="index" />
                </section>
            </section>
        </section>

        <modal-kyc
            :requiredFields="selectedField.fields"
            :title="selectedField.title"
            @updated="handleUpdate"
            @close="showKYC = false"
            v-if="showKYC"
        />
    </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Linegraph from "../../components/Linegraph/singlestock_linegraph";
import Cardblue from "../../components/Linegraph/blackpriceboard";
import StockTable from "../../components/singlestock/StockTable";
import Horizontalchart from "../../components/Horizontalbar/hbase";
import Analysisbarchart from "../../components/Analysisbarchart/analysisbarchartbase";
import KYCTitles from "../../services/kyc/kycTitles";

export default {
    name: "Singlestock",
    components: {
        Fragment,
        Linegraph,
        Cardblue,
        StockTable,
        Horizontalchart,
        Analysisbarchart,
        InstrumentCard: () => import("../../components/Instrument/InstrumentCard"),
        InstrumentMobile: () => import("../../components/watchlist/MobileWatchlist")
    },
    computed: {
        ...mapGetters([
            "getWindowWidth",
            "getSingleinstrument",
            "getPricedetailsonblackcard",
            "getPositionsWithparams",
            "getSimilarStocks",
            "getlocalstocksowned",
            "getglobalstocksowned",
            "getNextKYC"
        ])
    },
    methods: {
        ...mapActions(["GET_SINGLESTOCK_INSTRUMENT", "GET_CURRENT_STOCK_POSITION"]),
        ...mapMutations(["SET_SINGLE_INSTRUMENT", "SET_BUY_MODAL", "SET_SELL_MODAL"]),
        handleStep(step) {
            // this.step = step.type;
            this.step = step;
            if (step.kyc) {
                this.showKYC = true;
                this.allNextKYC.forEach(element => {
                    element.fields.forEach(el => {
                        if (el === this.getNextKYC.nextKYC[0]) {
                            this.selectedField = element;
                            this.selectedField.fields = this.getNextKYC.nextKYC;
                        }
                    });
                });
                return true;
            }
            if (step.nextAction === "buy") {
                this.SET_BUY_MODAL({
                    instrument: this.getSingleinstrument[0],
                    currency: this.getSingleinstrument[0].currency,
                    stockPage: true,
                    show: true
                });
                return true;
            }
            this.SET_SELL_MODAL({
                instrument: this.getSingleinstrument[0],
                currency: this.getSingleinstrument[0].currency,
                stockPage: true,
                show: true,
                maxQuamtity: this.maxQuamtity
            });
        },
        handleUpdate() {
            // this.showKYC = false;
            if (this.step.type !== "kyc") {
                if (this.step.nextAction === "buy") this.$refs.buyBtn.$el.click();
                else this.$refs.sellBtn.$el.click();
            }
        },
        checkPositions() {
            let check = [];
            if (this.getSingleinstrument[0].currency === "NGN") {
                check = this.getlocalstocksowned.filter(
                    element => element.symbol === this.getSingleinstrument[0].symbol
                );
            } else {
                check = this.getglobalstocksowned.filter(
                    element => element.symbol === this.getSingleinstrument[0].symbol
                );
            }
            if (check.length > 0) {
                const { quantity } = check[0];
                this.maxQuantity = +quantity;
                return true;
            }
            this.maxQuantity = 0;
            return false;
        }
    },
    async mounted() {
        const singlestockpayload = { symbols: this.$route.params.symbol };
        this.similarLoading = true;
        await this.GET_SINGLESTOCK_INSTRUMENT(singlestockpayload).then(() => {
            this.GET_CURRENT_STOCK_POSITION();
            this.similarLoading = false;
            this.checkPositions();
        });
    },
    beforeRouteUpdate(to, from, next) {
        const singlestockpayload = {
            symbols: to.params.symbol
        };
        this.similarLoading = true;
        this.GET_SINGLESTOCK_INSTRUMENT(singlestockpayload).then(() => {
            this.similarLoading = false;
        });
        next();
    },
    beforeDestroy() {
        this.SET_SINGLE_INSTRUMENT([]);
    },
    data() {
        return {
            step: null,
            showKYC: false,
            selectedField: {},
            type: null,
            allNextKYC: KYCTitles.titles,
            loading: false,
            maxQuantity: null,
            cancelStatus: {},
            similarLoading: false,
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
