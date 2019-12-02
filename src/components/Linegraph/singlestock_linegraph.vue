<template>
<Fragment>
    <div
    v-if="((getOpenPrice.length > 1) && (getDates.length > 1))"
    class="graphholder">
            <div class="header-container">
                <div class="right-menue-item">
                    <div class="parent-container-main">
                        <section class="btn-sell"><button>Buy</button></section>
                        <section class="toogle-section">
                                <section class="option-container">
                                     <button
                                        v-for="(item, index) in currencyOption"
                                        :key="index"
                                        :title="item.description"
                                        class="btn-one">{{item.symbol}}</button>
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
                                <button
                                v-for="(item,index) in options"
                                :key="index"
                                @click="OntooglePositions(item.id)"
                                :class="[item.id == activeButton ? 'active-btn' : '','option']"
                                class="option">{{item.name}}</button>
                            </section>
                        </section>

                </div>
            </div>
        <Graph
            :price="getOpenPrice"
            :date="getDates"
         />
    </div>
    <div v-else 
        class="graphholder"></div>
    </Fragment>
</template>
<script>
import {Fragment} from 'vue-fragment';
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
             currencyOption:[
                {
                    symbol:"₦",
                    value:'NGN',
                    id:0,
                    description:"convert to Naira value"
                },
                {
                    symbol:"$",
                    value:'USD',
                    id:0,
                    description:"convert to Dollar value"
                }
            ],
            options:[
                {
                    name:'Normal',
                    state:true,
                    id:0
                },
                {
                    name:'Technical',
                    state:false,
                    id:1
                }
            ],
            activeButton:'',
            options:[
                {
                    name:'Normal',
                    state:true,
                    id:0
                },
                {
                    name:'Technical',
                    state:false,
                    id:1
                }
            ]
        }
    },
    components: {
        Graph,
        Fragment
    },
    props:{
        instrument:{
            type:Object,
            required:true
        }
    },
    computed:{
        ...mapGetters(['getOpenPrice','getDates'])
    },
    methods:{
        ...mapMutations(['SET_LINE_SINGLESTOCK_CHARTDATA']),
        ...mapActions(['GET_LINECHART_SINGLESTOCK_GRAPH_DATA']),
        onhandleGraphdata(){
            const payloadsinglestock = {
                interval:'1D',
                symbol:this.instrument.symbol
            }
             console.log('>>>>>>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX>>>>>>>>>>>>>>',this.instrument);
            this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(payloadsinglestock).then(()=>{
                console.log('>>>>>>GET_LINECHART_SINGLESTOCK_GRAPH_DATA>>>>>>>>>>>>>>',this.getOpenPrice);
            })
        },
        OntooglePositions(response){
            this.activeButton = response;
        },
        handletimeframe(index) {
            const payloadsinglestock = {
                interval:index,
                symbol:this.$route.params.symbol
            }
            console.log('>>>>>>>>>handletimeframe>>>>>>>>',index);
             this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(payloadsinglestock).then(()=>{
                console.log('>>>>>>GET_LINECHART_SINGLESTOCK_GRAPH_DATA>>>>>>>>>>>>>>',this.getOpenPrice);
            })
        }
    },
    mounted(){
        console.log('are this getters??????????????',this.instrument,this.getOpenPrice,this.getDates)
        this.onhandleGraphdata();
    }
};
</script>
<style src="../../assets/scss/components/singlelinebase.scss" lang="scss" scoped />
