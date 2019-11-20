<template>
  <main role="main">
    <Navbar />
    <section class="container">
      <router-view />
    </section>
  </main>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "dashboard-layout",
  components: {
    Navbar
  }
};
</script>