<template>
    <main class="main" role="main">
        <div class="auth-box">
            <form class="auth-form" @submit.prevent="login" novalidate>
                <h3 class="auth-form__title">Create your profile</h3>
                <p class="auth-form__subtitle">Set up your personal profile and get verified</p>
                <div class="auth-form__group">
                    <label class="form__label"
                        >Email
                        <form-input
                            type="email"
                            name="email"
                            v-model="itemData.email"
                            placeholder="Email Address"
                            error-message="Email must be valid"
                            :invalid="$v.itemData.email"
                            @reset="resetError"
                    /></label>
                </div>
                <div class="auth-form__group">
                    <label class="form__label"
                        >Create Password
                        <form-input
                            type="password"
                            name="password"
                            v-model="itemData.password"
                            placeholder="Create Password"
                            error-message="Password should contain at least one uppercase character, number or
                            symbol"
                            :invalid="$v.itemData.password"
                            @reset="resetError"
                    /></label>
                    <div class="form-info" v-if="!$v.itemData.password">
                        <small
                            >**Password should contain at least one uppercase character, number or
                            symbol</small
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
                            error-message="Password should match your initial password"
                            :invalid="passwordError"
                            @reset="resetError"
                    /></label>
                </div>
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
                    <section class="auth-form__meta">
                        <p>
                            Already have an account?
                            <router-link class="primary" :to="{ name: 'login' }"
                                >Login here</router-link
                            >
                        </p>
                    </section>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
    name: "Login",
    data() {
        return {
            itemData: {},
            loading: false,
            confirmPassword: null,
            passwordError: {}
        };
    },
    computed: {
        formValid() {
            if (this.loading || this.$v.itemData.$error) return false;
            return true;
        }
    },
    methods: {
        login() {
            this.$v.itemData.$touch();
            if (this.confirmPassword !== this.itemData.password || !this.confirmPassword) {
                this.passwordError = {
                    $error: true
                };
            }
            if (this.$v.itemData.$pending || this.$v.itemData.$error) {
                return false;
            }
        },
        resetError() {
            this.$v.$reset();
            this.passwordError = {};
        }
    },
    mounted() {
        document.title =
            "Chaka - Your Investment Passport to Trade Nigerian, US & International Stock Markets";
    },
    validations: {
        itemData: {
            email: { required, email },
            password: { required, minLength: minLength(7) }
        }
    }
};
</script>
