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
                    <td class="capitalize">{{ item.name }}</td>
                    <td class="uppercase">{{ item.symbol }}</td>
                    <td class="cursor-context" :title="item.price | currency(item.currency, true)">
                        {{ item.price | currency(item.currency) }}
                    </td>
                    <td class="cursor-context" :title="item.unitsOwned | units(2, true)">
                        {{ item.unitsOwned | units }}
                    </td>
                    <td class="cursor-context" :title="item.unitsOrdered | units(2, true)">
                        {{ item.unitsOrdered | units }}
                    </td>
                    <td
                        class="cursor-context"
                        :title="item.investedAmount | currency(item.currency, true)"
                    >
                        {{ item.investedAmount | currency(item.currency) }}
                    </td>
                    <td class="cursor-context" :title="item.investedPercentage | units(2, true)">
                        {{ item.investedPercentage | units(2) }}%
                    </td>
                    <td :class="[checkChange(item.change) ? 'green' : 'red']">
                        <img
                            src="../../assets/img/green-arrow.svg"
                            v-if="checkChange(item.change)"
                            alt="Gain"
                        />
                        <img src="../../assets/img/red-arrow.svg" v-else alt="Loss" />
                        <small
                            >{{ checkChange(item.change) ? "+" : ""
                            }}{{ item.change | units(2) }} ({{ item.percent | units(2) }}%)</small
                        >
                    </td>
                    <td>
                        <a class="portfolio-table__buy" @click="showBuy = true">+ Buy</a>
                        <a class="portfolio-table__buy" @click="showSell = true">- Sell</a>
                    </td>
                    <buy-modal
                        @close="showBuy = false"
                        :currency="item.currency"
                        :symbol="item.symbol"
                        :instrument="item"
                        v-if="showBuy"
                    />
                    <sell-modal
                        @close="showSell = false"
                        :currency="item.currency"
                        :symbol="item.symbol"
                        :instrument="item"
                        v-if="showSell"
                    />
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
    },
    data() {
        return {
            showBuy: false,
            showSell: false
        };
    },
    methods: {
        checkChange(value) {
            if (value >= 0) return true;
            return false;
        }
    }
};
</script>
