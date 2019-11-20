<template>
  <div class="watchlist-portfolio__card" :class="color">
    <div class="watchlist-portfolio__left">
      <p class="watchlist-portfolio__name">{{ instrument.name }}</p>
      <p class="watchlist-portfolio__change">
        <img v-if="instrument.change >= 0" src="../../assets/img/watchlist-up.svg" alt="Growth" />
        <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
        <span>{{ instrument.change >= 0 ? "+" : "" }}</span>
        <small>{{ instrument.change }} ({{ instrument.percent }}%)</small>
      </p>
      <p>
        <strong>{{ instrument.price }}</strong>
      </p>
    </div>
    <div class="watchlist-portfolio__right">
      <div>
        <img src="../../assets/img/watch-open.svg" alt="Watch" />
      </div>
      <div>
        <a class="watchlist-portfolio__buy">+ Buy</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "watchlist-card",
  props: {
    instrument: {
      type: Object,
      required: true
    }
  },
  computed: {
    color() {
      return this.instrument.change > 3
        ? "dark-green"
        : this.instrument.change > 2
        ? "green"
        : this.instrument.change >= 0
        ? "light-green"
        : this.instrument.change >= -1
        ? "light-red"
        : this.instrument.change >= -2
        ? "red"
        : "dark-red";
    }
  }
};
</script>
