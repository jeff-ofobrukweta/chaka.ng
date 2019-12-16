<template>
    <Fragment>
        <div class="container-packet">
            <h1 class="title-name">Analyst Ratings</h1>
            <h1 class="subtitle-name">lorem ipsum here</h1>
        <section class="graphholder">
            <HorizontalGrapgh
             :actions="getActionanalysis"
            :values="getValueanalysis" />
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
        mountedActions() {
            const payload = {
                symbol: this.$route.params.symbol
            };
            this.GET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_DATA(payload).then(() => {
            });
        }
    },
    mounted() {
        this.mountedActions();
    }
};
</script>

<style src="../../assets/scss/components/horizontal.scss" lang="scss" scoped />
