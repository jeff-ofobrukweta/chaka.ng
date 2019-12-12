<template>
    <div class="stock-table">
        <div class="stock-table__flex">
            <p class="stock-table__head">No. of Shares</p>
            <p class="stock-table__body cursor-context" 
            :title="checkforUndefined(getPositionsforcurrentstock.quantity)|| 0.00 | units(4, true)">
                {{checkforUndefined(getPositionsforcurrentstock.quantity) || 0.00 | units }}
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">Value of Shares</p>
            <p
                class="stock-table__body stock-table__img cursor-context"
                :title="checkforUndefined(getPositionsforcurrentstock.currentValue) || 0.00 | kobo | currency('USD', true)"
            >
                {{ checkforUndefined(getPositionsforcurrentstock.currentValue) || 0.00 | kobo | currency("USD") }}
                <img
                    v-if="instrument.shareValue >= 0"
                    :src="require('../../assets/img/chevron-up.svg')"
                    alt="growth"
                />
                <img v-else :src="require('../../assets/img/chevron-down.svg')" alt="growth" />
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">Net Earnings</p>
            <p class="stock-table__body cursor-context" 
            :title="checkforUndefined(getPositionsforcurrentstock.netEarnings) || 0.00 | currency('USD', true)">
                {{ checkforUndefined(getPositionsforcurrentstock.netEarnings) || 0.00 | currency("USD") }}
            </p>
        </div>
        <div class="stock-table__flex stock-table__flex--full">
            <p class="stock-table__head">Market Cap</p>
            <p class="stock-table__body cursor-context" 
            :title="checkforUndefined(instrument.InstrumentDynamic.marketCap) || 0.00 | currency(instrument.currency, true)">
                {{ checkforUndefined(instrument.InstrumentDynamic.marketCap) || 0.00 | currency(instrument.currency) }}
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">P/E Ratio</p>
            <p class="stock-table__body cursor-context" 
            :title="checkforUndefined(instrument.InstrumentDynamic.peRatio) | units(2, true)">
                {{ checkforUndefined(instrument.InstrumentDynamic.peRatio) || 0.00 | units(2) }}
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">Dividend Yield</p>
            <p class="stock-table__body cursor-context" 
            :title="checkforUndefined(instrument.InstrumentDynamic.dividendYield) | units(2, true)">
                {{ checkforUndefined(instrument.InstrumentDynamic.dividendYield) || 0.00 | units(2) }}%
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">Volume</p>
            <p class="stock-table__body cursor-context" 
            :title="checkforUndefined(instrument.InstrumentDynamic.avgVol30d) | units(2, true)">
                {{ checkforUndefined(instrument.InstrumentDynamic.avgVol30d) || 0.00 | units(2) }}
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">52 Weeks High</p>
            <p class="stock-table__body cursor-context" 
            :title="checkforUndefined(instrument.InstrumentDynamic.high52) | currency(instrument.currency, true)">
                {{ checkforUndefined(instrument.InstrumentDynamic.high52) || 0.00 | currency("USD") }}
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">52 Weeks Low</p>
            <p class="stock-table__body cursor-context" 
            :title="checkforUndefined(instrument.InstrumentDynamic.low52) || 0.00 | currency(instrument.currency, true)">
                {{ checkforUndefined(instrument.InstrumentDynamic.low52) || 0.00 | currency("USD") }}
            </p>
        </div>
    </div>
</template>

<script>
import myMixin from '../../services/mixins/prices'
export default {
    name: 'stock-table',
    mixins: [myMixin],
    props: {
        instrument: {
            type: Object,
            required: true
        },
        getPositionsforcurrentstock:{
            type:Array,
            required:false
        }
    },
    mounted(){
        this.checkforUndefined()
    },
    methods:{
        checkforUndefined(payload){
            if(payload === undefined){ return 'Nil';}
            else{
                return payload;
            }
        }
    }
};
</script>
