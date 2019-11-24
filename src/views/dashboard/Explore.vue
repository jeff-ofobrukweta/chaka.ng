<template>
    <section class="dashboard__main">
        <section class="dashboard__title">
            <h3>Explore</h3>
            <p class="dashboard__title--sub">See the latest on the stock market</p>
        </section>

        <section class="explore-section">
            <div class="explore-featured">
                <div class="explore-featured__image">
                    <img
                        src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt
                    />
                </div>
                <div class="explore-featured__text">
                    <h4 class="explore-featured__text--title">
                        Viral Tweet About Apple Card Leads to Goldman Sachs Probe
                    </h4>
                    <p>
                        A Wall Street regulator is opening a probe into Goldman Sachs Group Inc.’s
                        credit card practices after a viral tweet from a tech entrepreneur alleged
                        gender discrimination in the new Apple Card’s algorithms when determining
                        credit limits. A series of posts from David Heinemeier Hansson starting
                        Thursday railed against the Apple Card for giving him 20 times the credit
                        limit that his wife got. The tweets, many of which contain profanity,
                        immediately gained traction online...
                    </p>
                </div>
            </div>
            <div class="card-news__box explore__news">
                <news-card :news="item" v-for="(item, index) in news" :key="index" />
            </div>
            <div class="explore-actions__bottom">
                <a class="explore-actions">See All</a>
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
                    <a class="explore-actions">See All</a>
                    <a class="explore-actions">Shuffle</a>
                </div>
            </section>
            <div class="card-news__box explore__news">
                <news-card :news="item" v-for="(item, index) in news" :key="index" />
            </div>
            <div class="explore-actions__bottom" v-if="getWindowWidth === 'mobile'">
                <a class="explore-actions">See All</a>
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
                    <a class="explore-actions">See All</a>
                    <a class="explore-actions">Shuffle</a>
                </div>
            </section>
            <div class="card-news__box explore__news">
                <news-card :news="item" v-for="(item, index) in news" :key="index" />
            </div>
            <div class="explore-actions__bottom" v-if="getWindowWidth === 'mobile'">
                <a class="explore-actions">See All</a>
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
                    v-for="(instrument, index) in watchlist"
                    :key="index"
                    :instrument="instrument"
                />
            </section>

            <section class="watchlist-mobile__box" v-else>
                <MobileWatchlist
                    v-for="(instrument, index) in watchlist"
                    :key="index"
                    :instrument="instrument"
                />
            </section>
        </section>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import WatchlistCard from "../../components/watchlist/PortfolioWatchlist";
import PortfolioCard from "../../components/portfolio/PortfolioCard";
import StockTable from "../../components/singlestock/StockTable";
import ExploreWatchlist from "../../components/watchlist/ExploreWatchlist";
import MobileWatchlist from "../../components/watchlist/MobileWatchlist";

export default {
    name: "portfolio",
    components: {
        WatchlistCard,
        PortfolioCard,
        StockTable,
        ExploreWatchlist,
        MobileWatchlist
    },
    data() {
        return {
            showModal: false,
            news: [
                {
                    title:
                        "cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ",
                    link: "https://google.com",
                    image: "../../assets/img/news/news.png"
                },
                {
                    title:
                        "cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ",
                    link: "https://google.com",
                    image: "../../assets/img/news/news.png"
                },
                {
                    title:
                        "cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ",
                    link: "https://google.com",
                    image: "../../assets/img/news/news.png"
                },
                {
                    title:
                        "cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ",
                    link: "https://google.com",
                    image: "../../assets/img/news/news.png"
                },
                {
                    title:
                        "cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC cwiurhbfjda ca bviusbf viu HAVC ",
                    link: "https://google.com",
                    image: "../../assets/img/news/news.png"
                }
            ],
            watchlist: [
                {
                    name: "Spotify",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: "Spotify",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: "Spotify",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 4
                },
                {
                    name: "Spotify",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 2
                },
                {
                    name: "Spotify",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 1
                },
                {
                    name: "Spotify",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: 0
                },
                {
                    name: "Spotify",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: -3
                },
                {
                    name: "Spotify",
                    currency: "USD",
                    price: 656.9,
                    percent: 0.67,
                    change: -10
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["getPortfolioSummary", "getWindowWidth"])
    }
};
</script>
