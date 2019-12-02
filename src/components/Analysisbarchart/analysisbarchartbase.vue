<template>
    <Fragment>
        <div
        v-if="(getActionperformance.length > 1 && getValueperformance.length >1)" 
        class="container-packet">
            <h1 class="title-name">Performance Rating</h1>
            <h1 class="subtitle-name">lorem ipsum here</h1>
            <section class="graphholder">
                <Analysisbarchart
                :actions="getActionperformance" 
                :values="getValueperformance" />
            </section>
        </div>
        <div
        v-else 
        class="container-packet"></div>
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';
import Analysisbarchart from './analysisbarchart';
import { mapGetters,mapMutations,mapActions } from 'vuex';

export default {
    name: 'performancebase',
    components: {
        Fragment,
        Analysisbarchart
    },
    computed:{
        ...mapGetters(['getActionperformance','getValueperformance'])
    },
    methods:{
        // GET_BARCHART_PERFORMANCERATING_GRAPH_DATA
         ...mapActions(['GET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_DATA']),
        mountedActions(){
            const payload ={
                symbol:this.$route.params.symbol
            }
            this.GET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_DATA(payload).then(()=>{
            })
        }
    },
    mounted(){
        this.mountedActions();
    }
};
</script>

<style src="../../assets/scss/components/_analysisbarchart.scss" lang="scss" scoped />
