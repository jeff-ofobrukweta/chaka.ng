<template>
    <Fragment>
        <div class="container-packet">
            <h1 class="title-name">Analyst Ratings</h1>
        <section class="graphholder">
            <HorizontalGrapgh />
        </section>
    </div>
    </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import HorizontalGrapgh from "./horizontalgraph";
export default {
    name: "hbase",
    components: {
        Fragment,
        HorizontalGrapgh
    }
};
</script>

<style src="../../assets/scss/components/horizontal.scss" lang="scss" scoped />
