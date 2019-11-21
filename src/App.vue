<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    Header,
    Navbar
  },
  created() {
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      const nav = document.getElementById("nav");
      const header = document.getElementById("header");
      if (currentScrollPos > 20) {
        header.classList.add("scroll");
        if (nav) nav.classList.add("scroll");
      } else {
        header.classList.remove("scroll");
        if (nav) nav.classList.remove("scroll");
      }
      if (currentScrollPos > 100) {
      } else {
      }
    };
  }
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>
