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
        <div class="watchlist-explore__flex">
            <p class="light">
                <strong>{{ instrument.symbol }}</strong>
            </p>
            <p>
                <strong>{{ instrument.name }}</strong>
            </p>
        </div>
        <div class="watchlist-explore__flex" v-if="Object.keys(chartData).length > 0">
            <p
                class="watchlist-explore__change"
                :class="[chartData.derivedPrice >= 0 ? 'green' : 'red']"
            >
                <img
                    src="../../assets/img/green-arrow.svg"
                    v-if="+chartData.derivedPrice >= 0"
                    alt="Gain"
                />
                <img src="../../assets/img/red-arrow.svg" v-else alt="Loss" />
                <small
                    >{{ +chartData.derivedPricePercentage >= 0 ? "+" : ""
                    }}{{ +chartData.derivedPricePercentage | units(2) }} ({{
                        +chartData.derivedPricePercentage | units(2)
                    }}%)</small
                >
            </p>
            <p v-if="instrument.InstrumentDynamic">
                <strong
                    class=" cursor-context"
                    :title="chartData.askPrice | currency(instrument.currency, true)"
                    >{{ chartData.askPrice | currency(instrument.currency) }}</strong
                >
            </p>
        </div>
        <div class="watchlist-explore__flex" v-else></div>
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
            <button @click="showBuy = true">+&nbsp;Buy</button>
        </div>
        <buy-modal
            @close="showBuy = false"
            :currency="instrument.currency"
            :symbol="instrument.symbol"
            :instrument="instrument"
            v-if="showBuy"
        />
    </div>
</template>

<script>
import LineChart from "../Linegraph/linegraph_config.js";
import { mapActions } from "vuex";

export default {
    name: "explore-watchlist",
    components: {
        LineChart
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
            datacollection: {},
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
        }
    },

    async mounted() {
        this.fillData();
        if (this.instrument.symbol) {
            await this.GET_WATCHLIST_CHART({
                symbol: this.instrument.symbol,
                interval: "1W"
            }).then(resp => {
                this.chartData = resp;
                this.chartData.chart.map(el => {
                    this.labelsArray.push(el.date);
                    this.chartArray.push(el.price);
                });
                setTimeout(() => {
                    this.fillData();
                }, 100);
            });
        }
    }
};
</script>
