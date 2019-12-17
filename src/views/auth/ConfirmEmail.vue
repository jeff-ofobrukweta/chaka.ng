<template>
    <main class="main" role="main">
        <div class="auth-box">
            <div class="auth-form text-center" v-if="loading">
                <h3 class="auth-form__title">Verifying your email</h3>
                <br />
                <p>Confirming...</p>
            </div>
            <div class="auth-form text-center" v-else-if="success">
                <div class="form__image">
                    <svg
                        width="83"
                        class="stock-vdr__svg"
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
                <h3 class="auth-form__title">Email Verified</h3>
                <p class="form__caption">You will be redirected to login with your credentials</p>
                <div>
                    <router-link class="btn btn__primary" :to="{ name: 'login' }"
                        >Login</router-link
                    >
                </div>
            </div>
            <div class="auth-form text-center" v-else>
                <error-block type="confirm-email" />
                <p>
                    There was an error confirming your email. Kindly log in to resend confirmation
                    link
                </p>
                <router-link class="btn btn__primary" :to="{ name: 'login' }">Login</router-link>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import auth from '../../services/validations/auth';

export default {
    name: 'ConfirmEmail',
    data() {
        return {
            loading: false,
            success: null
        };
    },
    computed: {
        chakaID() {
            return this.$route.params.chakaID;
        },
        token() {
            return this.$route.params.token;
        }
    },
    methods: {
        ...mapActions(['LOGIN', 'CONFIRM_EMAIL']),
        ...mapMutations(['RESET_REQ', 'LOGOUT', 'SET_LOGGED_USER', 'RESET_ALL'])
    },
    mounted() {
        this.loading = true;

        const payload = {
            chakaID: this.chakaID,
            token: this.token
        };
        this.CONFIRM_EMAIL(payload).then((resp) => {
            this.loading = false;
            if (resp) {
                this.success = true;
                setTimeout(() => {
                    this.$router.push({ name: 'login' });
                }, 5000);
                return true;
            }
            this.success = false;
        });
    },
    created() {
        this.LOGOUT();
        this.SET_LOGGED_USER({});
        this.RESET_ALL();
    }
};
</script>
