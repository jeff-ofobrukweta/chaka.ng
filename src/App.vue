<template>
    <div id="app">
        <Progressbar v-if="getProgressbar !== 100" />
        <Header />
        <router-view />
        <Footer />
        <div
            v-if="showCookie"
            style="z-index: 1000000; position: fixed; bottom: 33px; right: 36px; width: 282px; background: #fff; border-radius: 0.4em; padding: 10px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px;"
        >
            <p style="font-size: 0.9em; color: #000; text-align: center; padding: 4px;">
                We use cookies to give you the best experience on our website. By continuing without
                changing your cookie settings, we assume you agree to this.
            </p>
            <div style="text-align: center">
                <a
                    @click="readPrivacy"
                    style="color: #000; background: #ccc; border: none; padding: 8px; font-size: 0.8em;"
                >
                    Read the privacy policy
                </a>
                <a
                    @click="acceptCookie"
                    style="color: #fff; background: #025aa5; border: none; padding: 8px; margin-left: 10px; width: 90px; font-size: 0.8em;"
                >
                    I agree
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import EventBus from "./event-bus";

export default {
    name: "app",
    components: {
        Header: () => import("./components/Header"),
        Footer: () => import("./components/Footer"),
        Progressbar: () => import("./components/Progressbar")
    },
    data() {
        return {
            prevScrollpos: 0,
            showCookie: false
        };
    },
    computed: {
        ...mapGetters(["getStatus", "getProgressbar", "isModalOpened", "isSearchOpened"])
    },
    methods: {
        ...mapActions(["START_LOADER", "STOP_LOADER"]),
        ...mapMutations(["SET_WINDOW_WIDTH"]),
        handleResize() {
            const width = window.innerWidth;
            if (width < 640) {
                this.SET_WINDOW_WIDTH("mobile");
            } else if (width < 968) {
                this.SET_WINDOW_WIDTH("tablet");
            } else this.SET_WINDOW_WIDTH("desktop");
        },
        acceptCookie() {
            this.showCookie = false;
            document.cookie = "__acceptcookie=yes";
        },
        readPrivacy() {
            this.acceptCookie();
            this.$router.push({ name: "privacy" });
        }
    },
    created() {
        this.STOP_LOADER();
        this.prevScrollpos = window.pageYOffset;
        window.onscroll = () => {
            const currentScrollPos = window.pageYOffset;
            const nav = document.getElementById("nav");
            const header = document.getElementById("header");
            if (currentScrollPos < 30) {
                if (nav) nav.classList.remove("scroll");
                header.classList.remove("scroll");
            } else if (currentScrollPos >= 50) {
                if (nav) nav.classList.add("scroll");
                header.classList.add("scroll");
            }
            if (this.prevScrollpos <= currentScrollPos && currentScrollPos > 80) {
                if (nav) nav.classList.add("push");
                header.classList.add("hide");
                EventBus.$emit("HIDE_HEADER", true);
            } else {
                if (nav) nav.classList.remove("push");
                header.classList.remove("hide");
                EventBus.$emit("HIDE_HEADER", false);
            }
            this.prevScrollpos = currentScrollPos;
        };
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
        const allCookies = document.cookie.split("; ");
        const cookie = allCookies.filter(el => el.startsWith("__acceptcookie"));
        if (cookie.length <= 0 || cookie[0] === "__acceptcookie=no") {
            document.cookie = "__acceptcookie=no";
            this.showCookie = true;
        } else this.showCookie = false;
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    watch: {
        getStatus(val) {
            if (val === "loading") {
                this.START_LOADER();
            } else {
                this.STOP_LOADER();
            }
        },
        isModalOpened(val) {
            if (val) {
                document.querySelector("body").classList.add("no-scroll");
            } else {
                document.querySelector("body").classList.remove("no-scroll");
            }
        },
        isSearchOpened(val) {
            if (val) {
                document.querySelector("body").classList.add("no-scroll");
            } else {
                document.querySelector("body").classList.remove("no-scroll");
            }
        }
    }
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>
