<template>
    <div class="graphholder">
            <div class="header-container">
                <div class="right-menue-item">
                    <div class="parent-container-main">
                        <section class="btn-sell"><button>Buy</button></section>
                        <section class="toogle-section">
                                <section class="option-container">
                                    <button class="btn-one">$</button>
                                    <button  class="btn-two">₦</button>
                                    <button>
                                        <div id="select" class="dropdown">
                                        <select
                                        class="drop-down">
                                            <option
                                             v-for="(item,index) in buttonoption"
                                             :key="index"
                                             @click="handletimeframe(item.time)"
                                            class="option">{{item.name}}</option>
                                        </select>
                                        </div>
                                    </button>
                                </section>
                        </section>
                    </div>
                        <section class="btn-parent-container">
                            <section class="btn-container">
                                <button class="option">
                                    Normal
                                </button>
                                <button class="option">Technical</button>
                            </section>
                        </section>

                </div>
            </div>
        <Graph
        :price="getOpenPrice"
        :date="getDates"
         />
    </div>
</template>
<script>
import Graph from './linegraph';
import { mapGetters,mapMutations,mapActions } from 'vuex';

export default {
    name: 'Linechartgraphchild',
    data(){
        return{
             buttonoption: [
                {
                    name: '1 DAY',
                    time: '1D',
                    id: 1
                },
                {
                    name: '1 WEEK',
                    time: '1W',
                    id: 2
                },
                {
                    name: '1 MONTH',
                    time: '1M',
                    id: 3
                },
                {
                    name: '3 MONTHS',
                    time: '3M',
                    id: 4
                },
                {
                    name: '1 YEAR',
                    time: '1Y',
                    id: 5
                },
                {
                    name: '5 YEARS',
                    time: '5Y',
                    id: 6
                }
            ],
        }
    },
    components: {
        Graph
    },
    computed:{
        ...mapGetters(['getOpenPrice','getDates'])
    },
    methods:{
        ...mapMutations(['SET_LINE_SINGLESTOCK_CHARTDATA']),
        ...mapActions(['GET_LINECHART_SINGLESTOCK_GRAPH_DATA']),
        onhandleGraphdata(){
            const payloadsinglestock = {
                interval:'1W',
                symbol:'ACCESS'
            }
            this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(payloadsinglestock).then(()=>{
                console.log('>>>>>>GET_LINECHART_SINGLESTOCK_GRAPH_DATA>>>>>>>>>>>>>>',this.getOpenPrice);
            })
        },
        handletimeframe(index) {
            const payloadsinglestock = {
                interval:index,
                symbol:'ACCESS'
            }
            console.log('>>>>>>>>>handletimeframe>>>>>>>>',index);
             this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(payloadsinglestock).then(()=>{
                console.log('>>>>>>GET_LINECHART_SINGLESTOCK_GRAPH_DATA>>>>>>>>>>>>>>',this.getOpenPrice);
            })
        }
    },
    mounted(){
        console.log('are this getters??????????????',this.getOpenPrice,this.getDates)
        this.onhandleGraphdata();
    }
};
</script>
<style src="../../assets/scss/components/singlelinebase.scss" lang="scss" scoped />
