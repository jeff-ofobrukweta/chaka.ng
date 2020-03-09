<template>
    <main class="main" role="main">
        <Gifts />
    </main>
</template>

<script>
export default {
    name: "Gifts",
    components: {
        Gifts: () => import("../components/Gifts")
    },
    mounted() {
        document.title = "Chaka - Gifts";
        document.getElementsByTagName("meta")["keywords"].content =
            "nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse";
        document.getElementsByTagName("meta")["description"].content =
            "Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.";
    }
};
</script>
