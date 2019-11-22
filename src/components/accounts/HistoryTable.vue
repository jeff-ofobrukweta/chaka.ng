<template>
  <table class="table-accounts">
    <tbody class="table-accounts__tbody">
      <tr v-for="(item, index) in history" :key="index">
        <td>{{ item.type }}</td>
        <td>NGN - USD</td>
        <td>Amount: {{ item.amount }}</td>
        <td>Status: {{ item.status }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.time }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "table-accounts",
  props: {
    history: {
      type: Array,
      required: true
    }
  }
};
</script>
