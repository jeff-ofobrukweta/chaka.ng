<template>
    <footer class="footer" :class="{ logged: isLoggedIn }">
        <div class="footer-top container">
            <div class="footer-top__logo">
                <div class="footer-top__img">
                    <img src="../assets/img/chaka-logo-white.svg" alt="Chaka" />
                </div>
                <p>+2347011204586</p>
                <div class="footer-top__socials">
                    <a class="footer-top__socials--logo">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.3438 16V8.99918H12.2763L12.5324 6.58666H10.3438L10.347 5.37917C10.347 4.74995 10.4068 4.41279 11.3106 4.41279H12.5187V2H10.5859C8.26429 2 7.44714 3.17033 7.44714 5.13846V6.58693H6V8.99945H7.44714V16H10.3438Z"
                                fill="#293D4A"
                            />
                        </svg>
                    </a>
                    <a class="footer-top__socials--logo"
                        ><svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.37579 3.55731C5.35631 2.67331 4.72416 2 3.69763 2C2.67111 2 2 2.67331 2 3.55731C2 4.42301 2.65127 5.1157 3.65868 5.1157H3.67786C4.72416 5.1157 5.37579 4.42301 5.37579 3.55731ZM5.17843 6.34623H2.17772V15.3621H5.17843V6.34623ZM12.545 6.13454C14.5196 6.13454 16 7.42341 16 10.1927L15.9998 15.3622H12.9992V10.5386C12.9992 9.32708 12.565 8.50034 11.4788 8.50034C10.6497 8.50034 10.156 9.05768 9.93909 9.59599C9.85975 9.78891 9.84027 10.0577 9.84027 10.3272V15.3624H6.8392C6.8392 15.3624 6.87875 7.19249 6.8392 6.34649H9.84027V7.62352C10.2385 7.00963 10.9518 6.13454 12.545 6.13454Z"
                                fill="#293D4A"
                            />
                        </svg>
                    </a>
                    <a class="footer-top__socials--logo"
                        ><svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.05075 6.19219L9.08223 6.71122L8.55762 6.64767C6.64804 6.40404 4.97978 5.57782 3.56334 4.1902L2.87085 3.50169L2.69248 4.01013C2.31477 5.14353 2.55609 6.34048 3.343 7.14552C3.76269 7.5904 3.66826 7.65396 2.9443 7.38914C2.69248 7.3044 2.47215 7.24085 2.45116 7.27263C2.37772 7.34677 2.62953 8.31069 2.82888 8.69202C3.10168 9.22165 3.65777 9.74068 4.26631 10.0479L4.78043 10.2915L4.17188 10.3021C3.58432 10.3021 3.56334 10.3127 3.62629 10.5351C3.83613 11.2236 4.66502 11.9545 5.58833 12.2723L6.23884 12.4947L5.67227 12.8337C4.83289 13.321 3.84662 13.5964 2.86036 13.6175C2.38821 13.6281 2 13.6705 2 13.7023C2 13.8082 3.28005 14.4014 4.02499 14.6344C6.25983 15.3229 8.91435 15.0264 10.9079 13.8506C12.3243 13.0138 13.7408 11.3507 14.4018 9.74068C14.7585 8.88269 15.1152 7.315 15.1152 6.56293C15.1152 6.07567 15.1467 6.01211 15.7343 5.42953C16.0805 5.09056 16.4058 4.71983 16.4687 4.6139C16.5736 4.41264 16.5632 4.41264 16.0281 4.59272C15.1362 4.91049 15.0103 4.86812 15.451 4.39146C15.7762 4.0525 16.1645 3.43813 16.1645 3.25806C16.1645 3.22628 16.0071 3.27924 15.8287 3.37458C15.6398 3.4805 15.2202 3.63939 14.9054 3.73472L14.3388 3.91479L13.8247 3.56524C13.5414 3.37458 13.1427 3.16273 12.9329 3.09917C12.3978 2.95087 11.5794 2.97206 11.0967 3.14154C9.7852 3.6182 8.95632 4.84694 9.05075 6.19219Z"
                                fill="#293D4A"
                            />
                        </svg>
                    </a>
                    <a class="footer-top__socials--logo"
                        ><svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.76584 9.7V8.07143H11.2662C11.307 8.30893 11.341 8.54643 11.341 8.85857C11.341 11.5729 9.51641 13.5 6.76584 13.5C4.13101 13.5 2 11.3761 2 8.75C2 6.12393 4.13101 4 6.76584 4C8.05262 4 9.12834 4.46821 9.95896 5.24179L8.66537 6.48357C8.31134 6.14429 7.69178 5.75071 6.76584 5.75071C5.13865 5.75071 3.81102 7.09429 3.81102 8.75C3.81102 10.4057 5.13865 11.7493 6.76584 11.7493C8.65175 11.7493 9.35982 10.3989 9.46875 9.7H6.76584ZM15.6168 8.0715H16.9784V9.42864H15.6168V10.7858H14.2551V9.42864H12.8934V8.0715H14.2551V6.71436H15.6168V8.0715Z"
                                fill="#293D4A"
                            />
                        </svg>
                    </a>
                </div>
                <div class="footer-top__signup">
                    <button type="button" class="btn btn-small btn__white--outline">Sign Up</button>
                </div>
            </div>
            <div class="footer-top__account">
                <h5 class="footer-top__account--title">ACCOUNT</h5>
                <router-link :to="{ name: 'register' }">Open an account</router-link>
                <router-link :to="{ name: 'calculators' }">List of charges</router-link>
                <router-link :to="{ name: 'register' }">Fund Transfer</router-link>
                <router-link :to="{ name: 'about' }">Careers</router-link>
                <router-link :to="{ name: 'login' }">Media &amp; Press</router-link>
            </div>
            <div class="footer-top__company">
                <h5 class="footer-top__account--title">COMPANY</h5>
                <router-link :to="{ name: 'about' }">About</router-link>
                <router-link :to="{ name: 'login' }">Products</router-link>
                <router-link :to="{ name: 'calculators' }">Pricing</router-link>
            </div>
        </div>
        <div class="container footer-hr"><hr /></div>
        <div class="footer-bottom container">
            <p>
                Chaka.ng is a property of Chaka Technologies Limited, a company duly registered with
                the Corporate Affairs Commission, Nigeria. Chaka.ng is the platform implemented by
                Chaka Technologies Limited to provide marketing, customer service, operations and
                technology services to brokers on behalf of their customers. Chaka.ng, Chaka.io and
                Chaka Technologies Limited are legal entities in Nigeria...<router-link
                    :to="{ name: 'disclosures' }"
                    class="underline"
                    >read more</router-link
                >
            </p>
            <p>&copy; 2019 Chaka Technologies Ltd. All Rights Reserved</p>
        </div>
        <div class="footer-base">
            <router-link :to="{ name: 'terms' }">Terms &amp; Conditions</router-link>
            <router-link :to="{ name: 'policies' }">Policies &amp; Procedures</router-link>
            <router-link :to="{ name: 'privacy' }">Privacy Policy</router-link>
        </div>
    </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "app-footer",
    computed: {
        ...mapGetters(["isLoggedIn"])
    }
};
</script>
