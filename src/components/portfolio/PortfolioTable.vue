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
                <th>Current<br />stock<br />price</th>
                <th>Units Ordered</th>
                <th>Investment<br />Value</th>
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
                        {{ item.orderSide || "-" }}
                    </td>
                    <td class="cursor-context">
                        {{ item.marketType || "-" }}
                    </td>
                    <td
                        class="cursor-context"
                        :title="item.netCost | kobo | currency(item.currency, true)"
                    >
                        {{ item.netCost | kobo | currency(item.currency) }}
                    </td>
                    <td class="cursor-context" :title="item.quantity">
                        {{ item.quantity | units(4) }}
                    </td>
                    <td
                        class="cursor-context"
                        :title="item.currentValue | kobo | currency(item.currency, true)"
                    >
                        {{ item.currentValue | kobo | currency(item.currency) }}
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
                <th>Current<br />stock<br />price</th>
                <th>Units Owned</th>
                <!-- <th>Units<br />Ordered</th> -->
                 <th>Investment<br />Value</th>
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
                        :title="item.netCost | kobo | currency(item.currency, true)"
                    >
                        {{ item.netCost | kobo | currency(item.currency) }}
                    </td>
                    <td class="cursor-context" :title="item.quantity">
                        {{ item.quantity | units(4) }}
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
                        <kyc-button
                            ref="buyBtn"
                            :classes="['portfolio-table__buy']"
                            :action="item.currency === 'NGN' ? 'local' : 'global'"
                            @step="handleStep"
                            @click.native="selectInstrument(item, 'buy')"
                            tag="a"
                            next-action="buy"
                            >+&nbsp;Buy</kyc-button
                        >
                        <kyc-button
                            ref="sellBtn"
                            :classes="['portfolio-table__buy']"
                            :action="item.currency === 'NGN' ? 'local' : 'global'"
                            @click.native="selectInstrument(item, 'sell')"
                            @step="handleStep"
                            tag="a"
                            next-action="sell"
                            >-&nbsp;Sell</kyc-button
                        >
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                No current Stocks availiable at this time
            </tbody>
        </table>

        <modal-kyc @updated="handleUpdate" @close="showKYC = false" v-if="showKYC" />
    </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'portfolio-table',
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
            type: null,
            selectedInstrument: {},
            loading: false,
            maxQuantity: null,
            cancelStatus: {}
        };
    },
    computed: {
        ...mapGetters(['getNextKYC', 'getlocalstocksowned', 'getglobalstocksowned', 'getErrorLog'])
    },
    methods: {
        ...mapActions(['CANCEL_ORDER']),
        ...mapMutations(['SET_BUY_MODAL', 'SET_SELL_MODAL']),
        checkChange(value) {
            if (value >= 0) return true;
            return false;
        },
        checkPositions() {
            let check = [];
            if (this.selectedInstrument.currency === 'NGN') {
                check = this.getlocalstocksowned.filter(
                    element => element.symbol === this.selectedInstrument.symbol
                );
            } else {
                check = this.getglobalstocksowned.filter(
                    element => element.symbol === this.selectedInstrument.symbol
                );
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
            this.checkPositions();
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
            this.CANCEL_ORDER(details).then((resp) => {
                this.loading = false;
                if (resp) {
                    this.cancelStatus.message = 'Order cancellation successful';
                    this.cancelStatus.status = 'success';
                    this.$toasted.show('Order cancellation successful', {
                        type: 'success'
                    });
                } else {
                    this.$toasted.show(this.getErrorLog.message, {
                        type: 'error'
                    });
                }
            });
        },
        handleStep(step) {
            this.step = step;
            if (step.kyc) {
                this.showKYC = true;
                return true;
            }
            this.showSale();
        },
        handleUpdate(value) {
            if (value) {
                this.showSale();
            }
        },
        showSale() {
            this.showKYC = false;
            if (this.step.nextAction === 'buy') {
                setTimeout(() => {
                    this.SET_BUY_MODAL({
                        instrument: this.selectedInstrument,
                        stockPage: false,
                        currency: this.selectedInstrument.currency,
                        show: true
                    });
                }, 50);
                return true;
            }
            this.checkPositions();
            setTimeout(() => {
                this.SET_SELL_MODAL({
                    instrument: this.selectedInstrument,
                    currency: this.selectedInstrument.currency,
                    stockPage: false,
                    show: true,
                    maxQuantity: this.maxQuantity
                });
            }, 50);
        }
    },
    watch: {
        openOrders(newVal) {
            this.cancelStatus = {};
        }
    }
};
</script>
