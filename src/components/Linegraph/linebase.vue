<template>
    <div class="graphholder">
        <div class="header-container">
            <div class="left-menue-item"></div>
            <div class="right-menue-item">
                <section class="toogle-section">
                    <section v-if="isGraphValid == 1 || isGraphValid == 2"></section>
                    <section v-else class="option-container">
                        <button
                            v-for="(item, index) in currencyOption"
                            :key="index"
                            :disabled="loading"
                            @click="toogleCurrency(item.currency, item.id)"
                            :title="item.description"
                            :class="[
                                item.currency == getPorfolioglobalCurrencyforGraph
                                    ? 'btn-one-active'
                                    : '',
                                'btn-one'
                            ]"
                        >
                            {{ item.symbol }}
                        </button>
                        <button>
                            <div id="select" class="dropdown">
                                <select
                                    class="drop-down"
                                    v-model="globaltime"
                                    @change="handletimeframe($event)"
                                    :disabled="loading"
                                >
                                    <option
                                        v-for="(item, index) in buttonoption"
                                        :key="index"
                                        class="option"
                                        :value="item.time"
                                        >{{ item.name }}</option
                                    >
                                </select>
                            </div>
                        </button>
                    </section>
                </section>
            </div>
        </div>
        <template v-if="loading">
            <div class="portfolio-graph__placeholder loader-gif__big">
                <img
                    class="middle-loader"
                    :src="require('../../assets/img/loader.gif')"
                    alt="spin"
                />
            </div>
        </template>
        <template v-else-if="isGraphValid === 1">
            <div class="portfolio-graph__placeholder">
                <img
                    :src="require('../../assets/img/gifs/portfolio.gif')"
                    alt="Portfolio Chart demo"
                />
            </div>
        </template>
        <template v-else-if="isGraphValid === 2">
            <div class="portfolio-graph__placeholder caution__big">
                <img :src="require('../../assets/img/caution.svg')" alt="Caution" />
                <a class="caution__reload" @click="mountedActions">Reload</a>
            </div>
        </template>
        <template v-else>
            <Graph
                :price="gethistoryportfolioprice"
                :currency="getPorfolioglobalCurrencyforGraph"
                :date="gethistoryportfoliodate"
            />
        </template>
    </div>
</template>
<script>
import { Fragment } from 'vue-fragment';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import EventBus from '../../event-bus';

export default {
    name: 'Linechartgraphchild',
    data() {
        return {
            showKYC: false,
            loading: true,
            emptyData: false,
            globaltime: null,
            currencyOption: [
                {
                    symbol: '₦',
                    currency: 'NGN',
                    id: 0,
                    description: 'convert to Naira value'
                },
                {
                    symbol: '$',
                    currency: 'USD',
                    id: 1,
                    description: 'convert to Dollar value'
                }
            ],
            buttonoption: [
                // {
                //     name: "1 DAY",
                //     time: "1D",
                //     id: 1
                // },
                {
                    name: '1 WEEK',
                    time: '1W',
                    id: 2
                },
                {
                    name: '1 MONTH',
                    time: '1M',
                    id: 3
                },
                {
                    name: '3 MONTHS',
                    time: '3M',
                    id: 4
                },
                {
                    name: '1 YEAR',
                    time: '1Y',
                    id: 5
                },
                {
                    name: '5 YEARS',
                    time: '5Y',
                    id: 6
                }
            ],
            activeCurrency: 0
        };
    },
    components: {
        Graph: () => import('./linegraph')
    },
    computed: {
        ...mapGetters([
            'gethistoryportfolioprice',
            'gethistoryportfoliodate',
            'getPorfolioglobalCurrencyforGraph',
            'getPorfolioglobalTimeforGraph',
            'getAccountSummary',
            'getPortfolioDerivedPrice',
            'getPortfolioDerivedChange'
        ]),
        isGraphValid() {
            // filter the array for conditions null or undefined or is Not a number
            const checkForNull = this.gethistoryportfolioprice.filter(
                el => el === null || el === undefined || Number.isNaN(+el)
            );
            if (
                this.gethistoryportfolioprice.length <= 0
                && checkForNull.length <= 0
                && this.gethistoryportfoliodate[0] !== null
                && !this.emptyData
                && this.emptyData != undefined
            ) {
                return 1;
            }

            if (
                checkForNull.length > 0
                && this.gethistoryportfoliodate[0] == null
                && this.emptyData
                && this.emptyData == undefined
            ) {
                return 2;
            }
        }
    },
    methods: {
        ...mapMutations([
            'SET_GLOBALSTORE_PORTFOLIOHISTORY_INTERVAL_FOR_GRAPH',
            'SET_GLOBALSTORE_PORTFOLIOHISTORY_CURRENCY_FOR_GRAPH'
        ]),
        ...mapActions(['GET_LINECHART_PORTFOLIO_GRAPH_DATA', 'GET_PORTFOLIO_GRAPH_SUMMARY']),
        async toogleCurrency(currency, id) {
            if (currency === this.getPorfolioglobalCurrencyforGraph) {
                return true;
            }
            this.SET_GLOBALSTORE_PORTFOLIOHISTORY_CURRENCY_FOR_GRAPH(currency);
            this.loading = true;
            EventBus.$emit('CURRENCY_EMIT', true);
            await this.GET_PORTFOLIO_GRAPH_SUMMARY({ currency }).then(() => {
                const defaulttime = {
                    interval: this.getPorfolioglobalTimeforGraph,
                    currency: this.getPorfolioglobalCurrencyforGraph
                };
                this.GET_LINECHART_PORTFOLIO_GRAPH_DATA(defaulttime).then((res) => {
                    this.loading = false;
                    this.emptyData = res.data.emptyValues;
                    EventBus.$emit('CURRENCY_EMIT', false);
                });
            });
        },
        async handletimeframe(e) {
            if (e.target.value === this.getPorfolioglobalTimeforGraph) {
                return true;
            }
            this.loading = true;
            EventBus.$emit('INTERVAL_EMIT', true);
            this.SET_GLOBALSTORE_PORTFOLIOHISTORY_INTERVAL_FOR_GRAPH(e.target.value);
            const payloadsinglestock = {
                interval: this.getPorfolioglobalTimeforGraph,
                currency: this.getPorfolioglobalCurrencyforGraph
            };
            await this.GET_LINECHART_PORTFOLIO_GRAPH_DATA(payloadsinglestock).then((res) => {
                this.emptyData = res.data.emptyValues;
                this.loading = false;
                EventBus.$emit('INTERVAL_EMIT', false);
            });
        },
        async mountedActions() {
            const payload = {
                interval: this.getPorfolioglobalTimeforGraph,
                currency: 'NGN' || this.getPorfolioglobalCurrencyforGraph
            };
            this.loading = true;
            this.globaltime = this.getPorfolioglobalTimeforGraph;
            await this.GET_LINECHART_PORTFOLIO_GRAPH_DATA(payload).then((res) => {
                this.loading = false;
                this.emptyData = res.data.emptyValues;
            });
        }
    },
    async mounted() {
        await this.mountedActions();
    }
};
</script>
<style src="../../assets/scss/components/linebase.scss" lang="scss" scoped />
