<template>
    <div class="portfolio-card" @click="toDetailsPage('open-orders')">
        <div class="portfolio-card__img">
            <img :src="require(`../../assets/img/portfolio3.svg`)" alt="Portfolio Icon" />
        </div>
        <h2 class="cursor-context" :title="instrument.positions.open.openTotal">
            {{ instrument.positions.open.openTotal }}
        </h2>
        <p class="portfolio-card__title">{{ 'Total Value on Open Stocks' }}</p>
        <table v-if="instrument.positions.open.orders.length > 0" class="portfolio-card__table">
            <tr v-for="(stock, index) in instrument.positions.open.orders.slice(0, 5)" 
            :key="index" class="portfolio-card__tr">
                <td class="portfolio-card__tr--left capitalize">{{ stock.name }}</td>
                <td
                    class="portfolio-card__tr--right cursor-context"
                    :title="stock.quantity | units(2, true)"
                >
                    {{ stock.quantity | units }}
                </td>
                <td
                    class="portfolio-card__tr--right cursor-context"
                    :title="stock.price | currency(stock.currency, true)"
                >
                    {{ stock.price | currency(stock.currency) }}
                </td>
                <td
                    class="portfolio-card__tr--right cursor-context"
                    :title="stock.percentChange | units(2, true)"
                >
                    {{ stock.percentChange | units(2) }}%
                </td>
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
            required: false
        },
        instrument:{
             type: Object,
            required: false
        }
    },
    methods: {
        toDetailsPage(type) {
            this.$router.push({ name: 'portfolio-details', params: { type } });
        }
    },
    mounted(){
        console.log('XXXXXXXXXXXXXXXXXXXX',this.details)
    }
};
</script>
