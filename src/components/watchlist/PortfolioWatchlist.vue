<template>
    <div class="watchlist-portfolio__card" :class="color">
        <div class="watchlist-portfolio__left">
            <p class="watchlist-portfolio__name capitalize">{{ instrument.name }}</p>
            <p class="watchlist-portfolio__change">
                <img
                    v-if="instrument.change >= 0"
                    src="../../assets/img/watchlist-up.svg"
                    alt="Growth"
                />
                <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
                <span>{{ instrument.change >= 0 ? "+" : "" }}</span>
                <small
                    >{{ instrument.change | units(2) }} ({{
                        instrument.percent | units(2)
                    }}%)</small
                >
            </p>
            <p>
                <strong
                    class="cursor-context"
                    :title="instrument.price | currency(instrument.currency, true)"
                    >{{ instrument.price | currency(instrument.currency) }}</strong
                >
            </p>
        </div>
        <div class="watchlist-portfolio__right">
            <div>
                <img src="../../assets/img/watch-open.svg" alt="Watch" />
            </div>
            <div>
                <KYCButton
                    ref="buyBtn"
                    type="button"
                    :classes="['watchlist-portfolio__buy']"
                    :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                    @step="handleStep"
                    tag="a"
                    >+&nbsp;Buy</KYCButton
                >
                <!-- <a @click="showBuy = true" class="watchlist-portfolio__buy">+ Buy</a> -->
            </div>
        </div>
        <buy-modal
            @close="showBuy = false"
            :currency="instrument.currency"
            :symbol="instrument.symbol"
            :instrument="instrument"
            v-if="showBuy"
        />

        <modal @close="showKYC = false" v-if="showKYC">
            <template slot="header">{{ selectedField.title }}</template>
            <form @submit.prevent="submitPhone">
                <div>
                    <ModalKYC :requiredFields="selectedField.fields" @updated="handleUpdate" />
                </div>
            </form>
        </modal>
    </div>
</template>

<script>
import KYCButton from "../form/KYCButton";
import ModalKYC from "../kyc/ModalKYC";
import { mapGetters } from "vuex";
export default {
    name: "watchlist-portfolio",
    props: {
        instrument: {
            type: Object,
            required: true
        }
    },
    components: {
        KYCButton,
        ModalKYC
    },
    data() {
        return {
            showBuy: false,
            step: null,
            showKYC: false,
            selectedField: {},
            allNextKYC: [
                {
                    title: "Bank Details",
                    subtitle: "Enter your bank details",
                    fields: ["bankAcctNo", "bankCode"]
                },
                {
                    title: "National Identity Number",
                    subtitle:
                        "Enter your national identity number to fast track your verification process",
                    fields: ["nin"]
                },
                {
                    title: "Postal Address",
                    subtitle: "Enter your postal address",
                    fields: ["gender", "address", "lg"]
                },
                {
                    title: "Employment Details",
                    subtitle: "Fill in your employment details",
                    fields: [
                        "employmentStatus",
                        "employedByBroker",
                        "directorOfPublicCo",
                        "pepStatus",
                        "pepNames"
                    ]
                },
                {
                    title: "Investment Preferences",
                    subtitle: "Fill in your investment preferences",
                    fields: [
                        "investmentObjectives",
                        "investmentExperience",
                        "riskTolerance",
                        "annualIncome",
                        "networthLiquid",
                        "networthTotal"
                    ]
                },
                {
                    title: "Uploads",
                    subtitle: "Make your details",
                    fields: ["addressProofUrl", "idPhotoUrl", "passportUrl"]
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["getNextKYC"]),
        color() {
            if (this.instrument.change > 3) return "dark-green";
            if (this.instrument.change > 2) return "green";
            if (this.instrument.change >= 0) return "light-green";
            if (this.instrument.change >= -1) return "light-red";
            if (this.instrument.change >= -2) return "red";
            return "dark-red";
        }
    },
    methods: {
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
                this.showBuy = true;
            }
        },
        handleUpdate() {
            this.showKYC = false;
            if (this.step !== "kyc") {
                this.$refs.buyBtn.$el.click();
            }
        }
    }
};
</script>
