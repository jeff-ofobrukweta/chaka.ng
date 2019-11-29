<template>
    <div class="graphholder">
            <div class="header-container">
                <div class="left-menue-item">
                    <h3 class="holder">Holdings</h3>
                    <h4 class="sub-holder">text here dummy</h4>
                </div>
                <div class="right-menue-item">
                    <section class="btn-sell"><button>Buy</button></section>
                    <section class="cash-networth">123,345,567(123.34%)</section>
                    <section class="toogle-section">
                        <section class="option-container">
                            <button class="btn-one">$</button>
                            <button  class="btn-two">₦</button>
                            <button>
                                <div id="select" class="dropdown">
                                <select class="drop-down">
                                    <option class="option">MONTH</option>
                                    <option class="option" value="1Y">1Y</option>
                                    <option class="option" value="1W">1W</option>
                                    <option class="option" value="1M">1M</option>
                                </select>
                                </div>
                            </button>
                        </section>
                    </section>
                </div>
            </div>
        <Graph 
            :price="gethistoryportfolioprice" 
            :date="gethistoryportfoliodate"/>
    </div>
</template>
<script>
import Graph from './linegraph';
import { mapGetters,mapMutations,mapActions } from 'vuex';

export default {
    name: 'Linechartgraphchild',
    components: {
        Graph
    },
    computed:{
        ...mapGetters(['gethistoryportfolioprice','gethistoryportfoliodate'])
    },
    methods:{
        // ...mapMutations(['SET_LINE_SINGLESTOCK_CHARTDATA']),
        ...mapActions(['GET_LINECHART_PORTFOLIO_GRAPH_DATA']),
        mountedActions(){
            this.GET_LINECHART_PORTFOLIO_GRAPH_DATA().then(()=>{
             console.log('beep here >>>>>>>>>>',this.getDateshistoryportfolioprice,this.getDateshistoryportfoliodate)
            })
        },
        onhandleGraphdata(){

            
        }
    },
    mounted(){
        this.mountedActions();
    },
};
</script>
<style src="../../assets/scss/components/linebase.scss" lang="scss" scoped />
