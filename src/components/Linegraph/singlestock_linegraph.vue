<template>
    <Fragment>
        <div v-if="getOpenPrice.length >= 1 && getDates.length >= 1" class="graphholder">
            <div class="header-container">
                <div class="right-menue-item">
                    <div class="parent-container-main">
                        <section class="buy-sell-action">
                            <KYCButton
                                ref="buyBtn"
                                :classes="['buying']"
                                :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                                @step="handleStep"
                                next-action="buy"
                                >Buy</KYCButton
                            >
                            <KYCButton
                                v-if="instrument.currentValue || instrument.unitsOwned"
                                ref="sellBtn"
                                :classes="['selling']"
                                :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                                @step="handleStep"
                                next-action="sell"
                                >Sell</KYCButton
                            >
                            <!-- <button class="selling">Sell</button> -->
                        </section>
                        <section v-if="trdingViewStatechange"></section>
                        <section 
                        v-else 
                        class="toogle-section">
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
                            :class="[getSingleinstrument[0].currency == 'USD' ? '' : 'display']"
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
                    <a class="caution__reload" @click="mountedActions">Reload</a>
                </div>
            </template>
            <template v-else>
                <technical-chart
                    v-if="tooglegraph"
                    :symbol="getSingleinstrument[0].symbol"
                    :exchangeID="getSingleinstrument[0].exchangeID"
                />
                <Graph
                    v-else
                    :class="tooglegraph ? 'display' : 'nodisplay'"
                    :price="getOpenPrice"
                    :date="getDates"
                    :currency="
                        getSinglestockglobalCurrencyforGraph || getSingleinstrument[0].currency
                    "
                />
            </template>
            <!-- end here -->
        </div>
        <div v-else class="graphholder">
            <div class="portfolio-graph__placeholder caution__big">
                <img :src="require('../../assets/img/caution.svg')" alt="Caution" />
                <a class="caution__reload" @click="mountedActions">Reload</a>
            </div>
        </div>
        <buy-modal
            @close="closeSaleModal"
            :currency="instrument.currency"
            :symbol="instrument.symbol"
            :instrument="instrument"
            stock-page
            v-if="showBuy && Object.keys(instrument).length > 0"
        />
        <sell-modal
            @close="closeSaleModal"
            :currency="instrument.currency"
            :symbol="instrument.symbol"
            :instrument="instrument"
            :max-quantity="maxQuantity"
            stock-page
            v-if="showSell && Object.keys(instrument).length > 0"
        />
        <sale-success @close="showSuccess = false" v-if="showSuccess" />

        <modal @close="showKYC = false" v-if="showKYC">
            <template slot="header">{{ selectedField.title }}</template>
            <ModalKYC :requiredFields="selectedField.fields" @updated="handleUpdate" />
        </modal>
    </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import Graph from "./linegraph";
import EventBus from '../../event-bus';
import KYCTitles from "../../services/kyc/kycTitles";
import { mapGetters, mapMutations, mapActions } from "vuex";

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
            Interval: "5Y",
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
            showBuy: false,
            showSell: false,
            showSuccess: false,
            step: null,
            showKYC: false,
            selectedField: {},
            type: null,
            allNextKYC: KYCTitles.titles,
            cancelStatus: {},
            trdingViewStatechange:false
        };
    },
    components: {
        Graph,
        Fragment,
        TechnicalChart: () => import("../Technicalgraph"),
        KYCButton: () => import("../form/KYCButton"),
        ModalKYC: () => import("../kyc/ModalKYC")
    },
    props: {
        instrument: {
            type: Object,
            required: true
        },
        currency: {
            type: String,
            required: false
        },
        maxQuantity: {
            type: Number
        }
    },
    computed: {
        ...mapGetters([
            "getOpenPrice",
            "getDates",
            "getSingleinstrument",
            "getSinglestockglobalTimeforGraph",
            "getSinglestockglobalCurrencyforGraph",
            "getSinglestockIntervalposition",
            "getWindowWidth",
            "getNextKYC"
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
            "SET_LINE_SINGLESTOCK_CHARTDATA",
            "SET_GLOBALSTORE_SINGLESTOCKHISTORY_INTERVAL_FOR_GRAPH",
            "SET_GLOBALSTORE_SINGLESTOCKHISTORY_CURRENCY_FOR_GRAPH",
            "SET_SINGLESTOCK_POSITIONS_FOR_SELECT"
        ]),
        ...mapActions(["GET_LINECHART_SINGLESTOCK_GRAPH_DATA"]),
        OntooglePositions(response) {
            this.activeButton = response;
            this.tooglegraph = !this.tooglegraph;
            console.log('CHECK IF THE TECHNICAL GRAPH IS TOOGLED',response);
            if(response == 1) 
            {
                this.trdingViewStatechange = true
                return this.trdingViewStatechange;
            }else{
                this.trdingViewStatechange = false
                return this.trdingViewStatechange;
            }
        },
        mountAction() {
            //set the currency as the component mount to the global state
            this.SET_GLOBALSTORE_SINGLESTOCKHISTORY_CURRENCY_FOR_GRAPH(this.instrument.currency);
            if(this.getSinglestockglobalCurrencyforGraph == 'USD'){this.currentId = 1}
            else{this.currentId = 0};
            // use the global state variable in the store as payload for request
            const payloadsinglestock = {
                interval: this.getSinglestockglobalTimeforGraph,
                currency: this.getSinglestockglobalCurrencyforGraph,
                symbol: this.$route.params.symbol
            };
            this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(payloadsinglestock).then(() => {
                //  call back state like loader state here
                this.loading = false;
                console.log(
                    "this is the single Instrument LLLLLLLLLLLLLL",
                    this.getSingleinstrument[0].currency
                );
            });
        },
        handletimeframe(e) {
            console.log(">>>>>>>>>handletimeframe>>>>>>>>", this.Interval);
            this.loading = true;
            this.SET_GLOBALSTORE_SINGLESTOCKHISTORY_INTERVAL_FOR_GRAPH(this.Interval);
            EventBus.$emit('GET_DAYS', this.getSinglestockglobalTimeforGraph);
            const payloadsinglestock = {
                interval: this.getSinglestockglobalTimeforGraph,
                currency: this.getSinglestockglobalCurrencyforGraph,
                symbol: this.$route.params.symbol
            };
            this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(payloadsinglestock).then(() => {
                this.loading = false;
                console.log(
                    ">>>>>>GET_LINECHART_SINGLESTOCK_GRAPH_DATA>>>>>>>>>>>>>>",
                    this.getOpenPrice
                );
            });
        },
        async toogleCurrency(currency, id) {
            console.log("TOOOOOOOOGLE_CUUUUUUUUURENCY", currency, id);
            this.loading = true;
            this.currentId = id;
            this.SET_SINGLESTOCK_POSITIONS_FOR_SELECT(id);
            console.log("CURRENCY TOOGLE SELECT STATE", this.getSinglestockIntervalposition);
            this.SET_GLOBALSTORE_SINGLESTOCKHISTORY_CURRENCY_FOR_GRAPH(currency);
            console.log(
                "toggle HHHHHHHHHHHHHHHHHHHHHHH",
                this.getSinglestockglobalCurrencyforGraph
            );
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
            // this.step = step.type;
            this.step = step;
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
            } else {
                if (step.nextAction === "buy") {
                    this.showBuy = true;
                    return true;
                }
                this.showSell = true;
            }
        },
        handleUpdate() {
            this.showKYC = false;
            if (this.step.type !== "kyc") {
                if (this.step.nextAction === "buy") this.$refs.buyBtn.$el.click();
                else this.$refs.sellBtn.$el.click();
            }
        },
        closeSaleModal(e) {
            if (e) {
                this.showSuccess = true;
            }
            this.showBuy = false;
            this.showSell = false;
        }
    },
    mounted() {
        console.log(
            "are this getters??????????????",
            this.instrument,
            this.getOpenPrice,
            this.getDates
        );
        this.mountAction();
    }
};
</script>
<style src="../../assets/scss/components/singlelinebase.scss" lang="scss" scoped />
