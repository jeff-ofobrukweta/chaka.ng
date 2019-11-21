<template>
  <section>
    <StockTable :instrument="{}" />
    <PortfolioTabs />
    <Watchlist />
    <Portfolio />
  </section>
</template>

<script>
import Watchlist from "../../components/watchlist/WatchlistList";
import Portfolio from "../../components/portfolio/PortfolioList";
import PortfolioTabs from "../../components/portfolio/PortfolioTabs";
import StockTable from "../../components/singlestock/StockTable";
export default {
  name: "portfolio",
  components: {
    Watchlist,
    Portfolio,
    PortfolioTabs,
    StockTable
  }
};
</script>
