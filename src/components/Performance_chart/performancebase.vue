<template>
    <div class="container-packet">
        <section class="dashboard__title">
            <h3>Performance</h3>
            <p class="dashboard__title--sub">See your stock performances</p>
        </section>
        <template v-if="loading"
            ><div class="container-packet__placeholder">Loading...</div>
        </template>
        <template v-else-if="isGraphValid === 1"
            >
            <div class="container-packet__placeholder">
                <img src="../../assets/img/gifs/performance.gif" alt="Performace Chart demo">
            </div></template>
        <template v-else-if="isGraphValid === 2"
            >
            <div class="container-packet__placeholder">
                Technical difficulty fetching chart data
            </div>
        </template>
        <template v-else
            >
            <section class="graphholder">
                <Performancegraph
                    :percentage="getPositionBarperformancepercentage"
                    :symbol="getPositionBarperformancesymbol"
                />
            </section>
        </template>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Fragment } from "vue-fragment";
import Performancegraph from "./performancechart";

export default {
    name: "performancebase",
    components: {
        Fragment,
        Performancegraph
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        ...mapGetters(["getPositionBarperformancepercentage", "getPositionBarperformancesymbol"]),
        isGraphValid() {
            if (this.getPositionBarperformancepercentage.length <= 0) {
                return 1;
            }
            const checkForNull = this.getPositionBarperformancepercentage.filter(
                el => el === null || el === undefined
            );
            if (checkForNull.length > 0) {
                return 2;
            }
            return 3;
        }
    },
    methods: {
        // ...mapMutations(['SET_LINE_SINGLESTOCK_CHARTDATA']),
        ...mapActions(["GET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_DATA"])
    },
    async mounted() {
        this.loading = true;
        await this.GET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_DATA();
        this.loading = false;
    }
};
</script>

<style src="../../assets/scss/components/_performancegraph.scss" lang="scss" scoped />
