<template>
<div>
	<div class="small chart__box">
		<div class="chart__aspect-ratio">
			<Analysisbarchart
            :style="graphstyle"
            class="chart__graph" :chart-data="datacollection"
            :options="options"></Analysisbarchart>
		</div>
	</div>
  </div>
</template>

<script>
import {
    mapGetters, mapMutations, mapActions, mapState
} from 'vuex';
import numeral from 'numeral';
import Analysisbarchart from './analysisbarchart_config.js';

export default {
    name: 'VerticalbarchartPerformanceratings',
    components: {
        Analysisbarchart
    },
    data() {
        return {
            min: '',
            max: '',
            graphstyle: {
                width: '100%',
                margin: '0 auto'
            },
            interval: 10,
            datacollection: {},
            loaderGraph: true,
            day: '',
            showError: false,
            buttonoption: [
                {
                    name: 'TAB1',
                    time: '1D',
                    id: 1
                },
                {
                    name: 'TAB2',
                    time: '1W',
                    id: 2
                },
                {
                    name: 'TAB3',
                    time: '1M',
                    id: 3
                },
                {
                    name: 'TAB4',
                    time: '3M',
                    id: 4
                },
                {
                    name: 'TAB5',
                    time: '1Y',
                    id: 5
                },
                {
                    name: 'TAB6',
                    time: '5Y',
                    id: 6
                }
            ],
            activeButton: 2,
            padding: 0,
            width: 20,
            options: {
                scales: {
                    xAxes: [
          	{
                            // 		distribution: 'linear',
                            // 		display: false,
                            // 		ticks: {
                            // 			maxTicksLimit: 8,
                            // 			fontSize: 10
                            // 		},
                            barPercentage: 0.7,
                            // categoryPercentage: 1.0,
          	gridLines: {
          		display: false,
          		// borderDash: [4, 4],
          		// color: '#4394c7',
          		labelString: 'Date',
          		drawBorder: false
          	}
                            // 		// type: 'time',
                            // 		time: {
                            // 			// unit: this.day,
                            // 			// unitStepSize: this.datelength,
                            // 			// min: "2017-01-01",
                            // 			// max: "2017-12-01",
                            // 			displayFormats: {
                            // 				millisecond: 'MMM DD',
                            // 				second: 'MMM DD',
                            // 				minute: 'MMM DD',
                            // 				hour: 'MMM DD',
                            // 				day: 'MMM DD',
                            // 				week: 'MMM DD',
                            // 				month: 'MMM DD',
                            // 				quarter: 'MMM DD',
                            // 				year: 'MMM DD'
                            // 			}
                            // 		}
          	}
                    ],

                    yAxes: [
          	{
          		scaleLabel: {
          			display: false
          			// labelString: 'Price'
          		},
          		position: 'left',
          		ticks: {
          			beginAtZero: false,
          			fontColor: '#8A939A',
          			padding: 0,
          			fontSize: 10,
          			max: this.max,
          			min: this.min,
          			stepSize: this.interval,
          			 callback: value => numeral(value).format('0a')
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
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#293D4A',
                    titleFontSize: 12, // default font-size
                    title(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    },
                    callbacks: {
                        label(tooltipItem, data) {
                            const currency = numeral(data.datasets[0].data[tooltipItem.index]).format('0.00a');
                            return currency;
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
    computed: {

    },

    mounted() {
        this.fillData();
    },

    props: {
        currency: {
            type: String,
            required: false
        },
        values: {
            type: Array,
            required: true
        },
        actions: {
            type: Array,
            required: true
        }
    },
    created() {
        this.fillData();
        this.handlescaling();
    },
    methods: {
        ...mapActions(["GET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_DATA"]),
        ...mapMutations([
            "SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_VALUE",
            "SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_ACTION"
        ]),
        handlescaling() {
            if (this.getOpenPrice) {
                this.min = this.values.sort()[0];
                this.max = this.values.sort()[this.values.sort().length - 1];
                this.interval = Math.ceil((this.max - this.min) / 10);
            }
            return true;
        },
        fillData() {
            this.datacollection = {
                labels: this.actions,
                datasets: [
                    {
                        label: 'Stocks',
                        lineTension: 0.4,
                        fill: true,
                        backgroundColor: ['#22A4EF', '#293D4A', '#B3811C'],
                        borderWidth: 1.7,
                        showLine: true,
                        borderJoinStyle: 'miter',
                        pointBackgroundColor: '#484848',
                        pointBorderWidth: 3,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#2DA5EC',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 1,
                        data: [...this.values]
                    }
                ]
            };
        }
    },
    watch: {
        values(newvalue, oldvalue) {
            this.fillData();
        },
        actions(newaction, oldaction) {
            this.fillData();
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_VALUE([]);
        this.SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_ACTION([]);
        const payload = {symbol: to.params.symbol};
        this.GET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_DATA(payload).then((res)=>{
            if(!res){
                this.SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_ACTION({})
            }
        });
        next();
    },
    beforeRouteLeave(to, from, next) {
        this.values = [];
        this.actions = [];
        next();
    }
};
</script>
