<template>
    <Fragment>
        <div class="container-packet">
            <h1 class="title-name">Performance</h1>
            <section class="graphholder">
                <Performancegraph />
            </section>
        </div>
    </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import Performancegraph from "./performancechart";
export default {
    name: "performancebase",
    components: {
        Fragment,
        Performancegraph
    }
};
</script>

<style src="../../assets/scss/components/_performancegraph.scss" lang="scss" scoped />
