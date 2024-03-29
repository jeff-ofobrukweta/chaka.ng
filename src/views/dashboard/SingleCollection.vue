<template>
    <section class="dashboard__main">
        <section class="dashboard__title">
            <div class="dashboard__back">
                <router-link :to="{ name: 'explore' }" replace class="dashboard__back--btn">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16 7H3.8L9.4 1.4L8 0L0 8L8 16L9.4 14.6L3.8 9H16V7Z"
                            fill="#293D4A"
                        /></svg
                ></router-link>
                <h3>{{ name }}</h3>
            </div>
            <p class="dashboard__title--sub" v-if="getSingleCollection.length > 0">
                {{ getSingleCollection.length }} Stocks
            </p>
            <p class="dashboard__title--sub">{{ getSelectedCollection.description }}</p>
        </section>
        <template v-if="getWindowWidth === 'desktop'">
            <section v-if="loading" class="instrument-base">
                <InstrumentCard dummy v-for="i in 6" :key="i" :instrument="{}" />
            </section>
            <section v-else-if="getSingleCollection.length > 0" class="instrument-base">
                <InstrumentCard
                    v-for="(instrument, index) in getSingleCollection"
                    :key="index"
                    :instrument="instrument"
                />
            </section>
        </template>
        <section v-else>
            <section v-if="loading">
                <InstrumentMobile v-for="i in 3" :key="i" :instrument="{}" dummy />
            </section>
            <div
                class="caution__big"
                v-else-if="
                    getErrorLog.type === 'explore-collection' && getSingleCollection.length <= 0
                "
            >
                <img :src="require('../../assets/img/caution.svg')" alt="Caution" />
                <a class="caution__reload" @click="mount">Reload</a>
            </div>
            <template v-else-if="getSingleCollection.length > 0">
                <InstrumentMobile
                    v-for="(instrument, index) in getSingleCollection"
                    :key="index"
                    :instrument="instrument"
            /></template>
        </section>
    </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'explore-collection',
    components: {
        InstrumentCard: () => import('../../components/Instrument/InstrumentCard'),
        InstrumentMobile: () => import('../../components/watchlist/MobileWatchlist')
    },
    data() {
        return {
            loading: true
        };
    },
    computed: {
        ...mapGetters([
            'getSingleCollection',
            'getWindowWidth',
            'getCollectionStocks',
            'getErrorLog',
            'getSelectedCollection'
        ]),
        name() {
            return this.$route.params.name;
        }
    },
    methods: {
        ...mapActions(['GET_SINGLE_COLLECTION']),
        ...mapMutations(['SET_SINGLE_COLLECTION', 'SET_COLLECTION_STOCKS']),
        async mount() {
            this.loading = true;
            if (this.getCollectionStocks.length <= 0) {
                this.$router.replace({ name: 'explore' });
            } else await this.GET_SINGLE_COLLECTION();
            this.loading = false;
        }
    },
    async mounted() {
        await this.mount();
    },
    beforeDestroy() {
        this.SET_SINGLE_COLLECTION([]);
        this.SET_COLLECTION_STOCKS([]);
    }
};
</script>
<style src="../../assets/scss/components/_desktopstocks.scss" lang="scss" scoped />
