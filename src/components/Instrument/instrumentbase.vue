<template>  
    <Fragment>
        <div class="topic-block">
            <section class="title-tag">Popular</section>
            <section class="info-tag">Lorem ipsum blala</section>
        </div>
        <section class="base_instrument">
            <Instrumentdesk/>
            <Instrumentdesk/>
            <Instrumentdesk/>
            <Instrumentdesk/>
            <Instrumentdesk/>
            <Instrumentdesk/>
            <Instrumentdesk/>
            <Instrumentdesk/>
            <Instrumentdesk/>
            <Instrumentdesk/>
            <Instrumentdesk/>
            <Instrumentdesk/>
        </section>
       <section class="base_instrument-mobile">
           <Instrumentmobile/>
           <Instrumentmobile/>
           <Instrumentmobile/>
          <Instrumentmobile/>
       </section>
    </Fragment>
</template>
<script>
import {Fragment} from 'vue-fragment';
import Instrumentdesk from './instrument_desk';
import Instrumentmobile from './instrument_mob';
export default {
    name:'GroupInstrument',
    data(){
        return{
            cards:[1,2,3,4,5,6,7,8,9,10,11,12]
        }
    },
    components:{
        Fragment,
        Instrumentdesk,
        Instrumentmobile
    }
}
</script>
<style src="../../assets/scss/components/_Instrumentbase.scss" lang="scss" scoped/>