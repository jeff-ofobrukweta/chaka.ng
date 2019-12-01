<template>
    <div class="watchlist-mobile">
        <div class="watchlist-mobile__top">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="0.5"
                    y="0.5"
                    width="15"
                    height="15"
                    rx="3.5"
                    fill="white"
                    stroke="#2DA5EC"
                />
                <g clip-path="url(#clip0)">
                    <path
                        d="M7.99999 4.875C5.91666 4.875 4.13749 6.17083 3.41666 8C4.13749 9.82917 5.91666 11.125 7.99999 11.125C10.0833 11.125 11.8625 9.82917 12.5833 8C11.8625 6.17083 10.0833 4.875 7.99999 4.875ZM7.99999 10.0833C6.84999 10.0833 5.91666 9.15 5.91666 8C5.91666 6.85 6.84999 5.91667 7.99999 5.91667C9.14999 5.91667 10.0833 6.85 10.0833 8C10.0833 9.15 9.14999 10.0833 7.99999 10.0833ZM7.99999 6.75C7.30832 6.75 6.74999 7.30833 6.74999 8C6.74999 8.69167 7.30832 9.25 7.99999 9.25C8.69166 9.25 9.24999 8.69167 9.24999 8C9.24999 7.30833 8.69166 6.75 7.99999 6.75Z"
                        fill="#2DA5EC"
                    />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="10" height="10" fill="white" transform="translate(3 3.5)" />
                    </clipPath>
                </defs>
            </svg>

            <div>
                <KYCButton
                    ref="buyBtn"
                    type="button"
                    :classes="['watchlist-mobile__buy']"
                    :action="instrument.currency === 'NGN' ? 'local' : 'global'"
                    @step="handleStep"
                    tag="a"
                    >Buy</KYCButton
                >
                <!-- <a class="watchlist-mobile__buy" @click="showBuy = true">+ Buy</a> -->
            </div>
        </div>
        <router-link
            class="section1 linking"
            :to="{ name: 'singlestock', params: { symbol: instrument.symbol } }"
        >
            <div class="watchlist-mobile__bottom">
                <div class="watchlist-mobile__left">
                    <img class="watchlist-mobile__logo" :src="instrument.logoUrl" alt="Google" />
                    <div>
                        <p class="watchlist-mobile__name capitalize">
                            {{ instrument.name | truncate(50) }}
                        </p>
                        <p class="watchlist-mobile__shares">2 Shares</p>
                    </div>
                </div>
                <div class="watchlist-mobile__right">
                    <p class="watchlist-mobile__change" v-if="Object.keys(stock).length <= 0">-</p>
                    <p
                        v-else
                        class="watchlist-mobile__change"
                        :class="[+stock.InstrumentDynamic.yclose >= 0 ? 'green' : 'red']"
                    >
                        <img
                            v-if="+stock.InstrumentDynamic.yclose < 0 >= 0"
                            src="../../assets/img/watchlist-up.svg"
                            alt="Growth"
                        />
                        <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
                        <span>{{ +stock.InstrumentDynamic.yclose >= 0 ? "+" : "" }}</span>
                        <small
                            >{{ stock.InstrumentDynamic.yclose | units(2) }} ({{
                                stock.InstrumentDynamic.ycloseChange | units(2)
                            }}%)</small
                        >
                    </p>
                    <p class="watchlist-mobile__price">
                        <img
                            :src="
                                require(`../../assets/img/flags/${
                                    instrument.countryCode
                                        ? instrument.countryCode.toLowerCase()
                                        : 'zz'
                                }-flag.svg`)
                            "
                            class="watchlist-explore__symbol"
                            alt="US"
                            width="24px"
                        /><span>|</span>
                        <strong
                            v-if="instrument.InstrumentDynamic"
                            class="cursor-context"
                            :title="
                                instrument.InstrumentDynamic.askPrice
                                    | currency(instrument.currency, true)
                            "
                            >{{
                                instrument.InstrumentDynamic.askPrice
                                    | currency(instrument.currency)
                            }}</strong
                        >
                    </p>
                </div>
            </div>
        </router-link>
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
import { mapActions, mapGetters } from "vuex";
export default {
    name: "watchlist-card",
    components: {
        KYCButton,
        ModalKYC
    },
    props: {
        instrument: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showBuy: false,
            showSuccess: false,
            stock: {},
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
        ...mapGetters(["getNextKYC"])
    },
    methods: {
        ...mapActions(["GET_SINGLESTOCK_INSTRUMENT"]),
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
    },
    mounted() {
        this.GET_SINGLESTOCK_INSTRUMENT({
            symbols: this.instrument.symbol
        }).then(resp => {
            this.stock = resp;
        });
    }
};
</script>
