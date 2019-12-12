<template>
    <main class="main" role="main">
        <div class="auth-box">
            <form class="auth-form" @submit.prevent="reset" novalidate>
                <h3 class="auth-form__title">Reset Password</h3>
                <p class="auth-form__subtitle">Enter and confirm your new password</p>
                <div class="auth-form__group">
                    <label class="form__label"
                        >New Password
                        <form-input
                            type="password"
                            name="password"
                            v-model="itemData.newPassword"
                            placeholder="Create Password"
                            :error-message="errors.newPassword"
                            @reset="resetError"
                    /></label>
                    <div class="form-info" v-if="!errors.newPassword">
                        <small
                            >**Password should contain at least one uppercase character, number or
                            symbol and at least 7 characters</small
                        >
                    </div>
                </div>
                <div class="auth-form__group">
                    <label class="form__label"
                        >Confirm Password
                        <form-input
                            type="password"
                            name="confirm-password"
                            v-model="confirmPassword"
                            placeholder="Confirm Password"
                            :error-message="errors.confirmPassword"
                            @reset="resetError"
                    /></label>
                </div>
                <error-block type="reset-password" />
                <div class="auth-form__group">
                    <div>
                        <action-button
                            type="submit"
                            :disabled="!formValid"
                            :pending="loading"
                            :classes="['btn-full', 'btn__primary']"
                            >Sign Up</action-button
                        >
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import auth from "../../services/validations/auth";
import { mapActions, mapMutations } from "vuex";
export default {
    name: "ResetPassword",
    data() {
        return {
            itemData: {},
            loading: false,
            confirmPassword: null,
            errors: {}
        };
    },
    computed: {
        formValid() {
            if (this.loading || Object.keys(this.errors).length > 0) return false;
            return true;
        },
        chakaID() {
            return this.$route.params.chakaID;
        },
        token() {
            return this.$route.params.token;
        }
    },
    methods: {
        ...mapActions(["RESET_PASSWORD"]),
        ...mapMutations(["RESET_REQ"]),
        reset() {
            this.RESET_REQ();
            if (!this.itemData.newPassword) {
                this.$set(this.errors, "password", "Field is required");
            }
            if (!this.confirmPassword) {
                this.$set(this.errors, "confirmPassword", "Field is required");
            } else if (this.confirmPassword !== this.itemData.newPassword) {
                this.$set(this.errors, "confirmPassword", "Password should match initial password");
                return false;
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.loading = true;
            this.itemData.chakaID = this.chakaID;
            this.itemData.token = this.token;
            this.RESET_PASSWORD(this.itemData).then(resp => {
                this.loading = false;
                this.success = resp;
            });
        },
        resetError() {
            this.errors = {};
        }
    }
};
</script>
