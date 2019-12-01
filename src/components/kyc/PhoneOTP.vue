<template>
    <Fragment>
        <form @submit.prevent="useNewPhone" v-if="showNewPhone">
            <p class="text-center mb-3">Enter your details to confirm your new phone number</p>
            <div class="accounts-settings__group--modal">
                <label class="form__label"
                    >Date of Birth
                    <input class="form__input" type="date" name="dob" @input="handleDate($event)"
                /></label>
            </div>
            <div class="accounts-settings__group--modal">
                <label class="form__label"
                    >Select Country
                    <select class="form__input form__select" v-model="newPhone.countryCode">
                        <template v-if="getCountryCodes">
                            <option
                                :value="country.callingCodes[0]"
                                v-for="(country, index) in getCountryCodes"
                                :key="index"
                                :selected="country.name === 'Nigeria'"
                                >{{ country.name }}{{ ` (+${country.callingCodes[0]})` }}</option
                            >
                        </template>
                        <template v-else>
                            <option value="234" selected>Nigeria (+234)</option>
                        </template>
                    </select>
                </label>
            </div>
            <div class="accounts-settings__group--modal">
                <label class="form__label text-center"
                    >Phone Number
                    <form-input
                        type="number"
                        name="phone"
                        v-model="newPhone.phone"
                        placeholder="Enter new phone"
                /></label>
            </div>
            <error-block type="kyc-phone" />

            <section class="accounts-settings__submit--modal">
                <action-button
                    :disabled="Object.keys(newPhone).length < 3"
                    type="submit"
                    :pending="loading"
                    :classes="['btn-block', 'btn__primary']"
                    >Submit</action-button
                >
            </section>
        </form>
        <form @submit.prevent="submitOTP" v-else>
            <p class="text-center mb-3">
                An OTP has been sent to your registered number ({{ getKYC.phone }})
            </p>
            <div class="accounts-settings__group--modal">
                <label class="form__label text-center"
                    >Enter OTP
                    <form-input
                        type="number"
                        name="phone"
                        v-model="otpData.otp"
                        placeholder="Enter OTP"
                /></label>
            </div>
            <error-block type="kyc-otp" />

            <section class="accounts-settings__submit--modal">
                <action-button
                    type="submit"
                    :disabled="!otpData.otp"
                    :pending="loading"
                    :classes="['btn-block', 'btn__primary']"
                    >Submit</action-button
                >
            </section>
            <div class="text-center">
                <template v-if="!countdown">
                    <p class="mb-1">Resend OTP</p>
                    <p class="mb-1">
                        <a class="underline primary" @click="resendOTPEmail">Via Email</a>
                    </p>
                    <p class="mb-3">
                        <a class="underline primary" @click="resendOTPWhatsapp">Via Whatsapp</a>
                    </p>
                </template>

                <p class="countdown--account" v-else>
                    <span class="countdown__text">Resend in</span>&nbsp;
                    <span>{{ countdown }}</span>
                </p>
                <small
                    ><a @click="showNewPhone = true" class="underline primary">Click here</a> to use
                    a different phone number</small
                >
            </div>
        </form>
    </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { mapActions, mapGetters } from "vuex";
export default {
    name: "phone-otp",
    components: {
        Fragment
    },
    data() {
        return {
            loading: false,
            showOTP: null,
            showNewPhone: false,
            newPhone: {},
            otpData: {},
            countdown: null,
            OTPResend: false,
            smsSender: 0
        };
    },
    computed: {
        ...mapGetters(["getKYC", "getCountryCodes"])
    },
    methods: {
        ...mapActions(["GET_KYC", "USE_BVN_PHONE", "RESOLVE_OTP", "GET_COUNTRY_CODES"]),
        useBVNPhone() {
            this.loading = true;
            const payload = {
                smsSender: this.smsSender
            };
            this.USE_BVN_PHONE(payload).then(resp => {
                this.loading = false;
                if (resp) {
                    this.showOTP = true;
                    this.showNewPhone = false;
                    this.itemData = {};
                }
            });
        },
        useNewPhone() {
            this.loading = true;
            this.USE_BVN_PHONE(this.newPhone).then(resp => {
                this.loading = false;
                if (resp) {
                    this.showNewPhone = false;
                    this.itemData = {};
                }
            });
        },
        submitOTP() {
            this.loading = true;
            this.RESOLVE_OTP(this.otpData).then(resp => {
                this.loading = false;
                if (resp) {
                    this.itemData = {};
                    this.showOTP = false;
                }
            });
        },
        handleDate(e) {
            if (e.target.value) {
                this.newPhone.dob = new Date(e.target.value).toISOString();
            }
        },
        resendOTPEmail() {
            this.startTimer();
            this.OTPResend = true;
            this.smsSender = 1;
            if (!this.showNewPhone) {
                // this.card1();
                this.useBVNPhone();
                return true;
            }
            this.loading = true;
            this.newPhone.smsSender = this.smsSender;
            this.USE_BVN_PHONE(this.newPhone).then(resp => {
                if (resp) {
                    this.showOTP = false;
                    this.OTPResend = false;
                    this.itemData = {};
                }
            });
            return true;
        },
        resendOTPWhatsapp() {
            this.startTimer();
            this.OTPResend = true;
            this.smsSender = 2;
            if (!this.showNewPhone) {
                this.useBVNPhone();
                return true;
            }
            this.loading = true;
            this.newPhone.smsSender = this.smsSender;
            this.USE_BVN_PHONE(this.newPhone).then(resp => {
                if (resp) {
                    this.showOTP = false;
                    this.OTPResend = false;
                    this.itemData = {};
                }
            });
            return true;
        },
        startTimer() {
            const countDownDate = new Date().setTime(new Date().getTime() + 60 * 1000);

            // Update the count down every 1 second
            const x = setInterval(() => {
                const now = new Date().getTime();
                const counting = (countDownDate - now) / 1000;
                if (Math.floor(counting % 60) === 0) {
                    this.countdown = null;
                    clearInterval(x);
                    return true;
                }
                const hours = Math.floor(counting / 60);
                const minutes =
                    Math.floor(counting % 60) < 10
                        ? `0${Math.floor(counting % 60)}`
                        : Math.floor(counting % 60);
                this.countdown = `${hours}:${minutes}`;
            }, 1000);
        },
        editExistingPhone() {
            this.showOTP = true;
            this.showNewPhone = true;
        }
    },
    async mounted() {
        this.useBVNPhone();
        await Promise.all([this.GET_COUNTRY_CODES(), this.GET_KYC()]);
    }
};
</script>
