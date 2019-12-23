<template>
    <Fragment>
        <div
            v-if="getActionperformance.length > 1 && getValueperformance.length > 1"
            class="container-packet"
        >
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
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Analysisbarchart from './analysisbarchart';

export default {
    name: 'performancebase',
    components: {
        Fragment,
        Analysisbarchart
    },
    computed: {
        ...mapGetters(['getActionperformance', 'getValueperformance'])
    },
    methods: {
        // GET_BARCHART_PERFORMANCERATING_GRAPH_DATA
        ...mapActions(['GET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_DATA']),
        mountedActions() {
            const payload = {
                symbol: this.$route.params.symbol
            };
            this.GET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_DATA(payload).then(() => {});
        }
    },
    mounted() {
        this.mountedActions();
    }
};
</script>

<style src="../../assets/scss/components/_analysisbarchart.scss" lang="scss" scoped />
