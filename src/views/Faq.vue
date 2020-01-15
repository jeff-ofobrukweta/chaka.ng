<template>
    <main class="main" role="main">
        <div class="app-body">
        <h6 class="section__caption">Questions frequently asked by our visitors</h6>
            <h2 class="app-body__title">Frequently Asked Questions</h2>
            <FAQ />
        </div>
    </main>
</template>

<script>
export default {
    name: "Faq",
    components: {
        FAQ: () => import("../components/FAQ")
    },
    mounted() {
        document.title = "Chaka - Help";
        document.getElementsByTagName("meta")["keywords"].content =
            "nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse";
        document.getElementsByTagName("meta")["description"].content =
            "Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.";
        // document.getElementsByTagName('meta')['og:title'].content = 'Chaka - Help';
        // document.getElementsByTagName('meta')['og:description'].content =
        // 	'Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.';
    }
};
</script>
