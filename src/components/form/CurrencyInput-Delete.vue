<template>
    <Fragment>
        <CurrencyInput
            @input="handleInput"
            v-model="content"
            :currency="currency"
            :locale="locale"
            :precision="5"
            value-as-integer
        />
        <p class="form-error" v-if="errorMessage">
            <small>{{ errorMessage }}</small>
        </p>
    </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { CurrencyInput } from "vue-currency-input";

export default {
    components: { Fragment, CurrencyInput },
    props: {
        currency: {
            type: String,
            required: true
        },
        locale: {
            type: String
            // required: true
        },
        errorMessage: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        placeholder: {
            type: String
        },
        value: {
            type: Number
        }
    },
    data() {
        return {
            content: this.value
        };
    },
    methods: {
        handleInput() {
            this.$emit("input", this.content);
        },
        resetError() {
            this.$emit("reset");
        }
    },
    watch: {
        value(val) {
            this.content = val;
        }
    }
};
</script>
