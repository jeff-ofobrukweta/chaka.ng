<template>
    <div class="progress">
        <div class="progress__complete" :style="{ width: `${getProgressbar}%` }"></div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Loader",
    computed: {
        ...mapGetters(["getProgressbar"])
    }
};
</script>
<style lang="scss" scoped src="../assets/scss/modules/_progressbar.scss" />
