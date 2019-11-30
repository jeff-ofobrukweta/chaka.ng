<template>
    <form class="kyc-modal" @submit.prevent="updateKYC">
        <Field
            v-for="(field, i) in allFields"
            :key="i"
            :field="field"
            @input="handleInput"
            :options="checkOptions(field)"
        />

        <error-block type="kyc" />
        <div class="text-center">
            <action-button
                type="submit"
                :disabled="!formComplete"
                :pending="loading"
                :classes="['btn-block', 'btn__primary']"
                >Submit</action-button
            >
        </div>
    </form>
</template>

<script>
import Field from "./KYCField";
import AllKYCFields from "../../services/kyc/index";
import Types from "../../services/kyc/employmentTypes";
import Positions from "../../services/kyc/employmentPosition";
import Banks from "../../services/kyc/banks";
import lg from "../../services/kyc/lgNames";
import { mapActions } from "vuex";
export default {
    name: "kyc-modal",
    components: {
        Field
    },
    props: {
        requiredFields: {
            type: Array,
            required: true
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
            formComplete: false
        };
    },
    methods: {
        ...mapActions(["GET_NEXT_KYC", "UPDATE_KYC_BANK", "UPDATE_KYC", "UPLOAD_KYC_FILE"]),
        handleInput(e) {
            this.itemData[e.name] = e.value;
            this.formComplete = Object.keys(this.itemData).length === this.requiredFields.length;
        },
        updateKYC() {
            Object.keys(this.itemData).forEach(el => {
                if (el === "bankCode" || el === "bankAcctNo") this.state = "bank";
                else if (el === "bankCode" || el === "bankAcctNo") this.state = "bank";
                else if (el === "addressProofUrl" || el === "idPhotoUrl" || el === "passportUrl")
                    this.state = "file";
                else this.state = "default";
            });
            this.loading = true;
            if (this.state === "bank") {
                this.UPDATE_KYC_BANK(this.itemData).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.$emit("updated");
                    }
                });
            } else if (this.state === "file") {
                this.UPLOAD_KYC_FILE(this.itemData).then(resp => {
                    this.loading = true;
                    if (resp) {
                        this.$emit("updated");
                    }
                });
            } else {
                this.UPDATE_KYC(this.itemData).then(resp => {
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
        }
    },
    mounted() {
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
