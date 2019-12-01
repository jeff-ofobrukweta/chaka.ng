<template>
    <Fragment>
        <input
            :type="type"
            :name="name"
            v-model="content"
            @input="handleInput"
            :placeholder="placeholder"
            class="form__input"
            :class="{ 'is-invalid': errorMessage || invalid.$error }"
            :required="required"
            :minlength="minlength"
            :maxlength="maxlength"
            :disabled="disabled"
        />
        <p class="form-error" v-if="invalid.$error">
            <small>{{ errorMessage }}</small>
        </p>
        <p class="form-error" v-if="errorMessage">
            <small>{{ errorMessage }}</small>
        </p>
    </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
export default {
    name: "form-input",
    components: {
        Fragment
    },
    props: {
        name: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        value: {
            type: String
        },
        type: {
            type: String,
            required: true
        },
        label: {
            type: String
        },
        invalid: {
            type: Object,
            default: () => {
                return {};
            }
        },
        required: {
            type: Boolean
        },
        minlength: {
            type: String
        },
        maxlength: {
            type: String
        },
        errorMessage: {
            type: String
        },
        disabled: {
            type: Boolean
        }
    },
    data() {
        return {
            content: this.value
        };
    },
    methods: {
        handleInput() {
            this.clearErrors();
            this.$emit("input", this.content);
        },
        resetError() {
            this.$emit("reset");
        }
    }
};
</script>
