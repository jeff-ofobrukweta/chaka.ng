<template>
  <div>
    <section class="accounts__title">
      <h3>History</h3>
      <select class="form__input" name="" id="">
        <option value="1">All</option>
        <option value="2">Local</option>
        <option value="3">Global</option>
      </select>
    </section>
    <section class="accounts-history__all">
      <button
        class="btn btn-block"
        v-for="(button, index) in historyButtons"
        :key="index"
        @click="activeButton = button.value"
        :class="{ active: activeButton === button.value }"
      >
        {{ button.name }}
      </button>
    </section>
    <section class="accounts-history__date">
      <input class="form__input" type="date" name="start" />to
      <input class="form__input" type="date" name="start" />
    </section>

    <HistoryTable :history="history" />
  </div>
</template>

<script>
import HistoryTable from '../../../components/accounts/HistoryTable';

export default {
  name: 'accounts-history',
  components: {
    HistoryTable,
  },
  data() {
    return {
      activeButton: 1,
      historyButtons: [
        {
          name: 'All',
          value: 1,
        },
        {
          name: 'Order',
          value: 2,
        },
        {
          name: 'Withdrawal',
          value: 3,
        },
        {
          name: 'Transfer',
          value: 4,
        },
        {
          name: 'Deposit',
          value: 5,
        },
      ],
      history: [
        {
          type: 'Transfer',
          amount: 21341.33,
          status: 'Success',
          date: '21/03/1995',
        },
        {
          type: 'Transfer',
          amount: 21341.33,
          status: 'Success',
          date: '21/03/1995',
        },
        {
          type: 'Transfer',
          amount: 21341.33,
          status: 'Success',
          date: '21/03/1995',
        },
        {
          type: 'Transfer',
          amount: 21341.33,
          status: 'Success',
          date: '21/03/1995',
        },
        {
          type: 'Transfer',
          amount: 21341.33,
          status: 'Success',
          date: '21/03/1995',
        },
      ],
    };
  },
};
</script>
