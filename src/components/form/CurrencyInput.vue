<template>
    <Fragment>
        <input
            type="text"
            v-model="displayValue"
            @blur="isInputActive = false"
            @focus="isInputActive = true"
            @click="resetError"
            class="form__input"
            :placeholder="placeholder"
            :class="{ 'is-invalid': errorMessage }"
        />
        <p class="form-error" v-if="errorMessage">
            <small>{{ errorMessage }}</small>
        </p>
    </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
export default {
    components: { Fragment },
    props: {
        currency: {
            type: String,
            required: true
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
            isInputActive: false
        };
    },
    computed: {
        currencyFormat() {
            if (this.currency === "NGN") return { prefix: "₦" };
            return "USD";
        },
        localeFormat() {
            return `en-${this.currency.substr(0, 2)}`;
        },
        displayValue: {
            get: function() {
                if (this.isInputActive) {
                    // Cursor is inside the input field. unformat display value for user
                    return this.value ? this.value.toString() : "";
                } else {
                    // User is not modifying now. Format display value for user interface
                    return this.value
                        ? `${this.currency === "NGN" ? "₦" : "$"}` +
                              this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                        : "";
                }
            },
            set: function(modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
                // Ensure that it is not NaN
                if (isNaN(newValue)) {
                    newValue = 0;
                }
                // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
                // $emit the event so that parent component gets it
                this.$emit("input", newValue);
            }
        }
    },
    methods: {
        // handleInput() {
        //     this.$emit("input", this.content);
        // },
        resetError() {
            this.$emit("reset");
        }
    }
};
</script>
