<template>
    <section class="portfolio-table__box">
        <table class="portfolio-table">
            <thead class="portfolio-table__thead">
                <th>Name</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Units Owned</th>
                <th>Units<br />Ordered</th>
                <th>Invested<br />Amount</th>
                <th>
                    Invested<br />
                    Percentage
                </th>
                <th>P/L</th>
                <th>+/-</th>
            </thead>
            <tbody class="portfolio-table__tbody">
                <tr v-for="(item, index) in data" :key="index">
                    <td class="capitalize">{{ item.name }}</td>
                    <td class="uppercase">{{ item.symbol }}</td>
                    <td class="cursor-context" :title="item.price | currency(item.currency, true)">
                        {{ item.price | currency(item.currency) }}
                    </td>
                    <td class="cursor-context" :title="item.unitsOwned | units(2, true)">
                        {{ item.unitsOwned | units }}
                    </td>
                    <td class="cursor-context" :title="item.unitsOrdered | units(2, true)">
                        {{ item.unitsOrdered | units }}
                    </td>
                    <td
                        class="cursor-context"
                        :title="item.investedAmount | currency(item.currency, true)"
                    >
                        {{ item.investedAmount | currency(item.currency) }}
                    </td>
                    <td class="cursor-context" :title="item.investedPercentage | units(2, true)">
                        {{ item.investedPercentage | units(2) }}%
                    </td>
                    <td :class="[checkChange(item.change) ? 'green' : 'red']">
                        <img
                            src="../../assets/img/green-arrow.svg"
                            v-if="checkChange(item.change)"
                            alt="Gain"
                        />
                        <img src="../../assets/img/red-arrow.svg" v-else alt="Loss" />
                        <small
                            >{{ checkChange(item.change) ? "+" : ""
                            }}{{ item.change | units(2) }} ({{ item.percent | units(2) }}%)</small
                        >
                    </td>
                    <td>
                        <KYCButton
                            ref="buyBtn"
                            :classes="['portfolio-table__buy']"
                            :action="item.currency === 'NGN' ? 'local' : 'global'"
                            @step="handleStep"
                            @click="type = 'buy'"
                            tag="a"
                            >+&nbsp;Buy</KYCButton
                        >
                        <KYCButton
                            ref="sellBtn"
                            :classes="['portfolio-table__buy']"
                            :action="item.currency === 'NGN' ? 'local' : 'global'"
                            @step="handleStep"
                            @click="type = 'sell'"
                            tag="a"
                            >-&nbsp;Sell</KYCButton
                        >
                    </td>
                    <buy-modal
                        @close="closeBuyModal"
                        :currency="item.currency"
                        :symbol="item.symbol"
                        :instrument="item"
                        v-if="showBuy"
                    />
                    <sell-modal
                        @close="showSell = false"
                        :currency="item.currency"
                        :symbol="item.symbol"
                        :instrument="item"
                        v-if="showSell"
                    />
        <sale-success @close="showSuccess = false" v-if="showSuccess" />
                </tr>
            </tbody>
        </table>

        <modal @close="showKYC = false" v-if="showKYC">
            <template slot="header">{{ selectedField.title }}</template>
            <form @submit.prevent="submitPhone">
                <div>
                    <ModalKYC :requiredFields="selectedField.fields" @updated="handleUpdate" />
                </div>
            </form>
        </modal>
    </section>
</template>

<script>
import KYCButton from "../form/KYCButton";
import ModalKYC from "../kyc/ModalKYC";
import KYCTitles from '../../services/kyc/kycTitles'
import { mapGetters } from "vuex";
export default {
    name: "portfolio-table",
    components: {
        KYCButton,
        ModalKYC
    },
    props: {
        data: {
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
            allNextKYC: KYCTitles.titles
        };
    },
    computed: {
        ...mapGetters(["getNextKYC"])
    },
    methods: {
        checkChange(value) {
            if (value >= 0) return true;
            return false;
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
                if (this.type === "buy") this.showBuy = true;
                else this.showSell = true;
            }
        },
        handleUpdate() {
            this.showKYC = false;
            if (this.step !== "kyc") {
                if (this.type === "buy") this.$refs.buyBtn.$el.click();
                else this.$refs.sellBtn.$el.click();
            }
        },
        closeBuyModal(e) {
            if (e) {
                this.showSuccess = true;
            }
            this.showBuy = false;
        }
    }
};
</script>
