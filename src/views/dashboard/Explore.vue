<template>
    <section class="dashboard__main">
        <section class="dashboard__title">
            <h3>Explore</h3>
            <p class="dashboard__title--sub">See the latest on the stock market</p>
        </section>

        <section class="explore-section">
            <div class="explore-featured">
                <div class="explore-featured__image">
                    <img :src="getExploreNews[0].imageUrl" :alt="getExploreNews[0].name" />
                </div>
                <div class="explore-featured__text">
                    <h4 class="explore-featured__text--title">
                        {{ getExploreNews[0].name }}
                    </h4>
                    <p>
                        {{ getExploreNews[0].description | truncate(380) }}
                    </p>
                </div>
            </div>
            <div class="card-news__box explore__news">
                <news-card :news="item" v-for="(item, index) in getExploreNews" :key="index" />
            </div>
            <div class="explore-actions__bottom">
                <!-- <a class="explore-actions">See All</a> -->
                <a class="explore-actions">Shuffle</a>
            </div>
        </section>

        <section class="explore-section">
            <section class="explore__title">
                <div>
                    <h3>Collections</h3>
                    <p class="explore__title--sub">See the latest on the stock market</p>
                </div>
                <div v-if="getWindowWidth !== 'mobile'">
                    <!-- <a class="explore-actions">See All</a> -->
                    <a class="explore-actions">Shuffle</a>
                </div>
            </section>
            <div class="card-news__box explore__news">
                <news-card
                    :news="item"
                    v-for="(item, index) in getExploreCollections"
                    :key="index"
                />
            </div>
            <div class="explore-actions__bottom" v-if="getWindowWidth === 'mobile'">
                <!-- <a class="explore-actions">See All</a> -->
                <a class="explore-actions">Shuffle</a>
            </div>
        </section>

        <section class="explore-section">
            <section class="explore__title">
                <div>
                    <h3>Learn</h3>
                    <p class="explore__title--sub">See the latest on the stock market</p>
                </div>
                <div v-if="getWindowWidth !== 'mobile'">
                    <!-- <a class="explore-actions">See All</a> -->
                    <a class="explore-actions">Shuffle</a>
                </div>
            </section>
            <div class="card-news__box explore__news">
                <news-card :news="item" v-for="(item, index) in getExploreLearn" :key="index" />
            </div>
            <div class="explore-actions__bottom" v-if="getWindowWidth === 'mobile'">
                <!-- <a class="explore-actions">See All</a> -->
                <a class="explore-actions">Shuffle</a>
            </div>
        </section>

        <section class="explore-section">
            <section class="dashboard__title">
                <h3>Watchlist</h3>
                <p class="dashboard__title--sub">See the latest on the stock market</p>
            </section>

            <section class="watchlist-explore__box" v-if="getWindowWidth === 'desktop'">
                <ExploreWatchlist
                    v-for="(instrument, index) in getWatchlist"
                    :key="index"
                    :instrument="instrument"
                />
            </section>

            <section class="watchlist-mobile__box" v-else>
                <MobileWatchlist
                    v-for="(instrument, index) in getWatchlist"
                    :key="index"
                    :instrument="instrument"
                />
            </section>
        </section>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ExploreWatchlist from "../../components/watchlist/ExploreWatchlist";
import MobileWatchlist from "../../components/watchlist/MobileWatchlist";

export default {
    name: "portfolio",
    components: {
        ExploreWatchlist,
        MobileWatchlist
    },
    data() {
        return {
            watchlist: [
                {
                    name: "Spotify",
                    symbol: "SPOT",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: "Google",
                    symbol: "GOOGL",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: "MTN Nigeria",
                    symbol: "MTNN",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 4
                },
                {
                    name: "Jumia Technologies",
                    symbol: "JUMIA",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 2
                },
                {
                    name: "Spotify",
                    symbol: "SPOT",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 1
                },
                {
                    name: "Spotify",
                    symbol: "SPOT",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 0
                },
                {
                    name: "Spotify",
                    symbol: "SPOT",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: -3
                },
                {
                    name: "Spotify",
                    symbol: "SPOT",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: -10
                }
            ]
        };
    },
    computed: {
        ...mapGetters([
            "getPortfolioSummary",
            "getWindowWidth",
            "getExploreNews",
            "getExploreCollections",
            "getExploreLearn",
            "getWatchlist"
        ])
    },
    methods: {
        ...mapActions([
            "GET_EXPLORE_NEWS",
            "GET_EXPLORE_COLLECTIONS",
            "GET_EXPLORE_LEARN",
            "GET_WATCHLIST"
        ])
    },
    async mounted() {
        await Promise.all([
            this.GET_EXPLORE_NEWS(),
            this.GET_EXPLORE_COLLECTIONS(),
            this.GET_EXPLORE_LEARN(),
            this.GET_WATCHLIST()
        ]);
        console.log("Finished");
    }
};
</script>
