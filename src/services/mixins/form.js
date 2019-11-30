import Joi from "@hapi/joi";

const form = {
    data() {
        return {
            errors: {},
            message: null,
            valid: false
        };
    },
    mounted() {
        this.clearErrors();
        this.clearFormField();
    },
    methods: {
        /**
         * Clear the form errors
         */
        clearErrors(field = null) {
            this.errors = {};
            // if (!field) {
            //     this.errors = {};
            // } else {
            //     delete this.errors[field];
            // }
        },
        /**
         * Clear the form field.
         */
        clearFormField() {
            if (this.itemData) {
                Object.keys(this.itemData).forEach(key => {
                    this.itemData[key] = "";
                });
            }
        },
        /**
         * Validate form data
         */
        validate(value, schema) {
            const result = schema.validate(value);
            if (result.error) {
                result.error.details.forEach(error => {
                    this.$set(this.errors, error.path[0], error.message);
                    this.errors[error.path[0]] = error.message;
                });
            }
            return true;
        }
    }
};

export default form;
