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
        <PortfolioTable
        :storedata="stocks" />
    </section>
</template>

<script>
import PortfolioTable from '../../components/portfolio/PortfolioTable';
import { mapGetters,mapActions,mapMutations } from "vuex";
export default {
    name: 'portfolio-details',
    components: {
        PortfolioTable
    },
    data() {
        return {
            activeTab: 0,
            localStocks: [
                {
                    name: 'Tesla Inc',
                    symbol: 'TSLA',
                    price: 123.4,
                    unitsOwned: 0.0031,
                    unitsOrdered: 0.1,
                    investedAmount: 50.3,
                    investedPercentage: 60,
                    percent: 0.67,
                    change: 20,
                    currency: 'USD'
                },
                {
                    name: 'Tesla Inc',
                    symbol: 'TSLA',
                    price: 123.4,
                    unitsOwned: 0.0031,
                    unitsOrdered: 0.1,
                    investedAmount: 50.3,
                    investedPercentage: 60.65,
                    percent: 0.67,
                    change: 20,
                    currency: 'NGN'
                },
                {
                    name: 'Tesla Inc',
                    symbol: 'TSLA',
                    price: 123235,
                    unitsOwned: 0.0031,
                    unitsOrdered: 0.1,
                    investedAmount: 50.3,
                    investedPercentage: 60.65,
                    percent: 0.67,
                    change: 12,
                    currency: 'NGN'
                },
                {
                    name: 'Tesla Inc',
                    symbol: 'TSLA',
                    price: 123.4,
                    unitsOwned: 0.0031,
                    unitsOrdered: 0.1,
                    investedAmount: 50.3,
                    investedPercentage: 60.65,
                    percent: 0.67,
                    change: -10,
                    currency: 'USD'
                }
            ],
            stocks:[]
        };
    },
    computed: {
         ...mapGetters(["getglobalstocksowned","getlocalstocksowned","getopenstocks"]),
        type() {
            return this.$route.params.type || 'open-orders';
        }
    },
    methods: {
        ...mapActions(['GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS']),
        changeType(type) {
            if (this.type !== type) {
                this.$router.replace({ name: 'portfolio-details', params: { type } });
            }
        }
    },
    mounted(){
        this.GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS().then(()=>{});
        if(this.$route.params.type == 'local'){
            this.stocks = this.getlocalstocksowned;
             console.log('OPEN HERE MMMMMMMMMMMMMMMMMMMMMmmMMM',this.stocks)
        }
        else if(this.$route.params.type == 'global'){
            this.stocks = this.getglobalstocksowned;
             console.log('OPEN HERE MMMMMMMMMMMMMMMMMMMMMmmMMM',this.stocks)
        }
        else{
            this.stocks = this.getopenstocks;
             console.log('OPEN HERE MMMMMMMMMMMMMMMMMMMMMmmMMM',this.stocks)
        }
        console.log('OPEN HERE MMMMMMMMMMMMMMMMMMMMMMMM',this.getglobalstocksowned,this.getlocalstocksowned,this.getopenstocks)
    },
    beforeRouteUpdate(to, from, next){
        if(to.params.type == 'local'){
            this.stocks = this.getlocalstocksowned;
        }
        else if(to.params.type == 'global'){
            this.stocks = this.getglobalstocksowned;
        }
        else{
            this.stocks = this.getopenstocks;
        }
        next()
    }
};
</script>
