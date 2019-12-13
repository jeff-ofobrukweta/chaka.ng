<template>
    <section class="portfolio-table__box">
        <error-block
            type="cancel-order"
            :message="cancelStatus.message"
            :status="cancelStatus.status"
        />
        <table class="portfolio-table" v-if="openOrders">
            <thead class="portfolio-table__thead">
                <th>Name</th>
                <th>Symbol</th>
                <th>Order<br />Type</th>
                <th>Market<br />Type</th>
                <th>Price</th>
                <th>Units Ordered</th>
                <th>Invested<br />Amount</th>
                <th>Action</th>
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
                    <td class="cursor-context capitalize">
                        {{ item.orderSide }}
                    </td>
                    <td class="cursor-context">
                        {{ item.orderType || "-" }}
                    </td>
                    <td
                        class="cursor-context"
                        :title="
                            item.InstrumentDynamic.askPrice | kobo | currency(item.currency, true)
                        "
                    >
                        {{ item.InstrumentDynamic.askPrice | kobo | currency(item.currency) }}
                    </td>
                    <td class="cursor-context" :title="item.quantity">
                        {{ item.quantity | units }}
                    </td>
                    <td
                        class="cursor-context"
                        :title="item.netCost | kobo | currency(item.currency, true)"
                    >
                        {{ item.netCost | kobo | currency(item.currency) }}
                    </td>
                    <td>
                        <action-button
                            type="button"
                            :pending="loading === item.reference"
                            v-if="loading === item.reference"
                            pending-text="Processing"
                            :classes="['btn-block', 'btn__primary--outline']"
                            >Cancel</action-button
                        >
                        <action-button
                            type="button"
                            :pending="false"
                            disabled
                            v-else-if="loading"
                            :classes="['btn-block', 'btn__primary--outline']"
                            >Cancel</action-button
                        >
                        <action-button
                            type="button"
                            @click="cancelOrder(item)"
                            :pending="false"
                            v-else
                            :classes="['btn-block', 'btn__primary--outline']"
                            >Cancel</action-button
                        >
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                No current Stocks availiable at this time
            </tbody>
        </table>
        <table class="portfolio-table" v-else>
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
                    <td class="cursor-context" :title="item.quantity">
                        {{ item.quantity | units }}
                    </td>
                    <!-- <td class="cursor-context" :title="item.unitsOrdered | units(2, true)">
                        {{ item.unitsOrdered | units }}
                    </td> -->
                    <td
                        class="cursor-context"
                        :title="item.currentValue | kobo | currency(item.currency, true)"
                    >
                        {{ item.currentValue | kobo | currency(item.currency) }}
                    </td>
                    <td class="cursor-context" :title="item.percentTotal">
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
                            next-action="buy"
                            >+&nbsp;Buy</KYCButton
                        >
                        <KYCButton
                            ref="sellBtn"
                            :classes="['portfolio-table__buy']"
                            :action="item.currency === 'NGN' ? 'local' : 'global'"
                            @click.native="selectInstrument(item, 'sell')"
                            @step="handleStep"
                            tag="a"
                            next-action="sell"
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
            v-if="showBuy && Object.keys(selectedInstrument).length > 0"
        />
        <sell-modal
            @close="closeSaleModal"
            :currency="selectedInstrument.currency"
            :symbol="selectedInstrument.symbol"
            :instrument="selectedInstrument"
            :max-quantity="maxQuantity"
            v-if="showSell && Object.keys(selectedInstrument).length > 0"
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
import { mapGetters, mapActions } from "vuex";
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
        },
        openOrders: {
            type: Boolean
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
            selectedInstrument: {},
            loading: false,
            maxQuantity: null,
            cancelStatus: {}
        };
    },
    computed: {
        ...mapGetters(["getNextKYC", "getlocalstocksowned", "getglobalstocksowned"])
    },
    methods: {
        ...mapActions(["CANCEL_ORDER"]),
        checkChange(value) {
            if (value >= 0) return true;
            return false;
        },
        checkPositions(symbol, currency) {
            let check = [];
            if (currency === "NGN") {
                check = this.getlocalstocksowned.filter(element => element.symbol === symbol);
            } else {
                check = this.getglobalstocksowned.filter(element => element.symbol === symbol);
            }
            if (check.length > 0) {
                const { quantity } = check[0];
                this.maxQuantity = +quantity;
                return true;
            }
            this.maxQuantity = 0;
            return false;
        },
        selectInstrument(instrument, type) {
            this.type = type;
            this.selectedInstrument = instrument;
            this.checkPositions(instrument.symbol, instrument.currency);
        },
        cancelOrder(item) {
            this.cancelStatus = {};
            this.loading = item.reference;
            const details = {
                orderRef: item.reference,
                reference: {
                    currency: item.currency,
                    symbol: item.symbol
                }
            };
            this.CANCEL_ORDER(details).then(resp => {
                this.loading = false;
                if (resp) {
                    this.cancelStatus.message = "Order cancellation successful";
                    this.cancelStatus.status = "success";
                    this.$toasted.show(`Order cancellation successful`, {
                        type: "success"
                    });
                }
            });
        },
        handleStep(step) {
            // this.step = step.type;
            this.step = step;
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
                if (step.nextAction === "buy") {
                    this.showBuy = true;
                    return true;
                }
                this.showSell = true;
            }
        },
        handleUpdate() {
            this.showKYC = false;
            if (this.step.type !== "kyc") {
                if (this.step.nextAction === "buy") this.$refs.buyBtn.$el.click();
                else this.$refs.sellBtn.$el.click();
            }
        },
        closeSaleModal(e) {
            if (e) {
                this.showSuccess = true;
            }
            this.showBuy = false;
            this.showSell = false;
            this.selectedInstrument = {};
        }
    },
    watch: {
        openOrders(newVal) {
            this.cancelStatus = {};
        }
    }
};
</script>
