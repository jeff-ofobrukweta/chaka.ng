<template>
    <Fragment>
        <div
        v-if="(getPositionBarperformancepercentage.length > 1 && getPositionBarperformancesymbol.length > 1)" 
        class="container-packet">
            <h1 class="title-name">Performance</h1>
            <h1 class="subtitle-name">lorem ipsum here</h1>
            <section class="graphholder">
                <Performancegraph
                    :percentage="getPositionBarperformancepercentage"
                    :symbol="getPositionBarperformancesymbol"
                 />
            </section>
        </div>
    </Fragment>
</template>
<script>
import { mapGetters,mapMutations,mapActions } from 'vuex';
import { Fragment } from 'vue-fragment';
import Performancegraph from './performancechart';

export default {
    name: 'performancebase',
    components: {
        Fragment,
        Performancegraph
    },
    computed:{
        ...mapGetters(['getPositionBarperformancepercentage','getPositionBarperformancesymbol'])
    },
    methods:{
        // ...mapMutations(['SET_LINE_SINGLESTOCK_CHARTDATA']),
        ...mapActions(['GET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_DATA']),
            mountedActions(){
                const chakacredentials ={chakaID:1012567810};
                this.GET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_DATA().then(()=>{
                  //  console.log('>>>>>>SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_PERCENTAGE>>>>>>>>>>>>>>',this.getPositionBarperformancepercentage,this.getPositionBarperformancesymbol);
                })
            }
        },
    mounted(){
        this.mountedActions();
    }
};
</script>

<style src="../../assets/scss/components/_performancegraph.scss" lang="scss" scoped />
