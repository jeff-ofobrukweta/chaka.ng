<template>
    <div v-if="VerticalaseCardloader" class="container-packet">
        <h1 class="title-name">Performance Rating</h1>
        <h1 class="subtitle-name">Key company financial performance</h1>
        <section class="graphholder">
            <Analysisbarchart
                v-if="getValueperformance"
                :actions="getActionperformance"
                :values="getValueperformance"
            />
            <section v-else></section>
        </section>
    </div>
    <div v-else class="container-packet"></div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'performancebase',
    data() {
        return {
            VerticalaseCardloader: false
        };
    },
    components: {
        Analysisbarchart: () => import('./analysisbarchart')
    },
    computed: {
        ...mapGetters(['getActionperformance', 'getValueperformance'])
    },
    methods: {
        // GET_BARCHART_PERFORMANCERATING_GRAPH_DATA
        ...mapActions(['GET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_DATA']),
        ...mapMutations([
            'SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_ACTION',
            'SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_VALUE'
        ]),
        mountedActions(params) {
            const payload = { symbol: params };
            this.GET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_DATA(payload).then((res) => {
                if (!res) {
                    this.SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_VALUE([]);
                    this.SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_ACTION([]);
                    this.VerticalaseCardloader = false;
                } else {
                    this.VerticalaseCardloader = true;
                }
            });
        }
    },
    mounted() {
        this.mountedActions(this.$route.params.symbol);
    },
    beforeRouteUpdate(to, from, next) {
        this.SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_VALUE([]);
        this.SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_ACTION([]);
        this.mountedActions(to.params.symbol);
        next();
    },
    beforeRouteLeave(to, from, next) {
        this.SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_VALUE([]);
        this.SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_ACTION([]);
        next();
    }
};
</script>

<style src="../../assets/scss/components/_analysisbarchart.scss" lang="scss" scoped />
