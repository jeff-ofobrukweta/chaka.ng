<template>
    <section class="board-container-price">
        <img
            v-if="
                getPricedetailsonblackcard && getPricedetailsonblackcard.derivedPricePercentage < 0
            "
            class="direct"
            id="direct"
            :src="require(`../../assets/Instrument_assets/redarrow.svg`)"
            alt="decline"
        />
        <img
            v-else-if="
                !getPricedetailsonblackcard ||
                    Number.isNaN(getPricedetailsonblackcard.derivedPricePercentage)
            "
            class="middle-loader"
            :src="require('../../assets/img/loader.gif')"
            alt="spin"
        />
        <img
            v-else
            class="direct"
            id="direct"
            :src="require(`../../assets/Instrument_assets/arrow_growth.png`)"
            alt="growth"
        />
        <section class="section-price">
            <h1 v-if="getPricedetailsonblackcard.currency" class="price">
                {{
                    getPricedetailsonblackcard.askPrice
                        | currency(getPricedetailsonblackcard.currency, true)
                }}
            </h1>
            <h1 v-else></h1>
            <section
                v-if="
                    getPricedetailsonblackcard.derivedPrice &&
                        getPricedetailsonblackcard.derivedPricePercentage
                "
                class="info-details"
            >
                <span class="increase">
                    <span
                        :class="[
                            checkforUndefined(getPricedetailsonblackcard.derivedPrice) < 0
                                ? 'red'
                                : 'green'
                        ]"
                    >
                        {{ checkforUndefined(getPricedetailsonblackcard.derivedPrice) }}
                    </span>
                    <span
                        :class="[
                            checkforUndefined(getPricedetailsonblackcard.derivedPricePercentage) < 0
                                ? 'red'
                                : 'green'
                        ]"
                        >({{
                            checkforUndefined(getPricedetailsonblackcard.derivedPricePercentage)
                        }}%)</span
                    >
                </span>
                <span v-if="timingStatement">from {{ timingStatement }}</span>
                <span v-else></span>
            </section>
            <section v-else></section>
        </section>
    </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import EventBus from "../../event-bus";

export default {
    name: "Blackcard",
    data() {
        return {
            timingStatement: null,
            valueTiming: ""
        };
    },
    computed: {
        ...mapGetters(["getPricedetailsonblackcard"])
    },
    methods: {
        ...mapMutations(["SET_PRICE_INFO_ON_BLACKCARD"]),
        checkTimevariantForPriceCardonToogle(value) {
            switch (value) {
                case "1D":
                    this.timingStatement = "Last 24 Hours";
                    return this.timingStatement;
                case "1W":
                    this.timingStatement = "Last One Week";
                    return this.timingStatement;
                case "1M":
                    this.timingStatement = "Last One Month";
                    return this.timingStatement;
                case "3M":
                    this.timingStatement = "Last Three Months";
                    return this.timingStatement;
                case "1Y":
                    this.timingStatement = "Last One Year";
                    return this.timingStatement;
                case "5Y":
                    this.timingStatement = "Last Five Years";
                    return this.timingStatement;
                default:
                    this.timingStatement = "Last Five Years";
                    return this.timingStatement;
            }
        },
        checkforUndefined(payload) {
            const response = parseFloat(payload);
            if (response === undefined || Number.isNaN(response) || response == "") {
                return 0.0;
            } else {
                return response;
            }
        }
    },
    props: {
        instrument: {
            type: Object,
            required: true
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.SET_PRICE_INFO_ON_BLACKCARD({});
        next();
    },
    mounted() {
        this.SET_PRICE_INFO_ON_BLACKCARD({});
        EventBus.$on("GET_DAYS", payLoad => {
            this.valueTiming = payLoad;
            if (this.getPricedetailsonblackcard) {
                this.checkTimevariantForPriceCardonToogle(this.valueTiming);
            }
        });
    }
};
</script>

<style src="../../assets/scss/components/_blackpriceboard.scss" lang="scss" scoped />
