<template>
    <div class="watchlist-explore">
        <div class="watchlist-explore__name">
            <img height="30px" :src="instrument.logoUrl" :alt="instrument.symbol" />
            <img
                :src="
                    require(`../../assets/img/flags/${
                        instrument.countryCode ? instrument.countryCode.toLowerCase() : 'zz'
                    }-flag.svg`)
                "
                class="watchlist-explore__symbol"
                alt="US"
                width="24px"
            />
        </div>
        <router-link
            class="watchlist-explore__flex pointer"
            tag="div"
            :to="{ name: 'singlestock', params: { symbol: instrument.symbol } }"
        >
            <p class="light">
                <strong>{{ instrument.symbol }}</strong>
            </p>
            <p>
                <strong>{{ instrument.name }}</strong>
            </p>
        </router-link>
        <div class="watchlist-explore__flex">
            <p
                class="watchlist-explore__change"
                :class="[instrument.derivedPrice >= 0 ? 'green' : 'red']"
            >
                <img
                    src="../../assets/img/green-arrow.svg"
                    v-if="+instrument.derivedPrice >= 0"
                    alt="Gain"
                />
                <img src="../../assets/img/red-arrow.svg" v-else alt="Loss" />
                <small
                    >{{ +instrument.derivedPricePercentage >= 0 ? "+" : ""
                    }}{{ +instrument.derivedPrice | units(2) }} ({{
                        +instrument.derivedPricePercentage | units(2)
                    }}%)</small
                >
            </p>
            <p v-if="instrument.InstrumentDynamic">
                <strong
                    class=" cursor-context"
                    :title="instrument.askPrice | currency(instrument.currency, true)"
                    >{{ instrument.askPrice | currency(instrument.currency) }}</strong
                >
            </p>
        </div>
        <div class="watchlist-explore__graph--box">
            <line-chart
                class="watchlist-explore__graph"
                :chart-data="datacollection"
                :options="options"
                :width="100"
                :height="50"
                v-if="chartData.chart"
            ></line-chart>
        </div>
        <div class="watchlist-explore__actions">
            <button>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="24" height="24" rx="6" fill="white" />
                    <g clip-path="url(#clip0)">
                        <path
                            d="M12 7.3125C8.875 7.3125 6.20625 9.25625 5.125 12C6.20625 14.7438 8.875 16.6875 12 16.6875C15.125 16.6875 17.7937 14.7438 18.875 12C17.7937 9.25625 15.125 7.3125 12 7.3125ZM12 15.125C10.275 15.125 8.875 13.725 8.875 12C8.875 10.275 10.275 8.875 12 8.875C13.725 8.875 15.125 10.275 15.125 12C15.125 13.725 13.725 15.125 12 15.125ZM12 10.125C10.9625 10.125 10.125 10.9625 10.125 12C10.125 13.0375 10.9625 13.875 12 13.875C13.0375 13.875 13.875 13.0375 13.875 12C13.875 10.9625 13.0375 10.125 12 10.125Z"
                            fill="#CECECE"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect
                                width="15"
                                height="15"
                                fill="white"
                                transform="translate(4.5 5.25)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </button>
            <KYCButton
                ref="buyBtn"
                type="button"
                :classes="['']"
                :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                @step="handleStep"
                >Buy</KYCButton
            >
            <!-- <button @click="showBuy = true">+&nbsp;Buy</button> -->
        </div>
        <buy-modal
            @close="closeBuyModal"
            :currency="instrument.currency"
            :symbol="instrument.symbol"
            :instrument="instrument"
            v-if="showBuy"
        />
        <sale-success @close="showSuccess = false" v-if="showSuccess" />

        <modal @close="showKYC = false" v-if="showKYC">
            <template slot="header">{{ selectedField.title }}</template>
            <form @submit.prevent="submitPhone">
                <div>
                    <ModalKYC :requiredFields="selectedField.fields" @updated="handleUpdate" />
                </div>
            </form>
        </modal>
    </div>
</template>

<script>
import LineChart from "../Linegraph/linegraph_config.js";
import KYCButton from "../form/KYCButton";
import ModalKYC from "../kyc/ModalKYC";
import KYCTitles from "../../services/kyc/kycTitles";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "explore-watchlist",
    components: {
        LineChart,
        KYCButton,
        ModalKYC
    },
    props: {
        instrument: {
            type: Object,
            required: true
        },
        color: {
            type: String,
            default: "green"
        }
    },
    data() {
        return {
            showBuy: false,
            showSuccess: false,
            datacollection: {},
            step: null,
            showKYC: false,
            selectedField: {},
            allNextKYC: KYCTitles.titles,
            options: {
                responsive: false,
                legend: {
                    display: false
                },
                elements: {
                    line: {
                        borderColor: "#000000",
                        borderWidth: 1
                    },
                    point: {
                        radius: 0
                    }
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    yAxes: [
                        {
                            display: false
                        }
                    ],
                    xAxes: [
                        {
                            display: false
                        }
                    ]
                }
            },
            chartData: {},
            labelsArray: [],
            chartArray: []
        };
    },
    computed: {
        ...mapGetters(["getNextKYC"])
    },
    methods: {
        ...mapActions(["GET_WATCHLIST_CHART"]),
        fillData() {
            this.datacollection = {
                labels: this.labelsArray,
                datasets: [
                    {
                        label: "Stocks",
                        lineTension: 0.4,
                        fill: false,
                        borderColor: this.color,
                        borderWidth: 1.7,
                        showLine: true,
                        borderJoinStyle: "miter",
                        pointBackgroundColor: "#484848",
                        pointBorderWidth: 3,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: "#2DA5EC",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 1,
                        data: this.chartArray
                    }
                ]
            };
        },
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
            } else {
                this.showBuy = true;
            }
        },
        handleUpdate() {
            this.showKYC = false;
            if (this.step !== "kyc") {
                this.$refs.buyBtn.$el.click();
            }
        },
        closeBuyModal(e) {
            if (e) {
                this.showSuccess = true;
            }
            this.showBuy = false;
        }
    },

    async mounted() {
        this.fillData();
        if (this.instrument.symbol) {
            await Promise.all([
                this.GET_WATCHLIST_CHART({
                    symbol: this.instrument.symbol,
                    interval: "1W"
                }).then(resp => {
                    this.chartData = resp;
                    if (this.chartData) {
                        this.chartData.chart.map(el => {
                            this.labelsArray.push(el.date);
                            this.chartArray.push(el.price);
                        });
                        setTimeout(() => {
                            this.fillData();
                        }, 100);
                    }
                })
            ]);
        }
    }
};
</script>
