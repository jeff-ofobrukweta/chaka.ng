<template>
    <Fragment>
        <input
            :type="type"
            :name="name"
            v-model="content"
            @input="handleInput"
            @click="resetError"
            :placeholder="placeholder"
            class="form__input"
            :class="{ 'is-invalid': errorMessage, navbar: navbar }"
            :required="required"
            :minlength="minlength"
            :maxlength="maxlength"
            :disabled="disabled"
            :min="min"
            :step="type === 'number' ? 'any' : ''"
        />
        <p class="form-error" :class="{ navbar: navbar }" v-if="errorMessage">
            <small>{{ errorMessage }}</small>
        </p>
        <!-- <p class="form-error" v-if="errorMessage">
            <small>{{ errorMessage }}</small>
        </p> -->
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
            type: [String, Number, Boolean]
        },
        type: {
            type: String,
            required: true
        },
        label: {
            type: String
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
        min: {
            type: [String, Number]
        },
        errorMessage: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        navbar: {
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
            this.$emit("input", this.content);
        },
        resetError() {
            this.$emit("reset");
        }
    },
    watch: {
        value(newVal) {
            this.content = newVal;
        }
    }
};
</script>
