<template>
    <Fragment>
        <input
            :type="type"
            :name="name"
            v-model="content"
            @input="handleInput"
            :placeholder="placeholder"
            class="form__input"
            :class="{ 'is-invalid': invalid.$error }"
            @focus="resetError"
        />
        <span class="form-error" v-if="invalid.$error">{{ errorMessage }}</span>
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
        errorMessage: {
            type: String,
            default: () => {
                return "Field is required";
            }
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
    }
};
</script>
