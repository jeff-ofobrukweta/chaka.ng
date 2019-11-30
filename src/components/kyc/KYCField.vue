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
            value: null
        };
    },
    methods: {
        handleInput(e) {
            if (this.field.type === "button") {
                this.value = e;
            }
            const temp = {
                name: this.field.value,
                value: this.value
            };
            this.$emit("input", temp);
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
