<template>
    <div class="kyc-modal">
        <Field
            v-for="(field, i) in allFields"
            :key="i"
            :field="field"
            @input="handleInput"
            :options="checkOptions(field)"
        />
    </div>
</template>

<script>
import Field from "./KYCField";
import AllKYCFields from "../../services/kyc/index";
import Types from "../../services/kyc/employmentTypes";
import Positions from "../../services/kyc/employmentPosition";
import Banks from "../../services/kyc/banks";
import lg from "../../services/kyc/lgNames";
export default {
    name: "kyc-modal",
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
            requiredFields: ["bankAcctName", "investmentObjectives", "employmentPosition"]
        };
    },
    methods: {
        handleInput(e) {
            console.log(e);
        },
        checkOptions(type) {
            if (type.value === "employmentType") {
                return this.types;
            } else if (type.value === "employmentPosition") {
                return this.positions;
            } else if (type.value === "bankAcctName") {
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
