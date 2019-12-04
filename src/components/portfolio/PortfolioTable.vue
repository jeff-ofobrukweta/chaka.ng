<template>
    <section class="portfolio-table__box">
        <table class="portfolio-table">
            <thead class="portfolio-table__thead">
                <th>Name</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Units Owned</th>
                <!-- <th>Units<br />Ordered</th> -->
                <th>Invested<br />Amount</th>
                <th>
                    Invested<br />
                    Percentage
                </th>
                <th>P/L</th>
                <th>+/-</th>
            </thead>
            <tbody v-if="storedata.length >= 1" class="portfolio-table__tbody">
                <tr v-for="(item, index) in storedata" :key="index">
                    <router-link
                        class="capitalize pointer"
                        tag="td"
                        :to="{ name: 'singlestock', params: { symbol: item.symbol } }"
                        >{{ item.name }}</router-link
                    >
                    <router-link
                        class="uppercase pointer"
                        tag="td"
                        :to="{ name: 'singlestock', params: { symbol: item.symbol } }"
                        >{{ item.symbol }}</router-link
                    >
                    <td
                        class="cursor-context"
                        :title="
                            item.InstrumentDynamic.askPrice | kobo | currency(item.currency, true)
                        "
                    >
                        {{ item.InstrumentDynamic.askPrice | kobo | currency(item.currency) }}
                    </td>
                    <td class="cursor-context" :title="item.quantity | units(2, true)">
                        {{ item.quantity | units }}
                    </td>
                    <!-- <td class="cursor-context" :title="item.unitsOrdered | units(2, true)">
                        {{ item.unitsOrdered | units }}
                    </td> -->
                    <td
                        class="cursor-context"
                        :title="item.currentValue | currency(item.currency, true)"
                    >
                        {{ item.currentValue | currency(item.currency) }}
                    </td>
                    <td class="cursor-context" :title="item.percentTotal | units(2, true)">
                        {{ item.percentTotal | units(2) }}%
                    </td>
                    <td :class="[checkChange(item.netEarnings) ? 'green' : 'red']">
                        <img
                            src="../../assets/img/green-arrow.svg"
                            v-if="checkChange(item.netEarnings)"
                            alt="Gain"
                        />
                        <img src="../../assets/img/red-arrow.svg" v-else alt="Loss" />
                        <small
                            >{{ checkChange(item.netEarningsPercentage) ? "+" : ""
                            }}{{ item.netEarnings | kobo | units(2) }} ({{
                                item.netEarningsPercentage | units(2)
                            }}%)</small
                        >
                    </td>
                    <td>
                        <KYCButton
                            ref="buyBtn"
                            :classes="['portfolio-table__buy']"
                            :action="item.currency === 'NGN' ? 'local' : 'global'"
                            @step="handleStep"
                            @click.native="selectInstrument(item, 'buy')"
                            tag="a"
                            >+&nbsp;Buy</KYCButton
                        >
                        <KYCButton
                            ref="sellBtn"
                            :classes="['portfolio-table__buy']"
                            :action="item.currency === 'NGN' ? 'local' : 'global'"
                            @click.native="selectInstrument(item, 'sell')"
                            @step="handleStep"
                            tag="a"
                            >-&nbsp;Sell</KYCButton
                        >
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                No current Stocks availiable at this time
            </tbody>
        </table>
        <buy-modal
            @close="closeSaleModal"
            :currency="selectedInstrument.currency"
            :symbol="selectedInstrument.symbol"
            :instrument="selectedInstrument"
            v-if="showBuy"
        />
        <sell-modal
            @close="closeSaleModal"
            :currency="selectedInstrument.currency"
            :symbol="selectedInstrument.symbol"
            :instrument="selectedInstrument"
            v-if="showSell"
        />
        <sale-success @close="showSuccess = false" v-if="showSuccess" />

        <modal @close="showKYC = false" v-if="showKYC">
            <template slot="header">{{ selectedField.title }}</template>
            <ModalKYC :requiredFields="selectedField.fields" @updated="handleUpdate" />
        </modal>
    </section>
</template>

<script>
import KYCButton from "../form/KYCButton";
import ModalKYC from "../kyc/ModalKYC";
import KYCTitles from "../../services/kyc/kycTitles";
import { mapGetters } from "vuex";
export default {
    name: "portfolio-table",
    components: {
        KYCButton,
        ModalKYC
    },
    props: {
        storedata: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            showBuy: false,
            showSell: false,
            showSuccess: false,
            step: null,
            showKYC: false,
            selectedField: {},
            type: null,
            allNextKYC: KYCTitles.titles,
            selectedInstrument: {}
        };
    },
    computed: {
        ...mapGetters(["getNextKYC"])
    },
    mounted() {},
    methods: {
        checkChange(value) {
            if (value >= 0) return true;
            return false;
        },
        selectInstrument(instrument, type) {
            this.selectedInstrument = instrument;
            this.type = type;
        },
        checkPassive() {
            console.log("check passive");
        },
        handleStep(step) {
            this.step = step.type;
            if (step.kyc) {
                this.showKYC = true;
                this.allNextKYC.forEach(element => {
                    element.fields.forEach(el => {
                        if (el === this.getNextKYC.nextKYC[0]) {
                            this.selectedField = element;
                            this.selectedField.fields = this.getNextKYC.nextKYC;
                        }
                    });
                });
                return true;
            } else {
                if (this.type === "buy") {
                    this.showBuy = true;
                    return true;
                }
                this.showSell = true;
            }
        },
        handleUpdate() {
            this.showKYC = false;
            if (this.step !== "kyc") {
                if (this.type === "buy") this.$refs.buyBtn.$el.click();
                else this.$refs.sellBtn.$el.click();
            }
        },
        closeSaleModal(e) {
            if (e) {
                this.showSuccess = true;
            }
            this.showBuy = false;
            this.showSell = false;
        }
    }
};
</script>
