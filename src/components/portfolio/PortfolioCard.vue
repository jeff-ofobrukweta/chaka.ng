<template>
    <div class="portfolio-card" @click="toDetailsPage(data.type)">
        <div class="portfolio-card__img">
            <img :src="require(`../../assets/img/${data.icon}.svg`)" alt="Portfolio Icon" />
        </div>
        <h2>{{ data.total | currency(data.currency) }}</h2>
        <p class="portfolio-card__title">{{ data.title }}</p>
        <table v-if="data.stocks.length > 0" class="portfolio-card__table">
            <tr v-for="(stock, index) in data.stocks" :key="index" class="portfolio-card__tr">
                <td class="portfolio-card__tr--left capitalize">{{ stock.name }}</td>
                <td class="portfolio-card__tr--right">{{ stock.quantity | units }}</td>
                <td class="portfolio-card__tr--right">
                    {{ stock.price | currency(stock.currency) }}
                </td>
                <td class="portfolio-card__tr--right">{{ stock.percent | units(2) }}%</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'portfolio-card',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        toDetailsPage(type) {
            console.log('here: ', type);
            this.$router.push({ name: 'portfolio-details', params: { type } });
        }
    }
};
</script>
