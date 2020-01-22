<template>
    <section class="kyc-nav__section" v-if="getNavbarNextKYC.status === 'INCOMPLETE'">
        <template v-if="getNavbarNextKYC.nextKYC[0] === 'disclosureName'">
            <form @submit.prevent="submitDisclosure">
                <div class="kyc-nav container">
                    <div class="kyc-nav__text">
                        <h5>Complete Your Verification</h5>
                        <p>
                            <small>
                                By typing to sign my name below I acknowledge that I have read and
                                agree to
                                <a
                                    class="underline"
                                    href="https://apps.drivewealth.com/disclosures?sweepType=bank"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    >Drivewealth Disclosures</a
                                >,
                                <a
                                    class="underline"
                                    href="https://drivewealth.com/customer-account-agreement?lang=en_US"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    >DriveWealth Account Agreement</a
                                >
                                and
                                <a
                                    class="underline"
                                    href="https://apps.drivewealth.io/disclosures/?citizenship=NG&showOnlyTaxDoc=true"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    >W8-BEN Agreement Disclosure</a
                                ></small
                            >
                        </p>
                    </div>

                    <div class="kyc-nav__field">
                        <Field
                            :field="disclosureField"
                            placeholder="Enter your full name"
                            @input="handleInput"
                            no-label
                            inline
                        />
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a @click="hideKYCBtn">Hide</a>
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
                            @click="showNextModalBtn('nin')"
                            ><small>Enter your NIN to fast track your verification</small></a
                        >
                        <a @click="hideKYCBtn">Hide</a>
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
                            <a class="underline" @click="showNextModalBtn('nin')"
                                ><small>Enter your NIN to fast track your verification</small></a
                            >
                        </p>
                    </div>
                    <div class="kyc-nav__field">
                        <Field
                            :field="bvnField"
                            @input="handleInput"
                            v-model="itemData.bvn"
                            @click.native="issues = {}"
                            :error-message="issues.bvn"
                            navbar
                            inline
                            no-label
                        />
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a @click="hideKYCBtn">Hide</a>
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
                            @click="showNextModalBtn('nin')"
                            ><small>Enter your NIN to fast track your verification</small></a
                        >
                        <a @click="hideKYCBtn">Hide</a>
                    </div>
                </div>
            </form>
        </template>
        <template v-else-if="getNavbarNextKYC.nextKYC[0] === 'phone'">
            <div class="kyc-nav container">
                <div class="kyc-nav__text kyc-nav__text--stretch">
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
                <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                    <a @click="hideKYCBtn">Hide</a>
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
                        <a @click="hideKYCBtn">Hide</a>
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
                            <a class="underline" @click="skipNIN">
                                <small>Skip</small>
                            </a>
                        </p>
                    </div>
                    <div class="kyc-nav__field">
                        <Field
                            :field="ninField"
                            @input="handleInput"
                            v-model="itemData.nin"
                            inline
                            no-label
                        />
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a @click="hideKYCBtn">Hide</a>
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
                            <a @click="hideKYCBtn">Hide</a>
                        </div>
                    </div>
                </div>
            </form>
        </template>
        <template v-else>
            <div>
                <div class="kyc-nav container">
                    <div class="kyc-nav__text kyc-nav__text--stretch">
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
                            <a class="underline" @click="showNextModalBtn('nin')"
                                ><small>Enter your NIN to fast track your verification</small></a
                            >
                        </p>
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a @click="hideKYCBtn">Hide</a>
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
                            @click="showNextModalBtn('nin')"
                            ><small>Enter your NIN to fast track your verification</small></a
                        >
                        <div>
                            <a @click="hideKYCBtn">Hide</a>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <error-block type="kyc" navbar v-if="getErrorLog.source === 'navbar'" />
        <modal @close="showOTP = false" v-if="showOTP">
            <template slot="header">Verify Your Phone</template>
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
                        :disabled="Object.keys(newPhone).length < 3"
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
                    <small
                        ><a @click="showNewPhone = true" class="underline small"
                            >Use another phone number</a
                        ></small
                    >
                    <br />
                    <br />
                    <template v-if="!countdown">
                        <div class="accounts-settings__resend">
                            <p>
                                <small>
                                    <a class="underline small" @click="resendOTPEmail"
                                        >Resend Via Email</a
                                    ></small
                                >
                            </p>
                            <p>
                                <small
                                    ><a class="underline small" @click="resendOTPWhatsapp"
                                        >Resend Via Whatsapp</a
                                    ></small
                                >
                            </p>
                        </div>
                    </template>

                    <p class="countdown--account" v-else>
                        <span class="countdown__text">Resend in</span>&nbsp;
                        <span>{{ countdown }}</span>
                    </p>
                </div>
            </form>
        </modal>

        <modal-kyc
            @updated="handleUpdate"
            @skipnin="enterNIN = false"
            @close="showNextModal = false"
            v-if="showNextModal"
            navbar
            :nin="enterNIN"
        />
    </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Field from "./KYCField";
import KYCTitles from "../../services/kyc/kycTitles";
import EventBus from "../../event-bus";

export default {
    name: "kyc-navbar",
    components: {
        Field
    },
    data() {
        return {
            disclosureField: {
                name: "Disclosure Name",
                type: "text",
                value: "disclosureName",
                placeholder: "Enter your full name"
            },
            bvnField: {
                name: "BVN",
                value: "bvn",
                type: "number",
                placeholder: "Enter your BVN number"
            },
            OTPField: {
                name: "OTP",
                value: "otp",
                type: "number"
            },
            ninField: {
                name: "NIN",
                value: "nin",
                type: "number",
                placeholder: "Enter your NIN number"
            },
            ninFields: {
                title: "National Identity Number",
                subtitle: "Enter your NIN details",
                fields: ["nin"]
            },
            selectedField: {},
            showNextModal: false,
            allNextKYC: KYCTitles.titles,
            itemData: {},
            loading: false,
            showOTP: false,
            showNewPhone: false,
            countdown: null,
            smsSender: 0,
            newPhone: {},
            otpData: {},
            enterNIN: false,
            issues: {}
        };
    },
    computed: {
        ...mapGetters([
            "getWindowWidth",
            "getKYC",
            "getNavbarNextKYC",
            "getCountryCodes",
            "getErrorLog",
            "getKYC"
        ])
        // checkError(){
        //     if(this.itemData.bvn){
        //         if(this.itemData.bvn.length > 11){
        //             this.issues = {
        //                 bvn: 'BVN should be 11 digits'
        //             }
        //         }
        //     }
        // }
    },
    methods: {
        ...mapActions([
            "GET_KYC",
            "GET_NAVBAR_NEXT_KYC",
            "UPDATE_KYC",
            "UPDATE_KYC_NIN",
            "RESOLVE_BVN",
            "RESOLVE_OTP",
            "GET_COUNTRY_CODES",
            "USE_BVN_PHONE",
            "GET_MOST_POPULAR"
        ]),
        ...mapMutations(["SET_SHOW_NAVBAR_KYC"]),
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
                    this.showNextModalBtn();
                    this.itemData = {};
                }
            });
        },
        submitBVN() {
            if (Number.isNaN(+this.itemData.bvn)) {
                this.issues = {
                    bvn: "BVN should be a number"
                };
                return false;
            }
            if (this.itemData.bvn.length < 11) {
                this.issues = {
                    bvn: "BVN should be 11 digits"
                };
                return false;
            }
            if (Object.keys(this.issues).length > 0) {
                return false;
            }
            const payload = { ...this.itemData };
            payload.source = "navbar";
            this.loading = true;
            this.RESOLVE_BVN(payload).then(resp => {
                this.loading = false;
                if (resp) {
                    this.confirmPhone();
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
            // TO-DO
            // Include Phone validation if needed

            // if (Number.isNaN(+this.newPhone.phone)) {
            //     this.issues = {
            //         phone: "Phone should be a number"
            //     };
            //     return false;
            // }
            // if (this.newPhone.phone.length < 11) {
            //     this.issues = {
            //         phone: "Phone number should be 11 digits"
            //     };
            //     return false;
            // }
            // if (Object.keys(this.issues).length > 0) {
            //     return false;
            // }
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
                    this.showNextModalBtn();
                    this.showOTP = false;
                    this.itemData = {};
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
                this.newPhone.dob = new Date(e.target.value).toISOString();
            }
        },
        backToUsePhone() {
            this.showNewPhone = false;
            this.resendOTPWhatsapp();
        },
        showNextModalBtn(nin) {
            if (nin === "nin") {
                this.enterNIN = true;
            } else {
                this.closeNIN();
            }
            this.checkNextKYC();
            // EventBus.$emit("modal-trigger");
            // EventBus.$emit("navbar-trigger");
            this.showNextModal = true;
        },
        checkNextKYC() {
            this.resetFields();
            if (Object.keys(this.getNavbarNextKYC).length > 0) {
                this.selectedField = {};
                this.allNextKYC.forEach(element => {
                    element.fields.forEach(el => {
                        if (el === this.getNavbarNextKYC.nextKYC[0]) {
                            this.selectedField = element;
                            this.selectedField.fields = this.getNavbarNextKYC.nextKYC;
                        }
                    });
                });
            }
        },
        skipNIN() {
            this.loading = true;
            this.UPDATE_KYC_NIN({ nin: "skip" }).then(resp => {
                this.loading = false;
                if (resp) {
                    this.itemData = {};
                }
                this.showNextModalBtn();
            });
        },
        closeNIN() {
            // EventBus.$emit("navbar-trigger");
            // EventBus.$emit("modal-trigger");
            this.enterNIN = false;
        },
        hideKYCBtn() {
            this.SET_SHOW_NAVBAR_KYC(false);
        },
        handleUpdate(value) {
            this.showNextModalBtn();
            // this.showNextModal = false
        },
        resetFields() {
            this.itemData = {};
            this.issues = {};
            this.otpData = {};
            this.selectedField = {};
        }
    },
    async mounted() {
        await this.GET_NAVBAR_NEXT_KYC();
        if (Object.keys(this.getNavbarNextKYC).length > 0) {
            this.checkNextKYC();
        }
        await this.GET_COUNTRY_CODES();
        await this.GET_KYC();
        EventBus.$on("navbar-trigger", () => {
            this.checkNextKYC();
        });
        await this.GET_MOST_POPULAR();
    },
    watch: {
        "itemData.bvn": function(newVal) {
            if (newVal) {
                if (newVal.length > 11) {
                    this.issues = {
                        bvn: "BVN should be 11 digits"
                    };
                } else {
                    this.issues = {};
                }
            }
        }
        // TO-DO
        // Include Phone validation if needed

        // "newPhone.phone"(newVal) {
        //     if (newVal) {
        //         if (newVal.length > 11) {
        //             this.issues = {
        //                 phone: "Phone number should be 11 digits"
        //             };
        //         } else {
        //             this.issues = {};
        //         }
        //     }
        // }
    }
};
</script>
