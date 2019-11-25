import { Doughnut, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;
// the doughnut graph
export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    props: {
        chartData: {
            type: Object,
            default: null,
            required: true
        },
        options: {
            type: Object,
            default: null,
            required: true
        }
    },
    async mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
        this.renderChart(this.chartData, this.options);
    }
};
