<template>
    <div id="app">
        <Progressbar />
        <Header />
        <router-view />
    </div>
</template>

<script>
import Header from "./components/Header";
import Progressbar from "./components/Progressbar";

export default {
    name: "app",
    components: {
        Header,
        Progressbar
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
    }
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>
