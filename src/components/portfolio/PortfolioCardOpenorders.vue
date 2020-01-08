<template>
    <div
        v-if="getPortfoliopositionsCarddetails.positions"
        class="portfolio-card"
        @click="toDetailsPage('open-orders')"
    >
        <div class="portfolio-card__img">
            <img :src="require(`../../assets/img/portfolio3.svg`)" alt="Portfolio Icon" />
        </div>
        <h2 class="cursor-context">
            {{ getPortfoliopositionsCarddetails.positions.open.orders.length }}
        </h2>
        <p class="portfolio-card__title">Total Open Orders</p>
        <table
            v-if="getPortfoliopositionsCarddetails.positions.open.orders.length > 0"
            class="portfolio-card__table"
        >
            <tr
                v-for="(stock,
                index) in getPortfoliopositionsCarddetails.positions.open.orders.slice(0, 3)"
                :key="index"
                class="portfolio-card__tr"
            >
                <td class="portfolio-card__tr--left capitalize cursor-context" :title="stock.name">
                    {{ stock.symbol | truncate(6) }}
                </td>
                <td
                    class="portfolio-card__tr--right cursor-context"
                    :title="stock.quantity | units(4, true)"
                >
                    {{ stock.quantity | units(2) }}
                </td>
                &nbsp;
                <td
                    class="portfolio-card__tr--right cursor-context"
                    :title="stock.netCost | kobo | currency(stock.currency, true)"
                >
                    {{ stock.netCost | kobo | currency(stock.currency) }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "portfolio-card",
    computed: {
        ...mapGetters(["getPortfoliopositionsCarddetails"])
    },
    methods: {
        toDetailsPage(type) {
            this.$router.push({ name: "portfolio-details", params: { type } });
        }
    }
};
</script>
