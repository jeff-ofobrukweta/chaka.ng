<template>
    <modal @close="closeModal">
        <template slot="header">{{ showPendingStatus ? modalTitle : title }}</template>
        <PendingKYC v-if="showPendingStatus" modal :type="pendingType" :is-buy-valid="2" :instrument="{}" @step="handleStep" @close="closeModal" />
        <div class="kyc-modal__dummy" v-else-if="!showModal"></div>
        <div v-else>
            <PhoneOTP @close="OTPSuccess" v-if="sectionToShow === 'phone'" />
            <div v-else-if="sectionToShow === 'nin'">
                <form class="kyc-modal" @submit.prevent="updateKYC">
                    <div class="text-center mb-1">
                        <p>
                            <small class="grey-cool">Not sure about your NIN number? Dial *346# if you're on MTN/Airtel https://www.nimc.gov.ng/sms-service/</small>
                        </p>
                    </div>
                    <Field :field="ninField" @input="handleInput" @click.native="errors = {}" :error-message="errors.nin" />

                    <error-block type="kyc" v-if="getErrorLog.source === 'modal'" />
                    <div class="text-center">
                        <action-button type="submit" :disabled="Object.keys(errors).length > 0 || !formComplete" :pending="loading" :classes="['btn__primary']"
                            >Submit</action-button
                        >
                    </div>

                    <div class="text-center mt-2" v-if="!loading">
                        <a @click="skipNIN" class="unerline primary">Skip</a>
                    </div>
                </form>
            </div>
            <div v-else-if="sectionToShow === 'file'">
                <div class="kyc-modal kyc-modal__uploads">
                    <div class="text-center mb-1">
                        <p>
                            <small class="grey-cool">{{ subtitle }}</small>
                        </p>
                    </div>
                    <section class="w-100">
                        <label class="form__label"
                            >Select ID Type
                            <select class="form__input form__select" v-model="idIndex">
                                <option v-for="(type, i) in idTypes" :key="i" :value="type.index">{{ type.name }}</option>
                            </select>
                        </label>
                        <br />
                        <br />
                    </section>
                    <Fragment v-if="idType">
                        <template v-if="idType !== 'ID_WITH_NO_ADDRESS'">
                            <Uploads form-name="idPhotoUrl" @error="handleUploadError" @reset="showUploadError = false" :selected-name="idTypeName" :id-type="idType" />
                        </template>
                        <template v-else v-for="(field, i) in allFields">
                            <Uploads :form-name="field.value" idType="ID_WITH_NO_ADDRESS" :key="i" />
                        </template>
                    </Fragment>
                    <section class="w-100 text-center">
                        <error-block type="kyc" :message="showUploadError" status="error" v-if="showUploadError" />
                    </section>

                    <error-block type="kyc" v-if="getErrorLog.source === 'modal'" />
                </div>
            </div>
            <div v-else>
                <form class="kyc-modal" @submit.prevent="updateKYC">
                    <div class="text-center mb-1">
                        <p>
                            <small class="grey-cool">{{ subtitle }}</small>
                        </p>
                    </div>
                    <div v-for="(field, i) in allFields" :key="i">
                        <Field :field="field" @input="handleInput" @click.native="errors = {}" :error-message="errors.bvn" v-if="field.value === 'bvn'" />
                        <Field v-else-if="field.value === 'bankAcctNo'" :field="field" @input="handleInput" @click.native="errors = {}" :error-message="errors.bankAcctNo" />
                        <Field
                            v-else-if="field.value === 'bankCode'"
                            :field="field"
                            @input="handleInput"
                            @click.native="errors = {}"
                            :error-message="errors.bankCode"
                            :options="checkOptions(field)"
                        />
                        <Field v-else :field="field" @input="handleInput" :error-message="errors[field.value]" :options="checkOptions(field)" />

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
                                        <option v-for="(option, i) in types" :key="i" :value="option.value">{{ option.text }}</option>
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
                                        <option v-for="(option, i) in positions" :key="i" :value="option.value">{{ option.text }}</option>
                                    </select>
                                    <p class="form-error" v-if="errors.employmentPosition">
                                        <small>{{ errors.employmentPosition }}</small>
                                    </p></label
                                >
                            </div>
                        </div>
                    </div>

                    <error-block type="kyc" v-if="getErrorLog.source === 'modal'" />
                    <div class="text-center">
                        <action-button type="submit" :disabled="Object.keys(errors).length > 0 || !formComplete" :pending="loading" :classes="['btn__primary']"
                            >Submit</action-button
                        >
                    </div>
                </form>
            </div>
        </div>
    </modal>
</template>

<script>
import { Fragment } from 'vue-fragment';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import Field from './KYCField';
import AllKYCFields from '../../services/kyc/index';
import Types from '../../services/kyc/employmentTypes';
import Positions from '../../services/kyc/employmentPosition';
import Banks from '../../services/kyc/banks';
import lg from '../../services/kyc/lgNames';
import KYCTitles from '../../services/kyc/kycTitles';
import EventBus from '../../event-bus';

export default {
    name: 'kyc-modal',
    components: {
        PhoneOTP: () => import('./PhoneOTP'),
        Uploads: () => import('../FileUpload'),
        PendingKYC: () => import('../modals/PendingKYC'),
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
            showUploadError: false,
            subtitle: null,
            ninField: {
                name: 'NIN',
                value: 'nin',
                type: 'number',
                placeholder: 'Enter your NIN number'
            },
            idIndex: null,
            idTypes: [
                {
                    name: 'National ID/NIN slip',
                    value: 'ID_WITH_ADDRESS',
                    index: 1
                },
                {
                    name: "Driver's License",
                    value: 'ID_WITH_ADDRESS',
                    index: 2
                },
                {
                    name: "Voter's Card",
                    value: 'ID_WITH_ADDRESS',
                    index: 3
                },
                {
                    name: 'Other',
                    value: 'ID_WITH_NO_ADDRESS',
                    index: 4
                }
            ]
        };
    },
    computed: {
        ...mapGetters(['getErrorLog', 'getNextKYC', 'getNavbarNextKYC']),
        isFileImage() {
            if (Object.keys(this.selectedField).length > 0) {
                const test = this.selectedField.fields[0];
                const stripped = test.substr(test.length - 3);
                return stripped.toLowerCase() === 'url';
            }
        },
        currentKYC() {
            if (this.navbar) return this.getNavbarNextKYC;
            return this.getNextKYC;
        },
        title() {
            if (this.currentKYC.cardContext === 'LOCAL') return 'Complete Your Local Verification';
            if (this.currentKYC.cardContext === 'GLOBAL') return 'Complete Your Global Verification';
            if (this.currentKYC.cardContext === 'WITHDRAW') return 'Complete Your Withdrawal Verification';
            return 'Complete Your Verification';
        },
        idType() {
            if (this.idIndex) {
                return this.idTypes[this.idIndex - 1].value;
            }
            return null;
        },
        idTypeName() {
            if (this.idIndex) {
                return this.idTypes[this.idIndex - 1].name;
            }
            return '';
        },
        sectionToShow() {
            if (this.allFields[0].value === 'phone') return 'phone';
            if (this.allFields[0].value === 'nin' || this.nin) return 'nin';
            if (this.isFileImage) return 'file';
            return 'default';
        },
        showPendingStatus() {
            return this.getNavbarNextKYC.completedContexts.length > 0;
        },
        pendingType() {
            if (this.getNavbarNextKYC.completedContexts.length > 1) return 'PENDING';
            return this.getNavbarNextKYC.completedContexts[0];
        },
        modalTitle() {
            if (this.getNavbarNextKYC.completedContexts.length > 1) return 'Processing Verification';
            if (this.getNavbarNextKYC.completedContexts[0] === 'WITHDRAW') return 'Processing Withdrawal Verification';
            if (this.getNavbarNextKYC.completedContexts[0] === 'LOCAL') return 'Processing Local Verification';
            return 'Processing Global Verification';
        },
        showModal() {
            return this.allFields.length > 0;
        }
    },
    methods: {
        ...mapActions(['RESOLVE_BVN', 'UPDATE_KYC_BANK', 'UPDATE_KYC_NIN', 'UPDATE_KYC', 'UPLOAD_KYC_FILE', 'GET_NEXT_KYC']),
        ...mapMutations(['RESET_REQ', 'SET_FUND_MODAL', 'SET_KYC_MODAL_ACTION']),
        async handleStep(step) {
            this.SET_KYC_MODAL_ACTION(step.toUpperCase());
            await this.GET_NEXT_KYC();
            this.mount();
        },
        handleInput(e) {
            this.itemData[e.name] = e.value;
            this.errors = {};
            if (e.name === 'employmentStatus') {
                if (e.value !== 'UNEMPLOYED') {
                    this.showEmployment = true;
                } else {
                    this.showEmployment = false;
                }
<<<<<<< HEAD
            }
            if (e.name === 'pepStatus') {
=======
            } else if (e.name === "pepStatus") {
>>>>>>> 78403038d787e2befe94196dcb86d48b806d5735
                if (e.value === true) {
                    this.showPepStatus = true;
                } else {
                    this.showPepStatus = false;
                }
<<<<<<< HEAD
            }
            if (e.name === 'directorOfPublicCo') {
=======
            } else if (e.name === "directorOfPublicCo") {
>>>>>>> 78403038d787e2befe94196dcb86d48b806d5735
                if (e.value === true) {
                    this.showDirector = true;
                } else {
                    this.showDirector = false;
                }
            }
            if (e.name === "lg" && e.value) {
                this.formComplete = true;
            } else this.formComplete = this.nin ? true : Object.keys(this.itemData).length >= this.selectedField.fields.length;
        },
        OTPSuccess() {
            this.mount();
        },
        updateKYC() {
<<<<<<< HEAD
            Object.keys(this.itemData).forEach((el) => {
                if (el === 'bvn') this.state = 'bvn';
                else if (el === 'nin' || this.nin) this.state = 'nin';
                else if (el === 'bankCode' || el === 'bankAcctNo') this.state = 'bank';
                else if (el === 'employmentStatus' || el === 'directorOfPublicCo' || el === 'employedByBroker' || el === 'pepStatus') this.state = 'employment';
                else this.state = 'default';
=======
            Object.keys(this.itemData).forEach(el => {
                if (el === "bvn") this.state = "bvn";
                else if (el === "nin" || this.nin) this.state = "nin";
                else if (el === "bankCode" || el === "bankAcctNo") this.state = "bank";
                else if (el === "lg" || el === "cscsCHN") this.state = "address";
                else if (el === "employmentStatus" || el === "directorOfPublicCo" || el === "employedByBroker" || el === "pepStatus") this.state = "employment";
                else this.state = "default";
>>>>>>> 78403038d787e2befe94196dcb86d48b806d5735
            });
            this.loading = true;
            const payload = { ...this.itemData };
            payload.source = 'modal';
            if (this.state === 'bvn') {
                if (Number.isNaN(+this.itemData.bvn)) {
                    this.$set(this.errors, 'bvn', 'BVN should be a number');
                    this.loading = false;
                    return false;
                }
                if (this.itemData.bvn.length !== 11) {
                    this.$set(this.errors, 'bvn', 'BVN should be 11 digits');
                }
                if (Object.keys(this.errors).length > 0) {
                    this.loading = false;
                    return false;
                }
                this.RESOLVE_BVN(payload).then((resp) => {
                    this.loading = false;
                    if (resp) {
                        this.mount();
                    }
                });
            } else if (this.state === 'nin') {
                this.UPDATE_KYC_NIN(payload).then((resp) => {
                    this.loading = false;
                    if (resp) {
                        this.mount();
                    }
                });
            } else if (this.state === 'bank') {
                if (!this.itemData.bankAcctNo) {
                    this.$set(this.errors, 'bankAcctNo', 'Account number is required');
                }
                if (!this.itemData.bankCode) {
                    this.$set(this.errors, 'bankCode', 'Bank name is required');
                }
                if (Object.keys(this.errors).length > 0) {
                    this.loading = false;
                    return false;
                }
                if (Number.isNaN(+this.itemData.bankAcctNo)) {
                    this.$set(this.errors, 'bankAcctNo', 'Account number should be a 10 digit number');
                    this.loading = false;
                    return false;
                }
                if (this.itemData.bankAcctNo.length !== 10) {
                    this.$set(this.errors, 'bankAcctNo', 'Account number should be 10 digits');
                }
                if (Object.keys(this.errors).length > 0) {
                    this.loading = false;
                    return false;
                }
                this.UPDATE_KYC_BANK(payload).then((resp) => {
                    this.loading = false;
                    if (resp) {
                        this.mount();
                    }
                });
            } else if (this.state === 'employment') {
                if (this.showEmployment) {
                    if (!this.employment.employmentType) {
                        this.$set(this.errors, 'employmentType', 'Company type is required');
                    }
                    if (!this.employment.employmentCompany) {
                        this.$set(this.errors, 'employmentCompany', 'Company name is required');
                    }
                    if (!this.employment.employmentPosition) {
                        this.$set(this.errors, 'employmentPosition', 'Employment position is required');
                    }
                }
                if (this.showDirector && !this.director.name) {
                    this.$set(this.errors, 'directorName', 'Company ticker symbol is required');
                }
                if (this.showPepStatus && !this.pepNames.pepNames) {
                    this.$set(this.errors, 'pepNames', 'Name is required');
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
                    payload.directorOfPublicCo = '';
                }
                this.UPDATE_KYC(payload).then((resp) => {
                    this.loading = false;
                    if (resp) {
                        this.mount();
                    }
                });
            } else if (this.state === "address") {
                if (!this.itemData.cscsCHN) {
                    payload.cscsCHN = "";
                } else if (String(this.itemData.cscsCHN).length !== 10) {
                    this.$set(this.errors, "cscsCHN", "CHN should be 10 characters");
                }

                if (Object.keys(this.errors).length > 0) {
                    this.loading = false;
                    return false;
                }
                this.UPDATE_KYC(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.mount();
                    }
                });
            } else {
                if (Object.keys(this.itemData).length <= 0) {
                    this.loading = false;
                    return true;
                }
                this.UPDATE_KYC(payload).then((resp) => {
                    this.loading = false;
                    if (resp) {
                        this.mount();
                    }
                });
            }
        },
        checkOptions(type) {
            if (type.value === 'employmentType') {
                return this.types;
            }
            if (type.value === 'employmentPosition') {
                return this.positions;
            }
            if (type.value === 'bankCode') {
                return this.banks;
            }
            if (type.value === 'lg') {
                return this.lg;
            }
            return [];
        },
        skipNIN() {
            this.loading = true;
            this.UPDATE_KYC_NIN({ nin: 'skip' }).then((resp) => {
                this.loading = false;
                if (resp) {
                    this.$emit('skipnin');
                    this.mount();
                }
            });
        },
        closeModal() {
            this.$emit('close');
        },
        showFund() {
            this.SET_FUND_MODAL(true);
            this.$emit('close');
        },
        handleUploadError(e) {
            this.showUploadError = e;
        },
        mount() {
            this.allFields = [];
            this.selectedField = {};
            this.itemData = {};
            this.state = null;
            this.RESET_REQ();

            this.allNextKYC.forEach((element) => {
                element.fields.forEach((el) => {
                    if (el === this.currentKYC.nextKYC[0]) {
                        this.subtitle = element.subtitle;
                    }
                });
            });
            this.selectedField.fields = this.currentKYC.nextKYC;
            this.currentKYC.nextKYC.map((required) => {
                AllKYCFields.map((el) => {
                    if (required == el.value) {
                        this.allFields.push(el);
                        return el;
                    }
                });
            });

            if (this.currentKYC.status === 'COMPLETE' && this.getNavbarNextKYC.completedContexts.length === 0) {
                EventBus.$emit('MODAL_CLOSED');
                this.$emit('updated', true);
            }
        }
    },
    mounted() {
        this.mount();
        EventBus.$on('modal-trigger', () => {
            this.mount();
        });
    },
    beforeDestroy() {
        this.closeModal();
    }
};
</script>
