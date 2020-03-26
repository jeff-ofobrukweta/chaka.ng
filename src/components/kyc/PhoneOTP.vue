<template>
    <Fragment>
        <form @submit.prevent="useNewPhone" v-if="showNewPhone">
            <p class="text-center mb-3">Enter your details to confirm your new phone number</p>
            <div class="accounts-settings__group--modal">
                <label class="form__label">Date of Birth</label>
                <DatePicker mode="single" v-model="date" :popover="{ visibility: 'click' }"
                    ><input
                        id="date"
                        slot-scope="{ inputProps, inputEvents }"
                        :class="['form__input']"
                        placeholder="Select your date of birth"
                        v-bind="inputProps"
                        v-on="inputEvents"
                /></DatePicker>
            </div>
            <div class="accounts-settings__group--modal">
                <label class="form__label"
                    >Select Country
                    <select class="form__input form__select" @change="setCountryCode" v-model="newPhone.countryCode">
                        <template v-if="getCountryCodes">
                            <option :value="country.callingCodes[0]" v-for="(country, index) in getCountryCodes" :key="index"
                                >{{ country.name }}{{ ` (+${country.callingCodes[0]})` }}</option
                            >
                        </template>
                    </select>
                </label>
            </div>
            <div class="accounts-settings__group--modal">
                <label class="form__label text-center"
                    >Phone Number
                    <div class="kyc-phone">
                        <div>+{{ callingCode }}</div>
                        <form-input
                            type="number"
                            name="phone"
                            v-model="newPhone.phone"
                            placeholder="70000000"
                            @focus="issues = {}"
                            :error-message="issues.phone"
                            @reset="issues = {}"
                        />
                    </div>
                </label>
            </div>
            <error-block type="kyc-phone" />

            <section class="accounts-settings__submit--modal">
                <action-button :disabled="!formComplete" type="submit" :pending="loading" :classes="['btn-block', 'btn__primary']">Submit</action-button>
                <p class="text-center mt-2" v-if="editOldPhone">
                    <small><a @click="close" class="underline orange">Cancel</a></small>
                </p>
            </section>
            <p class="text-center" v-if="!editOldPhone">
                <small><a @click="backToUsePhone" class="underline primary">Go back</a> to use your registered phone number</small>
            </p>
        </form>

        <form @submit.prevent="submitOTP" v-else>
            <p class="text-center mb-3">An OTP has been sent to your {{ hashTempPhone ? "new" : "registered" }} number ({{ hashTempPhone || getKYC.phone }})</p>
            <div class="accounts-settings__group--modal">
                <label class="form__label text-center">Enter OTP <form-input type="number" name="phone" v-model="otpData.otp" placeholder="Enter OTP"/></label>
            </div>
            <error-block type="kyc-otp" />

            <section class="accounts-settings__submit--modal">
                <action-button type="submit" :disabled="!otpData.otp" :pending="loading" :classes="['btn-block', 'btn__primary']">Submit</action-button>
            </section>
            <div class="text-center">
                <small><a @click="showNewPhone = true" class="underline small">Use another phone number</a></small>
                <br />
                <template v-if="!countdown">
                    <br />
                    <div class="accounts-settings__resend">
                        <p>
                            <small> <a class="underline small" @click="resendOTPEmail">Resend Via Email</a></small>
                        </p>
                        <p>
                            <small><a class="underline small" @click="resendOTPWhatsapp">Resend Via Whatsapp</a></small>
                        </p>
                    </div>
                </template>

                <p class="countdown--account" v-else>
                    <small
                        ><span class="countdown__text">Resend in</span>&nbsp; <span>{{ countdown }}</span></small
                    >
                </p>
            </div>
        </form>
    </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { mapActions, mapGetters } from "vuex";
import DatePicker from "v-calendar/lib/components/date-picker.umd";

export default {
    name: "phone-otp",
    components: {
        Fragment,
        DatePicker
    },
    props: {
        editOldPhone: {
            type: Boolean
        }
    },
    data() {
        return {
            loading: false,
            showNewPhone: false,
            newPhone: {},
            otpData: {},
            countdown: null,
            OTPResend: false,
            tempPhone: null,
            smsSender: 0,
            issues: {},
            tempPhone: null,
            callingCode: 234,
            date: null
        };
    },
    computed: {
        ...mapGetters(["getKYC", "getCountryCodes"]),
        hashTempPhone() {
            if (this.tempPhone) {
                const hash = String(this.tempPhone)
                    .split("")
                    .map((el, index) => {
                        if (index > 1 && index < 7) {
                            return "*";
                        }
                        return el;
                    });
                return hash.join("");
            }
            return null;
        },
        formComplete() {
            return this.newPhone.phone && this.newPhone.countryCode && this.newPhone.dob;
        }
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
                    this.showNewPhone = false;
                    this.itemData = {};
                }
            });
        },
        setCountryCode(e) {
            this.callingCode = e.target.value;
        },
        backToUsePhone() {
            this.showNewPhone = false;
            this.resendOTPWhatsapp();
        },
        useNewPhone() {
            this.tempPhone = this.newPhone.phone;

            if (Number.isNaN(+this.newPhone.phone)) {
                this.issues = {
                    phone: "Phone should be a number"
                };
                return false;
            }
            // TO-DO:: Put back for phone validation
            // if (this.newPhone.phone.length < 10) {
            //     this.issues = {
            //         phone: "Phone number should be 10 digits"
            //     };
            //     return false;
            // }
            if (Object.keys(this.issues).length > 0) {
                return false;
            }
            this.loading = true;
            this.USE_BVN_PHONE(this.newPhone).then(resp => {
                this.loading = false;
                if (resp) {
                    this.showNewPhone = false;
                    this.newPhone = {};
                }
            });
        },
        submitOTP() {
            this.loading = true;
            this.RESOLVE_OTP(this.otpData).then(resp => {
                this.loading = false;
                if (resp) {
                    this.$emit("close", true);
                    this.tempPhone = null;
                    this.itemData = {};
                }
            });
        },
        handleDate() {
            if (this.date) {
                const date = new Date(this.date);
                const timeLag = date.getTimezoneOffset() * 60 * 1000;
                const offsetDate = new Date(date.getTime() - timeLag);
                this.$set(this.newPhone, "dob", offsetDate.toISOString());
            }
        },
        resendOTPEmail() {
            this.startTimer();
            this.OTPResend = true;
            this.smsSender = 1;
            if (!this.showNewPhone) {
                this.useBVNPhone();
                return true;
            }
            this.loading = true;
            this.newPhone.smsSender = this.smsSender;
            this.USE_BVN_PHONE(this.newPhone).then(resp => {
                if (resp) {
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
                const minutes = Math.floor(counting % 60) < 10 ? `0${Math.floor(counting % 60)}` : Math.floor(counting % 60);
                this.countdown = `${hours}:${minutes}`;
            }, 1000);
        },
        editExistingPhone() {
            this.showOTP = true;
            this.showNewPhone = true;
        },
        close() {
            this.$emit("close");
        }
    },
    async mounted() {
        if (this.editOldPhone) {
            this.showNewPhone = true;
            this.newPhone.countryCode = "234";
        } else {
            this.useBVNPhone();
        }
        await Promise.all([this.GET_COUNTRY_CODES(), this.GET_KYC()]);
    },
    watch: {
        // TO-DO:: Put back for phone validation
        // "newPhone.phone"(newVal) {
        //     if (newVal) {
        //         if (newVal.length > 10) {
        //             this.issues = {
        //                 phone: "Phone number should be 10 digits"
        //             };
        //         } else {
        //             this.issues = {};
        //         }
        //     }
        // }
        date(val) {
            if (val) {
                this.handleDate();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
p,
small {
    color: $text-color;
}
</style>
