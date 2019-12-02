<template>
    <section class="dashboard__main">
        <section class="dashboard__title">
            <h3>Explore</h3>
            <p class="dashboard__title--sub">See the latest on the stock market</p>
        </section>

        <section class="explore-section">
            <div class="explore-featured">
                <div class="explore-featured__image">
                    <img :src="featured.imageUrl" :alt="featured.name" />
                </div>
                <div class="explore-featured__text">
                    <h4 class="explore-featured__text--title">
                        {{ featured.name }}
                    </h4>
                    <p>
                        {{ featured.description || "" | truncate(380) }}
                    </p>
                </div>
            </div>
            <div class="card-news__box explore__news">
                <news-card :news="item" v-for="(item, index) in allNews" :key="index" />
            </div>
            <div class="explore-actions__bottom">
                <!-- <a class="explore-actions">See All</a> -->
                <a class="explore-actions" @click="shuffleNews">Shuffle</a>
            </div>
        </section>

        <section class="explore-section" v-if="getExploreCollections.length > 0">
            <section class="explore__title">
                <div>
                    <h3>Collections</h3>
                    <p class="explore__title--sub">See the latest on the stock market</p>
                </div>
                <div v-if="getWindowWidth !== 'mobile'">
                    <!-- <a class="explore-actions">See All</a> -->
                    <a class="explore-actions" @click="shuffleCollections">Shuffle</a>
                </div>
            </section>
            <div class="card-news__box explore__news">
                <news-card
                    :news="item"
                    v-for="(item, index) in getExploreCollections"
                    :key="index"
                    collection
                />
            </div>
            <div class="explore-actions__bottom" v-if="getWindowWidth === 'mobile'">
                <!-- <a class="explore-actions">See All</a> -->
                <a class="explore-actions" @click="shuffleCollections">Shuffle</a>
            </div>
        </section>

        <section class="explore-section" v-if="getExploreLearn.length > 0">
            <section class="explore__title">
                <div>
                    <h3>Learn</h3>
                    <p class="explore__title--sub">See the latest on the stock market</p>
                </div>
                <div v-if="getWindowWidth !== 'mobile'">
                    <!-- <a class="explore-actions">See All</a> -->
                    <a class="explore-actions" @click="shuffleLearn">Shuffle</a>
                </div>
            </section>
            <div class="card-news__box explore__news">
                <news-card :news="item" v-for="(item, index) in getExploreLearn" :key="index" />
            </div>
            <div class="explore-actions__bottom" v-if="getWindowWidth === 'mobile'">
                <!-- <a class="explore-actions">See All</a> -->
                <a class="explore-actions" @click="shuffleLearn">Shuffle</a>
            </div>
        </section>

        <section class="explore-section" v-if="getWatchlist.length > 0">
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
            featured: {},
            allNews: []
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
        ]),
        async shuffleNews() {
            await this.GET_EXPLORE_NEWS({ shuffle: true });
            this.allNews = this.getExploreNews.filter(el => el.type !== "Featured");
        },
        shuffleCollections() {
            this.GET_EXPLORE_COLLECTIONS({ shuffle: true });
        },
        shuffleLearn() {
            this.GET_EXPLORE_LEARN({ shuffle: true });
        }
    },
    async mounted() {
        await Promise.all([
            this.GET_EXPLORE_NEWS(),
            this.GET_EXPLORE_COLLECTIONS(),
            this.GET_EXPLORE_LEARN(),
            this.GET_WATCHLIST()
        ]);
        this.featured = this.getExploreNews.filter(el => el.type === "Featured")[0];
        this.allNews = this.getExploreNews.filter(el => el.type !== "Featured");
    }
};
</script>
