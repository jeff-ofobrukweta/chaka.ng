<template>
    <div v-if="dummy" class="watchlist-mobile loader">
        <div class="loader-div" />
    </div>
    <div v-else class="watchlist-mobile">
        <div class="watchlist-mobile__top">
            <img
                v-if="loading"
                :src="require('../../assets/img/loader.gif')"
                alt="Loading"
                width="12px"
                height="12px"
            />
            <svg
                v-else-if="!watched"
                @click="addToWatchlist"
                class="pointer"
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
            <svg
                v-else
                @click="removeFromWatchlist"
                class="pointer"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 0.5H4C2.067 0.5 0.5 2.067 0.5 4V12C0.5 13.933 2.067 15.5 4 15.5H12C13.933 15.5 15.5 13.933 15.5 12V4C15.5 2.067 13.933 0.5 12 0.5Z"
                    fill="white"
                />
                <path
                    d="M8.00001 4C5.04547 4 2.52227 5.83773 1.5 8.43183C2.52227 11.0259 5.04547 12.8637 8.00001 12.8637C10.9545 12.8637 13.4778 11.0259 14.5 8.43183C13.4778 5.83773 10.9545 4 8.00001 4ZM8.00001 11.3863C6.3691 11.3863 5.04546 10.0627 5.04546 8.43183C5.04546 6.80092 6.3691 5.47728 8.00001 5.47728C9.63093 5.47728 10.9545 6.80092 10.9545 8.43183C10.9545 10.0627 9.63093 11.3863 8.00001 11.3863ZM8.00001 6.6591C7.0191 6.6591 6.22728 7.45091 6.22728 8.43183C6.22728 9.41275 7.0191 10.2046 8.00001 10.2046C8.98093 10.2046 9.77275 9.41275 9.77275 8.43183C9.77275 7.45091 8.98093 6.6591 8.00001 6.6591Z"
                    fill="#2DA5EC"
                />
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
                    <p
                        class="watchlist-mobile__change"
                        :class="[+instrument.derivedPrice >= 0 ? 'green' : 'red']"
                    >
                        <img
                            v-if="+instrument.derivedPrice >= 0"
                            src="../../assets/img/watchlist-up.svg"
                            alt="Growth"
                        />
                        <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
                        <span>{{ +instrument.derivedPrice >= 0 ? "+" : "" }}</span>
                        <small
                            >{{ +instrument.derivedPrice | units(2) }}
                            <span
                                :class="[+instrument.derivedPricePercentage >= 0 ? 'green' : 'red']"
                                >({{ +instrument.derivedPricePercentage | units(2) }}%)</span
                            ></small
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
                                instrument.InstrumentDynamic.askPrice | kobo
                                    | currency(instrument.currency, true)
                            "
                            >{{
                                instrument.InstrumentDynamic.askPrice | kobo
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
            <ModalKYC :requiredFields="selectedField.fields" @updated="handleUpdate" />
        </modal>
    </div>
</template>

<script>
import KYCButton from "../form/KYCButton";
import ModalKYC from "../kyc/ModalKYC";
import KYCTitles from "../../services/kyc/kycTitles";
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
        },
        dummy: {
            type: Boolean
        }
    },
    data() {
        return {
            showBuy: false,
            showSuccess: false,
            step: null,
            showKYC: false,
            selectedField: {},
            allNextKYC: KYCTitles.titles,
            loading: false
        };
    },
    computed: {
        ...mapGetters(["getNextKYC", "getWatchlist"]),
        watched() {
            const filter = this.getWatchlist.filter(el => el.symbol === this.instrument.symbol);
            if (filter.length <= 0) {
                return false;
            }
            return true;
        }
    },
    methods: {
        ...mapActions(["GET_SINGLESTOCK_INSTRUMENT", "REMOVE_FROM_WATCHLIST", "ADD_TO_WATCHLIST"]),
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
        },
        async removeFromWatchlist() {
            this.loading = true;
            const payload = { symbols: String(this.instrument.symbol) };
            await this.REMOVE_FROM_WATCHLIST(payload);
            this.loading = false;
        },
        async addToWatchlist() {
            this.loading = true;
            const payload = { symbols: String(this.instrument.symbol) };
            await this.ADD_TO_WATCHLIST(payload);
            setTimeout(() => {
                this.loading = false;
            }, 200);
        }
    }
};
</script>
