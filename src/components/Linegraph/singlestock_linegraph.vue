<template>
<Fragment>
        <div
            v-if="((getOpenPrice.length > 1) && (getDates.length > 1))"
            class="graphholder">
            <div class="header-container">
                <div class="right-menue-item">
                    <div class="parent-container-main">
                        <section class="btn-sell">
                            <button>Buy</button>
                            <button>Sell</button>
                        </section>
                        <section class="toogle-section">
                                <section class="option-container">
                                     <button
                                        v-for="(item, index) in currencyOption"
                                        :key="index"
                                         @click="toogleCurrency(item.currency,item.id)"
                                        :title="item.description"
                                        :class="[item.currency == getSinglestockglobalCurrencyforGraph ? 'btn-one-active' : '','btn-one']"
                                        >{{item.symbol}}</button>
                                    <button>
                                        <div id="select" class="dropdown">
                                        <select
                                            v-model="Interval"
                                            @change="handletimeframe" 
                                            class="drop-down">
                                            <option v-for="(item, index) in buttonoption" 
                                            :key="index" :value="item.time">{{
                                                item.name
                                            }}</option>
                                            <!-- <option
                                             v-for="(item,index) in buttonoption"
                                             :key="index"
                                             @click="handletimeframe(item.time)"
                                            class="option">{{item.name}}</option> -->
                                        </select>
                                        </div>
                                    </button>
                                </section>
                        </section>
                    </div>
                        <section class="btn-parent-container">
                            <section
                            :class="[getSingleinstrument[0].currency == 'USD'?'':'display']"
                            class="btn-container">
                                <button
                                v-for="(item,index) in options"
                                :key="index"
                                @click="OntooglePositions(item.id)"
                                :class="[item.id == activeButton ? 'active-btn' : '','option']"
                               >{{item.name}}</button>
                            </section>
                        </section>

                </div>
            </div>
         <technical-chart
              v-if="tooglegraph"
			 :symbol="getSingleinstrument[0].symbol"
			 :exchangeID="getSingleinstrument[0].exchangeID"
		/>
        <Graph
            v-else
            :class="tooglegraph ? 'display':'nodisplay'"
            :price="getOpenPrice"
            :date="getDates"
            :currency="getSingleinstrument[0].currency"
         />
    </div>
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
                    currency:'NGN',
                    id:0,
                    description:"convert to Naira value"
                },
                {
                    symbol:"$",
                    currency:'USD',
                    id:1,
                    description:"convert to Dollar value"
                }
            ],
            tooglegraph:false,
            Interval:'1D',
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
            ],
            currentId:''
        }
    },
    components: {
        Graph,
        Fragment,
        TechnicalChart: () => import('../Technicalgraph')
    },
    props:{
        instrument:{
            type:Object,
            required:true
        },
         currency: {
            type: String,
            required: false
        },
    },
    computed:{
        ...mapGetters([
            "getOpenPrice",
            "getDates",
            "getSingleinstrument",
            "getSinglestockglobalTimeforGraph",
            "getSinglestockglobalCurrencyforGraph",
            "getSinglestockIntervalposition"
            ])
    },
    methods:{
        ...mapMutations([
            "SET_LINE_SINGLESTOCK_CHARTDATA",
            "SET_GLOBALSTORE_SINGLESTOCKHISTORY_INTERVAL_FOR_GRAPH",
            "SET_GLOBALSTORE_SINGLESTOCKHISTORY_CURRENCY_FOR_GRAPH",
            "SET_SINGLESTOCK_POSITIONS_FOR_SELECT"
            ]),
        ...mapActions(['GET_LINECHART_SINGLESTOCK_GRAPH_DATA']),
        OntooglePositions(response){
            this.activeButton = response;
            this.tooglegraph = !this.tooglegraph;
        },
        mountAction(){
            const payloadsinglestock = {
                interval:this.getSinglestockglobalTimeforGraph,
                currency:this.getSinglestockglobalCurrencyforGraph,
                symbol:this.$route.params.symbol
            }
             this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(payloadsinglestock).then(()=>{
                //  call back state like loader state here
                console.log('this is the single Instrument LLLLLLLLLLLLLL', this.getSingleinstrument[0].currency)
            })
        },
        handletimeframe(e) {
            console.log('>>>>>>>>>handletimeframe>>>>>>>>',this.Interval);
            this.SET_GLOBALSTORE_SINGLESTOCKHISTORY_INTERVAL_FOR_GRAPH(this.Interval);
            const payloadsinglestock = {
                interval:this.getSinglestockglobalTimeforGraph,
                currency:this.getSinglestockglobalCurrencyforGraph,
                symbol:this.$route.params.symbol
            }
             this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(payloadsinglestock).then(()=>{
                console.log('>>>>>>GET_LINECHART_SINGLESTOCK_GRAPH_DATA>>>>>>>>>>>>>>',this.getOpenPrice);
            })
        },
         async toogleCurrency(currency,id) {
             console.log('TOOOOOOOOGLE_CUUUUUUUUURENCY',currency,id)
             this.currentId = id
            this.SET_SINGLESTOCK_POSITIONS_FOR_SELECT(id);
            console.log('CURRENCY TOOGLE SELECT STATE',this.getSinglestockIntervalposition)
            this.SET_GLOBALSTORE_SINGLESTOCKHISTORY_CURRENCY_FOR_GRAPH(currency)
            console.log('toggle HHHHHHHHHHHHHHHHHHHHHHH',this.getSinglestockglobalCurrencyforGraph)
            const defaulttime = {
                interval:this.getSinglestockglobalTimeforGraph,
                currency:this.getSinglestockglobalCurrencyforGraph,
                symbol:this.$route.params.symbol
            }
			this.GET_LINECHART_SINGLESTOCK_GRAPH_DATA(defaulttime).then(()=>{

            });
        },
    },
    mounted(){
        console.log('are this getters??????????????',this.instrument,this.getOpenPrice,this.getDates)
        this.mountAction();
    }
};
</script>
<style src="../../assets/scss/components/singlelinebase.scss" lang="scss" scoped />
