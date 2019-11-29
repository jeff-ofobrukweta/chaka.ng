<template>
    <Fragment>
        <div class="wraper-main">
            <div class="header-container">
                <section class="right-header">
                    <h1 class="price">$123.78</h1>
                    <h1 class="percentage">123.45<span class="delta">(17.79)%</span></h1>
                </section>
                <section class="left-header">
                    <section class="name-country">
                         <img
                        class="logo-company"
                        :src="getSingleinstrument.logoUrl"
                        alt="logo"
                    />
                    <aside class="item-name-country">
                        <section class="stockname">{{getSingleinstrument.name || '' | truncate(10)}}</section>
                            <img
                                class="state"
                                src="../../assets/Instrument_assets/united-states.png"
                                alt="state"
                            />
                    </aside>
                    </section>
                    <button class="buy-btn">Buy</button>
                </section>
            </div>
             <button
             v-if="getWindowWidth === 'mobile'"  
             class="small-size">Buy</button>
            <section class="sumary">
                <div class="summary-cover">
                   {{getSingleinstrument.description || '' | truncate(500)}}
                </div>
            </section>
            <section class="container-graph">
               <Linegraph :instrument="getSingleinstrument"/>
               <Cardblue :instrument="getPricedetailsonblackcard"/>
            </section>
            <section class="container-instrument">
                <StockTable :instrument="getSingleinstrument" />
            </section>
            <section class="container-stocks">
               <Horizontalchart/>
               <Analysisbarchart/>
            </section>
            <section class="news-container">
                <h1 class="title">News</h1>
                <section class="sub-title">lorem ipsun blabala here</section>
                <section class="news-container-main">
                <news-card :news="item" v-for="(item, index) in news" :key="index" />
                </section>
            </section>
        </div>
    </Fragment>
</template>
<script>
import {Fragment} from 'vue-fragment';
import Linegraph from '../../components/Linegraph/singlestock_linegraph';
import Cardblue from '../../components/Linegraph/blackpriceboard';
import StockTable from '../../components/singlestock/StockTable';
import Horizontalchart from '../../components/Horizontalbar/hbase';
import Analysisbarchart from '../../components/Analysisbarchart/analysisbarchartbase';
import { mapGetters,mapMutations,mapActions } from 'vuex';


export default {
    components:{
        Fragment,
        Linegraph,
        Cardblue,
        StockTable,
        Horizontalchart,
        Analysisbarchart
    },
    computed:{
        ...mapGetters(['getWindowWidth','getSingleinstrument','getPricedetailsonblackcard','getPositionsWithparams'])
    },
    methods:{
        //...mapMutations(['SET_LINE_SINGLESTOCK_CHARTDATA']),
        ...mapActions(['GET_SINGLESTOCK_INSTRUMENT','GET_CURRENT_STOCK_POSITION'])
    },
    mounted(){
        const singlestockpayload = {
            instrumentID:this.$route.params.id
        }
        
        console.log('>>>>>>>bloooomm????????here pls??????????>>>',this.getSingleinstrument)
        this.GET_SINGLESTOCK_INSTRUMENT().then(()=>{
            // this.getPositionsWithparams(this.$route.params.id)
            this.GET_CURRENT_STOCK_POSITION().then(()=>{
                console.log('get positions',this.getPositionsWithparams)
            });
        })
    },
    data(){
        return{
            watchlist: [
                {
                    name: 'Spotify',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: 'Spotify',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: 'Spotify',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 4
                },
                {
                    name: 'Spotify',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 2
                },
                {
                    name: 'Spotify',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 1
                },
                {
                    name: 'Spotify',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 0
                },
                {
                    name: 'Spotify',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: -3
                },
                {
                    name: 'Spotify',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: -10
                }
            ],
            news: [
                {
                    title:
                        'cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ',
                    link: 'https://google.com',
                    image: '../../assets/img/news/news.png'
                },
                {
                    title:
                        'cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ',
                    link: 'https://google.com',
                    image: '../../assets/img/news/news.png'
                },
                {
                    title:
                        'cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ',
                    link: 'https://google.com',
                    image: '../../assets/img/news/news.png'
                },
                {
                    title:
                        'cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ',
                    link: 'https://google.com',
                    image: '../../assets/img/news/news.png'
                },
                {
                    title:
                        'cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ',
                    link: 'https://google.com',
                    image: '../../assets/img/news/news.png'
                }
            ],
        }
    }
}
</script>

<style src="../../assets/scss/layouts/_singlestock.scss" lang="scss" scoped />