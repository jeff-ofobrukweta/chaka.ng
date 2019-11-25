<template>
    <Fragment >
        <section class="graphholder">
        <HorizontalGrapgh/>
        </section>
    </Fragment>
</template>
<script>
import {Fragment} from 'vue-fragment';
import HorizontalGrapgh from './horizontalgraph';
export default {
    name:"base",
    components:{
        Fragment,
        HorizontalGrapgh
    }
}
</script>


<style src="../../assets/scss/components/horizontal.scss" lang="scss" scoped />