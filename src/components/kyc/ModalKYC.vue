<template>
    <modal @close="closeModal">
        <template slot="header">{{ title }}</template>
        <transition name="kyc-navbar">
            <div v-if="showModal">
                <template v-if="allFields[0].value === 'phone'">
                    <PhoneOTP @close="OTPSuccess" />
                </template>
                <template v-else>
                    <form
                        class="kyc-modal"
                        @submit.prevent="updateKYC"
                        :class="{
                            'kyc-modal__uploads': allFields[0].value.endsWith('Url') && !nin
                        }"
                    >
                        <div class="text-center mb-1">
                            <p>
                                <small class="grey-cool">{{
                                    nin
                                        ? `Not sure about your NIN number? Dial *346# if you're on MTN/Airtel https://www.nimc.gov.ng/sms-service/`
                                        : subtitle
                                }}</small>
                            </p>
                        </div>
                        <template v-if="allFields[0].value === 'nin' || nin">
                            <Field
                                :field="ninField"
                                @input="handleInput"
                                @click.native="errors = {}"
                                :error-message="errors.nin"
                            />
                        </template>
                        <template v-else>
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
                        </template>

                        <error-block type="kyc" v-if="getErrorLog.source === 'modal'" />
                        <div class="text-center" v-if="!isFileImage || nin">
                            <action-button
                                type="submit"
                                :disabled="Object.keys(errors).length > 0 || !formComplete"
                                :pending="loading"
                                :classes="['btn__primary']"
                                >Submit</action-button
                            >
                        </div>
                        <div class="text-center mt-2" v-if="allFields[0].value === 'nin' || nin">
                            <a @click="skipNIN" class="unerline primary">Skip</a>
                        </div>
                    </form>
                </template>
            </div>
            <div v-else class="kyc-modal__dummy"></div>
        </transition>
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
        navbar: {
            type: Boolean
        },
        nin: {
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
            errors: {},
            subtitle: null,
            showModal: false,
            ninField: {
                name: "NIN",
                value: "nin",
                type: "number"
            }
        };
    },
    computed: {
        ...mapGetters(["getErrorLog", "getNextKYC", "getNavbarNextKYC", "getKycModalAction"]),
        isFileImage() {
            if (Object.keys(this.selectedField).length > 0) {
                const test = this.selectedField.fields[0];
                const stripped = test.substr(test.length - 3);
                return stripped.toLowerCase() === "url";
            }
        },
        currentKYC() {
            if (this.navbar) return this.getNavbarNextKYC;
            return this.getNextKYC;
        },
        title() {
            if (this.currentKYC.cardContext === "LOCAL") return "Complete Your Local Verification";
            if (this.currentKYC.cardContext === "GLOBAL")
                return "Complete Your Global Verification";
            if (this.currentKYC.cardContext === "FUND") return "Complete Your Funding Verification";
            return "Complete Your Verification";
        }
    },
    methods: {
        ...mapActions([
            "RESOLVE_BVN",
            "UPDATE_KYC_BANK",
            "UPDATE_KYC_NIN",
            "UPDATE_KYC",
            "UPLOAD_KYC_FILE",
            "GET_NEXT_KYC",
            "GET_NAVBAR_NEXT_KYC"
        ]),
        ...mapMutations(["RESET_REQ", "SET_FUND_MODAL"]),
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
        },
        updateKYC() {
            Object.keys(this.itemData).forEach(el => {
                if (el === "bvn") this.state = "bvn";
                else if (el === "nin" || this.nin) this.state = "nin";
                else if (el === "bankCode" || el === "bankAcctNo") this.state = "bank";
                else if (
                    el === "employmentStatus" ||
                    el === "directorOfPublicCo" ||
                    el === "employedByBroker" ||
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
                    }
                });
            } else if (this.state === "nin") {
                this.UPDATE_KYC_NIN(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.nextStep();
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
                    }
                });
            } else if (this.state === "file") {
                this.UPLOAD_KYC_FILE(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.nextStep();
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
                }
            });
        },
        closeModal() {
            this.$emit("close");
        },
        async nextStep() {
            // EventBus.$emit("navbar-trigger");
            // EventBus.$emit("modal-trigger");
            this.showModal = false;
            this.$emit("updated");
            if (this.navbar) {
                await this.GET_NAVBAR_NEXT_KYC();
            } else {
                await this.GET_NEXT_KYC({ context: this.getKycModalAction });
            }
            this.mount();
        },
        showFund() {
            this.SET_FUND_MODAL(true);
            this.$emit("close");
        },
        mount() {
            this.allFields = [];
            this.selectedField = {};
            this.itemData = {};
            this.state = null;
            this.RESET_REQ();
            /**
             * Refactor code for child to determine actionType and act on it instead of being passed as a prop
             */

            this.allNextKYC.forEach(element => {
                element.fields.forEach(el => {
                    if (el === this.currentKYC.nextKYC[0]) {
                        this.subtitle = element.subtitle;
                    }
                });
            });
            this.selectedField.fields = this.currentKYC.nextKYC;
            this.currentKYC.nextKYC.map(required => {
                const all = AllKYCFields.filter(el => {
                    if (required === el.value) {
                        this.allFields.push(el);
                        return el;
                    }
                });
            });
            this.showModal = true;
            if (this.currentKYC.status === "COMPLETE") {
                this.$emit("updated", true);
            }
        }
    },
    mounted() {
        this.mount();
        EventBus.$on("modal-trigger", () => {
            this.mount();
        });
        EventBus.$on("navbar-trigger", () => {
            this.mount();
        });
    }
};
</script>
