import Joi from "@hapi/joi";

const form = {
    data() {
        return {
            issues: {},
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
         * Clear the form issues
         */
        clearErrors(field = null) {
            if (!field) {
                this.issues = {};
                this.errors = {};
            } else {
                delete this.issues[field];
                delete this.errors[field];
            }
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
            const result = Joi.validate(value, schema, { abortEarly: false });
            if (result.error) {
                result.error.details.forEach(error => {
                    this.issues[error.path[0]] = error.message;
                });
            }
            return true;
        }
    }
};

export default form;
