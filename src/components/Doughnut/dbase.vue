<template>
    <Fragment>
        <div class="container-packet">
            <h1 class="title-name">Positions</h1>
            <section class="graphholder">
                <DoughnutGrapgh />
            </section>
        </div>
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';
import DoughnutGrapgh from './doughnut';

export default {
    name: 'dbase',
    components: {
        Fragment,
        DoughnutGrapgh
    }
};
</script>

<style src="../../assets/scss/components/doughnut.scss" lang="scss" scoped />
