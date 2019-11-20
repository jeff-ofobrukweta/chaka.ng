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
      if (currentScrollPos > 20) {
        document.getElementById("header").classList.add("scroll");
        document.getElementById("nav").classList.add("scroll");
      } else {
        document.getElementById("header").classList.remove("scroll");
        document.getElementById("nav").classList.remove("scroll");
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
