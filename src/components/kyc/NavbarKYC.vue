<template>
    <section class="kyc-nav__section kyc-navbar" v-if="getNavbarNextKYC.status === 'INCOMPLETE'">
        <template v-if="getNavbarNextKYC.nextKYC[0] === 'disclosureName'">
            <form @submit.prevent="submitDisclosure">
                <div class="kyc-nav container">
                    <div class="kyc-nav__text">
                        <h5>Verification by Financial Regulators</h5>
                        <p>
                            <small>
                                By typing to sign my name below I acknowledge that I have read and
                                agree to
                                <a
                                    class="underline"
                                    href="https://apps.drivewealth.com/disclosures?sweepType=bank"
                                    target="_blank"
                                    >Drivewealth Disclosures</a
                                >,
                                <a
                                    class="underline"
                                    href="https://drivewealth.com/customer-account-agreement?lang=en_US"
                                    target="_blank"
                                    >DriveWealth Account Agreement</a
                                >
                                and
                                <a
                                    class="underline"
                                    href="https://apps.drivewealth.io/disclosures/?citizenship=NG&showOnlyTaxDoc=true"
                                    target="_blank"
                                    >W8-BEN Agreement Disclosure</a
                                ></small
                            >
                        </p>
                        <p
                            class="skip-button"
                            v-if="
                                getWindowWidth !== 'mobile' && getKYC.ninFetchStatus === 'SKIPPED'
                            "
                        >
                            <a class="underline" @click="enterNIN = true"
                                >Enter NIN to fast track your verificatiom</a
                            >
                        </p>
                    </div>

                    <div class="kyc-nav__field">
                        <Field :field="disclosureField" @input="handleInput" no-label />
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a href="#">Hide</a>
                        <action-button
                            type="submit"
                            :disabled="!itemData.disclosureName"
                            :pending="loading"
                            :classes="['btn', 'kyc-nav__button']"
                        >
                            <svg
                                width="30"
                                height="16"
                                viewBox="0 0 30 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M21.5 0L20.1 1.4L25.7 7H0V9H25.7L20.1 14.6L21.5 16L29.5 8L21.5 0Z"
                                    fill="white"
                                /></svg
                        ></action-button>
                    </div>
                    <div class="kyc-nav__actions" v-else>
                        <action-button
                            type="submit"
                            :pending="loading"
                            :disabled="!itemData.disclosureName"
                            icon
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                        <a
                            class="underline"
                            v-if="getKYC.ninFetchStatus === 'SKIPPED'"
                            @click="enterNIN = true"
                            >Enter NIN to fast track your verificatiom</a
                        >
                        <a href="#">Hide</a>
                    </div>
                </div>
            </form>
        </template>
        <template v-else-if="getNavbarNextKYC.nextKYC[0] === 'bvn'">
            <form @submit.prevent="submitBVN">
                <div class="kyc-nav container">
                    <div class="kyc-nav__text">
                        <h5>BVN Verification</h5>
                        <p>
                            <small>Enter your Bank Verification Number</small>
                        </p>
                        <p
                            class="skip-button"
                            v-if="
                                getWindowWidth !== 'mobile' && getKYC.ninFetchStatus === 'SKIPPED'
                            "
                        >
                            <a class="underline" @click="enterNIN = true"
                                >Enter NIN to fast track your verificatiom</a
                            >
                        </p>
                    </div>
                    <div class="kyc-nav__field">
                        <Field :field="bvnField" @input="handleInput" v-model="itemData.bvn" />
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a href="#">Hide</a>
                        <action-button
                            :disabled="!itemData.bvn"
                            type="submit"
                            :pending="loading"
                            :classes="['btn', 'kyc-nav__button']"
                        >
                            <svg
                                width="30"
                                height="16"
                                viewBox="0 0 30 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M21.5 0L20.1 1.4L25.7 7H0V9H25.7L20.1 14.6L21.5 16L29.5 8L21.5 0Z"
                                    fill="white"
                                /></svg
                        ></action-button>
                    </div>
                    <div class="kyc-nav__actions" v-else>
                        <action-button
                            type="submit"
                            :disabled="!itemData.bvn"
                            :pending="loading"
                            icon
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                        <a
                            class="underline"
                            v-if="getKYC.ninFetchStatus === 'SKIPPED'"
                            @click="enterNIN = true"
                            >Enter NIN to fast track your verificatiom</a
                        >
                        <a href="#">Hide</a>
                    </div>
                </div>
            </form>
        </template>
        <template v-else-if="getNavbarNextKYC.nextKYC[0] === 'phone'">
            <div class="kyc-nav container">
                <div class="kyc-nav__text">
                    <h5>Verify Phone</h5>
                    <p>
                        <small
                            >Do you wish to use your registered phone number({{
                                getKYC.phone
                            }})?</small
                        >
                    </p>
                    <p>
                        <small
                            ><a class="underline" @click="showUseNewPhone">Click here</a> to use a
                            different phone number</small
                        >
                    </p>
                </div>
                <div class="kyc-nav__field">
                    <!-- <Field :field="OTPField" @input="handleInput" v-model="itemData.otp" /> -->
                </div>
                <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                    <a href="#">Hide</a>
                    <button type="button" @click="confirmPhone" class="btn kyc-nav__button">
                        <svg
                            width="30"
                            height="16"
                            viewBox="0 0 30 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M21.5 0L20.1 1.4L25.7 7H0V9H25.7L20.1 14.6L21.5 16L29.5 8L21.5 0Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
                <div class="kyc-nav__actions" v-else>
                    <button type="button" @click="confirmPhone" class="btn btn-block btn__primary">
                        Continue
                    </button>
                    <div>
                        <a href="#">Hide</a>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="getNavbarNextKYC.nextKYC[0] === 'nin'">
            <form @submit.prevent="submitNIN">
                <div class="kyc-nav container">
                    <div class="kyc-nav__text">
                        <h5>National Identity</h5>
                        <p>
                            <small
                                >Enter your national identity number to fast track your verification
                                process</small
                            >
                        </p>
                        <p class="skip-button" v-if="getWindowWidth !== 'mobile'">
                            <button class="btn btn__white btn-small" type="button" @click="skipNIN">
                                Skip
                            </button>
                        </p>
                    </div>
                    <div class="kyc-nav__field">
                        <Field :field="ninField" @input="handleInput" v-model="itemData.nin" />
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a href="#">Hide</a>
                        <action-button
                            type="submit"
                            :disabled="!itemData.nin"
                            :pending="loading"
                            :classes="['btn', 'kyc-nav__button']"
                        >
                            <svg
                                width="30"
                                height="16"
                                viewBox="0 0 30 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M21.5 0L20.1 1.4L25.7 7H0V9H25.7L20.1 14.6L21.5 16L29.5 8L21.5 0Z"
                                    fill="white"
                                /></svg
                        ></action-button>
                    </div>
                    <div class="kyc-nav__actions" v-else>
                        <action-button
                            type="submit"
                            :disabled="!itemData.nin"
                            :pending="loading"
                            icon
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                        <div>
                            <a class="skip" href="" @click="skipNIN">Skip</a>
                            <a href="#">Hide</a>
                        </div>
                    </div>
                </div>
            </form>
        </template>
        <template v-else>
            <div>
                <div class="kyc-nav container">
                    <div class="kyc-nav__text">
                        <h5>{{ selectedField.title }}</h5>
                        <p>
                            <small>{{ selectedField.subtitle }}</small>
                        </p>
                        <p
                            class="skip-button"
                            v-if="
                                getWindowWidth !== 'mobile' && getKYC.ninFetchStatus === 'SKIPPED'
                            "
                        >
                            <a class="underline" @click="enterNIN = true"
                                >Enter NIN to fast track your verificatiom</a
                            >
                        </p>
                    </div>
                    <div class="kyc-nav__field"></div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a href="#">Hide</a>
                        <button type="button" class="btn kyc-nav__button" @click="showNextModalBtn">
                            <svg
                                width="30"
                                height="16"
                                viewBox="0 0 30 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M21.5 0L20.1 1.4L25.7 7H0V9H25.7L20.1 14.6L21.5 16L29.5 8L21.5 0Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="kyc-nav__actions" v-else>
                        <button
                            @click="showNextModalBtn"
                            type="buttom"
                            class="btn btn-block btn__primary"
                        >
                            Continue
                        </button>
                        <a
                            class="underline"
                            v-if="getKYC.ninFetchStatus === 'SKIPPED'"
                            @click="enterNIN = true"
                            >Enter NIN to fast track your verificatiom</a
                        >
                        <div>
                            <a href="#">Hide</a>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <error-block type="kyc" navbar v-if="getErrorLog.source === 'navbar'" />
        <modal no-header @close="showOTP = false" v-if="showOTP">
            <form @submit.prevent="useNewPhone" v-if="showNewPhone">
                <p class="text-center mb-3">Enter your details to confirm your new phone number</p>
                <div class="accounts-settings__group--modal">
                    <label class="form__label"
                        >Date of Birth
                        <input
                            class="form__input"
                            type="date"
                            name="dob"
                            @input="handleDate($event)"
                    /></label>
                </div>
                <div class="accounts-settings__group--modal">
                    <label class="form__label"
                        >Select Country
                        <select class="form__input form__select" v-model="newPhone.countryCode">
                            <template v-if="getCountryCodes.length > 0">
                                <option
                                    :value="country.callingCodes[0]"
                                    v-for="(country, index) in getCountryCodes"
                                    :key="index"
                                    :selected="country.name === 'Nigeria'"
                                    >{{ country.name
                                    }}{{ ` (+${country.callingCodes[0]})` }}</option
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
                        :disabled="Object.keys(itemData).length < 3"
                        type="submit"
                        :pending="loading"
                        :classes="['btn-block', 'btn__primary']"
                        >Submit</action-button
                    >
                </section>
                <p class="text-center">
                    <small
                        ><a @click="backToUsePhone" class="underline primary">Go back</a> to use
                        your registered phone number</small
                    >
                </p>
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
                        ><a @click="showNewPhone = true" class="underline primary">Click here</a> to
                        use a different phone number</small
                    >
                </div>
            </form>
        </modal>

        <modal @close="showNextModal = false" v-if="showNextModal">
            <template slot="header">{{ selectedField.title }}</template>
            <ModalKYC :requiredFields="selectedField.fields" @updated="showNextModal = false" />
        </modal>

        <EnterNIN v-if="enterNIN" />
    </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Field from "./KYCField";
import ModalKYC from "./ModalKYC";
import KYCTitles from "../../services/kyc/kycTitles";

export default {
    name: "kyc-navbar",
    components: {
        Field,
        ModalKYC,
        EnterNIN: () => import("./EnterNIN")
    },
    data() {
        return {
            disclosureField: {
                name: "Disclosure Name",
                type: "text",
                value: "disclosureName"
            },
            bvnField: {
                name: "BVN",
                value: "bvn",
                type: "number"
            },
            OTPField: {
                name: "OTP",
                value: "otp",
                type: "number"
            },
            ninField: {
                name: "NIN",
                value: "nin",
                type: "number"
            },
            selectedField: {},
            showNextModal: false,
            allNextKYC: KYCTitles.titles,
            itemData: {},
            loading: false,
            fromNavbar: false,
            showOTP: false,
            showNewPhone: false,
            countdown: null,
            smsSender: 0,
            newPhone: {},
            otpData: {},
            enterNIN: false
        };
    },
    computed: {
        ...mapGetters([
            "getWindowWidth",
            "getKYC",
            "getNavbarNextKYC",
            "getCountryCodes",
            "getNavbarTrigger",
            "getErrorLog",
            "getKYC"
        ]),
        currentIndex() {}
    },
    methods: {
        ...mapActions([
            "GET_KYC",
            "GET_NEXT_KYC",
            "UPDATE_KYC",
            "UPDATE_KYC_NIN",
            "RESOLVE_BVN",
            "RESOLVE_OTP",
            "GET_COUNTRY_CODES",
            "USE_BVN_PHONE"
        ]),
        ...mapMutations(["SET_NAVBAR_TRIGGER"]),
        handleInput(e) {
            this.$set(this.itemData, e.name, e.value);
        },
        submitDisclosure() {
            const payload = { ...this.itemData };
            payload.source = "navbar";
            this.loading = true;
            this.UPDATE_KYC(payload).then(resp => {
                this.loading = false;
                if (resp) {
                    this.checkNextKYC();
                    this.itemData = {};
                }
            });
        },
        submitBVN() {
            const payload = { ...this.itemData };
            payload.source = "navbar";
            this.loading = true;
            this.RESOLVE_BVN(payload).then(resp => {
                this.loading = false;
                if (resp) {
                    this.checkNextKYC();
                    this.itemData = {};
                }
            });
        },
        submitNIN() {
            const payload = { ...this.itemData };
            payload.source = "navbar";
            this.loading = true;
            this.UPDATE_KYC_NIN(payload).then(resp => {
                this.loading = false;
                if (resp) {
                    this.checkNextKYC();
                    this.itemData = {};
                }
            });
        },
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
                if (Math.floor(counting % 60) <= 0) {
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
        confirmPhone() {
            this.useBVNPhone();
        },
        showUseNewPhone() {
            this.showOTP = true;
            this.showNewPhone = true;
        },
        handleDate(e) {
            if (e.target.value) {
                this.newPhone.dob = new Date(e).toISOString();
            }
        },
        backToUsePhone() {
            this.showNewPhone = false;
            this.resendOTPWhatsapp();
        },
        showNextModalBtn() {
            this.showNextModal = true;
        },
        checkNextKYC() {
            this.allNextKYC.forEach(element => {
                element.fields.forEach(el => {
                    if (el === this.getNavbarNextKYC.nextKYC[0]) {
                        this.selectedField = element;
                        this.selectedField.fields = this.getNavbarNextKYC.nextKYC;
                    }
                });
            });
        },
        skipNIN() {
            this.loading = true;
            this.UPDATE_KYC_NIN({ nin: "skip" }).then(resp => {
                this.loading = false;
                if (resp) {
                    this.itemData = {};
                }
            });
        }
    },
    async mounted() {
        await this.GET_NEXT_KYC();
        if (Object.keys(this.getNavbarNextKYC).length > 0) this.checkNextKYC();
        await this.GET_COUNTRY_CODES();
        await this.GET_KYC();
    },
    watch: {
        getNavbarTrigger(newVal) {
            if (newVal) {
                this.checkNextKYC();
                this.SET_NAVBAR_TRIGGER(false);
            }
        }
    }
};
</script>
