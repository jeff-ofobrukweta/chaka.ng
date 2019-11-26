<template>
    <main class="main" role="main">
        <div class="auth-box">
            <form class="auth-form" @submit.prevent="login" novalidate>
                <h3 class="auth-form__title">Login to Chaka</h3>
                <p class="auth-form__subtitle">Enter your login details to proceed.</p>
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
                        >Password
                        <form-input
                            type="password"
                            name="password"
                            v-model="itemData.password"
                            placeholder="Password"
                            error-message="Password is required"
                            :invalid="$v.itemData.password"
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
                            >Login</action-button
                        >
                    </div>
                    <section class="auth-form__meta">
                        <p>
                            Don't have an account?
                            <router-link class="primary" :to="{ name: 'register' }"
                                >Register now</router-link
                            >
                        </p>
                        <router-link class="primary" :to="{ name: 'forgot-password' }"
                            >Forgot Password</router-link
                        >
                    </section>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
    name: "Login",
    data() {
        return {
            itemData: {},
            loading: false
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

            if (this.$v.itemData.$pending || this.$v.itemData.$error) {
                return false;
            }
        },
        resetError() {
            this.$v.$reset();
        }
    },
    mounted() {
        document.title =
            "Chaka - Your Investment Passport to Trade Nigerian, US & International Stock Markets";
        document.getElementsByTagName("meta").keywords.content =
            "nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse";
        document.getElementsByTagName("meta").description.content =
            "Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.";
    },
    validations: {
        itemData: {
            email: { required, email },
            password: { required, minLength: minLength(7) }
        }
    }
};
</script>
