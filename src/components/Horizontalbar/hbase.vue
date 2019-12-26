<template>
    <Fragment>
        <div class="container-packet">
            <h1 class="title-name">Analyst Rating</h1>
            <h1 class="subtitle-name">Views of top investment analysts</h1>
            <section class="graphholder">
                <HorizontalGrapgh :actions="getActionanalysis" :values="getValueanalysis" />
            </section>
        </div>
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import HorizontalGrapgh from './horizontalgraph';

export default {
    name: 'hbase',
    components: {
        Fragment,
        HorizontalGrapgh
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
        mountedActions() {
            const payload = {
                symbol: this.$route.params.symbol
            };
            this.GET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_DATA(payload).then(() => {});
        }
    },
    mounted() {
        this.mountedActions();
    },
    beforeRouteLeave(to, from, next) {
        this.SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_VALUE([]);
        this.SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_ACTION([]);
        next();
    }
};
</script>

<style src="../../assets/scss/components/horizontal.scss" lang="scss" scoped />
