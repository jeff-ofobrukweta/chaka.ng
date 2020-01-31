<template>
    <section class="section subscribe">
        <div class="row hero__row">
            <div class="col-md-7 subscribe__body" data-aos="fade-right">
                <h2 class="subscribe__title">Stay up to date with news and new features</h2>
                <p class="section__text">
                    Join Chaka's mailing list and get updates on Chaka's new features. Also keep track of the latest news, trends and developments in local and global investment
                    markets.
                </p>
            </div>
            <div class="col-md-5 subscribe__text">
                <form
                    action="https://chaka.us20.list-manage.com/subscribe/post?u=3e738663e9ef19ff1ace10d97&amp;id=516765cbc1"
                    v-if="!subscribed"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    class="validate subscribe__form"
                    target="_blank"
                    rel="noreferrer noopener"
                    ref="subscribe"
                    novalidate
                >
                    <div id="mc_embed_signup_scroll">
                        <div>
                            <input
                                type="email"
                                name="EMAIL"
                                id="email"
                                @focus="errors = {}"
                                v-model="email"
                                placeholder="Enter your email address"
                                class="input-controlled-input-main-item-input subscribe__input"
                            />
                        </div>
                        <p class="form-error" v-if="errors.email">
                            <small>{{ errors.email }}</small>
                        </p>
                        <div>
                            <input
                                @click.passive="subscribe"
                                id="controlled-input-button"
                                class="input-controlled-input-main-item subscribe__btn"
                                :class="{ 'btn-val': getValTheme }"
                                value="I want to stay informed"
                                :disabled="!email"
                                type="button"
                            />
                        </div>
                    </div>
                </form>
                <div class="subscribe__form" v-else>
                    <p class="subscribe__text">Thank you for subscribing.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import auth from "../services/validations/auth";
import "aos/dist/aos.css";
import AOS from "aos";
import { mapGetters } from "vuex";

export default {
    name: "email-subscription",
    data() {
        return {
            subscribed: false,
            email: null,
            errors: {}
        };
    },
    /**
     * VALENTINE TO-DO:: remove when event is over
     */
    computed: {
        ...mapGetters(["getValTheme"])
    },
    methods: {
        subscribe() {
            if (!this.email) {
                this.$set(this.errors, "email", "Field is required");
            } else if (!auth.email(this.email)) {
                this.$set(this.errors, "email", "Invalid email");
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.$refs.subscribe.submit();
            this.subscribed = true;
        }
    },
    created() {
        AOS.init({
            duration: 400,
            delay: 100,
            easing: "ease-in-out",
            mirror: false,
            startEvent: "DOMContentLoaded",
            anchorPlacement: "top-center",
            // once: true,
            offset: 50
        });
    }
};
</script>
