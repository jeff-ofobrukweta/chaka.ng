<template>
    <Fragment>
        <div class="topic-block">
            <section class="title-tag">Popular</section>
            <section class="info-tag">Lorem ipsum blala</section>
        </div>
        <!--container below for @desktop view  -->
        <section
            v-if="getWindowWidth === 'desktop'" 
            class="base_instrument">
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
        <!-- container below for @mobile view -->
       <section
       v-if="getWindowWidth === 'tablet'" 
       class="base_instrument-mobile">
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

       <section
       v-if="getWindowWidth === 'mobile'" 
       class="container">
                <MobileWatchlist
                    v-for="(instrument, index) in watchlist"
                    :key="index"
                    :instrument="instrument"
                />
       </section>
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';
import Instrumentdesk from './instrument_desk';
import MobileWatchlist from '../../components/watchlist/MobileWatchlist';
import {mapGetters} from 'vuex';

export default {
    name: 'GroupInstrument',
    data() {
        return {
            cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            watchlist: [
                {
                    name: 'Spotify',
                    symbol: 'SPOT',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: 'Google',
                    symbol: 'GOOGL',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 20
                },
                {
                    name: 'MTN Nigeria',
                    symbol: 'MTNN',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 4
                },
                {
                    name: 'Jumia Technologies',
                    symbol: 'JUMIA',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 2
                },
                {
                    name: 'Spotify',
                    symbol: 'SPOT',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 1
                },
                {
                    name: 'Spotify',
                    symbol: 'SPOT',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: 0
                },
                {
                    name: 'Spotify',
                    symbol: 'SPOT',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: -3
                },
                {
                    name: 'Spotify',
                    symbol: 'SPOT',
                    currency: 'USD',
                    price: 656.9,
                    percent: 0.67,
                    change: -10
                }
            ]
        };
    },
    computed:{
        ...mapGetters(['getWindowWidth'])
    },
    components: {
        Fragment,
        Instrumentdesk,
        MobileWatchlist
    }
};
</script>
<style src="../../assets/scss/components/_Instrumentbase.scss" lang="scss" scoped/>
