<template>
    <div class="watchlist-portfolio__card" :class="color">
        <div class="watchlist-portfolio__left">
            <p class="watchlist-portfolio__name capitalize">{{ instrument.name }}</p>
            <p class="watchlist-portfolio__change">
                <img
                    v-if="instrument.derivedPrice >= 0"
                    src="../../assets/img/watchlist-up.svg"
                    alt="Growth"
                />
                <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
                <span>{{ instrument.derivedPrice >= 0 ? "+" : "" }}</span>
                <small
                    >{{ instrument.derivedPrice | units(2) }} ({{
                        instrument.derivedPricePercentage | units(2)
                    }}%)</small
                >
            </p>
            <p>
                <strong
                    class="cursor-context"
                    :title="instrument.InstrumentDynamic.askPrice | currency(instrument.currency, true)"
                    >{{ instrument.InstrumentDynamic.askPrice | currency(instrument.currency) }}</strong
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
            @close="closeBuyModal"
            :currency="instrument.currency"
            :symbol="instrument.symbol"
            :instrument="instrument"
            v-if="showBuy"
        />
        <sale-success @close="showSuccess = false" v-if="showSuccess" />

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
import KYCTitles from "../../services/kyc/kycTitles";
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
            showSuccess: false,
            step: null,
            showKYC: false,
            selectedField: {},
            allNextKYC: KYCTitles.titles
        };
    },
    computed: {
        ...mapGetters(["getNextKYC"]),
        color() {
            if (this.instrument.derivedPrice > 3) return "dark-green";
            if (this.instrument.derivedPrice > 2) return "green";
            if (this.instrument.derivedPrice >= 0) return "light-green";
            if (this.instrument.derivedPrice >= -1) return "light-red";
            if (this.instrument.derivedPrice >= -2) return "red";
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
        },
        closeBuyModal(e) {
            if (e) this.showSuccess = true;
            this.showBuy = false;
        }
    }
};
</script>
