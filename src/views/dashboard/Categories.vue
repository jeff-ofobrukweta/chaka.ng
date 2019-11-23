<template>
  <section>
    <button id="show-modal" @click="showModal = true">Open Modal</button>
    <div class="card-news__box">
      <news-card :news="item" v-for="(item, index) in news" :key="index" />
    </div>
    <StockTable :instrument="{}" />
    <PortfolioTabs />
    <section class="watchlist-portfolio__box">
      <WatchlistCard
        v-for="(instrument, index) in watchlist"
        :key="index"
        :instrument="instrument"
      />
    </section>
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
import WatchlistCard from '../../components/watchlist/PortfolioWatchlist';
import Portfolio from '../../components/portfolio/PortfolioList';
import PortfolioTabs from '../../components/portfolio/PortfolioTabs';
import StockTable from '../../components/singlestock/StockTable';

export default {
    name: 'portfolio',
    components: {
        WatchlistCard,
        Portfolio,
        PortfolioTabs,
        StockTable
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
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: 'Spotify',
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: 'Spotify',
                    price: 656.9,
                    percent: 0.67,
                    change: 4
                },
                {
                    name: 'Spotify',
                    price: 656.9,
                    percent: 0.67,
                    change: 2
                },
                {
                    name: 'Spotify',
                    price: 656.9,
                    percent: 0.67,
                    change: 1
                },
                {
                    name: 'Spotify',
                    price: 656.9,
                    percent: 0.67,
                    change: 0
                },
                {
                    name: 'Spotify',
                    price: 656.9,
                    percent: 0.67,
                    change: -3
                },
                {
                    name: 'Spotify',
                    price: 656.9,
                    percent: 0.67,
                    change: -10
                }
            ]
        };
    }
};
</script>
