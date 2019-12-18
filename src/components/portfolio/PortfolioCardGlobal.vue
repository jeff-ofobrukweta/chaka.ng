<template>
    <div
        v-if="getPortfoliopositionsCarddetails.positions"
        class="portfolio-card"
        @click="toDetailsPage('global')"
    >
        <div class="portfolio-card__img">
            <img :src="require(`../../assets/img/portfolio2.svg`)" alt="Portfolio Icon" />
        </div>
        <h2
            class="cursor-context"
            :title="
                getPortfoliopositionsCarddetails.positions.filled.globalTotal
                    | kobo
                    | currency('USD', true)
            "
        >
            {{
                getPortfoliopositionsCarddetails.positions.filled.globalTotal
                    | kobo
                    | currency("USD")
            }}
        </h2>
        <p class="portfolio-card__title">{{ "Total Value on Global Stocks" }}</p>
        <table
            v-if="getPortfoliopositionsCarddetails.positions.filled.global.length > 0"
            class="portfolio-card__table"
        >
            <tr
                v-for="(stock,
                index) in getPortfoliopositionsCarddetails.positions.filled.global.slice(0, 3)"
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
                    :title="stock.netEarnings | kobo | currency(stock.currency, true)"
                >
                    {{ +stock.netEarnings | kobo | currency(stock.currency) }}
                </td>
                &nbsp;
                <td
                    class="portfolio-card__tr--right cursor-context"
                    :title="stock.netEarningsPercentage | units(2, true)"
                >
                    {{ +stock.netEarningsPercentage | units(2) }}%
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'portfolio-card',
    computed: {
        ...mapGetters(['getPortfoliopositionsCarddetails'])
    },
    methods: {
        toDetailsPage(type) {
            this.$router.push({ name: 'portfolio-details', params: { type } });
        }
    }
};
</script>
