<template>
    <Fragment>
        <section class="board-container-price">
              <img class="direct"
                id="direct"
                :src='require(`../../assets/Instrument_assets/arrow_growth.png`)' alt="watch"/>
                <h1 class="price">
                    {{instrument.askPrice}}
                </h1>
                <section class="info-details">
                    <span class="increase">
                    <span
                    :class="[instrument.derivedPrice < 0 ? 'red' : 'green']">
                    {{instrument.derivedPrice}}
                    </span>(<Fragment>
                        <span
                        :class="[instrument.derivedPricePercentage < 0 ? 'red' : 'green']"
                        >{{instrument.derivedPricePercentage}}</span></Fragment>%)
               </span>from last month</section>
        </section>
    </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';

export default {
    components: {
        Fragment
    },
    props:{
        instrument:{
            type:Object,
            required:true
        }
    }
};
</script>

<style src="../../assets/scss/components/_blackpriceboard.scss" lang="scss" scoped />
