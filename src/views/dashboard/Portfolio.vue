<template>
    <section class="dashboard__main">
        <section class="portfolio-line__graph">
            <Linegraph />
        </section>
        <section class="portfolio-card__box">
            <PortfolioCardLocal 
            :instrument="getPortfoliopositionsCarddetails"
            />
            <PortfolioCardGlobal
            :instrument="getPortfoliopositionsCarddetails"
            />
            <PortfolioCardOpenorders
            :instrument="getPortfoliopositionsCarddetails"
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
                <option
                v-for="(item,index) in interval"
                :key="index"
                @click="handlewatchlistintervalToogle(item.value)"
                >{{item.name}}</option>
            </select>
        </section>
        <section class="watchlist-portfolio__box">
            <WatchlistCard
                v-for="(instrument, index) in watchList"
                :key="index"
                :instrument="instrument"
            />
        </section>
    </section>
</template>

<script>
import { mapGetters,mapActions,mapMutations } from "vuex";
import WatchlistCard from "../../components/watchlist/PortfolioWatchlist";
import PortfolioCardLocal from "../../components/portfolio/PortfolioCardLocal";
import PortfolioCardGlobal from "../../components/portfolio/PortfolioCardGlobal";
import PortfolioCardOpenorders from "../../components/portfolio/PortfolioCardOpenorders";
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
        PortfolioCardLocal,
        PortfolioCardGlobal,
        PortfolioCardOpenorders,
        Linegraph,
        Doughnut,
        Performancebarchart,
        Analysischart,
        HorizontalBarchart,
        Singlecourselinegraph
    },
    data() {
        return {
            interval: [
                {
                    name: "Daily",
                    value:"1D",
                    id:0,
                    description:""
                },
                {
                    name: "One Month",
                    value:"1M",
                    id:1,
                    description:""
                },
                {
                    name: "Three Month",
                    value:"3M",
                    id:2,
                    description:""
                },
                {
                    name: "One Year",
                    value:"1Y",
                    id:3,
                    description:""
                },
                {
                    name: "Five Years",
                    value:"5Y",
                    id:4,
                    description:""
                }
            ], 
            watchList:[]

        }    
    },
     methods:{
        ...mapActions(['GET_ACCOUNT_SUMMARY','GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS','GET_WATCHLIST']),
        handlewatchlistintervalToogle(payload){
             this.watchList = [];
            console.log('This is the current Interval here',payload)
            const watchPayload = {interval:payload}
                this.GET_WATCHLIST(watchPayload).then(()=>{
                     this.watchList = [...this.getWatchlist];
                    // put loader state here
            })
        }
    },
    mounted(){
        const payload = {interval:'1D'};
        this.GET_WATCHLIST(payload).then(()=>{
            this.watchList = [...this.getWatchlist];
            console.log('HELLO GOODRESULT HERE TTTTTTTTTTTTTTTnew',this.getWatchlist )
        })
        const currency = {currency:this.getPorfolioglobalCurrencyforGraph}
        this.GET_ACCOUNT_SUMMARY(currency).then(() => {
            console.log("YYYYYYGET_ACCOUNT_SUMMARYYYYYYYYYYYYYYYYY",this.getAccountSummary)
                this.GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS().then(()=>{
                    console.log('KKKKKKKKKKKKKKGET_POSITIONS_HELD_FOR_PORTFOLIOCARDSKKKKKKKKKKKKKKKK',this.getPortfoliopositionsCarddetails.positions.filled.localOrders)
                });
        });
    },
    computed: {
        ...mapGetters(["getWatchlist","getPortfolioSummary","getPorfolioglobalCurrencyforGraph","getAccountSummary","getPortfoliopositionsCarddetails"])
    }
};
</script>
<style src="../../assets/scss/layouts/_portfoliobase.scss" lang="scss" scoped />
