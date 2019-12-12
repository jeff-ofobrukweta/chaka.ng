<template>
    <section class="dashboard__main">
        <section class="portfolio-title">
            <div>
                <h3>Holdings</h3>
                <p class="dashboard__title--sub">Portfolio</p>
            </div>
            <section class="portfolio-title__fund">
                <KYCButton
                    ref="fundBtn"
                    type="button"
                    :classes="['btn-block', 'btn__primary']"
                    action="fund"
                    @step="handleStep"
                    >Fund</KYCButton
                >
            </section>
        </section>
        <section class="portfolio-networth">
            <h5>
                <span
                    v-if="Object.keys(getAccountSummary).length > 0"
                    class="cursor-context"
                    :title="
                        getAccountSummary.netWorth
                            | kobo
                            | currency(getAccountSummary.currency, true)
                    "
                    >{{
                        getAccountSummary.netWorth | kobo | currency(getAccountSummary.currency)
                    }}</span
                >
                <span v-else>{{ getPorfolioglobalCurrencyforGraph === "NGN" ? "₦" : "$" }}-</span
                ><span class="text-light">&nbsp;|&nbsp;</span>
                <span class="derived">
                    <span :class="[getPortfolioDerivedPrice < 0 ? 'red' : 'green']">{{
                        getPortfolioDerivedPrice | units(2)
                    }}</span>
                    <span :class="[getPortfolioDerivedChange < 0 ? 'red' : 'green']"
                        >({{ getPortfolioDerivedChange | units(2) }}%)</span
                    >
                </span>
            </h5>
        </section>
        <section class="portfolio-line__graph">
            <Linegraph />
        </section>
        <section class="portfolio-card__box" v-if="!portfolioCardsLoading">
            <PortfolioCardLocal />
            <PortfolioCardGlobal />
            <PortfolioCardOpenorders />
        </section>
        <section class="portfolio__charts">
            <Doughnut />
            <Performancebarchart />
        </section>
        <section class="portfolio-watch">
            <div class="explore__title">
                <div>
                    <h3>Watchlist</h3>
                    <p class="explore__title--sub">Keep a close watch on top stocks</p>
                </div>
                <select
                    v-if="getWatchlist.length > 0"
                    class="form__input"
                    v-model="watchlistInterval"
                    @change="handlewatchlistintervalToogle"
                >
                    <option v-for="(item, index) in interval" :key="index" :value="item.value">{{
                        item.name
                    }}</option>
                </select>
            </div>
            <error-block type="watchlist" />
            <section class="watchlist-portfolio__box" v-if="watchlistLoading">
                <WatchlistCard v-for="i in 5" :key="i" :instrument="{}" dummy />
            </section>
            <section class="watchlist-portfolio__box" v-else-if="getWatchlist.length > 0">
                <WatchlistCard
                    v-for="(instrument, index) in getWatchlist"
                    :key="index"
                    :instrument="instrument"
                />
            </section>
            <section class="empty-center" v-else>
                <p>You have no items in your watchlist</p>
                <router-link :to="{ name: 'categories' }" class="btn btn__primary btn-block"
                    >Discover</router-link
                >
            </section>
        </section>
        <fund-modal :showModal="showFund" @close="closeFundBtn" v-if="showFund" />
        <wallet-success @close="showSuccess = false" v-if="showSuccess" />

        <modal @close="showKYC = false" v-if="showKYC">
            <template slot="header">{{ selectedField.title }}</template>
            <ModalKYC :requiredFields="selectedField.fields" @updated="handleUpdate" />
        </modal>
    </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import KYCTitles from "../../services/kyc/kycTitles";

export default {
    name: "portfolio",
    components: {
        WatchlistCard: () => import("../../components/watchlist/PortfolioWatchlist"),
        PortfolioCardLocal: () => import("../../components/portfolio/PortfolioCardLocal"),
        PortfolioCardGlobal: () => import("../../components/portfolio/PortfolioCardGlobal"),
        PortfolioCardOpenorders: () => import("../../components/portfolio/PortfolioCardOpenorders"),
        Linegraph: () => import("../../components/Linegraph/linebase"),
        Doughnut: () => import("../../components/Doughnut/dbase"),
        Performancebarchart: () => import("../../components/Performance_chart/performancebase"),
        KYCButton: () => import("../../components/form/KYCButton"),
        ModalKYC: () => import("../../components/kyc/ModalKYC")
    },
    data() {
        return {
            interval: [
                {
                    name: "1 DAY",
                    value: "1D",
                    id: 0,
                    description: ""
                },
                {
                    name: "1 MONTH",
                    value: "1M",
                    id: 1,
                    description: ""
                },
                {
                    name: "3 MONTHS",
                    value: "3M",
                    id: 2,
                    description: ""
                },
                {
                    name: "1 YEAR",
                    value: "1Y",
                    id: 3,
                    description: ""
                },
                {
                    name: "5 YEARS",
                    value: "5Y",
                    id: 4,
                    description: ""
                }
            ],
            watchlistInterval: "1D",
            cacheWatchlistInterval: "1D",
            watchlistLoading: true,
            portfolioCardsLoading: false,
            showFund: false,
            showSuccess: false,
            showKYC: false,
            selectedField: {},
            step: null,
            allNextKYC: KYCTitles.titles
        };
    },
    methods: {
        ...mapActions([
            "GET_ACCOUNT_SUMMARY",
            "GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS",
            "GET_WATCHLIST"
        ]),
        ...mapMutations(["SET_WATCHLIST"]),
        handleStep(step) {
            this.step = step.type;
            if (step.kyc) {
                this.showKYC = true;
                this.allNextKYC.forEach(element => {
                    element.fields.forEach(el => {
                        if (el === this.getNextKYC.nextKYC[0]) {
                            this.selectedField = element;
                            this.selectedField.fields = this.getNextKYC.nextKYC;
                        }
                    });
                });
                return true;
            }
            this.showFund = true;
        },
        handleUpdate() {
            this.showKYC = false;
            this.$refs.fundBtn.$el.click();
        },
        closeFundBtn(e) {
            if (e) this.showSuccess = true;
            this.showFund = false;
        },
        handlewatchlistintervalToogle(e) {
            if (this.watchlistInterval === this.cacheWatchlistInterval) {
                return true;
            }
            this.watchlistLoading = true;
            this.SET_WATCHLIST([]);
            const watchPayload = { interval: this.watchlistInterval };
            this.GET_WATCHLIST(watchPayload).then(() => {
                this.watchlistLoading = false;
            });
            this.cacheWatchlistInterval = this.watchlistInterval;
        }
    },
    async mounted() {
        const payload = { interval: "1D" };
        const currency = { currency: this.getPorfolioglobalCurrencyforGraph };
        this.watchlistLoading = true;
        this.portfolioCardsLoading = true;
        this.GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS();
        this.portfolioCardsLoading = false;
        await this.GET_WATCHLIST(payload);
        this.watchlistLoading = false;
        await this.GET_ACCOUNT_SUMMARY(currency);
    },
    computed: {
        ...mapGetters([
            "getWatchlist",
            "getPortfolioSummary",
            "getPorfolioglobalCurrencyforGraph",
            "getAccountSummary",
            "getPortfoliopositionsCarddetails",
            "getPortfolioDerivedPrice",
            "getPortfolioDerivedChange",
            "getNextKYC"
        ])
    }
};
</script>
<style src="../../assets/scss/layouts/_portfoliobase.scss" lang="scss" scoped />
