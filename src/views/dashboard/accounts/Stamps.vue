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
    <section class="accounts-statements__all">
      <button
        class="btn btn-block"
        v-for="(button, index) in statementButtons"
        :key="index"
        @click="activeButton = button.value"
        :class="{ active: activeButton === button.value }"
      >
        {{ button.name }}
      </button>
    </section>
    <section class="accounts-statements__date">
      <input class="form__input" type="date" name="start" />to
      <input class="form__input" type="date" name="start" />
    </section>

    <section class="accounts-statements__downloads">
      <StatementsCard v-for="(statement, i) in statements" :key="i" :statement="statement" />
    </section>
  </div>
</template>

<script>
import StatementsCard from '../../../components/accounts/StatementsCard';

export default {
    name: 'accounts-statements',
    components: {
        StatementsCard
    },
    data() {
        return {
            activeButton: 1,
            statementButtons: [
                {
                    name: 'Statement',
                    value: 1
                },
                {
                    name: 'Confirmations',
                    value: 2
                },
                {
                    name: 'Tax',
                    value: 3
                }
            ],
            statements: [
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                }
            ]
        };
    }
};
</script>
