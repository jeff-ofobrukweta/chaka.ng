<template>
    <main class="main" role="main">
        <div class="auth-box" v-if="!success">
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
                            placeholder="New Password"
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
                            >Reset</action-button
                        >
                    </div>
                </div>
            </form>
        </div>
        <div class="auth-box text-center" v-else>
            <div class="form__image">
                <svg
                    width="83"
                    height="83"
                    viewBox="0 0 83 83"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M41.029 0C18.3668 0 0.00195312 18.3697 0.00195312 41.027C0.00195312 63.6868 18.3691 82.054 41.029 82.054C63.6862 82.054 82.0534 63.6868 82.0534 41.027C82.0534 18.3723 63.6862 0 41.029 0ZM41.029 74.3613C22.6182 74.3613 7.69464 59.4378 7.69464 41.027C7.69464 22.6162 22.6208 7.69269 41.029 7.69269C59.4371 7.69269 74.3607 22.6162 74.3607 41.027C74.3607 59.4378 59.4374 74.3613 41.029 74.3613ZM57.1527 23.5752C55.4089 22.5342 53.1807 23.1521 52.1782 24.9598L38.4212 49.6709L30.7595 40.3449C29.3723 38.7474 27.5287 37.9193 25.7876 38.9603C24.0438 40.0038 23.3233 42.5143 24.4517 44.1247L35.1136 57.1019C35.911 58.1378 36.8212 58.7585 37.7727 58.9355L37.7804 58.951L37.8779 58.9561C38.0934 58.9894 41.3141 59.5843 42.7013 57.1022L58.4917 28.7399C59.4936 26.929 58.8964 24.6187 57.1527 23.5752Z"
                        fill="#3DB39E"
                    />
                </svg>
            </div>
            <p class="auth-form__title">Reset Password Successful</p>
            <br />
            <div>
                <router-link class="btn btn__primary" :to="{ name: 'login' }">Login</router-link>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import auth from '../../services/validations/auth';

export default {
    name: 'ResetPassword',
    data() {
        return {
            itemData: {},
            loading: false,
            confirmPassword: null,
            errors: {},
            success: null
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
        ...mapActions(['RESET_PASSWORD']),
        ...mapMutations(['RESET_REQ']),
        reset() {
            this.RESET_REQ();
            if (!this.itemData.newPassword) {
                this.$set(this.errors, 'password', 'Field is required');
            }
            if (!this.confirmPassword) {
                this.$set(this.errors, 'confirmPassword', 'Field is required');
            } else if (this.confirmPassword !== this.itemData.newPassword) {
                this.$set(this.errors, 'confirmPassword', 'Password should match initial password');
                return false;
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.loading = true;
            this.itemData.chakaID = this.chakaID;
            this.itemData.token = this.token;
            this.RESET_PASSWORD(this.itemData).then((resp) => {
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
