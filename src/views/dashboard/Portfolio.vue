<template>
    <section class="dashboard__main">
        <section class="portfolio-line__graph">
            <Linegraph />
        </section>
        <section class="portfolio-card__box">
            <PortfolioCard 
            v-for="(card, index) in getPortfolioSummary"
            :instrument="getAccountSummary"
            :key="index" 
            :data="card"
            />
        </section>
        <section class="portfolio__charts">
            <Doughnut />
            <Performancebarchart />
        </section>
        <section class="explore__title">
            <div>
                <h3>Watchlist</h3>
                <p class="explore__title--sub">Keep a close watch on top stocks</p>
            </div>
            <select class="form__input" name="" id="">
                <option value="1">Daily</option>
                <option value="2">Weekly</option>
                <option value="3">Monthly</option>
            </select>
        </section>
        <section class="watchlist-portfolio__box">
            <WatchlistCard
                v-for="(instrument, index) in watchlist"
                :key="index"
                :instrument="instrument"
            />
        </section>
    </section>
</template>

<script>
import { mapGetters,mapActions,mapMutations } from "vuex";
import WatchlistCard from "../../components/watchlist/PortfolioWatchlist";
import PortfolioCard from "../../components/portfolio/PortfolioCard";
import Linegraph from "../../components/Linegraph/linebase";
import Doughnut from "../../components/Doughnut/dbase";
import Performancebarchart from "../../components/Performance_chart/performancebase";
import Analysischart from "../../components/Analysisbarchart/analysisbarchartbase";
import HorizontalBarchart from "../../components/Horizontalbar/hbase";
import Singlecourselinegraph from "../../components/Linegraph/singlestock_linegraph";

export default {
    name: "portfolio",
    components: {
        WatchlistCard,
        PortfolioCard,
        Linegraph,
        Doughnut,
        Performancebarchart,
        Analysischart,
        HorizontalBarchart,
        Singlecourselinegraph
    },
    data() {
        return {
            watchlist: [
                {
                    name: "Spotify",
                    symbol: "SPOT",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: "Google",
                    symbol: "GOOGL",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: "MTN Nigeria",
                    symbol: "MTNN",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 4
                },
                {
                    name: "Jumia Technologies",
                    symbol: "JUMIA",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 2
                },
                {
                    name: "Spotify",
                    symbol: "SPOT",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 1
                },
                {
                    name: "Spotify",
                    symbol: "SPOT",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 0
                },
                {
                    name: "Spotify",
                    symbol: "SPOT",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: -3
                },
                {
                    name: "Spotify",
                    symbol: "SPOT",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: -10
                }
            ]
        };
    },
     methods:{
        ...mapActions(['GET_ACCOUNT_SUMMARY']),
    },
    mounted(){
        const currency = {currency:this.getPorfolioglobalCurrencyforGraph}
        this.GET_ACCOUNT_SUMMARY(currency).then(() => {
            console.log("YYYYYYYYYYYYYYYYYYYYYY",this.getAccountSummary)
        });
    },
    computed: {
        ...mapGetters(["getPortfolioSummary","getPorfolioglobalCurrencyforGraph","getAccountSummary"])
    }
};
</script>
<style src="../../assets/scss/layouts/_portfoliobase.scss" lang="scss" scoped />
