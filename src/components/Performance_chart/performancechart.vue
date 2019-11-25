<template>
<div>
	<div class="small chart__box">
		<div class="chart__aspect-ratio">
			<Performancebarchart class="chart__graph" :chart-data="datacollection" :options="options"></Performancebarchart>
		</div>
	</div>
  </div>
</template>

<script>
import {
  mapGetters, mapMutations, mapActions, mapState,
} from 'vuex';
import numeral from 'numeral';
import Performancebarchart from './performance_config.js';

export default {
  name: 'doughnutgraph',
  components: {
    Performancebarchart,
  },
  data() {
    return {
      min: '',
      max: '',
      interval: 10,
      datacollection: {},
      loaderGraph: true,
      day: '',
      showError: false,
      buttonoption: [
        {
          name: 'TAB1',
          time: '1D',
          id: 1,
        },
        {
          name: 'TAB2',
          time: '1W',
          id: 2,
        },
        {
          name: 'TAB3',
          time: '1M',
          id: 3,
        },
        {
          name: 'TAB4',
          time: '3M',
          id: 4,
        },
        {
          name: 'TAB5',
          time: '1Y',
          id: 5,
        },
        {
          name: 'TAB6',
          time: '5Y',
          id: 6,
        },
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
           barPercentage: 0.1,
           categoryPercentage: 1.0,
          	gridLines: {
          		display: false,
          		// borderDash: [4, 4],
          		// color: '#4394c7',
          		labelString: 'Date',
          		drawBorder: false
          	},
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
          			display: false,
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
          			callback: (value) =>
          				this.currency == 'USD'
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
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },
          margin: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#2DA5EC',
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
            },
          },
          hover: {
            mode: 'index',
            intersect: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 0,
        aspectRatio: 2,
        legend: {
          display: false,
        },
      },
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
      required: false,
    },
  },
  methods: {

    fillData() {
      this.datacollection = {
        labels: ['jan','feb','march','april','may','june','july','august'],
       datasets: [
          {
            label: 'Stocks2',
            backgroundColor: ['#00C48C', '#E94F37', '#00C48C','#E94F37', '#E46751', '#00D6EF','#61K846', '#A76451'],
            data: [2, 30, 5, -23, 2, 56, -88, 67],
          },
        ],
      };
    },
  },
};
</script>



