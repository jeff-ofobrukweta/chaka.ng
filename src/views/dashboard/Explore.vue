<template>
    <section class="dashboard__main">
        <section class="dashboard__title">
            <h3>Explore <ToolTip tooltip="See the latest on the stock market." /></h3>
            <!-- <p class="dashboard__title--sub">See the latest on the stock market</p> -->
        </section>
        <QuizStrip />

        <section class="accounts-statements__downloads loader-gif__big" v-if="loading">
            <img :src="require('../../assets/img/loader.gif')" alt="Loader" />
        </section>

        <div class="caution__big" v-else-if="getErrorLog.type === 'explore' && getExploreNews.length <= 0">
            <img :src="require('../../assets/img/caution.svg')" alt="Caution" />
            <a class="caution__reload" @click="mount">Reload</a>
        </div>

        <section class="explore-section" v-else-if="getExploreNews.length > 0">
            <div class="explore-featured">
                <div class="explore-featured__image">
                    <a :href="getExploreNews[0].pageUrl" target="_blank" rel="noreferrer noopener"> <img :src="getExploreNews[0].imageUrl" :alt="getExploreNews[0].name"/></a>
                </div>
                <div class="explore-featured__text">
                    <h4 class="explore-featured__text--title">
                        <a :href="getExploreNews[0].pageUrl" target="_blank" rel="noreferrer noopener"> {{ getExploreNews[0].name }}</a>
                    </h4>
                    <p>
                        {{ getExploreNews[0].description || "" | truncate(380) }}
                    </p>
                </div>
            </div>
            <div class="card-news__box explore__news scrolling__overflow" v-if="loadNews">
                <NewsCard :news="{}" dummy v-for="i in 5" :key="i" />
            </div>
            <div class="card-news__box explore__news scrolling__overflow" v-else>
                <NewsCard :news="item" v-for="(item, index) in otherNews" :key="index" />
            </div>
            <div class="explore-actions__bottom">
                <!-- <a class="explore-actions" @click="shuffleNews" >
                        <button v-if="loadNews" class="buttonload">
                        <i class="fa fa-spinner fa-spin"></i>Loading
                        </button>
                        <button v-else class="buttonload">
                        more
                        </button>
                    </a> -->
                <button data-v-7df3679e="" class="btn-container-main">
                    <span>
                        <button v-if="loadNews" class="buttonload"><i class="fa fa-spinner fa-spin"></i>Loading</button>
                        <button v-else :disabled="page === 0" @click="shuffleNews('regression')" class="buttton">❮</button>
                    </span>
                    <button :disabled="page == ExploreNewsLength - 1" @click="shuffleNews('progression')" class="buttton">❯</button>
                </button>
            </div>
        </section>

        <section class="empty-center" v-else>
            <img width="80px" :src="require('../../assets/img/papers.svg')" alt="Papers" />
            <p>There are no news available at the moment</p>
        </section>

        <section class="explore-section" v-if="getExploreCollections && getExploreCollections.length > 0">
            <section class="explore__title">
                <div>
                    <h3>Collections <ToolTip tooltip="Discover new stocks based on curated themes." /></h3>
                    <!-- <p class="explore__title--sub">See the latest on the stock market</p> -->
                </div>
                <div v-if="getWindowWidth !== 'mobile'">
                    <!-- <a class="explore-actions" @click="shuffleCollections" >
                        <button v-if="loadCollections" class="buttonload">
                        <i class="fa fa-spinner fa-spin"></i>Loading
                        </button>
                        <button v-else class="buttonload">
                        more
                        </button>
                    </a> -->
                    <button data-v-7df3679e="" class="btn-container-main">
                        <button :disabled="collection_page === 0" @click="shuffleCollections('regression')" class="buttton">❮</button>
                        <button :disabled="collection_page == ExploreCollectionsLength - 1" @click="shuffleCollections('progression')" class="buttton">❯</button>
                    </button>
                </div>
            </section>
            <div class="card-news__box explore__news" v-if="loadCollections">
                <NewsCard :news="{}" dummy v-for="i in 5" :key="i" />
            </div>
            <div class="card-news__box explore__news" v-else>
                <NewsCard :news="item" v-for="(item, index) in getExploreCollections" :key="index" />
            </div>
            <div class="explore-actions__bottom" v-if="getWindowWidth === 'mobile'">
                <button class="btn-container-main">
                    <button :disabled="collection_page === 0" @click="shuffleCollections('regression')" class="buttton">❮</button>
                    <button :disabled="collection_page == ExploreNewsLength - 1" @click="shuffleCollections('progression')" class="buttton">❯</button>
                </button>
            </div>
        </section>

        <section class="explore-section" v-if="getExploreLearn.length > 0">
            <section class="explore__title">
                <div>
                    <h3>Learn <ToolTip tooltip="Everything you need to know about investments." /></h3>
                    <!-- <p class="explore__title--sub">See the latest on the stock market</p> -->
                </div>
                <div v-if="getWindowWidth !== 'mobile'">
                    <!-- <a class="explore-actions" @click="shuffleLearn" >
                        <button v-if="loadLearn" class="buttonload">
                        <i class="fa fa-spinner fa-spin"></i>Loading
                        </button>
                        <button v-else class="buttonload">
                        more
                        </button>
                    </a> -->
                    <button data-v-7df3679e="" class="btn-container-main">
                        <button :disabled="learn_page === 0" @click="shuffleLearn('regression')" class="buttton">❮</button>
                        <button :disabled="learn_page == ExploreLearnLength - 1" @click="shuffleLearn('progression')" class="buttton">❯</button>
                    </button>
                </div>
            </section>
            <div class="card-news__box" v-if="loadLearn">
                <NewsCard :news="{}" dummy v-for="i in 5" :key="i" />
            </div>
            <div class="card-news__box" v-else>
                <NewsCard :news="item" v-for="(item, index) in getExploreLearn" :key="index" />
            </div>
            <div class="explore-actions__bottom" v-if="getWindowWidth === 'mobile'">
                <a class="explore-actions" @click="shuffleLearn">
                    <!-- <button v-if="loadLearn" class="buttonload">
                     <i class="fa fa-spinner fa-spin"></i>Loading
                    </button>
                     <button v-else class="buttonload">
                     more
                    </button> -->
                    <!-- ExploreLearnLength -->
                    <button data-v-7df3679e="" class="btn-container-main">
                        <button :disabled="learn_page === 0" @click="shuffleLearn('regression')" class="buttton">❮</button>
                        <button :disabled="learn_page == ExploreLearnLength - 1" @click="shuffleLearn('progression')" class="buttton">❯</button>
                    </button>
                </a>
            </div>
        </section>
        <!-- </template> -->

        <section v-if="getWatchlist.length > 0">
            <section class="dashboard__title">
                <h3>Watchlist <ToolTip tooltip="Keep a close watch on the top stocks you love and their performance." /></h3>
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
                            :color="instrument.derivedPrice >= 0 ? 'green' : 'red'"
                        />
                    </template>
                </transition-group>
                <template v-else><p class="text-center">You have no items in your watchlist</p> </template>
            </section>

            <section class="watchlist-mobile__box" v-else>
                <template v-if="watchlistLoading">
                    <MobileWatchlist v-for="i in 3" :key="i" :instrument="{}" dummy />
                </template>
                <template v-else-if="getWatchlist.length > 0"> <MobileWatchlist v-for="(instrument, index) in getWatchlist" :key="index" :instrument="instrument"/></template>
                <template v-else>
                    <p class="text-center">You have no items in your watchlist</p>
                </template>
            </section>
        </section>
    </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'explore',
    components: {
        ExploreWatchlist: () => import('../../components/watchlist/ExploreWatchlist'),
        MobileWatchlist: () => import('../../components/watchlist/MobileWatchlist'),
        NewsCard: () => import('../../components/cards/NewsCard'),
        QuizStrip: () => import('../../components/QuizStrip'),
        ToolTip: () => import('../../components/ToolTip')
    },
    data() {
        return {
            infiniteLoader: false,
            loading: false,
            learn_page: 0,
            learn_perPage: 10,
            loadNews: null,
            loadCollections: true,
            loadLearn: true,
            watchlistLoading: false,
            page: 0,
            perPage: 10,
            collection_page: 0,
            collection_perPage: 10
        };
    },
    computed: {
        ...mapGetters([
            'getPortfolioSummary',
            'getExploreCollectionsTotal',
            'getExploreLearnTotal',
            'getWindowWidth',
            'getExploreNewsTotal',
            'getExploreNews',
            'getExploreCollections',
            'getExploreLearn',
            'getWatchlist',
            'getErrorLog'
        ]),
        otherNews() {
            return [...this.getExploreNews].splice(1);
        },
        ExploreNewsLength() {
            if (this.getExploreNewsTotal && Object.keys(this.getExploreNewsTotal).length > 0) {
                if (this.getExploreNewsTotal === '') {
                    return 0;
                }
                const length = this.getExploreNewsTotal.total / 10;
                const ceilLength = Math.ceil(length);
                return ceilLength;
            }
            return false;
        },
        ExploreCollectionsLength() {
            if (this.getExploreCollectionsTotal && Object.keys(this.getExploreCollectionsTotal).length > 0) {
                if (this.getExploreCollectionsTotal === '') {
                    return 0;
                }
                const length = this.getExploreCollectionsTotal.total / 10;
                const ceilLength = Math.ceil(length);
                return ceilLength;
            }
            return false;
        },
        ExploreLearnLength() {
            if (this.getExploreLearnTotal && Object.keys(this.getExploreLearnTotal).length > 0) {
                if (this.getExploreLearnTotal === '') {
                    return 0;
                }
                const length = this.getExploreLearnTotal.total / 10;
                const ceilLength = Math.ceil(length);
                return ceilLength;
            }
            return false;
        }
        //
    },
    methods: {
        ...mapMutations(['SET_EXPLORE_NEWS', 'SET_EXPLORE_COLLECTIONS']),
        ...mapActions(['GET_EXPLORE_NEWS', 'GET_EXPLORE_COLLECTIONS', 'GET_EXPLORE_LEARN', 'GET_WATCHLIST']),

        async shuffleNews(signType) {
            if (signType) {
                if (signType == 'regression') {
                    if (this.page == 0) {
                        const pageCount = 0;
                        const pagenation = {
                            page: pageCount,
                            perPage: this.perPage
                        };
                        this.loadNews = true;
                        this.GET_EXPLORE_NEWS(pagenation).then(() => {
                            this.loadNews = null;
                        });
                    } else {
                        const pagenation = {
                            page: --this.page,
                            perPage: this.perPage
                        };
                        this.loadNews = true;
                        this.GET_EXPLORE_NEWS(pagenation).then(() => {
                            this.loadNews = null;
                        });
                    }
                }
                // if the numberof pages is < Math.ceil(totalPaginationlength / 10)
                else if (signType == 'progression') {
                    const pagenation = {
                        page: ++this.page,
                        perPage: this.perPage
                    };
                    if (this.page < this.ExploreNewsLength - 1) {
                        this.loadNews = true;
                        await this.GET_EXPLORE_NEWS(pagenation);
                        this.loadNews = false;
                        this.SET_EXPLORE_NEWS([...this.getExploreNews]);
                    }
                }
            }
        },
        async shuffleCollections(signType) {
            if (signType) {
                if (signType == 'regression') {
                    if (this.collection_page == 0) {
                        const pageCount = 0;
                        const pagenation = {
                            page: pageCount,
                            perPage: this.collection_perPage
                        };
                        // this.loadCollections = true;
                        await this.GET_EXPLORE_COLLECTIONS(pagenation).then(() => {
                            this.loadCollections = null;
                        });
                    } else {
                        const pagenation = {
                            page: --this.collection_page,
                            perPage: this.collection_perPage
                        };
                        this.loadCollections = true;
                        await this.GET_EXPLORE_COLLECTIONS(pagenation).then(() => {
                            this.loadCollections = null;
                        });
                    }
                }
                // if the numberof pages is < Math.ceil(totalPaginationlength / 10)
                else if (signType == 'progression') {
                    const pagenation = {
                        page: ++this.collection_page,
                        perPage: this.collection_perPage
                    };
                    if (this.collection_page < this.ExploreCollectionsLength - 1) {
                        this.loadCollections = true;
                        // this.SET_EXPLORE_NEWS([]);
                        await this.GET_EXPLORE_COLLECTIONS(pagenation);
                        this.loadCollections = null;
                        this.SET_EXPLORE_COLLECTIONS([...this.getExploreCollections]);
                    }
                }
            }
        },
        async shuffleLearn(signType) {
            if (signType) {
                if (signType == 'regression') {
                    if (this.learn_page == 0) {
                        const pageCount = 0;
                        const pagenation = {
                            page: pageCount,
                            perPage: this.learn_perPage
                        };
                        this.loadLearn = true;
                        await this.GET_EXPLORE_LEARN(pagenation).then(() => {
                            this.loadLearn = null;
                        });
                    } else if (this.learn_page > 0) {
                        const pagenation = {
                            page: --this.learn_page,
                            perPage: this.learn_perPage
                        };
                        this.loadLearn = true;
                        this.GET_EXPLORE_LEARN(pagenation).then(() => {
                            this.loadLearn = false;
                        });
                    }
                }
                // if the numberof pages is < Math.ceil(totalPaginationlength / 10)
                else if (signType == 'progression') {
                    const pagenation = {
                        page: ++this.learn_page,
                        perPage: this.learn_perPage
                    };
                    if (this.learn_page < this.ExploreLearnLength - 1) {
                        this.loadLearn = true;
                        // this.SET_EXPLORE_NEWS([]);
                        await this.GET_EXPLORE_LEARN(pagenation).then(() => {
                            this.loadLearn = false;
                            this.SET_EXPLORE_NEWS([...this.getExploreLearn]);
                        });
                    }
                }
            }
        },
        async mount() {
            const payload = {
                page: 0,
                perPage: 10
            };
            this.loading = true;
            if (this.getExploreCollections.length <= 0) {
                this.GET_EXPLORE_COLLECTIONS(payload);
            }
            if (this.getExploreLearn.length <= 0) {
                this.GET_EXPLORE_LEARN(payload);
            }

            await this.GET_EXPLORE_NEWS(payload);
            this.loading = false;
            // this.SET_INSTRUMENT_BY_TAGS([...this.getExploreNews]);
        }
    },
    async mounted() {
        if (this.getExploreNews.length > 0) {
            this.loading = false;
        }
        const payload = {
            page: 0,
            perPage: 10
        };

        await this.GET_EXPLORE_NEWS(payload);
        this.loading = false;
        this.watchlistLoading = true;
        if (this.getWatchlist.length > 0) {
            this.watchlistLoading = false;
        }

        await this.GET_WATCHLIST();
        this.watchlistLoading = false;
        await Promise.all([this.GET_EXPLORE_COLLECTIONS(payload), this.GET_EXPLORE_LEARN(payload)]).then(() => {
            this.loadCollections = null;
            this.loadLearn = null;
        });
    }
};
</script>
