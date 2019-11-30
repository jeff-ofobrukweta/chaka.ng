<template>
    <Fragment>
        <div class="wraper-main">
            <div class="header-container">
                <section class="right-header">
                    <h1
                    class="price"
                    >{{getSingleinstrument[0].currency === 'USD'?'$':'₦'}}{{getSingleinstrument[0].InstrumentDynamic.askPrice}}</h1>
                    <h1 
                    class="percentage">
                    <span
                    :class="[getSingleinstrument[0].InstrumentDynamic.yclose < 0 ? 'red' : 'green','price']"
                    >{{getSingleinstrument[0].InstrumentDynamic.yclose}}</span>
                    <span 
                    :class="[getSingleinstrument[0].InstrumentDynamic.ycloseChange < 0 ? 'red' : 'green','price']"
                    class="delta">
                        ({{(getSingleinstrument[0].InstrumentDynamic.ycloseChange)}})%</span></h1>
                </section>
                <section class="left-header">
                    <section class="name-country">
                         <img
                        class="logo-company"
                        :src="getSingleinstrument[0].logoUrl"
                        alt="logo"
                    />
                    <aside class="item-name-country">
                        <section class="stockname">{{getSingleinstrument[0].name || '' | truncate(10)}}</section>
                            <img
                                class="state"
                                :src="require(`../../assets/img/icons/flags/${getSingleinstrument[0].countryCode.toLowerCase()}-flag.svg`)"
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
                   {{getSingleinstrument[0].description || '' | truncate(500)}}
                </div>
                <div
                v-for="(tag,index) in getSingleinstrument[0]" 
                :key="index"
                class="stocktag-container">
                    <div class="item-tag">{{index.name}}</div>
                </div>
            </section>
            <section class="container-graph">
               <Linegraph :instrument="getSingleinstrument[0]"/>
               <Cardblue :instrument="getPricedetailsonblackcard"/>
            </section>
            <section class="container-instrument">
                <StockTable
                :getPositionsforcurrentstock="getPositionsWithparams()" 
                :instrument="getSingleinstrument[0]" />
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
    async mounted(){
        const singlestockpayload = {
            symbols:this.$route.params.symbol
        }
        await this.GET_SINGLESTOCK_INSTRUMENT(singlestockpayload).then(()=>{
            // this.getPositionsWithparams(this.$route.params.id)
            this.GET_CURRENT_STOCK_POSITION().then(()=>{
                console.log('get positions',this.getPositionsWithparams())
            });
        })
    },
    beforeRouteUpdate(to,from,next){
            const singlestockpayload = {
                symbols:to.params.symbol
            }
          this.GET_SINGLESTOCK_INSTRUMENT(singlestockpayload)
         next();
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