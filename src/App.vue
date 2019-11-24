<template>
    <div id="app">
        <Progressbar />
        <Header />
        <router-view />
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import Header from "./components/Header";
import Progressbar from "./components/Progressbar";

export default {
    name: "app",
    components: {
        Header,
        Progressbar
    },
    methods: {
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
        window.onscroll = () => {
            const currentScrollPos = window.pageYOffset;
            const nav = document.getElementById("nav");
            const header = document.getElementById("header");
            if (currentScrollPos > 30) {
                header.classList.add("scroll");
                if (nav) nav.classList.add("scroll");
            } else {
                header.classList.remove("scroll");
                if (nav) nav.classList.remove("scroll");
            }
        };
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    }
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>
