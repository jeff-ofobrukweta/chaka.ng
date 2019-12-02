<template>
    <Fragment>
        <div
        v-if="((gethistoryportfolioprice.length > 1) && (gethistoryportfoliodate.length > 1))" 
        class="graphholder">
                <div class="header-container">
                    <div class="left-menue-item">
                        <h3 class="holder">Holdings</h3>
                        <h4 class="sub-holder">text here dummy</h4>
                    </div>
                    <div class="right-menue-item">
                        <section class="btn-sell"><button>Fund</button></section>
                        <section class="cash-networth">{{getAccountSummary.netWorth | currency(getAccountSummary.currency)}}
                            <span class="derived">
                            <span
                            :class="[getPortfolioDerivedPrice < 0 ? 'red' : 'green']" 
                            >{{getPortfolioDerivedPrice}}</span>
                            <span
                            :class="[getPortfolioDerivedChange < 0 ? 'red' : 'green']"
                            >({{getPortfolioDerivedChange}}%)</span>
                            </span></section>
                        <section class="toogle-section">
                            <section class="option-container">
                                <button
                                v-for="(item, index) in currencyOption"
                                :key="index"
                                @click="toogleCurrency(item.currency,item.id)"
                                :title="item.description"
                                :class="[item.id == getPortfolioIntervalposition ? 'btn-one-active' : '','btn-one']"
                                >{{item.symbol}}</button>
                                <button>
                                    <div id="select" class="dropdown">
                                    <select class="drop-down">
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
                </div>
            <Graph 
                :price="gethistoryportfolioprice" 
                :date="gethistoryportfoliodate"/>
        </div>
        <div
        v-else 
        class="graphholder"></div>
    </Fragment>
</template>
<script>
import Graph from './linegraph';
import {Fragment} from 'vue-fragment';
import { mapGetters,mapMutations,mapActions } from 'vuex';

export default {
    name: 'Linechartgraphchild',
    data(){
        return{
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
            activeCurrency:0
        }
    },
    components: {
        Graph,
        Fragment
    },
    computed:{
        ...mapGetters([
        'gethistoryportfolioprice',
        'gethistoryportfoliodate',
        'getPorfolioglobalCurrencyforGraph',
        'getPorfolioglobalTimeforGraph',
        'getAccountSummary',
        'getPortfolioDerivedPrice',
        'getPortfolioIntervalposition',
        'getPortfolioDerivedChange'])
    },
    methods:{
        ...mapMutations([
            'SET_GLOBALSTORE_PORTFOLIOHISTORY_INTERVAL_FOR_GRAPH',
            'SET_PORTFOLIO_POSITIONS_FOR_SELECT',
           'SET_GLOBALSTORE_PORTFOLIOHISTORY_CURRENCY_FOR_GRAPH']),
        ...mapActions(['GET_LINECHART_PORTFOLIO_GRAPH_DATA','GET_ACCOUNT_SUMMARY']),
         async toogleCurrency(currency,id) {
            this.SET_PORTFOLIO_POSITIONS_FOR_SELECT(id)
            this.SET_GLOBALSTORE_PORTFOLIOHISTORY_CURRENCY_FOR_GRAPH(currency)
			await this.GET_ACCOUNT_SUMMARY({currency}).then(() => {
				const defaulttime = {
					interval: this.getPorfolioglobalTimeforGraph,
					currency: this.getPorfolioglobalCurrencyforGraph
                };
                console.log('toggle HHHHHHHHHHHHHHHHHHHHHHH',this.getAccountSummary)
				this.GET_LINECHART_PORTFOLIO_GRAPH_DATA(defaulttime);
			});
        },
        handletimeframe(index) {
            this.SET_GLOBALSTORE_PORTFOLIOHISTORY_INTERVAL_FOR_GRAPH(index)
            const payloadsinglestock = {
                interval:this.getPorfolioglobalTimeforGraph,
                currency: this.getPorfolioglobalCurrencyforGraph
            }
            console.log('>>>>>>>>>handletimeframe>>>>>>>>',index);
             this.GET_LINECHART_PORTFOLIO_GRAPH_DATA(payloadsinglestock).then(()=>{
                console.log('>>>>>>GET_LINECHART_PORTFOLIO_GRAPH_DATA>>>>>>>>>>>>>>',this.getOpenPrice);
            })
        },
        mountedActions(){
            const payload= { interval:this.getPorfolioglobalTimeforGraph, currency: this.getPorfolioglobalCurrencyforGraph }
            this.GET_LINECHART_PORTFOLIO_GRAPH_DATA(payload).then(()=>{
             console.log('beep here >>>>MMMMMMMMMMMMMMMMMMMM>>>>>>',this.getAccountSummary.netWorth,this.getPortfolioDerivedPrice,this.getPortfolioDerivedChange)
            })
        }
    },
    mounted(){
        this.mountedActions();
    },
};
</script>
<style src="../../assets/scss/components/linebase.scss" lang="scss" scoped />
