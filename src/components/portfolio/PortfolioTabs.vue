<template>
  <div>
    <div class="portfolio-tabs">
      <div class="portfolio-tab" @click="activeTab = 0" :class="{ active: activeTab === 0 }">
        <span>Your Local Stocks</span>
      </div>
      <div class="portfolio-tab" @click="activeTab = 1" :class="{ active: activeTab === 1 }">
        <span>Your Global Stocks</span>
      </div>
      <div class="portfolio-tab" @click="activeTab = 2" :class="{ active: activeTab === 2 }">
        <span>Open Orders</span>
      </div>
    </div>
    <PortfolioTable :data="localStocks" />
  </div>
</template>

<script>
import PortfolioTable from './PortfolioTable';

export default {
  name: 'portfolio-tabs',
  components: {
    PortfolioTable,
  },
  data() {
    return {
      activeTab: 0,
      localStocks: [
        {
          name: 'Tesla Inc',
          symbol: 'TSLA',
          price: 123.4,
          unitsOwned: 0.0031,
          unitsOrdered: 0.1,
          investedAmount: 50.3,
          investedPercentage: 60.65,
          percent: 0.67,
          change: 20,
          currency: 'USD',
        },
        {
          name: 'Tesla Inc',
          symbol: 'TSLA',
          price: 123.4,
          unitsOwned: 0.0031,
          unitsOrdered: 0.1,
          investedAmount: 50.3,
          investedPercentage: 60.65,
          percent: 0.67,
          change: 20,
          currency: 'USD',
        },
        {
          name: 'Tesla Inc',
          symbol: 'TSLA',
          price: 123.4,
          unitsOwned: 0.0031,
          unitsOrdered: 0.1,
          investedAmount: 50.3,
          investedPercentage: 60.65,
          percent: 0.67,
          change: 0,
          currency: 'USD',
        },
        {
          name: 'Tesla Inc',
          symbol: 'TSLA',
          price: 123.4,
          unitsOwned: 0.0031,
          unitsOrdered: 0.1,
          investedAmount: 50.3,
          investedPercentage: 60.65,
          percent: 0.67,
          change: -10,
          currency: 'USD',
        },
      ],
    };
  },
};
</script>
