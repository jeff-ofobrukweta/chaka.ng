<template>
    <main class="main" role="main">
        <div class="auth-box">
            <form class="auth-form" @submit.prevent="login" novalidate>
                <h3 class="auth-form__title">Forgot Password</h3>
                <p class="auth-form__subtitle"></p>
                <div class="auth-form__group">
                    <label class="form__label"
                        >Email
                        <form-input
                            type="email"
                            name="email"
                            v-model="itemData.email"
                            :error-message="errors.email"
                            placeholder="Email Address"
                            @reset="resetError"
                    /></label>
                </div>
               
                <error-block type="login" />
                <div class="auth-form__group">
                    <div>
                        <action-button
                            type="submit"
                            :disabled="!formValid"
                            :pending="loading"
                            :classes="['btn-full', 'btn__primary']"
                            >Submit</action-button
                        >
                    </div>
                    <section class="auth-form__meta">
                        <p>
                            Remeber now?
                            <router-link class="primary" :to="{ name: 'login' }"
                                >Login</router-link
                            >
                        </p> 
                    </section>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import auth from "../../services/validations/auth";
import { mapActions, mapMutations } from "vuex";

export default {
    name: "Login",
    data() {
        return {
            itemData: {},
            errors: {},
            loading: false
        };
    },
    computed: {
        formValid() {
            if (this.loading || Object.keys(this.errors).length > 0) return false;
            return true;
        }
    },
    methods: {
        ...mapActions(["LOGIN"]),
        ...mapMutations(["RESET_REQ"]),
        login() {
            this.RESET_REQ();
            if (!this.itemData.email) {
                this.$set(this.errors, "email", "Field is required");
            } else if (!auth.email(this.itemData.email)) {
                this.$set(this.errors, "email", "Invalid email");
            }
            if (!this.itemData.password) {
                this.$set(this.errors, "password", "Field is required");
            }
            // const p = auth.password(this.itemData.password);
            // console.log(p);
            // else if(){
            //     console.log()
            // }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.loading = true;
            this.LOGIN(this.itemData).then(resp => {
                this.loading = false;
                if (resp) this.$router.push({ name: "dashboard" });
            });
        },
        resetError() {
            this.errors = {};
        }
    },
    mounted() {
        this.resetError();
        document.title = "Chaka - Login";
        document.getElementsByTagName("meta").keywords.content =
            "nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse";
        document.getElementsByTagName("meta").description.content =
            "Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.";
    }
};
</script>
