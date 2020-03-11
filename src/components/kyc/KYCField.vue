<template>
    <div class="kyc-field__group" :class="{ inline: inline }" v-if="field.type === 'text' || field.type === 'number'">
        <label class="form__label"
            ><span class="form__label--flex">{{ noLabel ? "" : field.name }} <span v-if="field.optional">Optional</span></span>
            <form-input
                :type="field.type"
                :name="field.name"
                v-model="value"
                :placeholder="field.placeholder || field.name"
                @input="handleInput"
                :navbar="navbar"
                :error-message="errorMessage"
        /></label>
    </div>
    <div class="kyc-field__group" v-else-if="field.value === 'lg'">
        <label class="form__label">{{ field.name }}</label>
        <v-select
            class="form__input form__select"
            placeholder="Local Government Area"
            v-model="selectedLg"
            :clearable="false"
            label="text"
            @input="handleInput"
            :options="options"
        ></v-select>
        <!-- <label class="form__label"
            >{{ field.name }}
            <select class="form__input" :name="field.name" v-model="value" @change="handleInput">
                <option v-for="(option, i) in options" :key="i" :value="option.value">{{
                    option.text
                }}</option>
            </select></label
        > -->
    </div>
    <div class="kyc-field__group" v-else-if="field.type === 'select'">
        <label class="form__label"
            >{{ field.name }}
            <select class="form__input" :name="field.name" v-model="value" @change="handleInput">
                <template v-if="field.value === 'bankCode'">
                    <option v-for="(option, i) in options" :key="i" :value="option.bankCode">{{ option.name }}</option>
                </template>
                <template v-else>
                    <option v-for="(option, i) in options" :key="i" :value="option.value">{{ option.text }}</option>
                </template>
            </select></label
        >
        <p class="form-error" v-if="errorMessage">
            <small>{{ errorMessage }}</small>
        </p>
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
    <div class="kyc-field__group" v-else-if="field.type === 'image'">
        <Uploads
            :form-name="field.value"
            :selected-name="selectedName"
            :idType="idType"
            :image="null"
            @error="handleUploadError"
            @success="handleUploadSuccess"
            @reset="handleReset"
        />
    </div>
</template>

<script>
import Types from "../../services/kyc/employmentTypes";
import Positions from "../../services/kyc/employmentPosition";
import Uploads from "../FileUpload";

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
        },
        noLabel: {
            type: Boolean
        },
        inline: {
            type: Boolean
        },
        errorMessage: {
            type: String
        },
        navbar: {
            type: Boolean
        },
        selectedName: {
            type: String
        },
        idType: {
            type: String
        },
        optional: {
            type: Boolean
        }
    },
    components: {
        vSelect: () => import("vue-select"),
        Uploads
    },
    data() {
        return {
            value: null,
            positions: Positions.position,
            types: Types.company,
            employment: {},
            selectedLg: {}
        };
    },
    methods: {
        handleInput(e) {
            if (this.field.type === "button") {
                this.value = e;
            }
            if (this.field.value === "lg") {
                this.value = this.selectedLg.value;
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
        // if (this.field.type === "select") {
        //     if (this.field.value === "bankCode") {
        //         this.value = this.options[0].bankCode;
        //     } else this.value = this.options[0].value;
        //     this.handleInput();
        // } else if (this.field.value === "employmentStatus") {
        //     this.value = "EMPLOYED";
        // }
    }
};
</script>
