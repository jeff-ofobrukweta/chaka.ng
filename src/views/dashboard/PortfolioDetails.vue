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
        <div class="loader-gif__big" v-if="loading">
            <img :src="require('../../assets/img/loader.gif')" alt="Loader" />
        </div>
        <PortfolioTable
            :storedata="stocks"
            :open-orders="type === 'open-orders'"
            v-else-if="stocks.length > 0"
        />
        <p class="mt-3 text-center" v-else>You have no {{ type }} stocks</p>
    </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import PortfolioTable from '../../components/portfolio/PortfolioTable';

export default {
    name: 'portfolio-details',
    components: {
        PortfolioTable
    },
    data() {
        return {
            activeTab: 0,
            stocks: [],
            loading: false
        };
    },
    computed: {
        ...mapGetters(['getglobalstocksowned', 'getlocalstocksowned', 'getopenstocks']),
        type() {
            return this.$route.params.type;
        }
    },
    methods: {
        ...mapActions(['GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS']),
        changeType(type) {
            if (this.type !== type) {
                this.$router.replace({ name: 'portfolio-details', params: { type } });
            }
        },
        mountAction(type) {
            if (type == 'local') {
                this.stocks = this.getlocalstocksowned;
            } else if (type == 'global') {
                this.stocks = this.getglobalstocksowned;
            } else {
                this.stocks = this.getopenstocks;
            }
        }
    },
    async mounted() {
        this.loading = true;
        await this.GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS();
        this.loading = false;
        this.mountAction(this.type);
    },
    beforeRouteUpdate(to, from, next) {
        this.mountAction(to.params.type);
        next();
    }
};
</script>
