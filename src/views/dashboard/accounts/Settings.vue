<template>
    <div>
        <section class="accounts__title">
            <h3>Settings</h3>
        </section>

        <section class="accounts-settings__uploads">
            <Uploads
                name="Profile Picture"
                form-name="passportUrl"
                description="Set Profile Picture"
                :image="getKYC.passportUrl"
                @error="handleUploadError"
                @success="handleUploadSuccess"
                @reset="handleReset"
            />
            <Uploads
                name="Passport/National ID"
                form-name="idPhotoUrl"
                description="Upload your National ID, Voter's Card or International Passport"
                :image="getKYC.idPhotoUrl"
                @error="handleUploadError"
                @success="handleUploadSuccess"
                @reset="handleReset"
            />
            <Uploads
                name="Address Proof"
                form-name="addressProofUrl"
                description="Upload your Utility bill or Bank Statement"
                :image="getKYC.addressProofUrl"
                @error="handleUploadError"
                @success="handleUploadSuccess"
                @reset="handleReset"
            />
        </section>

        <error-block type="kyc" :message="showUploadError" status="error" v-if="showUploadError" />
        <error-block
            type="kyc"
            message="File uploaded successfully"
            status="success"
            v-else-if="showUploadSuccess"
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
                <a
                    class="accounts-settings__edit"
                    v-if="!edit && !getKYC.disclosureName"
                    @click="editBtn('disclosure')"
                    >edit</a
                >
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
            <template v-if="edit === 'disclosure'">
                <error-block type="kyc" />
                <section v-if="!getKYC.disclosureName" class="accounts-settings__submit">
                    <button @click="cancelEdit" type="button" class="btn btn-block btn-dark">
                        Cancel
                    </button>
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

        <form class="accounts-settings__form" @submit.prevent="submitBVN">
            <div class="accounts-settings__title">
                <h5>BVN Verification</h5>
                <a class="accounts-settings__edit" v-if="!edit" @click="editBtn('bvn')">edit</a>
            </div>
            <section class="accounts-settings__hero">
                <div class="accounts-settings__group" v-if="!getKYC.bvn">
                    <label class="form__label"
                        >BVN
                        <form-input
                            type="number"
                            name="bvn"
                            v-model="bvnData.bvn"
                            placeholder="BVN"
                            v-if="edit === 'bvn'"
                        />
                        <p v-else class=" accounts-settings__data">
                            {{ getKYC.bankAcctName || "-" }}
                        </p></label
                    >
                </div>
                <div class="accounts-settings__group">
                    <label class="form__label"
                        >Bank Name
                        <select
                            v-if="edit === 'bvn'"
                            class="form__input form__select"
                            v-model="itemData.bankId"
                        >
                            <option v-for="(bank, index) in banks" :key="index" :value="bank.id">{{
                                bank.name
                            }}</option>
                        </select>
                        <p v-else class=" accounts-settings__data">
                            {{ getKYC.bankAcctName || "-" }}
                        </p></label
                    >
                </div>
                <div class="accounts-settings__group">
                    <label class="form__label"
                        >Bank Number<form-input
                            v-if="edit === 'bvn'"
                            type="number"
                            name="bank number"
                            v-model="itemData.bankAcctNo"
                            placeholder="Bank Account Number"
                        />
                        <p v-else class=" accounts-settings__data">
                            {{ getKYC.bankAcctNo || "-" }}
                        </p></label
                    >
                </div>
            </section>
            <template v-if="edit === 'bvn'">
                <error-block type="kyc" />
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

        <form class="accounts-settings__form" @submit.prevent="submitPhone" v-if="getKYC.bvn">
            <div class="accounts-settings__title">
                <h5>Verify Phone Number</h5>
                <a class="accounts-settings__edit" v-if="!edit" @click="editBtn('phone')">edit</a>
            </div>
            <section class="accounts-settings__hero">
                <div class="accounts-settings__group">
                    <label class="form__label"
                        >Phone Number
                        <form-input
                            v-if="edit === 'phone'"
                            type="number"
                            name="phone"
                            v-model="itemData.phone"
                            placeholder="Phone Number"
                        />
                        <p v-else class=" accounts-settings__data">
                            {{ getKYC.phone || "-" }}
                        </p></label
                    >
                </div>
            </section>
            <template v-if="edit === 'phone'">
                <error-block type="kyc" />
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
                <a class="accounts-settings__edit" v-if="!edit" @click="editBtn('postal')">edit</a>
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
                    <v-select
                        class="form__input form__select"
                        placeholder="Local Government Area"
                        v-model="selectedLg"
                        :clearable="false"
                        label="text"
                        value="value"
                        @input="switchLG($event)"
                        :options="lgNames"
                        v-if="edit === 'postal'"
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
                        itemData.employmentStatus !== 'UNEMPLOYED' ||
                            getKYC.employmentStatus !== 'UNEMPLOYED'
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
                <error-block type="kyc" />
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
                            v-model="itemData.investmentObjective"
                            v-if="edit === 'investment'"
                        >
                            <option value="PROTECTION">Protection</option>
                            <option value="GROWTH">Growth</option>
                            <option value="INCOME">Income</option>
                        </select>
                        <p v-else class="capitalize accounts-settings__data">
                            {{ getKYC.investmentObjective || "-" }}
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
                <error-block type="kyc" />
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

        <form class="accounts-settings__form">
            <div class="accounts-settings__title">
                <h5>Confirm Compliance Status</h5>
                <a class="accounts-settings__edit" v-if="!edit" @click="editBtn('compliance')"
                    >edit</a
                >
            </div>
            <section class="accounts-settings__hero">
                <div class="accounts-settings__group">
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
                </div>
                <div class="accounts-settings__group">
                    <label class="form__label"
                        >Are you politically exposed?
                        <select
                            class="form__input form__select"
                            v-if="edit === 'compliance'"
                            v-model="itemData.pepStatus"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <p v-else class="capitalize accounts-settings__data">
                            {{ getKYC.pepStatus || "-" }}
                        </p></label
                    >
                </div>
            </section>
            <template v-if="edit === 'compliance'">
                <error-block type="kyc" />
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
    </div>
</template>

<script>
import Uploads from "../../../components/FileUpload";
import { mapActions, mapGetters } from "vuex";

const Types = () => import("../../../services/kyc/employmentTypes");
const Positions = () => import("../../../services/kyc/employmentPosition");
const Banks = () => import("../../../services/kyc/banks");
const LG = () => import("../../../services/kyc/lgNames");

export default {
    name: "accounts-settings",
    components: {
        Uploads,
        vSelect: () => import("vue-select")
    },
    data() {
        return {
            itemData: {},
            edit: null,
            loading: false,
            bvnData: {},
            employmentStatus: "EMPLOYRD",
            selectedLg: {},
            lgNames: [],
            banks: [],
            positions: [],
            types: [],
            showUploadError: false,
            showUploadSuccess: false
        };
    },
    computed: {
        ...mapGetters(["getKYC", "getLoggedUser"])
    },
    methods: {
        ...mapActions(["GET_KYC", "GET_NEXT_KYC", "UPDATE_KYC"]),
        editBtn(name) {
            this.edit = name;
            this.showUploadError = null;
            this.showUploadSuccess = null;
        },
        cancelEdit() {
            this.edit = null;
        },
        updateKYC() {
            this.loading = true;
            this.UPDATE_KYC(this.itemData).then(resp => {
                this.loading = false;
                this.edit = null;
                if (resp) this.itemData = {};
            });
        },
        submitBVN() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
        submitPhone() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
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
        switchLG(name) {
            this.itemData.lg = this.selectedLg.value;
        }
    },
    async mounted() {
        await Promise.all([this.GET_KYC(), this.GET_NEXT_KYC()]);
        this.banks = await Banks().then(({ banks }) => banks);
        this.types = await Types().then(({ company }) => company);
        this.positions = await Positions().then(({ position }) => position);
        this.lgNames = await LG().then(({ lgNames }) => lgNames);
    }
};
</script>
