<template>
  <div class="portfolio-card__box">
    <!-- <PortfolioCard v-for="(card, index) in cards" :key="index" :data="card" /> -->
  </div>
</template>

<script>
// import PortfolioCard from './PortfolioCard';

export default {
    name: 'portfolio-list',
    components: {
        // PortfolioCard
    },
    data() {
        return {
            cards: [
                {
                    icon: 'portfolio1',
                    total: 343.661,
                    title: 'Total Value on Local Stocks',
                    stocks: [
                        {
                            name: 'TSLA',
                            quantity: 0.41455,
                            price: 100.3,
                            percent: 1.5,
                            currency: 'USD'
                        },
                        {
                            name: 'GOOGL',
                            quantity: 1.3442,
                            price: 201.3,
                            percent: 0.23,
                            currency: 'USD'
                        },
                        {
                            name: 'MTNN',
                            quantity: 25.2233,
                            price: 20.1,
                            percent: 25,
                            currency: 'NGN'
                        }
                    ]
                },
                {
                    icon: 'portfolio2',
                    total: 343.661,
                    title: 'Total Value on Global Stocks',
                    stocks: [
                        {
                            name: 'TSLA',
                            quantity: 0.41455,
                            price: 100.3,
                            percent: 1.5,
                            currency: 'USD'
                        },
                        {
                            name: 'GOOGL',
                            quantity: 1.3442,
                            price: 201.3,
                            percent: 0.23,
                            currency: 'USD'
                        },
                        {
                            name: 'MTNN',
                            quantity: 25.2233,
                            price: 20.1,
                            percent: 25,
                            currency: 'NGN'
                        }
                    ]
                },
                {
                    icon: 'portfolio3',
                    total: 343.661,
                    title: 'Open Orders',
                    stocks: [
                        {
                            name: 'TSLA',
                            quantity: 0.41455,
                            price: 100.3,
                            percent: 1.5,
                            currency: 'USD'
                        },
                        {
                            name: 'GOOGL',
                            quantity: 1.3442,
                            price: 201.3,
                            percent: 0.23,
                            currency: 'USD'
                        },
                        {
                            name: 'MTNN',
                            quantity: 25.2233,
                            price: 20.1,
                            percent: 25,
                            currency: 'NGN'
                        }
                    ]
                }
            ]
        };
    }
};
</script>
