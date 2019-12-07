<template>
    <div class="small chart__box">
        <div class="chart__aspect-ratio">
            <line-chart
                :style="graphstyle"
                class="chart__graph"
                :chart-data="datacollection"
                :options="options"
            ></line-chart>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import numeral from "numeral";
import LineChart from "./linegraph_config";

export default {
    name: "linechartgraph",
    components: {
        LineChart
    },
    data() {
        return {
            min: "",
            max: "",
            gradient: null,
            graphstyle: {
                width: "100%",
                height: "350px",
                margin: "0px -2em"
            },
            interval: 10,
            datacollection: {},
            options: {
                scales: {
                    xAxes: [
                        {
                            distribution: "linear",
                            display: true,
                            ticks: {
                                maxTicksLimit: 8,
                                fontSize: 10
                            },
                            gridLines: {
                                display: true,
                                labelString: "Date",
                                drawBorder: false
                            },
                            time: {
                                displayFormats: {
                                    millisecond: "MMM DD",
                                    second: "MMM DD",
                                    minute: "MMM DD",
                                    hour: "MMM DD",
                                    day: "MMM DD",
                                    week: "MMM DD",
                                    month: "MMM DD",
                                    quarter: "MMM DD",
                                    year: "MMM DD"
                                }
                            }
                        }
                    ],

                    yAxes: [
                        {
                            scaleLabel: {
                                display: true
                                // labelString: 'Price'
                            },
                            position: "left",
                            ticks: {
                                beginAtZero: false,
                                fontColor: "#8A939A",
                                padding: 0,
                                fontSize: 10,
                                max: this.max,
                                min: this.min,
                                stepSize: this.interval,
                                callback: value =>
                                    this.currency == "USD"
                                        ? `$${numeral(value).value()}`
                                        : `N${numeral(value).value()}`
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }
                    ]
                },
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
                    titleFontColor: "#293D4A",
                    bodyFontColor: "#293D4A",
                    titleFontSize: 15,
                    bodyFontSize: "15",
                    // backgroundColor: '#2DA5EC',
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    displayColors: false,
                    titleFontSize: 12, // default font-size
                    title(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    },
                    callbacks: {
                        label(tooltipItem, data) {
                            return `${"Price:" + ""}${data.datasets[0].data[tooltipItem.index]}`;
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
                    display: false
                }
            }
        };
    },
    mounted() {
        this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
        this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
        this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
        this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        
        this.fillData();
        this.handlescaling();
    },

    props: {
        currency: {
            type: String,
            required: false
        },
        price: {
            type: Array,
            required: false
        },
        date: {
            type: Array,
            required: false
        }
    },
    methods: {
        handlescaling() {
            if (this.getOpenPrice) {
                this.min = this.price.sort()[0];
                this.max = this.price.sort()[this.price.sort().length - 1];
                this.interval = Math.ceil((this.max - this.min) / 10);
            }
            return true;
        },
        fillData() {
            this.datacollection = {
                labels: this.date,
                datasets: [
                    {
                        label: "Stocks",
                        lineTension: 0.5,
                        fill: true,
                        backgroundColor: "#d4eaf8cf",
                        borderColor: "#2da5ec",
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
                        data: this.price
                    }
                ]
            };
        }
    },
    watch: {
        price(newvalue, oldvalue) {
            const checkNaN = newvalue.filter(element => Number.isNaN(+element));
            if (!checkNaN || (checkNaN.length <= 0 && this.date[0] !== null)) {
                this.fillData();
                return true;
            }
            return false;
        }
        // date(newvalue, oldvalue) {
        //     const checkNaN = newvalue.filter(element => {
        //         const date = new Date(element);
        //         if (Number.isNaN(date.getDate())) return element;
        //     });
        //     if (!checkNaN || checkNaN.length <= 0) this.fillData();
        //     console.log("From date ", checkNaN, newvalue);
        // }
    }
};
</script>
