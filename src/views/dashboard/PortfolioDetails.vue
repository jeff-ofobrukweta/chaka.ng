<template>
    <section class="dashboard__main">
        <div class="portfolio-tabs">
            <div
                class="portfolio-tab"
                @click="changeType('local')"
                :class="{ active: type === 'local' }"
            >
                <span>Your Local Stocks</span>
            </div>
            <div
                class="portfolio-tab"
                @click="changeType('global')"
                :class="{ active: type === 'global' }"
            >
                <span>Your Global Stocks</span>
            </div>
            <div
                class="portfolio-tab"
                @click="changeType('open-orders')"
                :class="{ active: type === 'open-orders' }"
            >
                <span>Open Orders</span>
            </div>
        </div>
        <PortfolioTable :data="localStocks" />
    </section>
</template>

<script>
import PortfolioTable from "../../components/portfolio/PortfolioTable";

export default {
    name: "portfolio-details",
    components: {
        PortfolioTable
    },
    data() {
        return {
            activeTab: 0,
            localStocks: [
                {
                    name: "Tesla Inc",
                    symbol: "TSLA",
                    price: 123.4,
                    unitsOwned: 0.0031,
                    unitsOrdered: 0.1,
                    investedAmount: 50.3,
                    investedPercentage: 60,
                    percent: 0.67,
                    change: 20,
                    currency: "USD"
                },
                {
                    name: "Tesla Inc",
                    symbol: "TSLA",
                    price: 123.4,
                    unitsOwned: 0.0031,
                    unitsOrdered: 0.1,
                    investedAmount: 50.3,
                    investedPercentage: 60.65,
                    percent: 0.67,
                    change: 20,
                    currency: "NGN"
                },
                {
                    name: "Tesla Inc",
                    symbol: "TSLA",
                    price: 123235,
                    unitsOwned: 0.0031,
                    unitsOrdered: 0.1,
                    investedAmount: 50.3,
                    investedPercentage: 60.65,
                    percent: 0.67,
                    change: 12,
                    currency: "NGN"
                },
                {
                    name: "Tesla Inc",
                    symbol: "TSLA",
                    price: 123.4,
                    unitsOwned: 0.0031,
                    unitsOrdered: 0.1,
                    investedAmount: 50.3,
                    investedPercentage: 60.65,
                    percent: 0.67,
                    change: -10,
                    currency: "USD"
                }
            ]
        };
    },
    computed: {
        type() {
            return this.$route.params.type || "open-orders";
        }
    },
    methods: {
        changeType(type) {
            if (this.type !== type) {
                this.$router.replace({ name: "portfolio-details", params: { type } });
            }
        }
    }
};
</script>
