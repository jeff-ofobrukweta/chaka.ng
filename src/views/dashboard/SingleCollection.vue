<template>
    <section class="dashboard__main">
        <section class="dashboard__title">
            <h3>{{ name }}</h3>
            <p class="dashboard__title--sub" v-if="getSingleCollection.length > 0">
                {{ getSingleCollection.length }} Stocks
            </p>
        </section>
        <section v-if="getWindowWidth === 'desktop'">
            <section v-if="getSingleCollection.length > 0" class="instrument-base">
                <div
                    class="card-container"
                    v-for="(instrument, index) in getSingleCollection"
                    :key="index"
                >
                    <section class="section1">
                        <router-link
                            class="section1 linking"
                            :to="{ name: 'singlestock', params: { symbol: instrument.symbol } }"
                        >
                            <img
                                class="course-item-main-list-flex"
                                id="company"
                                :src="instrument.logoUrl"
                                alt="courses"
                            />
                        </router-link>
                        <img
                            class="course-item-main-list-flex"
                            id="watch-icon"
                            :src="require(`../../assets/Instrument_assets/watch.png`)"
                            alt="watch"
                        />
                        <div class="symbol">{{ instrument.symbol }}</div>
                    </section>
                    <router-link
                        :to="{ name: 'singlestock', params: { symbol: instrument.symbol } }"
                    >
                        <section class="section2">
                            <div class="price">
                                {{
                                    instrument.InstrumentDynamic
                                        ? instrument.InstrumentDynamic.askPrice
                                        : "-" | kobo | currency(instrument.currency)
                                }}
                            </div>
                            <div class="level">
                                <img
                                    :src="require('../../assets/img/green-arrow.svg')"
                                    v-if="checkChange(instrument.InstrumentDynamic.ycloseChange)"
                                    alt="Gain"
                                    height="12px"
                                />
                                <img
                                    :src="require('../../assets/img/red-arrow.svg')"
                                    v-else
                                    alt="Loss"
                                    height="12px"
                                />
                                <small
                                    :class="[
                                        +instrument.InstrumentDynamic.ycloseChange >= 0
                                            ? 'green'
                                            : 'red'
                                    ]"
                                    >&nbsp;{{ +instrument.InstrumentDynamic.yclose >= 0 ? "+" : ""
                                    }}{{ +instrument.InstrumentDynamic.yclose | units(2) }}
                                    <span
                                        >({{
                                            +instrument.InstrumentDynamic.ycloseChange | units(2)
                                        }}%)</span
                                    ></small
                                >
                            </div>
                            <img
                                class="country"
                                id="country"
                                :src="
                                    require(`../../assets/img/flags/${
                                        instrument.countryCode
                                            ? instrument.countryCode.toLowerCase()
                                            : 'zz'
                                    }-flag.svg`)
                                "
                                alt="states"
                            />
                        </section>
                    </router-link>
                    <KYCButton
                        ref="buyBtn"
                        type="button"
                        :classes="['section3']"
                        :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                        @step="handleStep"
                        >Buy</KYCButton
                    >
                </div>
            </section>
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
        </section>
        <section v-else>
            <template v-if="getSingleCollection.length > 0">
                <InstrumentMobile
                    v-for="(instrument, index) in getSingleCollection"
                    :key="index"
                    :instrument="instrument"
            /></template>
        </section>
    </section>
</template>

<script>
import KYCButton from "../../components/form/KYCButton";
import ModalKYC from "../../components/kyc/ModalKYC";
import KYCTitles from "../../services/kyc/kycTitles";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name: "explore-collection",
    components: {
        Instrument: () => import("../../components/Instrument/instrument_desk"),
        InstrumentMobile: () => import("../../components/watchlist/MobileWatchlist"),
        ModalKYC,
        KYCButton
    },
    data() {
        return {
            step: null,
            showBuy: false,
            showKYC: false,
            showSuccess: false,
            selectedField: {},
            allNextKYC: KYCTitles.titles
        };
    },
    computed: {
        ...mapGetters([
            "getSingleCollection",
            "getWindowWidth",
            "getCollectionStocks",
            "getNextKYC"
        ]),
        name() {
            return this.$route.params.name;
        }
    },
    methods: {
        ...mapActions(["GET_SINGLE_COLLECTION"]),
        ...mapMutations(["SET_SINGLE_COLLECTION", "SET_COLLECTION_STOCKS"]),
        checkChange(value) {
            if (+value >= 0) return true;
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
            if (e) {
                this.showSuccess = true;
            }
            this.showBuy = false;
        }
    },
    async mounted() {
        if (this.getCollectionStocks.length <= 0) {
            this.$router.replace({ name: "explore" });
        } else await this.GET_SINGLE_COLLECTION();
    },
    beforeDestroy() {
        this.SET_SINGLE_COLLECTION([]);
        this.SET_COLLECTION_STOCKS([]);
    }
};
</script>
<style src="../../assets/scss/components/_desktopstocks.scss" lang="scss" scoped />
