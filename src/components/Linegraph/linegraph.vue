<template>
	<div
  class="small chart__box">
		<div
    class="chart__aspect-ratio">
			<line-chart
      :style="graphstyle"
      class="chart__graph"
      :chart-data="datacollection"
      :options="options"></line-chart>
		</div>
	</div>
</template>

<script>
import numeral from 'numeral';
import LineChart from './linegraph_config';

export default {
    name: 'linechartgraph',
    components: {
        LineChart
    },
    data() {
        return {
            min: '',
            max: '',
            graphstyle: {
                width: '100%',
                height: '274px',
                margin: '0px -2em'
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
                            distribution: 'linear',
                            display: true,
                            ticks: {
                                maxTicksLimit: 8,
                                fontSize: 10
                            },
                            gridLines: {
                                display: true,
                                // borderDash: [4, 4],
                                // color: '#4394c7',
                                labelString: 'Date',
                                drawBorder: false
                            },
                            // type: 'time',
                            time: {
                                // unit: this.day,
                                // unitStepSize: this.datelength,
                                // min: "2017-01-01",
                                // max: "2017-12-01",
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
                                max: this.max,
                                min: this.min,
                                stepSize: this.interval,
                                callback: value => (this.currency == 'USD'
                                    ? `$${numeral(value).value()}`
                                    : `N${numeral(value).value()}`)
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }
                    ]
                },
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
                    titleFontColor: '#293D4A',
                    bodyFontColor: '#293D4A',
                    titleFontSize: 15,
                    bodyFontSize: '15',
                    // backgroundColor: '#2DA5EC',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    displayColors: false,
                    titleFontSize: 12, // default font-size
                    title(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    },
                    callbacks: {
                        label(tooltipItem, data) {
                            return `${'Price:' + ''}${data.datasets[0].data[tooltipItem.index]}`;
                        },
                        afterLabel(tooltipItem, data) {
                            const dataset = data.datasets[0];
                            const percent = dataset.data[tooltipItem.index];
                            return this.getcurrency;
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
        }
    },
    methods: {
        fillData() {
            this.datacollection = {
                labels: [
                    'jan',
                    'feb',
                    'march',
                    'april',
                    'jan',
                    'feb',
                    'march',
                    'april',
                    'may',
                    'june',
                    'july',
                    'august',
                    'sept',
                    'oct',
                    'nov',
                    'dec'
                ],
                datasets: [
                    {
                        label: 'Stocks',
                        lineTension: 0.4,
                        fill: true,
                        backgroundColor: '#d4eaf8cf',
                        borderColor: '#2da5ec',
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
                        data: [
                            12,
                            23,
                            34,
                            44,
                            12,
                            23,
                            34,
                            44,
                            56,
                            66,
                            78,
                            89,
                            45,
                            5,
                            45,
                            1,
                            23,
                            78,
                            89,
                            45,
                            5,
                            45,
                            1
                        ]
                    }
                ]
            };
        }
    }
};
</script>
