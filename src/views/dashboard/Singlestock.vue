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
                        src="../../assets/img/Netflix.png"
                        alt="logo"
                    />
                    <aside class="item-name-country">
                        <section class="stockname">Netflix</section>
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
                   {{` Netflix, Inc. is a provider an Internet television network. 
                    The Company operates through three segments: Domestic streaming, 
                    International streaming and Domestic DVD. The Domestic streaming segment 
                    includes services that streams content to its members in the United States. 
                    The International streaming segment includes services that streams content to its members 
                    outside the United States. The Domestic DVD segment includes services, 
                    such as digital optical disc (DVD)-by-mail. The Company's members can watch original series, 
                    documentaries, feature films, as well as television shows and movies directly on their 
                    Internet-connected screen, televisions, computers and mobile devices. It offers its streaming services 
                    both domestically and internationally. In the United States, its members can receive DVDs delivered to their homes. 
                    The Company had members streaming in over 190 countries, as of December 31, 2016.` | truncate(500)}}
                </div>
            </section>
            <section class="container-graph">
               <Linegraph/>
               <Cardblue/>
            </section>
            <section class="container-instrument">
                <StockTable :instrument="{}" />
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
import { mapGetters } from 'vuex';
import Linegraph from '../../components/Linegraph/singlestock_linegraph';
import Cardblue from '../../components/Linegraph/blackpriceboard';
import StockTable from '../../components/singlestock/StockTable';
import Horizontalchart from '../../components/Horizontalbar/hbase';
import Analysisbarchart from '../../components/Analysisbarchart/analysisbarchartbase';
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
        ...mapGetters(['getWindowWidth'])
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