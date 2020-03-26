<template>
    <Fragment v-if="instrument">
        <div class="stock-table">
            <div class="stock-table__flex">
                <p class="stock-table__head">No. of Shares</p>
                <p
                    class="stock-table__body cursor-context"
                    :title="checkforUndefined(instrument.unitsOwned) || 0.0 | units(2, true)"
                >
                    {{ checkforUndefined(instrument.unitsOwned) || 0.0 | units(2, true) }}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">Value of Shares</p>
                <p
                    class="stock-table__body stock-table__img cursor-context"
                    :title="
                        checkforUndefined(instrument.currentValue) ||
                        0.0 | kobo | currency(instrument.currency, true)"
                >
                    {{ checkforUndefined(instrument.currentValue) || 0.00 | kobo | currency(instrument.currency) }}
                    <img
                        v-if=" instrument.currentValue && instrument.currentValue >= 0"
                        :src="require('../../assets/img/chevron-up.svg')"
                        alt="growth"
                    />
                    <section :title="'No current value'" v-else-if="!instrument.currentValue"></section>
                    <img v-else :src="require('../../assets/img/chevron-down.svg')" alt="growth" />
                </p>
            </div>
            <div class="stock-table__flex stock-table__flex--full">
                <p class="stock-table__head">Net Earnings</p>
                <p
                    class="stock-table__body cursor-context"
                    :title="
                        checkforUndefined(instrument.netEarnings) ||
                            0.0 |kobo| currency(instrument.currency, true)
                    "
                >
                    {{
                        checkforUndefined(instrument.netEarnings) || 0.0 | kobo |currency(instrument.currency)
                    }}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">Market Cap<ToolTip tooltip="Size of a company and how much it is worth on the stock exchange"/></p>
                <p
                    class="stock-table__body cursor-context"
                    v-if="instrument.InstrumentDynamic"
                    :title="
                        instrument.InstrumentDynamic.marketCap ||
                            0.0 | kobo | currency(instrument.currency, true)
                    "
                >
                    {{
                        checkforUndefined(instrument.InstrumentDynamic.marketCap) ||
                            0.0 | kobo | currency(instrument.currency)
                    }}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">P/E Ratio<ToolTip tooltip="The amount you are willing to pay today for a Dollar/Naira of a company's profit.”"/></p>
                <p
                    class="stock-table__body cursor-context"
                    v-if="instrument.InstrumentDynamic"
                    :title="checkforUndefined(instrument.InstrumentDynamic.peRatio) | units(2, true)"
                >
                    {{ checkforUndefined(instrument.InstrumentDynamic.peRatio) || 0.0 | units(2) }}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">Dividend Yield<ToolTip tooltip="Estimated one-year return on the investment in a company based only on its dividend payment"/></p>
                <p
                    class="stock-table__body cursor-context"
                    v-if="instrument.InstrumentDynamic"
                    :title="
                        checkforUndefined(instrument.InstrumentDynamic.dividendYield) | units(2, true)
                    "
                >
                    {{
                        checkforUndefined(instrument.InstrumentDynamic.dividendYield) || 0.0 | units(2)
                    }}%
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">Volume<ToolTip tooltip="number of shares traded on the stock exchange during the day's trading session."/></p>
                <p
                    class="stock-table__body cursor-context"
                    v-if="instrument.InstrumentDynamic"
                    :title="checkforUndefined(instrument.InstrumentDynamic.avgVol30d) | units(2, true)"
                >
                    {{ checkforUndefined(instrument.InstrumentDynamic.avgVol30d) || 0.0 | units(2) }}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">52 Weeks High<ToolTip tooltip="the highest price of the stock in the past year (52 weeks)"/></p>
                <p
                    class="stock-table__body cursor-context"
                    v-if="instrument.InstrumentDynamic"
                    :title="
                        checkforUndefined(instrument.InstrumentDynamic.high52) ||
                            0.0 | kobo | currency(instrument.currency, true)
                    "
                >
                    {{
                        checkforUndefined(instrument.InstrumentDynamic.high52) ||
                            0.0 | kobo | currency(instrument.currency,true)
                    }}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">52 Weeks Low<ToolTip tooltip="the highest price of the stock in the past year (52 weeks)"/></p>
                <p
                    class="stock-table__body cursor-context"
                    v-if="instrument.InstrumentDynamic"
                    :title="
                        checkforUndefined(instrument.InstrumentDynamic.low52) ||
                            0.0 | kobo | currency(instrument.currency, true)
                    "
                >
                    {{
                        checkforUndefined(instrument.InstrumentDynamic.low52) ||
                            0.0 | kobo | currency(instrument.currency,true)
                    }}
                </p>
            </div>
        </div>
    </Fragment>
     <Fragment v-else>
         <div class="stock-table">
            <div class="stock-table__flex">
                <p class="stock-table__head">No. of Shares</p>
                <p
                    class="stock-table__body cursor-context"
                    :title="'0.00'"
                >
                    {{ 0.00 }}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">Value of Shares</p>
                <p
                    class="stock-table__body stock-table__img cursor-context"
                    :title="'0.00'"
                >
                    {{ 0.00 }}
                    <img
                        v-if=" instrument.currentValue && instrument.currentValue >= 0"
                        :src="require('../../assets/img/chevron-up.svg')"
                        alt="growth"
                    />
                    <section :title="'No current value'" v-else-if="!instrument.currentValue"></section>
                    <img v-else :src="require('../../assets/img/chevron-down.svg')" alt="growth" />
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">Net Earnings</p>
                <p
                    class="stock-table__body cursor-context"
                    :title="'0.00'"
                >
                    {{0.00}}
                </p>
            </div>
            <div class="stock-table__flex stock-table__flex--full">
                <p class="stock-table__head">Market Cap<ToolTip tooltip="Size of a company and how much it is worth on the stock exchange"/></p>
                <p
                    class="stock-table__body cursor-context"
                    :title="'0.00'"
                >
                    {{
                        0.00
                    }}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">P/E Ratio<ToolTip tooltip="The amount you are willing to pay today for a Dollar/Naira of a company's profit.”"/></p>
                <p
                    class="stock-table__body cursor-context"
                    :title="'0.00'"
                >
                    {{ 0.00 }}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">Dividend Yield<ToolTip tooltip="Estimated one-year return on the investment in a company based only on its dividend payment"/></p>
                <p
                    class="stock-table__body cursor-context"
                    :title="'0.00'"
                >
                    {{0.00}}%
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">Volume<ToolTip tooltip="number of shares traded on the stock exchange during the day's trading session."/></p>
                <p
                    class="stock-table__body cursor-context"
                   :title="'0.00'"
                >
                    {{0.00}}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">52 Weeks High<ToolTip tooltip="the highest price of the stock in the past year (52 weeks)"/></p>
                <p
                    class="stock-table__body cursor-context"
                    :title="'0.00'"
                >
                    {{
                       0.00
                    }}
                </p>
            </div>
            <div class="stock-table__flex">
                <p class="stock-table__head">52 Weeks Low<ToolTip tooltip="the highest price of the stock in the past year (52 weeks)"/></p>
                <p
                    class="stock-table__body cursor-context"
                    :title="'0.00'"
                >
                    {{
                        0.00
                    }}
                </p>
            </div>
        </div>
     </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';

export default {
    name: 'stock-table',
    components: {
        ToolTip: () => import("../ToolTip"),
        Fragment
    },
    

    props: {
        instrument: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.checkforUndefined();
    },
    methods: {
        checkforUndefined(payload) {
            if (payload === undefined || Number.isNaN(payload) || payload == '' || payload == null) { return '-'; }
            return payload;
        }
    }
};
</script>
