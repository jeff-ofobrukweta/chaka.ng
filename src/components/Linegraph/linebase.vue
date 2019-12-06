<template>
    <Fragment>
        <div
            v-if="gethistoryportfolioprice.length >= 1 && gethistoryportfoliodate.length >= 1"
            class="graphholder"
        >
            <div class="header-container">
                <div class="left-menue-item">
                    <h3 class="holder">Holdings</h3>
                    <h4 class="sub-holder">text here dummy</h4>
                </div>
                <div class="right-menue-item">
                    <section class="btn-sell">
                        <KYCButton
                            ref="fundBtn"
                            type="button"
                            :classes="['btn-block', 'btn--lg', 'btn__primary']"
                            action="fund"
                            @step="handleStep"
                            >Fund</KYCButton
                        >
                    </section>
                    <section class="cash-networth">
                        {{
                            getAccountSummary.netWorth | kobo | currency(getAccountSummary.currency)
                        }}
                        <span class="derived">
                            <span :class="[getPortfolioDerivedPrice < 0 ? 'red' : 'green']">{{
                                getPortfolioDerivedPrice | units(2)
                            }}</span>
                            <span :class="[getPortfolioDerivedChange < 0 ? 'red' : 'green']"
                                >({{ getPortfolioDerivedChange | units(2) }}%)</span
                            >
                        </span>
                    </section>
                    <section class="toogle-section">
                        <section class="option-container">
                            <button
                                v-for="(item, index) in currencyOption"
                                :key="index"
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
                                    <select class="drop-down">
                                        <option
                                            v-for="(item, index) in buttonoption"
                                            :key="index"
                                            @click="handletimeframe(item.time, item.id)"
                                            class="option"
                                            >{{ item.name }}</option
                                        >
                                    </select>
                                </div>
                            </button>
                        </section>
                    </section>
                </div>
            </div>
            <Graph
                :price="gethistoryportfolioprice"
                :currency="getAccountSummary.currency"
                :date="gethistoryportfoliodate"
            />
        </div>
        <fund-modal :showModal="showFund" @close="closeFundBtn" v-if="showFund" />
        <wallet-success @close="showSuccess = false" v-if="showSuccess" />
        <div v-else class="graphholder"></div>
    </Fragment>
</template>
<script>
import Graph from "./linegraph";
import KYCTitles from "../../services/kyc/kycTitles";
import { Fragment } from "vue-fragment";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "Linechartgraphchild",
    data() {
        return {
            showFund: false,
            showSuccess: false,
            showKYC: false,
            selectedField: {},
            step: null,
            allNextKYC: KYCTitles.titles,
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
            activeCurrency: 0
        };
    },
    components: {
        Graph,
        Fragment,
        ModalKYC: () => import("../kyc/ModalKYC"),
        KYCButton: () => import("../form/KYCButton")
    },
    computed: {
        ...mapGetters([
            "gethistoryportfolioprice",
            "gethistoryportfoliodate",
            "getPorfolioglobalCurrencyforGraph",
            "getPorfolioglobalTimeforGraph",
            "getAccountSummary",
            "getPortfolioDerivedPrice",
            "getPortfolioIntervalposition",
            "getPortfolioDerivedChange"
        ])
    },
    methods: {
        ...mapMutations([
            "SET_GLOBALSTORE_PORTFOLIOHISTORY_INTERVAL_FOR_GRAPH",
            "SET_PORTFOLIO_POSITIONS_FOR_SELECT",
            "SET_GLOBALSTORE_PORTFOLIOHISTORY_CURRENCY_FOR_GRAPH"
        ]),
        ...mapActions(["GET_LINECHART_PORTFOLIO_GRAPH_DATA", "GET_ACCOUNT_SUMMARY"]),
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
        async toogleCurrency(currency, id) {
            this.SET_GLOBALSTORE_PORTFOLIOHISTORY_CURRENCY_FOR_GRAPH(currency);
            await this.GET_ACCOUNT_SUMMARY({ currency }).then(() => {
                const defaulttime = {
                    interval: this.getPorfolioglobalTimeforGraph,
                    currency: this.getPorfolioglobalCurrencyforGraph
                };
                console.log("toggle HHHHHHHHHHHHHHHHHHHHHHH", this.getAccountSummary);
                this.GET_LINECHART_PORTFOLIO_GRAPH_DATA(defaulttime);
            });
        },
        async handletimeframe(index, id) {
            this.SET_GLOBALSTORE_PORTFOLIOHISTORY_INTERVAL_FOR_GRAPH(index);
            this.SET_PORTFOLIO_POSITIONS_FOR_SELECT(id);
            const payloadsinglestock = {
                interval: this.getPorfolioglobalTimeforGraph,
                currency: this.getPorfolioglobalCurrencyforGraph
            };
            await this.GET_LINECHART_PORTFOLIO_GRAPH_DATA(payloadsinglestock).then(() => {
                console.log(
                    ">>>>>>GET_LINECHART_PORTFOLIO_GRAPH_DATA>>>>>>>>>>>>>>",
                    this.getOpenPrice
                );
            });
        },
        mountedActions() {
            const payload = {
                interval: this.getPorfolioglobalTimeforGraph,
                currency: this.getPorfolioglobalCurrencyforGraph
            };
            this.GET_LINECHART_PORTFOLIO_GRAPH_DATA(payload).then(() => { 
            });
        }
    },
    mounted() {
        this.mountedActions();
    }
};
</script>
<style src="../../assets/scss/components/linebase.scss" lang="scss" scoped />
