<template>
    <modal @close="closeModal" v-if="isBuyValid === 'PENDING'">
        <template slot="header">Final Step</template>
        <div>
            <div class="kyc-modal">
                <div class="text-center mb-3">
                    <p class="kyc-modal__small">
                        You have completed your submissions and your verification is processing. You
                        can now fund your wallet.
                    </p>
                    <br />
                    <h5 class="grey-cool">Most Popular Today</h5>
                    <div class="kyc-modal__popular">
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
                            <h6>{{ stock.name | truncate(15) }}</h6>
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
    </modal>
    <modal @close="closeModal" v-else-if="isBuyValid === 2">
        <template v-if="instrument.currency === 'NGN'">
            <template slot="header">Processing Local Verification</template>
            <div>
                <div class="kyc-modal">
                    <div class="text-center mb-3">
                        <p class="kyc-modal__small">
                            Your profile is being verified for local trading. You can now fund your
                            Naira or Dollar wallet.
                        </p>
                        <br />
                        <div class="kyc-modal__single">
                            <div @click="closeModal" class="kyc-modal__popular--div">
                                <div>
                                    <img
                                        :src="instrument.logoUrl"
                                        class="kyc-modal__popular--logo"
                                        :alt="instrument.symbol"
                                    />
                                </div>
                                <h6>{{ instrument.name | truncate(15) }}</h6>
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
                        <div>
                            <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                        </div>
                        <div class="mt-2" v-if="getLoggedUser.globalKycStatus === 'NONE'">
                            <small>
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
            </div>
        </template>
        <template v-else>
            <template slot="header">Processing Global Verification</template>
            <div>
                <div class="kyc-modal">
                    <div class="text-center mb-3">
                        <p class="kyc-modal__small">
                            Your profile is being verified for global trading. You can now fund your
                            Naira or Dollar wallet.
                        </p>
                        <div class="kyc-modal__single">
                            <div @click="closeModal" class="kyc-modal__popular--div">
                                <div>
                                    <img
                                        :src="instrument.logoUrl"
                                        class="kyc-modal__popular--logo"
                                        :alt="instrument.symbol"
                                    />
                                </div>
                                <h6>{{ instrument.name | truncate(15) }}</h6>
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
                        <br />
                        <div>
                            <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                        </div>
                        <div class="mt-2" v-if="getLoggedUser.localKycStatus === 'NONE'">
                            <small>
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
            </div>
        </template>
    </modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'PendingKYC',
    props: {
        instrument: {
            type: Object
        },
        isBuyValid: {
            type: [String, Number]
        }
    },
    computed: {
        ...mapGetters(['getLoggedUser', 'getMostPopular'])
    },
    methods: {
        ...mapActions(['GET_MOST_POPULAR']),
        ...mapMutations(['SET_FUND_MODAL']),
        country(code) {
            return code ? code.toLowerCase() : 'zz';
        },
        showFund() {
            this.SET_FUND_MODAL(true);
            this.$emit('close');
        },
        closeModal() {
            this.$emit('close');
        },
        handleStep(step) {
            this.$emit('step', step);
        }
    },
    mounted() {
        this.GET_MOST_POPULAR();
    }
};
</script>
