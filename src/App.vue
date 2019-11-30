<template>
    <div id="app">
        <Progressbar v-if="getProgressbar !== 100" />
        <Header />
        <router-view />
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Header from "./components/Header";
import Progressbar from "./components/Progressbar";

export default {
    name: "app",
    components: {
        Header,
        Progressbar
    },
    data() {
        return {
            prevScrollpos: 0
        };
    },
    computed: {
        ...mapGetters(["getStatus", "getProgressbar"])
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
        }
    },
    created() {
        this.prevScrollpos = window.pageYOffset;
        window.onscroll = () => {
            const currentScrollPos = window.pageYOffset;
            const nav = document.getElementById("nav");
            const header = document.getElementById("header");
            if (currentScrollPos >= 30) {
                if (nav) nav.classList.add("scroll");
                header.classList.add("scroll");
            } else if (currentScrollPos < 20) {
                if (nav) nav.classList.remove("scroll");
                header.classList.remove("scroll");
            }
            if (this.prevScrollpos <= currentScrollPos && currentScrollPos > 60) {
                if (nav) nav.classList.add("push");
                header.classList.add("hide");
            } else {
                if (nav) nav.classList.remove("push");
                header.classList.remove("hide");
            }
            this.prevScrollpos = currentScrollPos;
        };
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
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
        }
    }
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>
