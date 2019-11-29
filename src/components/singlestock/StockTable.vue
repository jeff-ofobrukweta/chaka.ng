<template>
    <div class="stock-table">
        <div class="stock-table__flex">
            <p class="stock-table__head">No. of Shares</p>
            <p class="stock-table__body cursor-context" :title="3242342 | units(4, true)">
                {{ 3.2346542 | units }}
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">Value of Shares</p>
            <p
                class="stock-table__body stock-table__img cursor-context"
                :title="93.12 | currency('USD', true)"
            >
                {{ 93.12 | currency("USD") }}
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
            <p class="stock-table__body cursor-context" :title="1000 | currency('USD', true)">
                {{ 1000 | currency("USD") }}
            </p>
        </div>
        <div class="stock-table__flex stock-table__flex--full">
            <p class="stock-table__head">Market Cap</p>
            <p class="stock-table__body cursor-context" :title="instrument.InstrumentDynamic.marketCap | currency(instrument.currency, true)">
                {{ instrument.InstrumentDynamic.marketCap | currency(instrument.currency) }}
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">P/E Ratio</p>
            <p class="stock-table__body cursor-context" :title="instrument.InstrumentDynamic.peRatio | units(2, true)">
                {{ instrument.InstrumentDynamic.peRatio | units(2) }}
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">Dividend Yield</p>
            <p class="stock-table__body cursor-context" :title="instrument.InstrumentDynamic.dividendYield | units(2, true)">
                {{ instrument.InstrumentDynamic.dividendYield | units(2) }}%
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">Volume</p>
            <p class="stock-table__body cursor-context" :title="instrument.InstrumentDynamic.avgVol30d | units(2, true)">
                {{ instrument.InstrumentDynamic.avgVol30d | units(2) }}
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">52 Weeks High</p>
            <p class="stock-table__body cursor-context" :title="instrument.InstrumentDynamic.high52 | currency(instrument.currency, true)">
                {{ instrument.InstrumentDynamic.high52 | currency("USD") }}
            </p>
        </div>
        <div class="stock-table__flex">
            <p class="stock-table__head">52 Weeks Low</p>
            <p class="stock-table__body cursor-context" :title="instrument.InstrumentDynamic.low52 | currency(instrument.currency, true)">
                {{ instrument.InstrumentDynamic.low52 | currency("USD") }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'stock-table',
    props: {
        instrument: {
            type: Object,
            required: true
        },
        positions:{
            type:Array,
            required:false
        }
    },
    mounted(){
        console.log('the stock itself >>>>>>>>>>>>>>>>',this.instrument);
    }
};
</script>
