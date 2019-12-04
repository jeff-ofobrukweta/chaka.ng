<template>
    <Fragment>
        <div v-if="instrument" class="portfolio-card" @click="toDetailsPage('local')">
            <div class="portfolio-card__img">
                <img :src="require(`../../assets/img/portfolio1.svg`)" alt="Portfolio Icon" />
            </div>
            <h2
                class="cursor-context"
                :title="instrument.positions.filled.localOrders | currency('NGN', true)"
            >
                {{ instrument.positions.filled.localOrders | currency("NGN") }}
            </h2>
            <p class="portfolio-card__title">{{ "Total Value on Local Stocks" }}</p>
            <table
                v-if="instrument.positions.filled.local.length > 0 && instrument.positions.filled"
                class="portfolio-card__table"
            >
                <tr
                    v-for="(stock, index) in instrument.positions.filled.local.slice(0, 3)"
                    :key="index"
                    class="portfolio-card__tr"
                >
                    <td class="portfolio-card__tr--left capitalize">
                        {{ stock.name | truncate(15) }}
                    </td>
                    <td
                        class="portfolio-card__tr--right cursor-context"
                        :title="stock.quantity | units(4, true)"
                    >
                        {{ +stock.quantity | units(2) }}
                    </td>
                    &nbsp;
                    <td
                        class="portfolio-card__tr--right cursor-context"
                        :title="stock.netEarnings | currency(stock.currency, true)"
                    >
                        {{ +stock.netEarnings | currency(stock.currency) }}
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
        <div v-else class="portfolio-card"></div>
    </Fragment>
</template>

<script>
export default {
    name: "portfolio-card",
    props: {
        data: {
            type: Object,
            required: false
        },
        instrument: {
            type: Object,
            required: false
        }
    },
    methods: {
        toDetailsPage(type) {
            this.$router.push({ name: "portfolio-details", params: { type } });
        }
    }
};
</script>
