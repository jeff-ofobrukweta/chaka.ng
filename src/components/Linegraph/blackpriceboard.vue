<template>
    <Fragment>
        <section class="board-container-price">
              <img class="direct"
                id="direct" 
                :src='require(`../../assets/Instrument_assets/arrow_growth.png`)' alt="watch"/>
                <h1 class="price">
                    $181.01
                </h1>
                <section class="info-details"><span class="increase">$100</span>from last month</section>
        </section>
    </Fragment>
</template>

<script>
import {Fragment} from 'vue-fragment';
export default {
    components:{
        Fragment
    }
}
</script>

<style src="../../assets/scss/components/_blackpriceboard.scss" lang="scss" scoped />
