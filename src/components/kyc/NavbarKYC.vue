<template>
    <section class="kyc-nav__section" v-if="Object.keys(getNextKYC).length > 0">
        <template v-if="getNextKYC.nextKYC[0] === 'disclosureName'">
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
                    </div>

                    <div class="kyc-nav__field">
                        <Field :field="disclosureField" @input="handleInput" />
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a href="">Hide</a>
                        <action-button
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
                            :pending="loading"
                            icon
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                        <a href="" class="skip">Skip</a>
                    </div>
                </div>
            </form>
        </template>
        <template v-else-if="getNextKYC.nextKYC[0] === 'bvn'">
            <form @submit.prevent="submitBVN">
                <div class="kyc-nav container">
                    <div class="kyc-nav__text">
                        <h5>BVN Verification</h5>
                        <p>
                            <small>Enter your Bank Verification Number</small>
                        </p>
                    </div>
                    <div class="kyc-nav__field">
                        <Field :field="bvnField" @input="handleInput" v-model="itemData.bvn" />
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a href="">Hide</a>
                        <action-button
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
                            :pending="loading"
                            icon
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                        <a href="">Hide</a>
                    </div>
                </div>
            </form>
        </template>
        <template v-else-if="getNextKYC.nextKYC[0] === 'phone'">
            <form @submit.prevent="submitPhone">
                <div class="kyc-nav container">
                    <div class="kyc-nav__text">
                        <h5>Verify Phone</h5>
                        <p>
                            <small>An OTP has been sent to your registered phone number</small>
                        </p>
                        <p><small>Click here to use a different phone number</small></p>
                    </div>
                    <div class="kyc-nav__field">
                        <Field :field="OTPField" @input="handleInput" v-model="itemData.otp" />
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a href="">Hide</a>
                        <action-button
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
                            :pending="loading"
                            icon
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                        <div>
                            <a href="">Hide</a>
                        </div>
                    </div>
                </div>
            </form>
        </template>
        <template v-else-if="getNextKYC.nextKYC[0] === 'nin'">
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
                            <button class="btn btn__white btn-small">Skip</button>
                        </p>
                    </div>
                    <div class="kyc-nav__field">
                        <Field :field="ninField" @input="handleInput" v-model="itemData.nin" />
                    </div>
                    <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                        <a href="">Hide</a>
                        <action-button
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
                            :pending="loading"
                            icon
                            :classes="['btn-block', 'btn__primary']"
                            >Submit</action-button
                        >
                        <div>
                            <a class="skip" href="">Skip</a>
                            <a href="">Hide</a>
                        </div>
                    </div>
                </div>
            </form>
        </template>
        <error-block type="kyc" navbar v-if="fromNavbar" />
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Field from "./KYCField";
import AllKYCFields from "../../services/kyc/index";

export default {
    name: "kyc-navbar",
    components: {
        Field
    },
    data() {
        return {
            allFields: [],
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
            itemData: {},
            loading: false,
            fromNavbar: false
        };
    },
    computed: {
        ...mapGetters(["getWindowWidth", "getKYC", "getNextKYC", "getCountryCodes"]),
        currentIndex() {}
    },
    methods: {
        ...mapActions([
            "GET_KYC",
            "GET_NEXT_KYC",
            "UPDATE_KYC",
            "UPDATE_KYC_NIN",
            "RESOLVE_BVN",
            "GET_COUNTRY_CODES"
        ]),
        handleInput(e) {
            this.itemData[e.name] = e.value;
        },
        submitDisclosure() {
            this.loading = true;
            // this.navbarError = true;
            this.UPDATE_KYC(this.itemData).then(resp => {
                this.loading = false;
                if (resp) {
                    this.itemData = {};
                }
            });
        },
        submitBVN() {
            this.loading = true;
            this.RESOLVE_BVN(this.itemData).then(resp => {
                this.loading = false;
                if (resp) {
                    this.itemData = {};
                }
            });
        },
        submitNIN() {
            this.loading = true;
            this.UPDATE_KYC_NIN(this.itemData).then(resp => {
                this.loading = false;
                if (resp) {
                    this.itemData = {};
                }
            });
        },
        submitPhone() {
            console.log("YET TO BE IMPLEMENTED");
        }
    },
    async mounted() {
        await Promise.all([this.GET_KYC(), this.GET_NEXT_KYC()]);
        this.GET_COUNTRY_CODES();
    }
};
</script>
