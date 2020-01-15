<template>
    <Fragment>
        <!-- <div v-if="getOpenPrice.length >= 1 && getDates.length >= 1" class="graphholder"> -->
        <div class="graphholder">
            <div class="header-container">
                <div class="right-menue-item">
                    <div class="parent-container-main">
                        <section class="buy-sell-action">
                            <kyc-button
                                ref="buyBtn"
                                :classes="['buying']"
                                :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                                @step="handleStep"
                                next-action="buy"
                                >Buy</kyc-button
                            >
                            <kyc-button
                                ref="sellBtn"
                                v-if="getSingleinstrument && checkPositions()"
                                :classes="['selling']"
                                :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                                @step="handleStep"
                                next-action="sell"
                                >Sell</kyc-button
                            >
                        </section>
                        <section v-if="trdingViewStatechange"></section>
                        <section v-else class="toogle-section">
                            <section class="option-container">
                                <button
                                    v-for="(item, index) in currencyOption"
                                    :key="index"
                                    @click="toogleCurrency(item.currency, item.id)"
                                    :disabled="loading"
                                    :title="item.description"
                                    :class="[
                                        item.currency == getSinglestockglobalCurrencyforGraph
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
                                            v-model="Interval"
                                            @change="handletimeframe"
                                            :disabled="loading"
                                            class="drop-down"
                                        >
                                            <option
                                                v-for="(item, index) in buttonoption"
                                                :key="index"
                                                :value="item.time"
                                                >{{ item.name }}</option
                                            >
                                            <!-- <option
                                             v-for="(item,index) in buttonoption"
                                             :key="index"
                                             @click="handletimeframe(item.time)"
                                            class="option">{{item.name}}</option> -->
                                        </select>
                                    </div>
                                </button>
                            </section>
                        </section>
                    </div>
                    <section class="btn-parent-container">
                        <section
                            :class="[getSingleinstrument.currency == 'USD' ? '' : 'display']"
                            class="btn-container"
                        >
                            <button
                                v-for="(item, index) in options"
                                :key="index"
                                @click="OntooglePositions(item.id)"
                                :class="[item.id == activeButton ? 'active-btn' : '', 'option']"
                            >
                                {{ item.name }}
                            </button>
                        </section>
                    </section>
                </div>
            </div>

            <!-- start here -->
            <template v-if="isGraphValid === 1">
                <div class="portfolio-graph__placeholder loader-gif__big">
                    <img
                        class="middle-loader"
                        :src="require('../../assets/img/loader.gif')"
                        alt="spin"
                    />
                </div>
            </template>
            <template v-else-if="isGraphValid === 2">
                <div class="portfolio-graph__placeholder caution__big">
                    <img :src="require('../../assets/img/caution.svg')" alt="Caution" />
                    <a class="caution__reload">Reload</a>
                </div>
            </template>
            <template v-else>
                <technical-chart
                    v-if="tooglegraph"
                    :symbol="getSingleinstrument.symbol"
                    :exchangeID="getSingleinstrument.exchangeID"
                />
                <Graph
                    v-else
                    :class="tooglegraph ? 'display' : 'nodisplay'"
                    :price="getOpenPrice"
                    :date="getDates"
                    :currency="getSinglestockglobalCurrencyforGraph"
                />
            </template>
            <section class="buy-container-action">
                <kyc-button
                    ref="buyBtn"
                    :classes="['buying']"
                    :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                    @step="handleStep"
                    next-action="buy"
                    >Buy</kyc-button
                >
                <kyc-button
                    ref="sellBtn"
                    v-if="
                        getSingleinstrument &&
                            checkPositions(getSingleinstrument.symbol, getSingleinstrument.currency)
                    "
                    :classes="['selling']"
                    :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                    @step="handleStep"
                    next-action="sell"
                    >Sell</kyc-button
                >
            </section>
            <!-- end here -->
        </div>
        <!-- <div v-else class="graphholder">
            <div class="portfolio-graph__placeholder caution__big">
                <img :src="require('../../assets/img/caution.svg')" alt="Caution" />
                <a class="caution__reload">Reload</a>
            </div>
        </div> -->

        <modal-kyc @updated="handleUpdate" @close="showKYC = false" v-if="showKYC" />
    </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import { mapGetters, mapMutations, mapActions } from "vuex";
import EventBus from "../../event-bus";

export default {
    name: "Linechartgraphchild",
    data() {
        return {
            buttonoption: [
                {
                    name: "1 DAY",
                    time: "1D",
                    id: 1
                },
                {
                    name: "1 WEEK",
                    time: "1W",
                    id: 2
                },
                {
                    name: "1 MONTH",
                    time: "1M",
                    id: 3
                },
                {
                    name: "3 MONTHS",
                    time: "3M",
                    id: 4
                },
                {
                    name: "1 YEAR",
                    time: "1Y",
                    id: 5
                },
                {
                    name: "5 YEARS",
                    time: "5Y",
                    id: 6
                }
            ],
            currencyOption: [
                {
                    symbol: "₦",
                    currency: "NGN",
                    id: 0,
                    description: "convert to Naira value"
                },
                {
                    symbol: "$",
                    currency: "USD",
                    id: 1,
                    description: "convert to Dollar value"
                }
            ],
            loading: true,
            tooglegraph: false,
            Interval: "1W",
            options: [
                {
                    name: "Normal",
                    state: true,
                    id: 0
                },
                {
                    name: "Technical",
                    state: false,
                    id: 1
                }
            ],
            activeButton: "",
            currentId: "",
            step: null,
            showKYC: false,
            type: null,
            cancelStatus: {},
            trdingViewStatechange: false,
            maximumQuantity: null
        };
    },
    components: {
        Fragment,
        Graph: () => import("./linegraph"),
        TechnicalChart: () => import("../Technicalgraph")
    },
    props: {
        instrument: {
            type: Object,
            required: true
        },
        currency: {
            type: String,
            required: false
        }
    },
    computed: {
        ...mapGetters([
            "getOpenPrice",
            "getDates",
            "getSingleinstrument",
            "getPricedetailsonblackcard",
            "getSinglestockglobalTimeforGraph",
            "getSinglestockglobalCurrencyforGraph",
            "getSinglestockIntervalposition",
            "getWindowWidth",
            "getNextKYC",
            "getlocalstocksowned",
            "getglobalstocksowned"
        ]),
        isGraphValid() {
            if (this.loading || this.getOpenPrice.length <= 0) {
                return 1;
            }
            // filter the array for conditions null or undefined or is Not a number
            const checkForNull = this.getOpenPrice.filter(
                el => el === null || el === undefined || Number.isNaN(+el)
            );
            if (checkForNull.length <= 0 && this.getDates[0] !== null) {
                return 3;
            }
            return 2;
        }
    },
    methods: {
        ...mapMutations([
            "SET_GLOBALSTORE_SINGLESTOCKHISTORY_INTERVAL_FOR_GRAPH",
            "SET_GLOBALSTORE_SINGLESTOCKHISTORY_CURRENCY_FOR_GRAPH",
            "SET_SINGLESTOCK_POSITIONS_FOR_SELECT",
            "SET_BUY_MODAL",
            "SET_SELL_MODAL",
            "SET_LINE_SINGLESTOCK_CHARTDATA",
            "SET_LINE_SINGLESTOCK_CHART_DATE",
            "SET_PRICE_INFO_ON_BLACKCARD"
        ]),
        ...mapActions(["GET_LINECHART_SINGLESTOCK_GRAPH_DATA"]),
        checkPositions() {
            let check = [];
            if (this.getSingleinstrument.currency === "NGN") {
                check = this.getlocalstocksowned.filter(
                    element => element.symbol === this.getSingleinstrument.symbol
                );
            } else {
                check = this.getglobalstocksowned.filter(
                    element => element.symbol === this.getSingleinstrument.symbol
                );
            }
            if (check.length > 0) {
                const { quantity } = check[0];
                this.maximumQuantity = +quantity;
                return true;
            }
            this.maximumQuantity = 0;
            return false;
        },
        OntooglePositions(response) {
            this.activeButton = response;
            this.tooglegraph = !this.tooglegraph;
            if (response == 1) {
                this.trdingViewStatechange = true;
                return this.trdingViewStatechange;
            }
            this.trdingViewStatechange = false;
            return this.trdingViewStatechange;
        },
        async mountAction() {
            this.checkPositions();
            //set the currency as the component mount to the global state
            this.SET_GLOBALSTORE_SINGLESTOCKHISTORY_CURRENCY_FOR_GRAPH(this.instrument.currency);
            if (this.getSinglestockglobalCurrencyforGraph == "USD") {
                this.currentId = 1;
            } else {
                this.currentId = 0;
            }
            // use the global state variable in the store as payload for request
            const payloadsinglestock = {
                interval: this.getSinglestockglobalTimeforGraph,
                currency: this.getSinglestockglobalCurrencyforGraph,
                symbol: this.$route.params.symbol
            };
            this.SET_GLOBALSTORE_SINGLESTOCKHISTORY_INTERVAL_FOR_GRAPH(this.Interval);
            this.SET_PRICE_INFO_ON_BLACKCARD({});
            await this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(payloadsinglestock).then(() => {
                //  call back state like loader state here
                EventBus.$emit("GET_DAYS", this.getSinglestockglobalTimeforGraph);
                this.loading = false;
            });
        },
        handletimeframe(e) {
            this.loading = true;
            this.SET_GLOBALSTORE_SINGLESTOCKHISTORY_INTERVAL_FOR_GRAPH(this.Interval);
            this.SET_PRICE_INFO_ON_BLACKCARD({});
            const payloadsinglestock = {
                interval: this.getSinglestockglobalTimeforGraph,
                currency: this.getSinglestockglobalCurrencyforGraph,
                symbol: this.$route.params.symbol
            };
            this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(payloadsinglestock).then(() => {
                EventBus.$emit("GET_DAYS", this.getSinglestockglobalTimeforGraph);
                this.loading = false;
            });
        },
        async toogleCurrency(currency, id) {
            this.loading = true;
            this.currentId = id;
            this.SET_SINGLESTOCK_POSITIONS_FOR_SELECT(id);
            this.SET_GLOBALSTORE_SINGLESTOCKHISTORY_CURRENCY_FOR_GRAPH(currency);
            this.SET_PRICE_INFO_ON_BLACKCARD({});
            const defaulttime = {
                interval: this.getSinglestockglobalTimeforGraph,
                currency: this.getSinglestockglobalCurrencyforGraph,
                symbol: this.$route.params.symbol
            };
            this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(defaulttime).then(() => {
                this.loading = false;
            });
        },
        handleStep(step) {
            this.step = step;
            if (step.kyc) {
                this.showKYC = true;
                return true;
            }
            this.showSale();
        },
        handleUpdate(value) {
            if (value) {
                this.showSale();
            }
        },
        showSale() {
            if (this.step.nextAction === "buy") {
                this.SET_BUY_MODAL({
                    instrument: this.instrument,
                    currency: this.currency,
                    stockPage: true,
                    show: true
                });
                return true;
            }
            this.checkPositions();
            this.SET_SELL_MODAL({
                instrument: this.instrument,
                currency: this.instrument.currency,
                stockPage: true,
                show: true,
                maxQuantity: this.maximumQuantity
            });
        }
    },
    mounted() {
        this.mountAction();
    },
    beforeRouteUpdate(to, from, next) {
        this.SET_LINE_SINGLESTOCK_CHART_DATE([]);
        this.SET_LINE_SINGLESTOCK_CHARTDATA([]);
        this.SET_PRICE_INFO_ON_BLACKCARD({});
        this.mountAction();
        // const emitData = {getOpenPrice:this.getOpenPrice,getDates:this.getDates}
        // EventBus.$emit('fillData',emitData);
        // if (
        //     this.getSingleinstrument &&
        //     this.getSingleinstrument.symbol &&
        //     this.getSingleinstrument.currency
        // ) {
        //     this.checkPositions(
        //         this.getSingleinstrument.symbol,
        //         this.getSingleinstrument.currency
        //     );
        // } else return;
        next();
    },
    watch: {}
};
</script>
<style src="../../assets/scss/components/singlelinebase.scss" lang="scss" scoped />
