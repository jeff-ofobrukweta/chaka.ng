<template>
    <modal @close="closeModal" v-if="final">
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
                        <div class="kyc-modal__popular--div">
                            <div>
                                <img
                                    src="../../assets/img/dp.png"
                                    class="kyc-modal__popular--logo"
                                    alt=""
                                />
                            </div>
                            <h5>Netflix</h5>
                            <div>
                                <img
                                    src="../../assets/img/flags/us-flag.svg"
                                    class="kyc-modal__popular--flag"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="kyc-modal__popular--div">
                            <div>
                                <img
                                    src="../../assets/img/dp.png"
                                    class="kyc-modal__popular--logo"
                                    alt=""
                                />
                            </div>
                            <h5>Netflix</h5>
                            <div>
                                <img
                                    src="../../assets/img/flags/us-flag.svg"
                                    class="kyc-modal__popular--flag"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                    </div>
                </div>
            </div>
        </div>
    </modal>
    <modal @close="closeModal" v-else-if="finalFund">
        <template slot="header">Funding Activated</template>
        <div>
            <div class="kyc-modal">
                <div class="text-center mb-3">
                    <p class="kyc-modal__small">
                        You can now fund your Naira and Dollar wallet to trade local and global
                        markets
                    </p>
                    <br />
                    <div>
                        <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                    </div>
                    <div class="mt-2" v-if="resume">
                        <small
                            ><a class="underline" @click="showFund"
                                >Continue your Verification</a
                            ></small
                        >
                    </div>
                </div>
            </div>
        </div>
    </modal>
    <modal @close="closeModal" v-else-if="finalGlobal">
        <template slot="header">Processing Global Verification</template>
        <div>
            <div class="kyc-modal">
                <div class="text-center mb-3">
                    <p class="kyc-modal__small">
                        Your profile is being verified for global trading. You can now fund your
                        Naira or Dollar wallet.
                    </p>
                    <br />
                    <div>
                        <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                    </div>
                    <div class="mt-2" v-if="resume">
                        <small
                            ><a class="underline" @click="showResume"
                                >Continue Local Verification</a
                            ></small
                        >
                    </div>
                </div>
            </div>
        </div>
    </modal>
    <modal @close="closeModal" v-else-if="finalLocal">
        <template slot="header">Processing Local Verification</template>
        <div>
            <div class="kyc-modal">
                <div class="text-center mb-3">
                    <p class="kyc-modal__small">
                        Your profile is being verified for local trading. You can now fund your
                        Naira or Dollar wallet.
                    </p>
                    <br />
                    <div>
                        <button class="btn btn__primary" @click="showFund">Fund Wallet</button>
                    </div>
                    <div class="mt-2" v-if="resume">
                        <small
                            ><a class="underline" @click="showFund"
                                >Continue Global Verification</a
                            ></small
                        >
                    </div>
                </div>
            </div>
        </div>
    </modal>
    <modal @close="closeModal" v-else>
        <template slot="header">{{ title || "Complete your verification to proceed" }}</template>
        <div v-if="allFields.length > 0">
            <template v-if="allFields[0].value === 'phone'">
                <PhoneOTP @close="OTPSuccess" />
            </template>
            <template v-else>
                <form
                    class="kyc-modal"
                    @submit.prevent="updateKYC"
                    :class="{ 'kyc-modal__uploads': allFields[0].value.endsWith('Url') }"
                >
                    <div class="text-center mb-3" v-if="allFields[0].value === 'nin'">
                        <p>
                            <small class="grey-cool"
                                >Enter your national identity number to fast track your verification
                                process</small
                            >
                        </p>
                    </div>
                    <Fragment v-for="(field, i) in allFields" :key="i">
                        <template v-if="field.value === 'bvn'">
                            <Field
                                :field="field"
                                @input="handleInput"
                                @click.native="errors = {}"
                                :error-message="errors.bvn"
                        /></template>
                        <template v-else-if="field.value === 'bankAcctNo'">
                            <Field
                                :field="field"
                                @input="handleInput"
                                @click.native="errors = {}"
                                :error-message="errors.bankAcctNo"
                        /></template>
                        <template v-else-if="field.value === 'bankCode'">
                            <Field
                                :field="field"
                                @input="handleInput"
                                @click.native="errors = {}"
                                :error-message="errors.bankCode"
                                :options="checkOptions(field)"
                        /></template>
                        <template v-else>
                            <Field
                                :field="field"
                                @input="handleInput"
                                :options="checkOptions(field)"
                        /></template>

                        <div v-if="field.value === 'pepStatus' && showPepStatus">
                            <div class="kyc-field__group">
                                <label class="form__label"
                                    >Name of Politically Exposed Person
                                    <form-input
                                        type="text"
                                        @reset="errors = {}"
                                        name="pepNames"
                                        v-model="pepNames.pepNames"
                                        placeholder="Name of Politically Exposed Person"
                                        :error-message="errors.pepNames"
                                /></label>
                            </div>
                        </div>

                        <div v-if="field.value === 'directorOfPublicCo' && showDirector">
                            <div class="kyc-field__group">
                                <label class="form__label"
                                    >Company Ticker Symbol
                                    <form-input
                                        type="text"
                                        @reset="errors = {}"
                                        name="directorName"
                                        v-model="director.name"
                                        placeholder="Company Ticker Symbol"
                                        :error-message="errors.directorName"
                                /></label>
                            </div>
                        </div>

                        <div v-if="field.value === 'employmentStatus' && showEmployment">
                            <div class="kyc-field__group">
                                <label class="form__label"
                                    >Employment Company
                                    <form-input
                                        type="text"
                                        name="employmentCompany"
                                        @reset="errors = {}"
                                        v-model="employment.employmentCompany"
                                        placeholder="Employment Details"
                                        :error-message="errors.employmentCompany"
                                /></label>
                            </div>
                            <div class="kyc-field__group">
                                <label class="form__label"
                                    >Employment Type
                                    <select
                                        class="form__input"
                                        name="employmentType"
                                        v-model="employment.employmentType"
                                        @focus="errors = {}"
                                        :error-message="errors.employmentType"
                                    >
                                        <option
                                            v-for="(option, i) in types"
                                            :key="i"
                                            :value="option.value"
                                            >{{ option.text }}</option
                                        >
                                    </select>
                                    <p class="form-error" v-if="errors.employmentType">
                                        <small>{{ errors.employmentType }}</small>
                                    </p></label
                                >
                            </div>
                            <div class="kyc-field__group">
                                <label class="form__label"
                                    >Employment Position
                                    <select
                                        class="form__input"
                                        name="employmentPosition"
                                        @focus="errors = {}"
                                        v-model="employment.employmentPosition"
                                        :error-message="errors.employmentPosition"
                                    >
                                        <option
                                            v-for="(option, i) in positions"
                                            :key="i"
                                            :value="option.value"
                                            >{{ option.text }}</option
                                        >
                                    </select>
                                    <p class="form-error" v-if="errors.employmentPosition">
                                        <small>{{ errors.employmentPosition }}</small>
                                    </p></label
                                >
                            </div>
                        </div>
                    </Fragment>

                    <error-block type="kyc" v-if="getErrorLog.source === 'modal'" />
                    <div class="text-center" v-if="!isFileImage">
                        <action-button
                            type="submit"
                            :disabled="!formComplete || Object.keys(errors).length > 0"
                            :pending="loading"
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                    </div>
                    <div class="text-center mt-2" v-if="allFields[0].value === 'nin'">
                        <a @click="skipNIN" class="unerline primary" v-if="!nin">Skip</a>
                    </div>
                </form>
            </template>
        </div>
    </modal>
</template>

<script>
import { Fragment } from "vue-fragment";
import { mapActions, mapMutations, mapGetters } from "vuex";
import Field from "./KYCField";
import AllKYCFields from "../../services/kyc/index";
import Types from "../../services/kyc/employmentTypes";
import Positions from "../../services/kyc/employmentPosition";
import Banks from "../../services/kyc/banks";
import lg from "../../services/kyc/lgNames";
import KYCTitles from "../../services/kyc/kycTitles";
import EventBus from "../../event-bus";

export default {
    name: "kyc-modal",
    components: {
        PhoneOTP: () => import("./PhoneOTP"),
        Field,
        Fragment
    },
    props: {
        requiredFields: {
            type: Array,
            required: true
        },
        title: {
            type: String
        },
        nin: {
            type: Boolean
        },
        final: {
            type: Boolean
        },
        finalLocal: {
            type: Boolean
        },
        finalGlobal: {
            type: Boolean
        },
        finalFund: {
            type: Boolean
        },
        resume: {
            type: Boolean
        }
    },
    data() {
        return {
            allFields: [],
            lg: lg.lgNames,
            banks: Banks.banks,
            positions: Positions.position,
            types: Types.company,
            loading: false,
            itemData: {},
            state: null,
            formComplete: false,
            employment: {},
            pepNames: {},
            director: {},
            showEmployment: true,
            showPepStatus: false,
            showDirector: false,
            allNextKYC: KYCTitles.titles,
            selectedField: {},
            errors: {}
        };
    },
    computed: {
        ...mapGetters(["getErrorLog", "getNextKYC"]),
        isFileImage() {
            const test = this.requiredFields[0];
            const stripped = test.substr(test.length - 3);
            return stripped.toLowerCase() === "url";
        }
    },
    methods: {
        ...mapActions([
            "RESOLVE_BVN",
            "UPDATE_KYC_BANK",
            "UPDATE_KYC_NIN",
            "UPDATE_KYC",
            "UPLOAD_KYC_FILE"
        ]),
        ...mapMutations(["RESET_REQ", "SET_NAVBAR_TRIGGER", "SET_FUND_MODAL"]),
        handleInput(e) {
            this.itemData[e.name] = e.value;
            this.errors = {};
            if (e.name === "employmentStatus") {
                if (e.value !== "UNEMPLOYED") {
                    this.showEmployment = true;
                } else {
                    this.showEmployment = false;
                }
            }
            if (e.name === "pepStatus") {
                if (e.value === true) {
                    this.showPepStatus = true;
                } else {
                    this.showPepStatus = false;
                }
            }
            if (e.name === "directorOfPublicCo") {
                if (e.value === true) {
                    this.showDirector = true;
                } else {
                    this.showDirector = false;
                }
            }
            this.formComplete =
                Object.keys(this.itemData).length >= this.selectedField.fields.length;
        },
        OTPSuccess() {
            this.nextStep();
            // this.SET_NAVBAR_TRIGGER(true);
            // this.$emit("updated");
        },
        updateKYC() {
            Object.keys(this.itemData).forEach(el => {
                if (el === "bvn") this.state = "bvn";
                else if (el === "nin") this.state = "nin";
                else if (el === "bankCode" || el === "bankAcctNo") this.state = "bank";
                else if (
                    el === "employmentStatus" ||
                    el === "directorOfPublicCo" ||
                    el === "pepStatus"
                )
                    this.state = "employment";
                else if (el === "addressProofUrl" || el === "idPhotoUrl" || el === "passportUrl")
                    this.state = "file";
                else this.state = "default";
            });
            this.loading = true;
            const payload = { ...this.itemData };
            payload.source = "modal";
            if (this.state === "bvn") {
                if (Number.isNaN(+this.itemData.bvn)) {
                    this.$set(this.errors, "bvn", "BVN should be a number");
                    this.loading = false;
                    return false;
                }
                if (this.itemData.bvn.length !== 11) {
                    this.$set(this.errors, "bvn", "BVN should be 11 digits");
                }
                if (Object.keys(this.errors).length > 0) {
                    this.loading = false;
                    return false;
                }
                this.RESOLVE_BVN(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.nextStep();
                        // this.SET_NAVBAR_TRIGGER(true);
                        // this.$emit("updated");
                    }
                });
            } else if (this.state === "nin") {
                this.UPDATE_KYC_NIN(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.nextStep();
                        // this.SET_NAVBAR_TRIGGER(true);
                        // this.$emit("updated");
                    }
                });
            } else if (this.state === "bank") {
                if (!this.itemData.bankAcctNo) {
                    this.$set(this.errors, "bankAcctNo", "Account number is required");
                }
                if (!this.itemData.bankCode) {
                    this.$set(this.errors, "bankCode", "Bank name is required");
                }
                if (Object.keys(this.errors).length > 0) {
                    this.loading = false;
                    return false;
                }
                if (Number.isNaN(+this.itemData.bankAcctNo)) {
                    this.$set(
                        this.errors,
                        "bankAcctNo",
                        "Account number should be a 10 digit number"
                    );
                    this.loading = false;
                    return false;
                }
                if (this.itemData.bankAcctNo.length !== 10) {
                    this.$set(this.errors, "bankAcctNo", "Account number should be 10 digits");
                }
                if (Object.keys(this.errors).length > 0) {
                    this.loading = false;
                    return false;
                }
                this.UPDATE_KYC_BANK(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.nextStep();
                        // this.SET_NAVBAR_TRIGGER(true);
                        // this.$emit("updated");
                    }
                });
            } else if (this.state === "employment") {
                if (this.showEmployment) {
                    if (!this.employment.employmentType) {
                        this.$set(this.errors, "employmentType", "Company type is required");
                    }
                    if (!this.employment.employmentCompany) {
                        this.$set(this.errors, "employmentCompany", "Company name is required");
                    }
                    if (!this.employment.employmentPosition) {
                        this.$set(
                            this.errors,
                            "employmentPosition",
                            "Employment position is required"
                        );
                    }
                }
                if (this.showDirector && !this.director.name) {
                    this.$set(this.errors, "directorName", "Company ticker symbol is required");
                }
                if (this.showPepStatus && !this.pepNames.pepNames) {
                    this.$set(this.errors, "pepNames", "Name is required");
                }

                if (Object.keys(this.errors).length > 0) {
                    this.loading = false;
                    return false;
                }
                if (this.showEmployment) {
                    Object.entries(this.employment).forEach(([key, value]) => {
                        payload[key] = value;
                    });
                }
                if (this.showPepStatus) {
                    payload.pepNames = this.pepNames.pepNames;
                }
                if (this.showDirector) {
                    payload.directorOfPublicCo = this.director.name;
                } else {
                    payload.directorOfPublicCo = "";
                }
                this.UPDATE_KYC(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.nextStep();
                        // this.SET_NAVBAR_TRIGGER(true);
                        // this.$emit("updated");
                    }
                });
            } else if (this.state === "file") {
                this.UPLOAD_KYC_FILE(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.nextStep();
                        // this.SET_NAVBAR_TRIGGER(true);
                        // this.$emit("updated");
                    }
                });
            } else {
                if (Object.keys(this.itemData).length <= 0) {
                    this.loading = false;
                    return true;
                }
                this.UPDATE_KYC(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.nextStep();
                        // this.SET_NAVBAR_TRIGGER(true);
                        // this.$emit("updated");
                    }
                });
            }
        },
        checkOptions(type) {
            if (type.value === "employmentType") {
                return this.types;
            }
            if (type.value === "employmentPosition") {
                return this.positions;
            }
            if (type.value === "bankCode") {
                return this.banks;
            }
            if (type.value === "lg") {
                return this.lg;
            }
            return [];
        },
        skipNIN() {
            this.loading = true;
            this.UPDATE_KYC_NIN({ nin: "skip" }).then(resp => {
                this.loading = false;
                if (resp) {
                    this.nextStep();
                    // this.SET_NAVBAR_TRIGGER(true);
                    // this.$emit("updated");
                }
            });
        },
        closeModal() {
            this.$emit("close");
        },
        nextStep() {
            this.SET_NAVBAR_TRIGGER(true);
            this.$emit("updated");
            // setTimeout(() => {
            //     this.mount();
            // }, 100);
        },
        showFund() {
            this.SET_FUND_MODAL(true);
            this.$emit("close");
        },
        mount() {
            console.log("I was checked on modal");
            this.allFields = [];
            this.selectedField = {};
            this.itemData = {};
            this.RESET_REQ();
            /**
             * Refactor code for child to determine actionType and act on it instead of being passed as a prop
             */
            // this.allNextKYC.forEach(element => {
            //     element.fields.forEach(el => {
            //         if (el === this.getNextKYC.nextKYC[0]) {
            //             this.selectedField = element;
            //             this.selectedField.fields = this.getNextKYC.nextKYC;
            //         }
            //     });
            // });
            this.requiredFields.map(required => {
                const all = AllKYCFields.filter(el => {
                    if (required === el.value) {
                        this.allFields.push(el);
                        return el;
                    }
                });
            });
        }
    },
    async mounted() {
        this.mount();
        EventBus.$on("modal-trigger", () => {
            this.mount();
        });
    }
};
</script>
