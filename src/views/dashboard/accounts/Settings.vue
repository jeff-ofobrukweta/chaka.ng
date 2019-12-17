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
                            @click.native="issues = {}"
                            :error-message="issues.bvn"
                            v-if="edit === 'bvn'"
                        />
                        <p v-else class=" accounts-settings__data">-</p></label
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
                            <template v-if="edit === 'bank'">
                                <select
                                    class="form__input form__select"
                                    v-model="itemData.bankCode"
                                    @click="issues = {}"
                                >
                                    <option
                                        v-for="(bank, index) in banks"
                                        :key="index"
                                        :value="bank.bankCode"
                                        >{{ bank.name }}</option
                                    >
                                </select>
                                <p class="form-error" v-if="issues.bankCode">
                                    <small>{{ issues.bankCode }}</small>
                                </p>
                            </template>
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
                                @click.prevent="issues = {}"
                                :error-message="issues.bankAcctNo"
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
                        <!-- <label class="form__label">LGA</label>
                        <select
                            class="form__input"
                            name="lg"
                            v-model="itemData.lg"
                            v-if="edit === 'postal'"
                        >
                            <option v-for="(option, i) in lgNames" :key="i" :value="option.value">{{
                                option.text
                            }}</option>
                        </select> -->
                        <label class="form__label">LGA</label>
                        <v-select
                            v-if="edit === 'postal'"
                            class="form__input form__select"
                            placeholder="Local Government Area"
                            v-model="selectedLg"
                            :clearable="false"
                            label="text"
                            value="value"
                            @input="switchLG($event)"
                            :options="lgNames"
                        ></v-select>
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
                            (itemData.employmentStatus === 'EMPLOYED' ||
                                itemData.employmentStatus === 'SELF_EMPLOYED') &&
                                this.edit === 'employment'
                        "
                    >
                        <div class="accounts-settings__group">
                            <label class="form__label"
                                >Company Name<form-input
                                    type="text"
                                    name="employment company"
                                    v-model="itemData.employmentCompany"
                                    placeholder="Company Name"
                                />
                            </label>
                        </div>
                        <div class="accounts-settings__group">
                            <label class="form__label"
                                >Employment Type
                                <select
                                    class="form__input form__select"
                                    v-model="itemData.employmentType"
                                >
                                    <option
                                        v-for="(type, index) in types"
                                        :key="index"
                                        :value="type.value"
                                        >{{ type.text }}</option
                                    >
                                </select></label
                            >
                        </div>
                        <div class="accounts-settings__group">
                            <label class="form__label"
                                >Employment Position
                                <select
                                    class="form__input form__select"
                                    v-model="itemData.employmentPosition"
                                >
                                    <option
                                        v-for="(position, index) in positions"
                                        :key="index"
                                        :value="position.value"
                                        >{{ position.text }}</option
                                    >
                                </select></label
                            >
                        </div>
                    </template>
                    <template
                        v-else-if="
                            (getKYC.employmentStatus === 'EMPLOYED' ||
                                getKYC.employmentStatus === 'SELF_EMPLOYED') &&
                                this.edit !== 'employment'
                        "
                    >
                        <div class="accounts-settings__group">
                            <label class="form__label"
                                >Company Name
                                <p class="capitalize accounts-settings__data">
                                    {{ getKYC.employmentCompany || "-" }}
                                </p>
                            </label>
                        </div>
                        <div class="accounts-settings__group">
                            <label class="form__label"
                                >Employment Type
                                <p class="capitalize accounts-settings__data">
                                    {{ checkInv(types, getKYC.employmentType) || "-" }}
                                </p></label
                            >
                        </div>
                        <div class="accounts-settings__group">
                            <label class="form__label"
                                >Employment Position
                                <p class="capitalize accounts-settings__data">
                                    {{ checkInv(positions, getKYC.employmentPosition) || "-" }}
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
                                <option
                                    v-for="(item, i) in objectives"
                                    :key="i"
                                    :value="item.value"
                                    >{{ item.text }}</option
                                >
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ checkInv(objectives, getKYC.investmentObjectives) || "-" }}
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
                                <option
                                    v-for="(item, i) in experience"
                                    :key="i"
                                    :value="item.value"
                                    >{{ item.text }}</option
                                >
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ checkInv(experience, getKYC.investmentExperience) || "-" }}
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
                                <option
                                    v-for="(item, i) in annualIncome"
                                    :key="i"
                                    :value="item.value"
                                    >{{ item.text }}</option
                                >
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ checkInv(annualIncome, getKYC.annualIncome) || "-" }}
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
                                <option v-for="(item, i) in liquid" :key="i" :value="item.value">{{
                                    item.text
                                }}</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ checkInv(liquid, getKYC.networthLiquid) || "-" }}
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
                                <option v-for="(item, i) in liquid" :key="i" :value="item.value">{{
                                    item.text
                                }}</option>
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ checkInv(liquid, getKYC.networthTotal) || "-" }}
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
                                <option
                                    v-for="(item, i) in tolerance"
                                    :key="i"
                                    :value="item.value"
                                    >{{ item.text }}</option
                                >
                            </select>
                            <p v-else class="capitalize accounts-settings__data">
                                {{ checkInv(tolerance, getKYC.riskTolerance) || "-" }}
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
            <PhoneOTP @close="OTPSuccess" :edit-old-phone="showNewPhone" />
        </modal>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Uploads from "../../../components/FileUpload";
import PhoneOTP from "../../../components/kyc/PhoneOTP";

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
            smsSender: 0,
            issues: {},
            objectives: [
                {
                    text: "Protection",
                    value: "PROTECTION"
                },
                {
                    text: "Growth",
                    value: "GROWTH"
                },
                {
                    text: "Income",
                    value: "INCOME"
                }
            ],
            tolerance: [
                {
                    text: "Conservative",
                    value: "CONSERVATIVE"
                },
                {
                    text: "Neutral",
                    value: "NEUTRAL"
                },
                {
                    text: "Risk Seeking",
                    value: "RISK-SEEKING"
                }
            ],
            annualIncome: [
                {
                    text: "Less than ₦500K",
                    value: "LESS_THAN_500K"
                },
                {
                    text: "₦500K - ₦5M",
                    value: "500K_5MILLION"
                },
                {
                    text: "₦5M+",
                    value: "GREATER_THAN_5MILLION"
                }
            ],
            liquid: [
                {
                    text: "Less than ₦500K",
                    value: "<N5m"
                },
                {
                    text: "₦500K - ₦5M",
                    value: "N5m-N50m"
                },
                {
                    text: "₦5M+",
                    value: "N50m+"
                }
            ],
            experience: [
                {
                    text: "0 - 2 Yrs",
                    value: "YRS_0_2"
                },
                {
                    text: "2 - 5 Yrs",
                    value: "YRS_3_5"
                },
                {
                    text: "5 Yrs+",
                    value: "YRS_5_plus"
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["getKYC", "getLoggedUser", "getNextKYC", "getErrorLog"])
    },
    methods: {
        ...mapActions([
            "GET_KYC",
            "GET_NEXT_KYC",
            "UPDATE_KYC",
            "UPDATE_KYC_BANK",
            "RESOLVE_BVN",
            "RESET_REQ"
        ]),
        ...mapMutations(["RESET_REQ", "SET_NAVBAR_TRIGGER"]),
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
            if (Number.isNaN(+this.bvnData.bvn)) {
                this.issues = {
                    bvn: "BVN should be a number"
                };
                return false;
            }
            if (this.bvnData.bvn.length < 11) {
                this.issues = {
                    bvn: "BVN should be 11 digits"
                };
                return false;
            }
            if (Object.keys(this.issues).length > 0) {
                return false;
            }
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
            if (!this.itemData.bankAcctNo) {
                this.$set(this.issues, "bankAcctNo", "Account number is required");
            }
            if (!this.itemData.bankCode) {
                this.$set(this.issues, "bankCode", "Bank name is required");
            }
            if (Object.keys(this.issues).length > 0) {
                return false;
            }
            if (Number.isNaN(+this.itemData.bankAcctNo)) {
                this.$set(this.issues, "bankAcctNo", "Account number should be 10 digits");
                return false;
            }
            if (this.itemData.bankAcctNo.length < 10) {
                this.$set(this.issues, "bankAcctNo", "Account number should be 10 digits");
            }
            if (Object.keys(this.issues).length > 0) {
                return false;
            }
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
        confirmPhone() {
            this.showOTP = true;
            this.showNewPhone = false;
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
        OTPSuccess(value) {
            if (value) {
                this.SET_NAVBAR_TRIGGER(true);
                this.$emit("updated");
            }
            this.showOTP = false;
            this.showNewPhone = false;
        },
        checkInv(arr, value) {
            const filter = arr.filter(el => value === el.value);
            if (filter.length > 0) return filter[0].text;
            return false;
        }
    },
    async mounted() {
        this.banks = await Banks().then(({ banks }) => banks);
        this.types = await Types().then(({ company }) => company);
        this.positions = await Positions().then(({ position }) => position);
        this.lgNames = await LG().then(({ lgNames }) => lgNames);
        await Promise.all([this.GET_KYC(), this.GET_NEXT_KYC()]);
    },
    watch: {
        "bvnData.bvn": function(newVal) {
            if (newVal) {
                if (newVal.length > 11) {
                    this.issues = {
                        bvn: "BVN should be 11 digits"
                    };
                } else {
                    this.issues = {};
                }
            }
        },
        "itemData.bankAcctNo": function(newVal) {
            if (newVal) {
                if (newVal.length > 10) {
                    this.issues.bankAcctNo = "Account number should be 10 digits";
                } else {
                    this.issues = {};
                }
            }
        }
    }
};
</script>
