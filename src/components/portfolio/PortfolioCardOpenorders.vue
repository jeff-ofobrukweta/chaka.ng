<template>
    <div v-if="getPortfoliopositionsCarddetails.positions" class="portfolio-card" @click="toDetailsPage('open-orders')">
        <div class="portfolio-card__img">
            <img :src="require(`../../assets/img/portfolio3.svg`)" alt="Portfolio Icon" />
        </div>
        <h2
            class="cursor-context"
            :title="getPortfoliopositionsCarddetails.positions.open.openTotal | kobo | currency('NGN')"
        >
            {{ getPortfoliopositionsCarddetails.positions.open.openTotal | kobo | currency("NGN") }}
        </h2>
        <p class="portfolio-card__title">{{ "Total Value on Open Stocks" }}</p>
        <table v-if="getPortfoliopositionsCarddetails.positions.open.orders.length > 0" class="portfolio-card__table">
            <tr
                v-for="(stock, index) in getPortfoliopositionsCarddetails.positions.open.orders.slice(0, 3)"
                :key="index"
                class="portfolio-card__tr"
            >
                <td class="portfolio-card__tr--left capitalize">{{ stock.name | truncate(15) }}</td>
                <td
                    class="portfolio-card__tr--right cursor-context"
                    :title="stock.quantityBought | units(4, true)"
                >
                    {{ stock.quantityBought | units(2) }}
                </td>
                &nbsp;
                <td
                    class="portfolio-card__tr--right cursor-context"
                    :title="stock.netPurchaseCost | kobo | currency(stock.currency, true)"
                >
                    {{ stock.netPurchaseCost | kobo | currency(stock.currency) }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "portfolio-card",
    computed: {
        ...mapGetters(['getPortfoliopositionsCarddetails'])
    },
    methods: {
        toDetailsPage(type) {
            this.$router.push({ name: "portfolio-details", params: { type } });
        }
    }
};
</script>
