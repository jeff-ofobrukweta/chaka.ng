<template>
  <section>
    <Linebase/>
    <Doughnut/>
    <div class="card-news__box">
      <news-card :news="item" v-for="(item, index) in news" :key="index" />
    </div>
    <StockTable :instrument="{}" />
    <PortfolioTabs />
    <Watchlist />
    <Portfolio />
  </section>
</template>

<script>
import Watchlist from '../../components/watchlist/WatchlistList';
import Portfolio from '../../components/portfolio/PortfolioList';
import PortfolioTabs from '../../components/portfolio/PortfolioTabs';
import StockTable from '../../components/singlestock/StockTable';
import Linebase from '../../components/Linegraph/linebase';
import Doughnut from '../../components/Doughnut/doughnut';

export default {
  name: 'portfolio',
  components: {
    Watchlist,
    Portfolio,
    PortfolioTabs,
    StockTable,
    Linebase,
    Doughnut,
  },
  data() {
    return {
      news: [
        {
          title:
            'cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ',
          link: 'https://google.com',
          image: '../../assets/img/news/news.png',
        },
        {
          title:
            'cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ',
          link: 'https://google.com',
          image: '../../assets/img/news/news.png',
        },
        {
          title:
            'cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ',
          link: 'https://google.com',
          image: '../../assets/img/news/news.png',
        },
        {
          title:
            'cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ',
          link: 'https://google.com',
          image: '../../assets/img/news/news.png',
        },
        {
          title:
            'cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ',
          link: 'https://google.com',
          image: '../../assets/img/news/news.png',
        },
      ],
    };
  },
};
</script>
