<template>
    <Fragment v-if="type === 'PENDING'">
        <div>
            <div class="kyc-modal">
                <div class="text-center">
                    <p class="kyc-modal__small">
                        You have completed your submissions and your verification is processing. You
                        can now fund your wallet.
                    </p>
                    <br />
                    <h5 class="grey-cool">Most Popular</h5>
                    <div class="kyc-modal__popular" v-if="!loading">
                        <router-link
                            tag="div"
                            :to="{ name: 'singlestock', params: { symbol: stock.symbol } }"
                            class="kyc-modal__popular--div"
                            v-for="(stock, i) in getMostPopular"
                            :key="i"
                        >
                            <div>
                                <img
                                    :src="stock.logoUrl"
                                    class="kyc-modal__popular--logo"
                                    :alt="stock.symbol"
                                />
                            </div>
                            <h6>{{ stock.symbol | truncate(15) }}</h6>
                            <div>
                                <img
                                    :src="
                                        require(`../../assets/img/flags/${country(
                                            stock.countryCode
                                        )}-flag.svg`)
                                    "
                                    class="kyc-modal__popular--flag"
                                    :alt="stock.countryCode"
                                />
                            </div>
                        </router-link>
                    </div>
                    <div>
                        <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    <Fragment v-else-if="type === 'WITHDRAW'">
        <div class="kyc-modal">
            <div class="text-center">
                <p class="kyc-modal__small">
                    Your profile is being verified for withdrawals. You can now fund your Naira or
                    Dollar wallet.
                </p>
                <br />
                <div>
                    <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                </div>
                <div
                    class="mt-2"
                    v-if="
                        getLoggedUser.globalKycStatus === 'NONE' ||
                            getLoggedUser.localKycStatus === 'NONE'
                    "
                >
                    <small>
                        <a class="underline" @click="handleStep('default')"
                            >Continue {{ subtext }} Verification</a
                        ></small
                    >
                </div>
            </div>
        </div>
    </Fragment>
    <Fragment v-else-if="isBuyValid === 2">
        <template v-if="type === 'LOCAL' || instrument.currency === 'NGN'">
            <div class="kyc-modal">
                <div class="text-center">
                    <p class="kyc-modal__small">
                        Your profile is being verified for local trading. You can now fund your
                        Naira or Dollar wallet.
                    </p>
                    <br />
                    <div class="kyc-modal__single" v-if="Object.keys(instrument).length > 0">
                        <div @click="closeModal" class="kyc-modal__popular--div">
                            <div>
                                <img
                                    :src="instrument.logoUrl"
                                    class="kyc-modal__popular--logo"
                                    :alt="instrument.symbol"
                                />
                            </div>
                            <h6>{{ instrument.symbol | truncate(10) }}</h6>
                            <p>{{ instrument.name }}</p>
                            <div>
                                <img
                                    :src="
                                        require(`../../assets/img/flags/${country(
                                            instrument.countryCode
                                        )}-flag.svg`)
                                    "
                                    class="kyc-modal__popular--flag"
                                    :alt="instrument.countryCode"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="kyc-modal__single" v-else-if="!loading">
                        <div @click="closeModal" class="kyc-modal__popular--div">
                            <div>
                                <img
                                    :src="specificStock.logoUrl"
                                    class="kyc-modal__popular--logo"
                                    :alt="specificStock.symbol"
                                />
                            </div>
                            <h6>{{ specificStock.symbol | truncate(10) }}</h6>
                            <p>{{ specificStock.name }}</p>
                            <div>
                                <img
                                    :src="
                                        require(`../../assets/img/flags/${country(
                                            specificStock.countryCode
                                        )}-flag.svg`)
                                    "
                                    class="kyc-modal__popular--flag"
                                    :alt="specificStock.countryCode"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                    </div>
                    <div class="mt-2" v-if="getLoggedUser.globalKycStatus === 'NONE'">
                        <small v-if="modal">
                            <a class="underline" @click="handleStep('global')"
                                >Continue Local Verification</a
                            ></small
                        >
                        <small v-else>
                            <kyc-button
                                ref="buyBtn"
                                type="button"
                                :classes="['underline']"
                                tag="a"
                                action="global"
                                @step="handleStep"
                                >Continue Global Verification</kyc-button
                            ></small
                        >
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="kyc-modal">
                <div class="text-center">
                    <p class="kyc-modal__small">
                        Your profile is being verified for global trading. You can now fund your
                        Naira or Dollar wallet.
                    </p>
                    <br />
                    <div class="kyc-modal__single" v-if="Object.keys(instrument).length > 0">
                        <div @click="closeModal" class="kyc-modal__popular--div">
                            <div>
                                <img
                                    :src="instrument.logoUrl"
                                    class="kyc-modal__popular--logo"
                                    :alt="instrument.symbol"
                                />
                            </div>
                            <h6>{{ instrument.symbol | truncate(10) }}</h6>
                            <p>{{ instrument.name }}</p>
                            <div>
                                <img
                                    :src="
                                        require(`../../assets/img/flags/${country(
                                            instrument.countryCode
                                        )}-flag.svg`)
                                    "
                                    class="kyc-modal__popular--flag"
                                    :alt="instrument.countryCode"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="kyc-modal__single" v-else-if="!loading">
                        <div @click="closeModal" class="kyc-modal__popular--div">
                            <div>
                                <img
                                    :src="specificStock.logoUrl"
                                    class="kyc-modal__popular--logo"
                                    :alt="specificStock.symbol"
                                />
                            </div>
                            <h6>{{ specificStock.symbol | truncate(10) }}</h6>
                            <p>{{ specificStock.name }}</p>
                            <div>
                                <img
                                    :src="
                                        require(`../../assets/img/flags/${country(
                                            specificStock.countryCode
                                        )}-flag.svg`)
                                    "
                                    class="kyc-modal__popular--flag"
                                    :alt="specific.countryCode"
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div>
                        <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                    </div>
                    <div class="mt-2" v-if="getLoggedUser.localKycStatus === 'NONE'">
                        <small v-if="modal">
                            <a class="underline" @click="handleStep('local')"
                                >Continue Local Verification</a
                            ></small
                        >
                        <small v-else>
                            <kyc-button
                                ref="buyBtn"
                                type="button"
                                :classes="['underline']"
                                tag="a"
                                action="local"
                                @step="handleStep"
                                >Continue Local Verification</kyc-button
                            ></small
                        >
                    </div>
                </div>
            </div>
        </template>
    </Fragment>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Fragment } from "vue-fragment";

export default {
    name: "PendingKYC",
    components: {
        Fragment
    },
    props: {
        instrument: {
            type: Object
        },
        isBuyValid: {
            type: [String, Number]
        },
        modal: {
            type: Boolean
        },
        type: {
            type: String
        }
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        ...mapGetters(["getLoggedUser", "getMostPopular", "getKycModalAction"]),
        specificStock() {
            const stock = this.getMostPopular.filter(el => el.type === this.type);
            return stock;
        },
        subtext() {
            if (this.getKycModalAction === "LOCAL") return "Local";
            return "Global";
        }
    },
    methods: {
        ...mapActions(["GET_MOST_POPULAR"]),
        ...mapMutations(["SET_FUND_MODAL"]),
        country(code) {
            return code ? code.toLowerCase() : "zz";
        },
        showFund() {
            this.SET_FUND_MODAL(true);
            this.$emit("close");
        },
        closeModal() {
            this.$emit("close");
        },
        handleStep(step) {
            this.$emit("step", step);
        }
    },
    async mounted() {
        if (Object.keys(this.instrument).length <= 0) {
            this.loading = true;
            await this.GET_MOST_POPULAR();
            this.loading = false;
        }
    }
};
</script>
