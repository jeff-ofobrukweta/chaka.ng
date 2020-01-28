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
                            :error-message="errors.email"
                            placeholder="Email Address"
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
                            :error-message="errors.password"
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
                            >Login</action-button
                        >
                    </div>
                     <button @click="authenticate('google')">auth Google</button>
                    <!-- boom -->
                    <!-- <button @click="authenticate('github')">auth Github</button>
                    <button @click="authenticate('facebook')">auth Facebook</button>
                    <button @click="authenticate('google')">auth Google</button>
                    <button @click="authenticate('twitter')">auth Twitter</button>
                    <button @click="authenticate('linkedin')">auth linkedin</button>
                    <h2>Result</h2>
                    <textarea v-model="token" cols="50" rows="5" />
                    <textarea v-model="profile" cols="50" rows="5" /> -->
                    <!-- end boom -->

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
import { mapActions, mapMutations } from "vuex";
import auth from "../../services/validations/auth";
import store from "../../store/index";

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
        ...mapActions(["LOGIN","SOCIAL_LOGIN"]),
        ...mapMutations(["RESET_REQ", "RESET_ALL"]),
        authenticate(provider) {
            const this_ = this;
            this.$auth.authenticate(provider).then(caller => {
                let token = this_.$auth.getToken();
                // getLoginStatus
                this_.token = token;
                alert(`login success with token ${token}`);
                if (provider === "facebook") {
                    this_.$http
                        .get("https://graph.facebook.com/v3.0/me?fields=email,name,id", {
                            params: { access_token: token }
                        })
                        .then(response => {
                            this_.profile = JSON.stringify(response);
                            // const payload ={
                            //     email:response.data.email,
                            //     provider:"FB"
                            // }
                            this.social(response)
                        });
                }
                if (provider === "google") {
                    this_.$http
                        .get("https://www.googleapis.com/oauth2/v1/userinfo", {
                            params: { access_token: token }
                        })
                        .then(response => {
                            this_.profile = JSON.stringify(response);
                            const payload ={
                                email:response.data.email,
                                provider:"GL"
                            }
                            this.social(payload)
                        });
                }
                if (provider === "linkedin") {
                    this_.$http
                        .get("https://api.linkedin.com/v2/me", {
                            params: { access_token: token }
                        })
                        .then(response => {
                            this_.profile = JSON.stringify(response);
                            this.social(response)
                        });
                }
                if (provider === "twitter") {
                    this_.$http
                        .get("https://api.twitter.com/1.1/users/show.json", {
                            params: { access_token: token }
                        })
                        .then(response => {
                            this_.profile = JSON.stringify(response);
                            this.social(response)
                        });
                }
            });
        },
        social(payload) {
            console.log('>>>>>>>>>>>>>>>>>>>>>',payload)
            // this.RESET_REQ();
            // if (!this.itemData.email) {
            //     this.$set(this.errors, "email", "Field is required");
            // } else if (!auth.email(this.itemData.email)) {
            //     this.$set(this.errors, "email", "Invalid email");
            // }
            // if (!this.itemData.password) {
            //     this.$set(this.errors, "password", "Field is required");
            // }
            // // const p = auth.password(this.itemData.password);
            // // console.log(p);
            // // else if(){
            // //     console.log()
            // // }
            // if (Object.keys(this.errors).length > 0) {
            //     return false;
            // }
            // this.loading = true;
            // fbq('track', 'login');
            // this.SOCIAL_LOGIN(this.itemData).then(resp => {
            //     this.loading = false;
            //     if (resp) {
            //         this.$router.push({ name: "dashboard" })
            //     };
            // });
        },
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
            fbq('track', 'login');
            this.LOGIN(this.itemData).then(resp => {
                this.loading = false;
                if (resp) {
                    this.$router.push({ name: "dashboard" })
                };
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
        this.RESET_ALL();
        
    }
};
</script>
