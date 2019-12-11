<template>
    <div>
        <section class="accounts__title">
            <h3>Settings</h3>
        </section>

        <section class="accounts-settings__uploads">
            <Uploads
                form-name="passportUrl"
                :image="getKYC.passportUrl"
                @error="handleUploadError"
                @success="handleUploadSuccess"
                @reset="handleReset"
                v-if="!getKYC.passportUrl"
            />
            <Uploads
                form-name="idPhotoUrl"
                :image="getKYC.idPhotoUrl"
                @error="handleUploadError"
                @success="handleUploadSuccess"
                @reset="handleReset"
                v-if="!getKYC.idPhotoUrl"
            />
            <Uploads
                form-name="addressProofUrl"
                :image="getKYC.addressProofUrl"
                @error="handleUploadError"
                @success="handleUploadSuccess"
                @reset="handleReset"
                v-if="!getKYC.addressProofUrl"
            />
            <Uploads
                form-name="addressProofUrl"
                :image="getKYC.addressProofUrl"
                @error="handleUploadError"
                @success="handleUploadSuccess"
                @reset="handleReset"
                v-if="!getKYC.addressProofUrl"
            />
        </section>

        <error-block
            type="kyc"
            :message="showUploadError"
            status="error"
            v-if="showUploadError && getErrorLog === 'accounts'"
        />
        <error-block
            type="kyc"
            message="File uploaded successfully"
            status="success"
            v-else-if="showUploadSuccess && getErrorLog === 'accounts'"
        />

        <div class="accounts-settings__form">
            <section class="accounts-settings__hero">
                <div class="accounts-settings__group">
                    <label class="form__label"
                        >Email
                        <p class="lowercase accounts-settings__data">
                            {{ getLoggedUser.email }}
                        </p></label
                    >
                </div>
            </section>
        </div>

        <form class="accounts-settings__form" @submit.prevent="updateKYC">
            <div class="accounts-settings__title">
                <h5>Disclosure Name</h5>
                <!-- <a
                    class="accounts-settings__edit"
                    v-if="!edit && getKYC.disclosureName"
                    @click="editBtn('disclosure')"
                    >edit</a
                > -->
            </div>
            <section class="accounts-settings__hero">
                <div class="accounts-settings__group">
                    <label class="form__label"
                        >Name
                        <form-input
                            v-if="!getKYC.disclosureName || edit === 'disclosure'"
                            type="text"
                            name="disclosureName"
                            v-model="itemData.disclosureName"
                            placeholder="First & Last Name"
                        />
                        <p v-else class="accounts-settings__data">
                            {{ getKYC.disclosureName || "-" }}
                        </p></label
                    >
                </div>
            </section>
            <template v-if="!getKYC.disclosureName">
                <error-block type="kyc" v-if="getErrorLog.source === 'accounts'" />
                <section v-if="!getKYC.disclosureName" class="accounts-settings__submit">
                    <action-button
                        type="submit"
                        :disabled="!itemData.disclosureName"
                        :pending="loading"
                        :classes="['btn-block', 'btn__primary']"
                        >Submit</action-button
                    >
                </section>
            </template>
        </form>

        <form
            class="accounts-settings__form"
            v-if="!getKYC.bvnFetchStatus"
            @submit.prevent="submitBVN"
        >
            <div class="accounts-settings__title">
                <h5>BVN Verification</h5>
                <a class="accounts-settings__edit" v-if="!edit" @click="editBtn('bvn')">edit</a>
            </div>
            <section class="accounts-settings__hero">
                <div class="accounts-settings__group">
                    <label class="form__label"
                        >BVN
                        <form-input
                            type="number"
                            name="bvn"
                            v-model="bvnData.bvn"
                            placeholder="BVN"
                            v-if="edit === 'bvn'"
                            maxlength="11"
                            required
                        />
                        <p v-else class=" accounts-settings__data">
                            {{ getKYC.bankAcctName || "-" }}
                        </p></label
                    >
                </div>
            </section>
            <template v-if="edit === 'bvn'">
                <error-block type="kyc" v-if="getErrorLog.source === 'accounts'" />
                <section class="accounts-settings__submit">
                    <button @click="cancelEdit" type="button" class="btn btn-block btn-dark">
                        Cancel
                    </button>
                    <action-button
                        type="submit"
                        :pending="loading"
                        :classes="['btn-block', 'btn__primary']"
                        >Submit</action-button
                    >
                </section>
            </template>
        </form>

        <template v-if="!getKYC.phoneConfirmed && getKYC.bvnFetchStatus">
            <button @click="confirmPhone" class="btn btn__primary btn-block">
                Confirm your phone number
            </button>
        </template>

        <template v-else-if="getKYC.phoneConfirmed">
            <div class="accounts-settings__form">
                <div class="accounts-settings__title">
                    <h5>Verify Phone Number</h5>
                    <a class="accounts-settings__edit" v-if="!edit" @click="editExistingPhone"
                        >edit</a
                    >
                </div>
                <section class="accounts-settings__hero">
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Phone Number
                            <p class=" accounts-settings__data">
                                {{ getKYC.phone || "-" }}
                            </p></label
                        >
                    </div>
                </section>
                <template v-if="edit === 'phone'">
                    <error-block type="kyc" v-if="getErrorLog.source === 'accounts'" />
                    <section class="accounts-settings__submit">
                        <button @click="cancelEdit" type="button" class="btn btn-block btn-dark">
                            Cancel
                        </button>
                        <action-button
                            type="submit"
                            :pending="loading"
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                    </section>
                </template>
            </div>

            <form class="accounts-settings__form" @submit.prevent="submitBank">
                <div class="accounts-settings__title">
                    <h5>Bank Details</h5>
                    <a class="accounts-settings__edit" v-if="!edit" @click="editBtn('bank')"
                        >edit</a
                    >
                </div>
                <section class="accounts-settings__hero">
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Bank Name
                            <select
                                v-if="edit === 'bank'"
                                class="form__input form__select"
                                v-model="itemData.bankCode"
                                required
                            >
                                <option
                                    v-for="(bank, index) in banks"
                                    :key="index"
                                    :value="bank.bankCode"
                                    >{{ bank.name }}</option
                                >
                            </select>
                            <p v-else class=" accounts-settings__data">
                                {{ getKYC.bankAcctName || "-" }}
                            </p></label
                        >
                    </div>
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Bank Number<form-input
                                v-if="edit === 'bank'"
                                type="number"
                                name="bank number"
                                v-model="itemData.bankAcctNo"
                                placeholder="Bank Account Number"
                                required
                                maxlength="10"
                            />
                            <p v-else class=" accounts-settings__data">
                                {{ getKYC.bankAcctNo || "-" }}
                            </p></label
                        >
                    </div>
                </section>
                <template v-if="edit === 'bank'">
                    <error-block type="kyc" v-if="getErrorLog.source === 'accounts'" />
                    <section class="accounts-settings__submit">
                        <button @click="cancelEdit" type="button" class="btn btn-block btn-dark">
                            Cancel
                        </button>
                        <action-button
                            type="submit"
                            :pending="loading"
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                    </section>
                </template>
            </form>

            <form class="accounts-settings__form" @submit.prevent="updateKYC">
                <div class="accounts-settings__title">
                    <h5>Confirm Postal Address</h5>
                    <a class="accounts-settings__edit" v-if="!edit" @click="editBtn('postal')"
                        >edit</a
                    >
                </div>
                <section class="accounts-settings__hero">
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Gender
                            <select
                                class="form__input form__select"
                                v-if="edit === 'postal'"
                                v-model="itemData.gender"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.gender || "-" }}
                            </p></label
                        >
                    </div>
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Address<form-input
                                type="text"
                                v-if="edit === 'postal'"
                                name="address"
                                v-model="itemData.address"
                                placeholder="Address"
                            />
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.address || "-" }}
                            </p></label
                        >
                    </div>
                    <div class="accounts-settings__group">
                        <label class="form__label">LGA</label>
                        <select
                            class="form__input"
                            name="lg"
                            v-model="itemData.lg"
                            v-if="edit === 'postal'"
                        >
                            <option v-for="(option, i) in lgNames" :key="i" :value="option.value">{{
                                option.text
                            }}</option>
                        </select>
                        <!-- <label class="form__label">LGA</label> -->
                        <!-- <v-select
                            class="form__input form__select"
                            placeholder="Local Government Area"
                            v-model="selectedLg"
                            :clearable="false"
                            label="text"
                            value="value"
                            @input="switchLG($event)"
                            :options="lgNames"
                        ></v-select> -->
                        <p v-else class="capitalize accounts-settings__data">
                            {{ getKYC.lg || "-" }}
                        </p>
                    </div>
                </section>
                <template v-if="edit === 'postal'">
                    <error-block type="kyc" v-if="edit === 'postal'" />
                    <section class="accounts-settings__submit">
                        <button @click="cancelEdit" type="button" class="btn btn-block btn-dark">
                            Cancel
                        </button>
                        <action-button
                            type="submit"
                            :pending="loading"
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                    </section>
                </template>
            </form>

            <form class="accounts-settings__form" @submit.prevent="updateKYC">
                <div class="accounts-settings__title">
                    <h5>Confirm Employment Details</h5>
                    <a class="accounts-settings__edit" v-if="!edit" @click="editBtn('employment')"
                        >edit</a
                    >
                </div>
                <section class="accounts-settings__hero">
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Status
                            <select
                                class="form__input form__select"
                                v-model="itemData.employmentStatus"
                                v-if="edit === 'employment'"
                            >
                                <option value="EMPLOYED">Employed</option>
                                <option value="SELF_EMPLOYED">Self-Employed</option>
                                <option value="UNEMPLOYED">Unemployed</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.employmentStatus || "-" }}
                            </p></label
                        >
                    </div>
                    <template
                        v-if="
                            itemData.employmentStatus === 'EMPLOYED' ||
                                itemData.employmentStatus === 'SELF_EMPLOYED'
                        "
                    >
                        <div class="accounts-settings__group">
                            <label class="form__label"
                                >Company Name<form-input
                                    v-if="edit === 'employment'"
                                    type="text"
                                    name="employment company"
                                    v-model="itemData.employmentCompany"
                                    placeholder="Company Name"
                                />
                                <p v-else class="capitalize accounts-settings__data">
                                    {{ getKYC.employmentCompany || "-" }}
                                </p></label
                            >
                        </div>
                        <div class="accounts-settings__group">
                            <label class="form__label"
                                >Employment Type
                                <select
                                    class="form__input form__select"
                                    v-if="edit === 'employment'"
                                    v-model="itemData.employmentType"
                                >
                                    <option
                                        v-for="(type, index) in types"
                                        :key="index"
                                        :value="type.value"
                                        >{{ type.text }}</option
                                    >
                                </select>
                                <p v-else class="capitalize accounts-settings__data">
                                    {{ getKYC.employmentType || "-" }}
                                </p></label
                            >
                        </div>
                        <div class="accounts-settings__group">
                            <label class="form__label"
                                >Employment Position
                                <select
                                    class="form__input form__select"
                                    v-if="edit === 'employment'"
                                    v-model="itemData.employmentPosition"
                                >
                                    <option
                                        v-for="(position, index) in positions"
                                        :key="index"
                                        :value="position.value"
                                        >{{ position.text }}</option
                                    >
                                </select>
                                <p v-else class="capitalize accounts-settings__data">
                                    {{ getKYC.employmentPosition || "-" }}
                                </p></label
                            >
                        </div>
                    </template>
                </section>
                <template v-if="edit === 'employment'">
                    <error-block type="kyc" v-if="getErrorLog.source === 'accounts'" />
                    <section class="accounts-settings__submit">
                        <button @click="cancelEdit" type="button" class="btn btn-block btn-dark">
                            Cancel
                        </button>
                        <action-button
                            type="submit"
                            :pending="loading"
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                    </section>
                </template>
            </form>

            <form class="accounts-settings__form" @submit.prevent="updateKYC">
                <div class="accounts-settings__title">
                    <h5>Confirm Investment Profile</h5>
                    <a class="accounts-settings__edit" @click="editBtn('investment')" v-if="!edit"
                        >edit</a
                    >
                </div>
                <section class="accounts-settings__hero">
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Investment Objectives
                            <select
                                class="form__input form__select"
                                v-model="itemData.investmentObjectives"
                                v-if="edit === 'investment'"
                            >
                                <option value="PROTECTION">Protection</option>
                                <option value="GROWTH">Growth</option>
                                <option value="INCOME">Income</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.investmentObjectives || "-" }}
                            </p></label
                        >
                    </div>
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Investment Experience
                            <select
                                class="form__input form__select"
                                v-model="itemData.investmentExperience"
                                v-if="edit === 'investment'"
                            >
                                <option value="YRS_0_2">0 - 2 Yrs</option>
                                <option value="YRS_3_5">2 - 5 Yrs</option>
                                <option value="YRS_5_plus">5 Yrs+</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.investmentExperience || "-" }}
                            </p></label
                        >
                    </div>
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Annual Income
                            <select
                                class="form__input form__select"
                                v-model="itemData.annualIncome"
                                v-if="edit === 'investment'"
                            >
                                <option value="LESS_THAN_500k">&lt; 500k</option>
                                <option value="500K_5MILLION">N500K - N5M</option>
                                <option value="GREATER_THAN_MILLION">N5M+</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.annualIncome || "-" }}
                            </p></label
                        >
                    </div>
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Net Worth Liquid
                            <select
                                class="form__input form__select"
                                v-model="itemData.networthLiquid"
                                v-if="edit === 'investment'"
                            >
                                <option value="<5m">&lt; N5M</option>
                                <option value="N5m-N50m">N5M - N50M</option>
                                <option value="N50m+">N50M+</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.networthLiquid || "-" }}
                            </p></label
                        >
                    </div>
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Net Worth Total
                            <select
                                class="form__input form__select"
                                v-model="itemData.networthTotal"
                                v-if="edit === 'investment'"
                            >
                                <option value="<5m">&lt; N5M</option>
                                <option value="N5m-N50m">N5M - N50M</option>
                                <option value="N50m+">N50M+</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.networthTotal || "-" }}
                            </p></label
                        >
                    </div>
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Risk Tolerance
                            <select
                                class="form__input form__select"
                                v-model="itemData.riskTolerance"
                                v-if="edit === 'investment'"
                            >
                                <option value="CONSERVATIVE">Conservative</option>
                                <option value="NEUTRAL">Neutral</option>
                                <option value="RISK-SEEKING">Risk Seeking</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.riskTolerance || "-" }}
                            </p></label
                        >
                    </div>
                </section>
                <template v-if="edit === 'investment'">
                    <error-block type="kyc" v-if="getErrorLog.source === 'accounts'" />
                    <section class="accounts-settings__submit">
                        <button @click="cancelEdit" type="button" class="btn btn-block btn-dark">
                            Cancel
                        </button>
                        <action-button
                            type="submit"
                            :pending="loading"
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                    </section>
                </template>
            </form>

            <form class="accounts-settings__form" @submit.prevent="updateKYC">
                <div class="accounts-settings__title">
                    <h5>Confirm Compliance Status</h5>
                    <a class="accounts-settings__edit" v-if="!edit" @click="editBtn('compliance')"
                        >edit</a
                    >
                </div>
                <section class="accounts-settings__hero">
                    <!-- <div class="accounts-settings__group">
                        <label class="form__label"
                            >Mother's Maiden Name
                            <form-input
                                type="text"
                                name="maiden"
                                v-model="itemData.maidenName"
                                placeholder="Mother's Maiden Name"
                                v-if="edit === 'compliance'"
                            />
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.maidenName || "-" }}
                            </p></label
                        >
                    </div>
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Next of Kin Phone
                            <form-input
                                type="text"
                                name="nok phone"
                                v-model="itemData.nextOfKinPhone"
                                placeholder="Next of Kin Phone"
                                v-if="edit === 'compliance'"
                            />
                            <p v-else class="capitalize accounts-settings__data">
                                {{ getKYC.nextOfKinPhone || "-" }}
                            </p></label
                        >
                    </div> -->
                    <div class="accounts-settings__group">
                        <label class="form__label"
                            >Are you politically exposed?
                            <select
                                class="form__input form__select"
                                v-if="edit === 'compliance'"
                                v-model="itemData.pepStatus"
                            >
                                <option :value="true">Yes</option>
                                <option :value="false">No</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{
                                    getKYC.pepStatus === null
                                        ? "-"
                                        : getKYC.pepStatus === false
                                        ? "No"
                                        : "Yes"
                                }}
                            </p></label
                        >
                    </div>
                    <template v-if="itemData.pepStatus">
                        <div class="accounts-settings__group">
                            <label class="form__label"
                                >Name of Politically Exposed Person<form-input
                                    type="text"
                                    name="pepNames"
                                    v-model="itemData.pepNames"
                                    placeholder="Name of Politically Exposed Person"
                                    required
                            /></label>
                        </div>
                    </template>
                </section>
                <template v-if="edit === 'compliance'">
                    <error-block type="kyc" v-if="getErrorLog.source === 'accounts'" />
                    <section class="accounts-settings__submit">
                        <button @click="cancelEdit" type="button" class="btn btn-block btn-dark">
                            Cancel
                        </button>
                        <action-button
                            type="submit"
                            :pending="loading"
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                    </section>
                </template>
            </form>
        </template>
        <modal no-header @close="showOTP = false" v-if="showOTP">
            <PhoneOTP @close="OTPSuccess" />
        </modal>
    </div>
</template>

<script>
import Uploads from "../../../components/FileUpload";
import PhoneOTP from "../../../components/kyc/PhoneOTP";
import { mapActions, mapGetters, mapMutations } from "vuex";

const Types = () => import("../../../services/kyc/employmentTypes");
const Positions = () => import("../../../services/kyc/employmentPosition");
const Banks = () => import("../../../services/kyc/banks");
const LG = () => import("../../../services/kyc/lgNames");

export default {
    name: "accounts-settings",
    components: {
        Uploads,
        PhoneOTP,
        vSelect: () => import("vue-select")
    },
    data() {
        return {
            itemData: {},
            otpData: {},
            edit: null,
            loading: false,
            bvnData: {},
            employmentStatus: "EMPLOYRD",
            selectedLg: {},
            selectedCountry: {},
            lgNames: [],
            banks: [],
            positions: [],
            types: [],
            showOTP: null,
            showNewPhone: false,
            newPhone: {},
            showUploadError: false,
            showUploadSuccess: false,
            countdown: null,
            OTPResend: false,
            smsSender: 0
        };
    },
    computed: {
        ...mapGetters(["getKYC", "getLoggedUser", "getNextKYC", "getCountryCodes", "getErrorLog"])
    },
    methods: {
        ...mapActions([
            "GET_KYC",
            "GET_NEXT_KYC",
            "UPDATE_KYC",
            "UPDATE_KYC_BANK",
            "RESOLVE_BVN",
            "USE_BVN_PHONE",
            "RESOLVE_OTP",
            "GET_COUNTRY_CODES"
        ]),
        ...mapMutations(["RESET_REQ"]),
        editBtn(name) {
            this.edit = name;
            this.showUploadError = null;
            this.showUploadSuccess = null;
        },
        cancelEdit() {
            this.edit = null;
            this.itemData = {};
            this.RESET_REQ();
        },
        updateKYC() {
            const payload = { ...this.itemData };
            payload.source = "accounts";
            this.loading = true;
            this.UPDATE_KYC(payload).then(resp => {
                this.loading = false;
                this.edit = null;
                if (resp) this.itemData = {};
            });
        },
        submitBVN() {
            const payload = { ...this.bvnData };
            payload.source = "accounts";
            this.loading = true;
            this.RESOLVE_BVN(payload).then(resp => {
                if (resp) {
                    this.bvnData = {};
                    this.edit = null;
                }
                this.loading = false;
            });
        },
        submitBank() {
            const payload = { ...this.itemData };
            payload.source = "accounts";
            this.loading = true;
            this.UPDATE_KYC_BANK(payload).then(resp => {
                if (resp) {
                    this.itemData = {};
                    this.edit = null;
                }
                this.loading = false;
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
            const payload = { ...this.otpData };
            payload.source = "accounts";
            this.loading = true;
            this.RESOLVE_OTP(payload).then(resp => {
                this.loading = false;
                if (resp) {
                    this.otpData = {};
                    this.showOTP = false;
                }
            });
        },
        handleDate(e) {
            if (e.target.value) {
                this.newPhone.dob = new Date(e.target.value).toISOString();
            }
        },
        handleUploadError(error) {
            this.showUploadError = error;
        },
        handleUploadSuccess(message) {
            this.showUploadSuccess = true;
        },
        handleReset() {
            this.showUploadSuccess = null;
            this.showUploadError = null;
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
        confirmPhone() {
            this.useBVNPhone();
        },
        editExistingPhone() {
            this.showOTP = true;
            this.showNewPhone = true;
        },
        switchLG(name) {
            this.itemData.lg = this.selectedLg.value;
        },
        switchCountry(name) {
            this.newPhone.countryCode = this.selectedCountry.value;
        },
        OTPSuccess() {
            this.$emit("updated");
        }
    },
    async mounted() {
        await Promise.all([this.GET_KYC(), this.GET_NEXT_KYC()]);
        this.GET_COUNTRY_CODES();
        this.banks = await Banks().then(({ banks }) => banks);
        this.types = await Types().then(({ company }) => company);
        this.positions = await Positions().then(({ position }) => position);
        this.lgNames = await LG().then(({ lgNames }) => lgNames);
    }
};
</script>
