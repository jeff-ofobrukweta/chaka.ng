<template>
    <section class="dashboard__main">
        <div class="dashboard__back">
            <router-link :to="{ name: 'portfolio' }" replace class="dashboard__back--btn">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 7H3.8L9.4 1.4L8 0L0 8L8 16L9.4 14.6L3.8 9H16V7Z"
                        fill="#293D4A"
                    /></svg
            ></router-link>
            <h3>Portfolio Details</h3>
        </div>
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
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    name: "portfolio-details",
    components: {
        PortfolioTable: () => import("../../components/portfolio/PortfolioTable")
    },
    data() {
        return {
            activeTab: 0,
            stocks: [],
            loading: false
        };
    },
    computed: {
        ...mapGetters(["getglobalstocksowned", "getlocalstocksowned", "getopenstocks"]),
        type() {
            return this.$route.params.type;
        }
    },
    methods: {
        ...mapActions(["GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS"]),
        changeType(type) {
            if (this.type !== type) {
                this.GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS();
                this.$router.replace({ name: "portfolio-details", params: { type } });
            }
        },
        mountAction(type) {
            if (type == "local") {
                this.stocks = this.getlocalstocksowned;
            } else if (type == "global") {
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
