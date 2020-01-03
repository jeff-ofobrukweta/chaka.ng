<template>
    <section class="dashboard__main">
        <section class="dashboard__title">
            <h3>Explore</h3>
            <!-- <p class="dashboard__title--sub">See the latest on the stock market</p> -->
        </section>

        <section class="accounts-statements__downloads loader-gif__big" v-if="loading">
            <img :src="require('../../assets/img/loader.gif')" alt="Loader" />
        </section>

        <div
            class="caution__big"
            v-else-if="getErrorLog.type === 'explore' && getExploreNews.length <= 0"
        >
            <img :src="require('../../assets/img/caution.svg')" alt="Caution" />
            <a class="caution__reload" @click="mount">Reload</a>
        </div>

        <section class="explore-section" v-else-if="getExploreNews.length > 0">
            <div class="explore-featured">
                <div class="explore-featured__image">
                    <a :href="getExploreNews[0].pageUrl" target="_blank">
                        <img :src="getExploreNews[0].imageUrl" :alt="getExploreNews[0].name"
                    /></a>
                </div>
                <div class="explore-featured__text">
                    <h4 class="explore-featured__text--title">
                        <a :href="getExploreNews[0].pageUrl" target="_blank">
                            {{ getExploreNews[0].name }}</a
                        >
                    </h4>
                    <p>
                        {{ getExploreNews[0].description || "" | truncate(380) }}
                    </p>
                </div>
            </div>
            <div class="card-news__box explore__news" v-if="loadNews">
                <news-card :news="{}" dummy v-for="i in 5" :key="i" />
            </div>
            <div class="card-news__box explore__news" v-else>
                <news-card :news="item" v-for="(item, index) in otherNews" :key="index" />
            </div>
            <div class="explore-actions__bottom">
                <!-- <a class="explore-actions">See All</a> -->
                <a v-if="loadNews">
                    <img
                        :src="require('../../assets/img/loader.gif')"
                        alt="Loading..."
                        width="16px"
                    />
                </a>
                <a class="explore-actions" @click="shuffleNews" v-else>Shuffle</a>
            </div>
        </section>

        <section class="empty-center" v-else>
            <img width="80px" :src="require('../../assets/img/papers.svg')" alt="Papers" />
            <p>There are no news available at the moment</p>
        </section>

        <section class="explore-section" v-if="getExploreCollections.length > 0">
            <section class="explore__title">
                <div>
                    <h3>Collections</h3>
                    <!-- <p class="explore__title--sub">See the latest on the stock market</p> -->
                </div>
                <div v-if="getWindowWidth !== 'mobile'">
                    <!-- <a class="explore-actions">See All</a> -->
                    <a v-if="loadCollections">
                        <img
                            :src="require('../../assets/img/loader.gif')"
                            alt="Loading..."
                            width="16px"
                        />
                    </a>
                    <a class="explore-actions" @click="shuffleCollections" v-else>Shuffle</a>
                </div>
            </section>
            <div class="card-news__box explore__news" v-if="loadCollections">
                <news-card :news="{}" dummy v-for="i in 5" :key="i" />
            </div>
            <div class="card-news__box explore__news" v-else>
                <news-card
                    :news="item"
                    v-for="(item, index) in getExploreCollections"
                    :key="index"
                    collection
                />
            </div>
            <div class="explore-actions__bottom" v-if="getWindowWidth === 'mobile'">
                <!-- <a class="explore-actions">See All</a> -->
                <a v-if="loadCollections">
                    <img
                        :src="require('../../assets/img/loader.gif')"
                        alt="Loading..."
                        width="16px"
                    />
                </a>
                <a class="explore-actions" @click="shuffleCollections" v-else>Shuffle</a>
            </div>
        </section>

        <section class="explore-section" v-if="getExploreLearn.length > 0">
            <section class="explore__title">
                <div>
                    <h3>Learn</h3>
                    <!-- <p class="explore__title--sub">See the latest on the stock market</p> -->
                </div>
                <div v-if="getWindowWidth !== 'mobile'">
                    <!-- <a class="explore-actions">See All</a> -->
                    <a class="explore-actions" v-if="loadLearn">
                        <img
                            :src="require('../../assets/img/ring-loader.jpeg')"
                            alt="Loading..."
                            width="16px"
                        />
                    </a>
                    <a class="explore-actions" @click="shuffleLearn" v-else>Shuffle</a>
                </div>
            </section>
            <div class="card-news__box explore__news" v-if="loadLearn">
                <news-card :news="{}" dummy v-for="i in 5" :key="i" />
            </div>
            <div class="card-news__box explore__news" v-else>
                <news-card :news="item" v-for="(item, index) in getExploreLearn" :key="index" />
            </div>
            <div class="explore-actions__bottom" v-if="getWindowWidth === 'mobile'">
                <!-- <a class="explore-actions">See All</a> -->
                <a class="explore-actions" v-if="loadLearn">
                    <img
                        :src="require('../../assets/img/loader.gif')"
                        alt="Loading..."
                        width="16px"
                    />
                </a>
                <a class="explore-actions" @click="shuffleLearn" v-else>Shuffle</a>
            </div>
        </section>
        <!-- </template> -->

        <section v-if="getWatchlist.length > 0">
            <section class="dashboard__title">
                <h3>Watchlist</h3>
                <!-- <p class="dashboard__title--sub">See the latest on the stock market</p> -->
            </section>

            <section class="watchlist-explore__box" v-if="getWindowWidth === 'desktop'">
                <template v-if="watchlistLoading">
                    <ExploreWatchlist v-for="i in 3" :key="i" :instrument="{}" dummy />
                </template>
                <transition-group name="kyc-navbar" v-else-if="getWatchlist.length > 0">
                    <template>
                        <ExploreWatchlist
                            v-for="(instrument, index) in getWatchlist"
                            :key="index"
                            :instrument="instrument"
                        />
                    </template>
                </transition-group>
                <template v-else
                    ><p class="text-center">You have no items in your watchlist</p>
                </template>
            </section>

            <section class="watchlist-mobile__box" v-else>
                <template v-if="watchlistLoading">
                    <MobileWatchlist v-for="i in 3" :key="i" :instrument="{}" dummy />
                </template>
                <template v-else-if="getWatchlist.length > 0">
                    <MobileWatchlist
                        v-for="(instrument, index) in getWatchlist"
                        :key="index"
                        :instrument="instrument"
                /></template>
                <template v-else>
                    <p class="text-center">You have no items in your watchlist</p>
                </template>
            </section>
        </section>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ExploreWatchlist from "../../components/watchlist/ExploreWatchlist";
import MobileWatchlist from "../../components/watchlist/MobileWatchlist";

export default {
    name: "explore",
    components: {
        ExploreWatchlist,
        MobileWatchlist
    },
    data() {
        return {
            loading: false,
            loadNews: null,
            loadCollections: null,
            loadLearn: null,
            watchlistLoading: false
        };
    },
    computed: {
        ...mapGetters([
            "getPortfolioSummary",
            "getWindowWidth",
            "getExploreNews",
            "getExploreCollections",
            "getExploreLearn",
            "getWatchlist",
            "getErrorLog"
        ]),
        otherNews() {
            return [...this.getExploreNews].splice(1);
        }
    },
    methods: {
        ...mapActions([
            "GET_EXPLORE_NEWS",
            "GET_EXPLORE_COLLECTIONS",
            "GET_EXPLORE_LEARN",
            "GET_WATCHLIST"
        ]),
        async shuffleNews() {
            this.loadNews = true;
            await this.GET_EXPLORE_NEWS({ shuffle: true });
            this.loadNews = null;
        },
        async shuffleCollections() {
            this.loadCollections = true;
            await this.GET_EXPLORE_COLLECTIONS({ shuffle: true });
            this.loadCollections = null;
        },
        async shuffleLearn() {
            this.loadLearn = "learn";
            await this.GET_EXPLORE_LEARN({ shuffle: true });
            this.loadLearn = null;
        },
        async mount() {
            this.loading = true;
            if (this.getExploreCollections.length <= 0) {
                this.GET_EXPLORE_COLLECTIONS();
            }
            if (this.getExploreLearn.length <= 0) {
                this.GET_EXPLORE_LEARN();
            }
            await this.GET_EXPLORE_NEWS();
            this.loading = false;
        }
    },
    async mounted() {
        this.loading = true;
        if (this.getExploreNews.length > 0) {
            this.loading = false;
        }
        await this.GET_EXPLORE_NEWS();
        this.loading = false;
        this.watchlistLoading = true;
        if (this.getWatchlist.length > 0) {
            this.watchlistLoading = false;
        }
        await this.GET_WATCHLIST();
        this.watchlistLoading = false;
        await Promise.all([this.GET_EXPLORE_COLLECTIONS(), this.GET_EXPLORE_LEARN()]);
    }
};
</script>
