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
import { mapGetters, mapMutations } from 'vuex';
import numeral from 'numeral';
import LineChart from './linegraph_config';
import EventBus from '../../event-bus';

export default {
    name: 'linechartgraph',
    components: {
        LineChart
    },
    data() {
        return {
            min: '',
            max: '',
            purple_orange_gradient: null,
            graphstyle: {
                width: '100%',
                height: '350px',
                margin: '0px -2em'
            },
            interval: 10,
            datacollection: {},
            options: {
                scales: {
                    xAxes: [
                        {
                            distribution: 'linear',
                            display: true,
                            ticks: {
                                maxTicksLimit: 8,
                                fontSize: 10
                            },
                            gridLines: {
                                display: true,
                                labelString: 'Date',
                                drawBorder: false
                            },
                            time: {
                                displayFormats: {
                                    millisecond: 'MMM DD',
                                    second: 'MMM DD',
                                    minute: 'MMM DD',
                                    hour: 'MMM DD',
                                    day: 'MMM DD',
                                    week: 'MMM DD',
                                    month: 'MMM DD',
                                    quarter: 'MMM DD',
                                    year: 'MMM DD'
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
                            position: 'left',
                            ticks: {
                                beginAtZero: false,
                                fontColor: '#8A939A',
                                padding: 0,
                                fontSize: 10,
                                suggestedMin: this.min,
                                suggestedMax: this.max,
                                max: this.max,
                                min: this.min,
                                // stepSize: 5,
                                callback: value => (this.currency == 'NGN'
                                    ? `N${numeral(value).format('0.00a')}`
                                    : `$${numeral(value).format('0.00a')}`)
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }
                    ]
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutSine'
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
                    mode: 'index',
                    intersect: false,
                    titleFontColor: '#ffffff',
                    bodyFontColor: '#ffffff',
                    titleFontSize: 15,
                    bodyFontSize: '15',
                    backgroundColor: '#293D4A',
                    xPadding: 10,
                    yPadding: 8,
                    displayColors: false,
                    titleFontSize: 12, // default font-size
                    title(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    },
                    callbacks: {
                        label: (tooltipItem, data) => {
                            // const currency = this.getCurrency == 'USD'
                            //     ? `$${numeral(data.datasets[0].data[tooltipItem.index]).format(
                            //         '0.00a'
                            //     )}`
                            //     : `N${numeral(data.datasets[0].data[tooltipItem.index]).format(
                            //         '0.00a'
                            //     )}`;
                            if (this.currency == 'USD') {
                                return `$ ${numeral(data.datasets[0].data[tooltipItem.index]).format('0.00a')}`;
                            }

                            return `N ${numeral(data.datasets[0].data[tooltipItem.index]).format('0.00a')}`;

                            // return `Price: ${currency}`;
                        },
                        afterLabel(tooltipItem, data) {
                            const dataset = data.datasets[0];
                            const percent = dataset.data[tooltipItem.index];
                        }
                    },
                    hover: {
                        mode: 'index',
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
    async mounted() {
        // EventBus.$on('fillData', (data) => {
        this.fillData();
        this.handlescaling();
        // });
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
    computed: {
        getCurrency() {
            return this.currency;
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
            const ctx = document.getElementById('line-chart').getContext('2d');
            this.purple_orange_gradient = ctx.createLinearGradient(3, 0, 0, 270);
            this.purple_orange_gradient.addColorStop(0, '#2DA5ECF2');
            this.purple_orange_gradient.addColorStop(0.35, '#49b0ed99');
            this.purple_orange_gradient.addColorStop(0.47, '#2DA5EC87');
            this.purple_orange_gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = this.purple_orange_gradient;
            ctx.save();

            this.datacollection = {
                labels: this.date,
                datasets: [
                    {
                        label: 'Stocks',
                        lineTension: 0,
                        fill: true,
                        backgroundColor: this.purple_orange_gradient,
                        hoverBackgroundColor: this.purple_orange_gradient,
                        borderColor: '#1178B9',
                        borderWidth: 1.7,
                        showLine: true,
                        borderJoinStyle: 'round',
                        pointBackgroundColor: '#1178B9',
                        pointBorderWidth: 3,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#2DA5EC',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
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
    },
    beforeRouteUpdate(to, from, next) {
        this.price = [];
        this.date = [];
        this.fillData();
        next();
    }
};
</script>
