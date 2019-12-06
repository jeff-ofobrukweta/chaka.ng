<template>
    <section class="dashboard__main">
        <div class="header-container dashboard__title">
            <section class="right-header">
                 <h1 class="price">
            {{
            getSingleinstrument[0].InstrumentDynamic.askPrice| kobo |currency(getSingleinstrument[0].currency)
            }}
          </h1>
          <h1 class="percentage">
            <span
              :class="[getPricedetailsonblackcard.derivedPrice < 0 ? 'red': 'green','price']"
            >{{ getPricedetailsonblackcard.derivedPrice }}</span>
            <span
              :class="[getPricedetailsonblackcard.derivedPricePercentage < 0 ? 'red': 'green','price']"
              class="delta"
            >({{ getPricedetailsonblackcard.derivedPricePercentage }})%</span>
          </h1>
            </section>
            <section class="left-header">
                <section class="name-country">
                    <img class="logo-company" :src="getSingleinstrument[0].logoUrl" alt="logo" />
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
                <button class="buy-btn">Buy</button>
            </section>
        </div>
        <button v-if="getWindowWidth === 'mobile'" class="small-size">Buy</button>
        <section class="sumary">
            <div :title="getSingleinstrument[0].description" class="summary-cover">
                {{ getSingleinstrument[0].description || "" | truncate(500) }}
            </div>
            <div
                v-for="(tag, index) in getSingleinstrument[0].Tags"
                :key="index"
                class="stocktag-container">
                <div class="item-tag">{{ tag.name }}</div>
            </div>
        </section>
        <section class="container-graph">
            <div class="graph-container">
                <Linegraph :instrument="getSingleinstrument[0]" />
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
                    <InstrumentCard
                        dummy
                        v-for="i in 10"
                        :key="i"
                        :instrument="{}"
                    />
                </template>
                <template v-else-if="getSimilarStocks.length > 0">
                    <InstrumentCard
                        v-for="(instrument, index) in getSimilarStocks"
                        :key="index"
                        :instrument="instrument"
                    />
                </template>
                <template v-else>
                <p class="text-center">There are no similar stocks for {{ getSingleinstrument[0].name }}</p>
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
                <p class="text-center">There are no similar stocks for {{ getSingleinstrument[0].name }}</p>
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
</template>
<script>
import { Fragment } from "vue-fragment";
import Linegraph from "../../components/Linegraph/singlestock_linegraph";
import Cardblue from "../../components/Linegraph/blackpriceboard";
import StockTable from "../../components/singlestock/StockTable";
import Horizontalchart from "../../components/Horizontalbar/hbase";
import Analysisbarchart from "../../components/Analysisbarchart/analysisbarchartbase";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "Singlestock",
    components: {
        Fragment,
        Linegraph,
        Cardblue,
        StockTable,
        Horizontalchart,
        Analysisbarchart,
        InstrumentCard: () => import('../../components/Instrument/InstrumentCard'),
        InstrumentMobile: () => import('../../components/watchlist/MobileWatchlist')
    },
    computed: {
        ...mapGetters([
            "getWindowWidth",
            "getSingleinstrument",
            "getPricedetailsonblackcard",
            "getPositionsWithparams",
            "getSimilarStocks"
        ])
    },
    methods: {
        //...mapMutations(['SET_LINE_SINGLESTOCK_CHARTDATA']),
        ...mapActions(["GET_SINGLESTOCK_INSTRUMENT", "GET_CURRENT_STOCK_POSITION"]),
        ...mapMutations(["SET_SINGLE_INSTRUMENT"])
    },
    async mounted() {
        const singlestockpayload = {symbols: this.$route.params.symbol};
        this.similarLoading = true
        await this.GET_SINGLESTOCK_INSTRUMENT(singlestockpayload).then(()=>{
             console.log('this is the tags for single stock BBBBBBBBBBBBBBBTTTTTTTTTTTTTTTBBBBBBBBBBBBBBTTTTT',this.getSingleinstrument[0].Tags)
             this.GET_CURRENT_STOCK_POSITION()
             this.similarLoading = false
        })
    },
    beforeRouteUpdate(to, from, next) {
        const singlestockpayload = {
            symbols: to.params.symbol
        };
        this.similarLoading = true
        this.GET_SINGLESTOCK_INSTRUMENT(singlestockpayload).then(()=>{
            this.similarLoading = false
        })
        next();
    },
    beforeDestroy() {
        this.SET_SINGLE_INSTRUMENT([]);
    },
    data() {
        return {
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
