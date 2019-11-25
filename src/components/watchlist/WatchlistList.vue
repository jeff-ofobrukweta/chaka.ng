<template>
  <div class="watchlist-portfolio__box">
    <WatchlistCard v-for="(instrument, index) in watchlist" :key="index" :instrument="instrument" />
  </div>
</template>

<script>
import WatchlistCard from './WatchlistCard';

export default {
  name: 'watchlist-list',
  components: {
    WatchlistCard,
  },
  data() {
    return {
      watchlist: [
        {
          name: 'Spotify',
          price: 656.9,
          percent: 0.67,
          change: 20,
        },
        {
          name: 'Spotify',
          price: 656.9,
          percent: 0.67,
          change: 20,
        },
        {
          name: 'Spotify',
          price: 656.9,
          percent: 0.67,
          change: 4,
        },
        {
          name: 'Spotify',
          price: 656.9,
          percent: 0.67,
          change: 2,
        },
        {
          name: 'Spotify',
          price: 656.9,
          percent: 0.67,
          change: 1,
        },
        {
          name: 'Spotify',
          price: 656.9,
          percent: 0.67,
          change: 0,
        },
        {
          name: 'Spotify',
          price: 656.9,
          percent: 0.67,
          change: -3,
        },
        {
          name: 'Spotify',
          price: 656.9,
          percent: 0.67,
          change: -10,
        },
      ],
    };
  },
};
</script>
