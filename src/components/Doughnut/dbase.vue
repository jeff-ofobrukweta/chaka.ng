<template>
    <Fragment>
        <div class="container-packet">
            <h1 class="title-name">Positions</h1>
             <h1 class="subtitle-name">lorem ipsum here</h1>
            <section class="graphholder">
                <DoughnutGrapgh 
                :percentage="getDoughnutWeightpercentage" 
                :symbol="getDoughnutWeightsymbol" />
            </section>
        </div>
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';
import { mapGetters,mapMutations,mapActions } from 'vuex';
import DoughnutGrapgh from './doughnut';

export default {
    name: 'dbase',
    components: {
        Fragment,
        DoughnutGrapgh
    },
    computed:{
        ...mapGetters(['getDoughnutWeightsymbol','getDoughnutWeightpercentage'])
    },
    methods:{
        // ...mapMutations(['','']),
        ...mapActions(['GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA']),
        mountedActions(){
            this.GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA().then(()=>{

            })
        }
    },
    mounted(){
        this.mountedActions();
    }
};
</script>

<style src="../../assets/scss/components/doughnut.scss" lang="scss" scoped />
