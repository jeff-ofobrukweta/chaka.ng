<template>
  <section>
    <PortfolioTabs />
    <Watchlist />
    <Portfolio />
  </section>
</template>

<script>
import Watchlist from "../../components/watchlist/WatchlistList";
import Portfolio from "../../components/portfolio/PortfolioList";
import PortfolioTabs from "../../components/portfolio/PortfolioTabs";
export default {
  name: "portfolio",
  components: {
    Watchlist,
    Portfolio,
    PortfolioTabs
  }
};
</script>