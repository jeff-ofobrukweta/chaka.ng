<template>
    <section class="kyc-nav__section">
        <form @submit.prevent="submitDisclosure">
            <div class="kyc-nav container">
                <div class="kyc-nav__text">
                    <h4>Verification by Financial Regulators</h4>
                    <p>
                        By typing to sign my name below I acknowledge that I have read and agree to
                        <a
                            href="https://apps.drivewealth.com/disclosures?sweepType=bank"
                            target="_blank"
                            >Drivewealth Disclosures</a
                        >,
                        <a
                            href="https://drivewealth.com/customer-account-agreement?lang=en_US"
                            target="_blank"
                            >DriveWealth Account Agreement</a
                        >
                        and
                        <a
                            href="https://apps.drivewealth.io/disclosures/?citizenship=NG&showOnlyTaxDoc=true"
                            target="_blank"
                            >W8-BEN Agreement Disclosure</a
                        >
                    </p>
                </div>
                <div class="kyc-nav__field">
                    <Field :field="disclosureField" @input="handleInput" />
                </div>
                <div class="kyc-nav__actions" v-if="getWindowWidth !== 'mobile'">
                    <a href="">Hide</a>
                    <button class="btn kyc-nav__button">
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
                    <button type="submit" class="btn btn__primary btn-block">
                        Submit
                    </button>
                    <a href="">Hide</a>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import Field from "./KYCField";
import AllKYCFields from "../../services/kyc/index";
import Types from "../../services/kyc/employmentTypes";
import Positions from "../../services/kyc/employmentPosition";
import Banks from "../../services/kyc/banks";
import lg from "../../services/kyc/lgNames";
export default {
    name: "kyc-navbar",
    components: {
        Field
    },
    data() {
        return {
            allFields: [],
            lg: lg.lgNames,
            banks: Banks.banks,
            positions: Positions.position,
            types: Types.company,
            requiredFields: ["gender", "address", "lg"],
            disclosureField: {
                name: "Disclosure Name",
                type: "text",
                value: "disclosureName"
            },
            itemData: {}
        };
    },
    computed: {
        ...mapGetters(["getWindowWidth"])
    },
    methods: {
        handleInput(e) {
            this.itemData = e;
        },
        submitDisclosure() {
            console.log(this.itemData);
        }
    },
    mounted() {}
};
</script>
