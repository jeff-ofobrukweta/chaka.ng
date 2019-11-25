<template>
    <Fragment>
        <Tags />
        <div class="division-logger"></div>
        <Instrumentbase />
    </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import Instrumentbase from "../../components/Instrument/instrumentbase";
import Tags from "../../components/Tags";

export default {
    name: "ibase",
    components: {
        Fragment,
        Instrumentbase,
        Tags
    }
};
</script>

<style src="../../assets/scss/components/_categorieslayout.scss" lang="scss" scoped />
