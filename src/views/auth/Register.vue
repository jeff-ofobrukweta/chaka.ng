<template>
  <main class="main" role="main">
    <div class="auth-box">
      <form class="auth-form" @submit.prevent="register" novalidate>
        <h3 class="auth-form__title">Create your profile</h3>
        <p class="auth-form__subtitle">Set up your personal profile and get verified</p>
        <div class="auth-form__group">
          <label class="form__label">
            Email
            <form-input
              type="email"
              name="email"
              v-model="itemData.email"
              @focus="resetError"
              placeholder="Email Address"
              :error-message="errors.email"
              @reset="resetError"
            />
          </label>
        </div>
        <div class="auth-form__group">
          <label class="form__label">
            Create Password
            <form-input
              type="password"
              name="password"
              v-model="itemData.password"
              placeholder="Create Password"
              :error-message="errors.password"
              @reset="resetError"
            />
          </label>
          <div class="form-info" v-if="!errors.password">
            <small>**Password should contain at least one uppercase character, number or symbol and at least 7 characters</small>
          </div>
        </div>
        <div class="auth-form__group">
          <label class="form__label">
            Confirm Password
            <form-input
              type="password"
              name="confirm-password"
              v-model="confirmPassword"
              placeholder="Confirm Password"
              :error-message="errors.confirmPassword"
              @reset="resetError"
            />
          </label>
        </div>
        <error-block type="register" />
        <div class="auth-form__group">
          <div style="margin: 1rem 0px;">
            <action-button
              type="submit"
              :disabled="!formValid"
              :pending="loading"
              :classes="['btn-full', 'btn__primary']"
            >Sign Up</action-button>
          </div>
          <div class="or-separator_flex__6ViaO">
            <hr class="or-separator_line__x5QkI" />
            <div class="or-separator_text__2YQdZ">or</div>
            <hr class="or-separator_line__x5QkI" />
          </div>
          <div style="cursor: pointer;" class="socials_container">
            <section @click="authenticate('google')" class="socials_btn">
              <div class="_provider-button_label__1gtgk">
                <span style="white-space:nowrap;">Sign up with</span>
                <svg
                  viewBox="5 -5 30 30"
                  enable-background="new 5 -5 30 30"
                  class="google_img"
                  title="google"
                >
                  <path
                    fill="#fff"
                    d="M15.3-4.2C11.6-3 8.4-.2 6.6 3.2 6 4.5 5.6 5.7 5.3 7c-.7 3.3-.2 6.7 1.3 9.7 1 1.9 2.4 3.7 4.2 5 1.6 1.3 3.5 2.2 5.6 2.7 2.6.7 5.3.7 7.8.1 2.3-.5 4.5-1.6 6.3-3.2 1.9-1.7 3.2-3.9 3.9-6.2.8-2.6.9-5.3.4-8-4.8 0-9.6 0-14.4 0 0 2 0 3.9 0 5.9 2.8 0 5.6 0 8.3 0-.3 1.9-1.5 3.6-3.1 4.6-1 .7-2.2 1.1-3.4 1.3-1.2.2-2.5.2-3.7 0-1.2-.2-2.4-.7-3.4-1.4-1.6-1.1-2.9-2.8-3.5-4.6-.7-1.9-.7-4 0-5.8.5-1.3 1.2-2.5 2.2-3.5 1.2-1.2 2.8-2.1 4.6-2.5 1.5-.3 3-.2 4.5.2 1.2.4 2.4 1 3.3 1.9.9-.9 1.9-1.8 2.8-2.8.5-.5 1-1 1.5-1.5-1.4-1.3-3.1-2.3-4.9-3-3.3-1.2-7-1.2-10.3-.1z"
                  />
                  <path
                    fill="#EA4335"
                    d="M15.3-4.2c3.3-1.1 7-1.1 10.3.1 1.8.7 3.5 1.7 4.9 3-.5.5-1 1-1.5 1.5-.9.9-1.9 1.8-2.8 2.8-.9-.9-2.1-1.5-3.3-1.9-1.4-.4-3-.5-4.5-.2-1.7.4-3.3 1.2-4.6 2.5-1 1-1.8 2.2-2.2 3.5-1.7-1.3-3.3-2.5-5-3.8 1.8-3.5 5-6.2 8.7-7.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 7c.3-1.3.7-2.6 1.3-3.7 1.7 1.3 3.3 2.5 5 3.8-.7 1.9-.7 4 0 5.8-1.7 1.3-3.3 2.5-5 3.8-1.5-2.9-2-6.4-1.3-9.7z"
                  />
                  <path
                    fill="#4285F4"
                    d="M20.3 7.2c4.8 0 9.6 0 14.4 0 .5 2.6.4 5.4-.4 8-.7 2.4-2 4.6-3.9 6.2-1.6-1.2-3.2-2.5-4.9-3.7 1.6-1.1 2.7-2.8 3.1-4.6-2.8 0-5.6 0-8.3 0 0-2 0-4 0-5.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.6 16.7c1.7-1.3 3.3-2.5 5-3.8.6 1.8 1.9 3.5 3.5 4.6 1 .7 2.2 1.2 3.4 1.4 1.2.2 2.4.2 3.7 0 1.2-.2 2.4-.6 3.4-1.3 1.6 1.2 3.2 2.5 4.9 3.7-1.8 1.6-3.9 2.7-6.3 3.2-2.6.6-5.3.6-7.8-.1-2-.5-3.9-1.5-5.6-2.7-1.7-1.3-3.2-3-4.2-5z"
                  />
                </svg>
              </div>
            </section>
            <section style="cursor: pointer;" @click="authenticate('facebook')" class="socials_btn">
              <div class="_provider-button_label__1gtgk">
                <span style="white-space:nowrap;">Sign up with</span>
                <svg
                  viewBox="5 -5 30 30"
                  enable-background="new 5 -5 30 30"
                  class="facebook_img"
                  title="facebook"
                >
                  <path
                    fill="#3C5B9A"
                    d="M33.3-5H6.7C5.7-5 5-4.3 5-3.3v26.7c0 .9.7 1.6 1.7 1.6H21V13.4h-3.9V8.9H21V5.6c0-3.9 2.4-6 5.8-6 1.7 0 3.1.1 3.5.2v4h-2.4c-1.9 0-2.2.9-2.2 2.2v2.9h4.5l-.6 4.5h-3.9V25h7.6c.9 0 1.7-.7 1.7-1.7V-3.3c0-1-.7-1.7-1.7-1.7z"
                  />
                </svg>
              </div>
            </section>
          </div>
          <section class="auth-form__meta">
            <p>
              Already have an account?
              <router-link class="primary" :to="{ name: 'login' }">Login here</router-link>
            </p>
          </section>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import auth from '../../services/validations/auth';

export default {
    name: 'Register',
    data() {
        return {
            itemData: {},
            loading: false,
            confirmPassword: null,
            errors: {},
            token: '',
            profile: ''
        };
    },
    computed: {
        formValid() {
            if (this.loading || Object.keys(this.errors).length > 0) return false;
            return true;
        },
        referralCode() {
            return this.$route.query.code;
        }
    },
    methods: {
        ...mapActions(['REGISTER', 'SOCIAL_LOGIN']),
        ...mapMutations(['RESET_REQ', 'RESET_ALL']),
        register() {
            this.RESET_REQ();
            if (!this.itemData.email) {
                this.$set(this.errors, 'email', 'Field is required');
            } else if (!auth.email(this.itemData.email)) {
                this.$set(this.errors, 'email', 'Invalid email');
            }
            if (!this.itemData.password) {
                this.$set(this.errors, 'password', 'Field is required');
            }
            if (!this.confirmPassword) {
                this.$set(this.errors, 'confirmPassword', 'Field is required');
            } else if (this.confirmPassword !== this.itemData.password) {
                this.$set(
                    this.errors,
                    'confirmPassword',
                    'Password should match initial password'
                );
                return false;
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            if (this.referralCode) {
                this.itemData.referralCode = this.referralCode;
            }
            this.loading = true;
            fbq('track', 'sign up');
            this.REGISTER(this.itemData).then((resp) => {
                this.loading = false;
                if (resp) this.$router.push({ name: 'verification-sent' });
            });
        },
        social(payload) {
            this.RESET_REQ();
            if (!payload.email && !auth.email(payload.email)) {
                this.$set(this.errors, 'email', 'Invalid email');
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.loading = true;
            fbq('track', 'social_login');
            if (payload.email && auth.email(payload.email)) {
                this.SOCIAL_LOGIN(payload).then((resp) => {
                    this.loading = false;
                    if (resp) {
                        this.$router.push({ name: 'dashboard' });
                    }
                });
            }
        },
        authenticate(provider) {
            const this_ = this;
            this.$auth.authenticate(provider).then((caller) => {
                const token = this_.$auth.getToken();
                // getLoginStatus
                this_.token = token;
                // alert(`login success with token ${token}`);
                if (provider === 'facebook') {
                    this_.$http
                        .get('https://graph.facebook.com/v5.0/me?fields=email,name,id', {
                            params: { access_token: token }
                        })
                        .then((response) => {
                            this_.profile = JSON.stringify(response);
                            const payload = {
                                email: response.data.email,
                                provider: 'FB'
                            };
                            this.social(payload);
                        });
                }
                if (provider === 'google') {
                    this_.$http
                        .get('https://www.googleapis.com/oauth2/v1/userinfo', {
                            params: { access_token: token }
                        })
                        .then((response) => {
                            this_.profile = JSON.stringify(response);
                            const payload = {
                                email: response.data.email,
                                provider: 'GL'
                            };
                            this.social(payload);
                        });
                }
                if (provider === 'linkedin') {
                    this_.$http
                        .get('https://api.linkedin.com/v2/me', {
                            params: { access_token: token }
                        })
                        .then((response) => {
                            this_.profile = JSON.stringify(response);
                            this.social(response);
                        });
                }
                if (provider === 'twitter') {
                    this_.$http
                        .get('https://api.twitter.com/1.1/users/show.json', {
                            params: { access_token: token }
                        })
                        .then((response) => {
                            this_.profile = JSON.stringify(response);
                            this.social(response);
                        });
                }
            });
        },
        resetError() {
            this.errors = {};
        }
    },
    mounted() {
        document.title = 'Chaka - Create Your Chaka Account';
        this.RESET_ALL();
    }
};
</script>
