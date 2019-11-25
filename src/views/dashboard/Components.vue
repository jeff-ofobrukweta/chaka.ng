<template>
    <section class="dashboard__main">
        <button id="show-modal" @click="showModal = true">Open Modal</button>
        <section class="watchlist-explore__box" v-if="getWindowWidth === 'desktop'">
            <ExploreWatchlist
                v-for="(instrument, index) in watchlist"
                :key="index"
                :instrument="instrument"
            />
        </section>
        <section class="watchlist-mobile__box" v-else>
            <MobileWatchlist
                v-for="(instrument, index) in watchlist"
                :key="index"
                :instrument="instrument"
            />
        </section>
        <div class="card-news__box">
            <news-card :news="item" v-for="(item, index) in news" :key="index" />
        </div>
        <StockTable :instrument="{}" />
        <section class="watchlist-portfolio__box">
            <WatchlistCard
                v-for="(instrument, index) in watchlist"
                :key="index"
                :instrument="instrument"
            />
        </section>
        <section class="portfolio-card__box">
            <PortfolioCard v-for="(card, index) in getPortfolioSummary" :key="index" :data="card" />
        </section>
        <Linebase />
        <Doughnut />
        <Horizontalbar />
        <Singlestockgraphbase />
        <Blackboard />
        <Portfolio />
        <modal
            :close-on-click="false"
            no-header
            full-on-mobile
            v-if="showModal"
            @close="showModal = false"
        />
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import WatchlistCard from '../../components/watchlist/PortfolioWatchlist';
import PortfolioCard from '../../components/portfolio/PortfolioCard';
import StockTable from '../../components/singlestock/StockTable';
import ExploreWatchlist from '../../components/watchlist/ExploreWatchlist';
import MobileWatchlist from '../../components/watchlist/MobileWatchlist';
import Portfolio from '../../components/portfolio/PortfolioList';
import Linebase from '../../components/Linegraph/linebase';
import Doughnut from '../../components/Doughnut/dbase';
import Horizontalbar from '../../components/Horizontalbar/hbase';
import Singlestockgraphbase from '../../components/Linegraph/singlestock_linegraph';
import Blackboard from '../../components/Linegraph/blackpriceboard';

export default {
    name: 'portfolio',
    components: {
        WatchlistCard,
        PortfolioCard,
        StockTable,
        MobileWatchlist,
        ExploreWatchlist,
        Portfolio,
        Linebase,
        Doughnut,
        Horizontalbar,
        Singlestockgraphbase,
        Blackboard
    },
    data() {
        return {
            showModal: false,
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
            ]
        };
    },
    computed: {
        ...mapGetters(['getPortfolioSummary', 'getWindowWidth'])
    }
};
</script>
