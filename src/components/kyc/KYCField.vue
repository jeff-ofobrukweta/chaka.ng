<template>
    <div class="kyc-field__group" v-if="field.type === 'text' || field.type === 'number'">
        <label class="form__label"
            >{{ field.name }}
            <form-input
                :type="field.type"
                :name="field.name"
                v-model="value"
                :placeholder="field.name"
                @input="handleInput"
        /></label>
    </div>
    <div class="kyc-field__group" v-else-if="field.type === 'select'">
        <label class="form__label"
            >{{ field.name }}
            <select class="form__input" :name="field.name" v-model="value" @input="handleInput">
                <template v-if="field.value === 'bankCode'">
                    <option v-for="(option, i) in options" :key="i" :value="option.bankCode">{{
                        option.name
                    }}</option>
                </template>
                <template v-else>
                    <option v-for="(option, i) in options" :key="i" :value="option.value">{{
                        option.text
                    }}</option>
                </template>
            </select></label
        >
    </div>
    <div v-else-if="field.value === 'employmentStatus'">
        <div class="kyc-field__group">
            <label class="form__label">Employment Status</label>
            <div class="kyc-nav__button--group">
                <button
                    v-for="(button, i) in field.options"
                    :key="i"
                    type="button"
                    :value="button.value"
                    class="btn kyc-nav__pill"
                    :class="{ active: value === button.value }"
                    @click="handleInput(button.value)"
                >
                    {{ button.name }}
                </button>
            </div>
        </div>

        <template v-if="value !== 'UNEMPLOYED'">
            <div class="kyc-field__group">
                <label class="form__label"
                    >Employment Company
                    <form-input
                        required
                        type="text"
                        name="employmentCompany"
                        v-model="employment.employmentCompany"
                        placeholder="Employment Details"
                        :error-message="errors.employmentCompany"
                /></label>
            </div>
            <div class="kyc-field__group">
                <label class="form__label"
                    >Employment Type
                    <select
                        required
                        class="form__input"
                        name="employmentType"
                        v-model="employment.employmentType"
                        :error-message="errors.employmentType"
                    >
                        <option v-for="(option, i) in types" :key="i" :value="option.value">{{
                            option.text
                        }}</option>
                    </select></label
                >
            </div>
            <div class="kyc-field__group">
                <label class="form__label"
                    >Employment Position
                    <select
                        class="form__input"
                        name="employmentPosition"
                        v-model="employment.employmentPosition"
                        :error-message="errors.employmentPosition"
                    >
                        <option v-for="(option, i) in positions" :key="i" :value="option.value">{{
                            option.text
                        }}</option>
                    </select></label
                >
            </div>
        </template>
    </div>
    <div class="kyc-field__group" v-else-if="field.type === 'button'">
        <label class="form__label">{{ field.name }}</label>
        <div class="kyc-nav__button--group">
            <button
                v-for="(button, i) in field.options"
                :key="i"
                type="button"
                :value="button.value"
                class="btn kyc-nav__pill"
                :class="{ active: value === button.value }"
                @click="handleInput(button.value)"
            >
                {{ button.name }}
            </button>
        </div>
    </div>
</template>

<script>
import Types from "../../services/kyc/employmentTypes";
import Positions from "../../services/kyc/employmentPosition";
export default {
    name: "kyc-field",
    props: {
        field: {
            required: true,
            type: Object
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            value: null,
            positions: Positions.position,
            types: Types.company,
            employment: {}
        };
    },
    methods: {
        handleInput(e) {
            if (this.field.type === "button") {
                this.value = e;
            }
            if (this.field.value === "employmentStatus" && this.value !== "UNEMPLOYED") {
                if (!this.employment.employmentType) {
                    this.$set(this.errors, 'employmentType', "Company type is required")
                    // this.errors = {
                    //     employmentType: "Field is required"
                    // };
                }
                if (!this.employment.employmentCompany) {
                    this.$set(this.errors, 'employmentCompany', "Company name is required")
                    // this.errors = {
                    //     employmentType: "Company name is required"
                    // };
                }
                if (!this.employment.employmentPosition) {
                    this.$set(this.errors, 'employmentPosition', "Employment position is required")
                    // this.errors = {
                    //     employmentType: "Employment Position is required"
                    // };
                } else if (Object.keys(this.employment).length === 3) {
                    this.employment.employmentStatus = this.value;
                    this.$emit("optional", this.employment);
                    return true;
                }
                return false;
            }
            const temp = {
                name: this.field.value,
                value: this.value
            };
            this.$emit("input", temp);
        },
        handleEmployment() {
            this.employment.employmentStatus = this.value;
            this.$emit("input", this.employment);
        }
    },
    mounted() {
        if (this.field.type === "select") {
            if (this.field.value === "bankCode") {
                this.value = this.options[0].bankCode;
            } else this.value = this.options[0].value;
            this.handleInput();
        }
    }
};
</script>
