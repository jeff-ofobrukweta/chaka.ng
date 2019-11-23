<template>
  <section class="portfolio-table__box">
    <table class="portfolio-table">
      <thead class="portfolio-table__thead">
        <th>Name</th>
        <th>Symbol</th>
        <th>Price</th>
        <th>Units Owned</th>
        <th>Units<br />Ordered</th>
        <th>Invested<br />Amount</th>
        <th>
          Invested<br />
          Percentage
        </th>
        <th>P/L</th>
        <th>+/-</th>
      </thead>
      <tbody class="portfolio-table__tbody">
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.symbol }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.unitsOwned }}</td>
          <td>{{ item.unitsOrdered }}</td>
          <td>{{ item.investedAmount }}</td>
          <td>{{ item.investedPercentage }}%</td>
          <td :class="[item.change >= 0 ? 'green' : 'red']">
            <small>{{ item.change >= 0 ? "+" : "" }}{{ item.change }} ({{ item.percent }}%)</small>
          </td>
          <td>
            <a class="portfolio-table__buy">+ Buy</a>
            <a class="portfolio-table__buy">- Sell</a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
    name: 'portfolio-table',
    props: {
        data: {
            type: Array,
            required: true
        }
    }
};
</script>
