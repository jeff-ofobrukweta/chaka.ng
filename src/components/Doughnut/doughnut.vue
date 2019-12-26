<template>
    <div>
        <div class="small chart__box">
            <div class="chart__aspect-ratio">
                <Doughnut
                    class="chart__graph"
                    :chart-data="datacollection"
                    :options="options"
                ></Doughnut>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import numeral from "numeral";
import Doughnut from "./doughnut_config";

export default {
    name: "doughnutgraph",
    components: {
        Doughnut
    },
    data() {
        return {
            min: "",
            max: "",
            datacollection: {},
            loaderGraph: true,
            day: "",
            showError: false,
            buttonoption: [
                {
                    name: "TAB1",
                    time: "1D",
                    id: 1
                },
                {
                    name: "TAB2",
                    time: "1W",
                    id: 2
                },
                {
                    name: "TAB3",
                    time: "1M",
                    id: 3
                },
                {
                    name: "TAB4",
                    time: "3M",
                    id: 4
                },
                {
                    name: "TAB5",
                    time: "1Y",
                    id: 5
                },
                {
                    name: "TAB6",
                    time: "5Y",
                    id: 6
                }
            ],
            activeButton: 2,
            padding: 0,
            width: 20,
            options: {
                animation: {
                    duration: 0 // general animation time
                },
                hover: {
                    animationDuration: 0 // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0,
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10
                    },
                    margin: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                    backgroundColor: "#293D4A",
                    titleFontSize: 12, // default font-size
                    title(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    },
                    callbacks: {
                        label(tooltipItem, data) {
                            return `${"Percentage(%)"} ${data.datasets[0].data[
                                tooltipItem.index
                            ].toFixed(2)}`;
                        },
                        afterLabel(tooltipItem, data) {
                            const dataset = data.datasets[0];
                            const percent = dataset.data[tooltipItem.index];
                            return this.getcurrency;
                        }
                    },
                    hover: {
                        mode: "index",
                        intersect: false
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                responsiveAnimationDuration: 0,
                aspectRatio: 2,
                legend: {
                    display: true,
                    position: "right",
                    align: "center",
                    fullWidth: true,
                    boxWidth: 100,
                    align: "center",
                    fullWidth: true,
                    labels: {
                        boxWidth: 10,
                        fontSize: 14
                    }
                },
                animation: {
                    animateScale: true
                }
            }
        };
    },
    computed: {},

    mounted() {
        this.fillData();
        this.handlescaling();
    },
    props: {
        percentage: {
            type: Array,
            required: false
        },
        symbol: {
            type: Array,
            required: false
        }
    },
    methods: {
        ...mapActions(['GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA']),
        handlescaling() {
            if (this.getOpenPrice) {
                this.min = this.percentage.sort()[0];
                this.max = this.percentage.sort()[this.percentage.sort().length - 1];
            }
            return true;
        },
        fillData() {
            this.datacollection = {
                labels: this.symbol,
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: ["#FFE29D", "#00C48C", "#0052B4", "#FF647C", "#FFA26B"],
                        data: this.percentage
                    }
                ]
            };
        }
    },
     beforeRouteUpdate (to, from, next) {
        this.GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA();
        next()
    }
};
</script>
