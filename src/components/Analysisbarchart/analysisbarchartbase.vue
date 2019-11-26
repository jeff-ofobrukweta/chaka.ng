<template>
    <Fragment>
        <div class="container-packet">
            <h1 class="title-name">Performance Rating</h1>
            <section class="graphholder">
                <Analysisbarchart />
            </section>
        </div>
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';
import Analysisbarchart from './analysisbarchart';

export default {
    name: 'performancebase',
    components: {
        Fragment,
        Analysisbarchart
    }
};
</script>

<style src="../../assets/scss/components/_analysisbarchart.scss" lang="scss" scoped />
