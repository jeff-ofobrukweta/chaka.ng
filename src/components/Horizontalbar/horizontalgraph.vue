<template>
    <div>
        <div :style="graphstyle" class="small chart__box">
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
import numeral from 'numeral';
import Doughnut from './horizontalbar_config';

export default {
    name: 'doughnutgraph',
    components: {
        Doughnut
    },
    data() {
        return {
            min: '',
            max: '',
            graphstyle: {
                width: '90%',
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
                            gridLines: {
                                display: false,
                                labelString: 'Date',
                                drawBorder: false
                            }
                        }
                    ],

                    yAxes: [
                        {
                            scaleLabel: {
                                display: false
                                // labelString: 'Price'
                            },
                            barPercentage: 0.7,
                            position: 'left',
                            ticks: {
                                beginAtZero: false,
                                fontColor: '#8A939A',
                                padding: 0,
                                fontSize: 10,
                                max: this.max,
                                min: this.min,
                                stepSize: this.interval
                                // callback:{
                                //       label(tooltipItem, data){
                                //         const currency = numeral(data.datasets[0].data[tooltipItem.index]).format("0.00a");
                                //         return currency;
                                //     }
                                //   }
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
                    backgroundColor: '#293D4A',
                    titleFontSize: 12, // default font-size
                    title(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    },
                    callbacks: {
                        label(tooltipItem, data) {
                            return `${data.datasets[0].data[tooltipItem.index]}`;
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

    mounted() {
        this.fillData();
    },
    props: {
        values: {
            type: Array,
            required: true
        },
        actions: {
            type: Array,
            required: true
        }
    },
    methods: {
        fillData() {
            this.datacollection = {
                labels: this.actions,
                datasets: [
                    {
                        label: 'Stocks',
                        fill: true,
                        backgroundColor: ['#57D11F', '#FFBF00', '#D80027'],
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
                        data: this.values
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
    beforeRouteLeave(to, from, next) {
        this.values = [];
        this.actions = [];
        next();
    }
};
</script>
