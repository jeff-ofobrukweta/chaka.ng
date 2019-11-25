<template>
    <Fragment >
        <section class="graphholder">
        <DoughnutGrapgh/>
        </section>
    </Fragment>
</template>
<script>
import {Fragment} from 'vue-fragment';
import DoughnutGrapgh from './doughnut';
export default {
    name:"base",
    components:{
        Fragment,
        DoughnutGrapgh
    }
}
</script>


<style src="../../assets/scss/components/doughnut.scss" lang="scss" scoped />