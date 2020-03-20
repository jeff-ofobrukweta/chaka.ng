<template>
    <div v-if="HvaseCardloader" class="container-packet">
        <h1 class="title-name">Analyst Rating</h1>
        <h1 class="subtitle-name">Views of top investment analysts</h1>
        <section class="graphholder">
            <HorizontalGraph :actions="getActionanalysis" :values="getValueanalysis" />
        </section>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'hbase',
    data() {
        return {
            HvaseCardloader: false
        };
    },
    components: {
        HorizontalGraph: () => import('./horizontalgraph')
    },
    computed: {
        ...mapGetters(['getActionanalysis', 'getValueanalysis'])
    },
    methods: {
        ...mapActions(['GET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_DATA']),
        ...mapMutations([
            'SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_VALUE',
            'SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_ACTION'
        ]),
        mountedActions(params) {
            const payload = { symbol: params };
            this.GET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_DATA(payload).then((res) => {
                if (!res) {
                    this.SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_VALUE([]);
                    this.SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_ACTION([]);
                } else {
                    this.HvaseCardloader = true;
                }
            });
        }
    },
    mounted() {
        this.mountedActions(this.$route.params.symbol);
    },
    beforeRouteUpdate(to, from, next) {
        this.SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_VALUE([]);
        this.SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_ACTION([]);
        this.HvaseCardloader = false;
        this.mountedActions(to.params.symbol);
        next();
    },
    beforeRouteLeave(to, from, next) {
        this.SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_VALUE([]);
        this.SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_ACTION([]);
        next();
    }
};
</script>

<style src="../../assets/scss/components/horizontal.scss" lang="scss" scoped />
