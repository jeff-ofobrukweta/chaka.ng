<template>
	<section class="small chart__box">
		<div class="chart__aspect-ratio">
			<VueTradingView class="chart__graph" :options="options" />
		</div>
	</section>
</template>
 
<script>
import VueTradingView from 'vue-trading-view';
import exchangeIDmaping from '../services/mixins/technicalgraphexchangeIDmapping';

export default {
  name: 'TechnicalChart',
  mixins: [exchangeIDmaping],
  props: {
    symbol: String,
    exchangeID: String
  },
  components: {
    VueTradingView
  },
  data() {
    return {
      options: {
        symbol: `${this.exchangeIDmaping(this.exchangeID)}:${this.symbol}`,
        theme: 'Light',
        autosize: true,
        fullscreen: false
      }
    };
  },
  mounted(){
    console.log('this is the symbolSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',this.symbol,this.exchangeID)
  },
  computed: {
    chartOptions() {
      return JSON.stringify(this.options);
    },
    mapexchangeID() {}
  }
};
</script>
<style src="../assets/scss/components/_technicalgraph.scss" lang="scss" scoped />
