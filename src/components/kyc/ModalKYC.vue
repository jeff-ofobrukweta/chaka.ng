<template>
    <div v-if="allFields.length > 0">
        <template v-if="allFields[0].value === 'phone'">
            <PhoneOTP @close="OTPSuccess" />
        </template>
        <template v-else>
            <form class="kyc-modal" @submit.prevent="updateKYC">
                <div class="text-center mb-3" v-if="allFields[0].value === 'nin'">
                    <p>
                        <small class="grey-cool"
                            >Enter your national identity number to fast track your verification
                            process</small
                        >
                    </p>
                </div>
                <Fragment v-for="(field, i) in allFields" :key="i">
                    <Field :field="field" @input="handleInput" :options="checkOptions(field)" />

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
</template>

<script>
import Field from "./KYCField";
import AllKYCFields from "../../services/kyc/index";
import { Fragment } from "vue-fragment";
import Types from "../../services/kyc/employmentTypes";
import Positions from "../../services/kyc/employmentPosition";
import Banks from "../../services/kyc/banks";
import lg from "../../services/kyc/lgNames";
import { mapActions, mapMutations, mapGetters } from "vuex";
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
            errors: {}
        };
    },
    computed: {
        ...mapGetters(["getErrorLog"]),
        isFileImage() {
            const test = this.requiredFields[0];
            const stripped = test.substr(test.length - 3);
            return stripped.toLowerCase() === "url";
        }
    },
    methods: {
        ...mapActions([
            "GET_NEXT_KYC",
            "RESOLVE_BVN",
            "UPDATE_KYC_BANK",
            "UPDATE_KYC_NIN",
            "UPDATE_KYC",
            "UPLOAD_KYC_FILE"
        ]),
        ...mapMutations(["RESET_REQ"]),
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
            this.formComplete = Object.keys(this.itemData).length >= this.requiredFields.length;
        },
        OTPSuccess() {
            this.$emit("updated");
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
                this.RESOLVE_BVN(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.$emit("updated");
                    }
                });
            } else if (this.state === "nin") {
                this.UPDATE_KYC_NIN(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.$emit("updated");
                    }
                });
            } else if (this.state === "bank") {
                this.UPDATE_KYC_BANK(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.$emit("updated");
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
                    payload["pepNames"] = this.pepNames.pepNames;
                }
                if (this.showDirector) {
                    payload.directorOfPublicCo = this.director.name;
                } else {
                    payload.directorOfPublicCo = "";
                }
                this.UPDATE_KYC(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.$emit("updated");
                    }
                });
            } else if (this.state === "file") {
                this.UPLOAD_KYC_FILE(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.$emit("updated");
                    }
                });
            } else {
                this.UPDATE_KYC(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.$emit("updated");
                    }
                });
            }
        },
        checkOptions(type) {
            if (type.value === "employmentType") {
                return this.types;
            } else if (type.value === "employmentPosition") {
                return this.positions;
            } else if (type.value === "bankCode") {
                return this.banks;
            } else if (type.value === "lg") {
                return this.lg;
            }
            return [];
        },
        skipNIN() {
            this.loading = true;
            this.UPDATE_KYC_NIN({ nin: "skip" }).then(resp => {
                this.loading = false;
                if (resp) {
                    this.$emit("updated");
                }
            });
        }
    },
    mounted() {
        this.RESET_REQ();
        this.requiredFields.map(required => {
            const all = AllKYCFields.filter(el => {
                if (required === el.value) {
                    this.allFields.push(el);
                    return el;
                }
            });
        });
    }
};
</script>
