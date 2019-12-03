<template>
    <section class="dashboard__main">
        <section class="dashboard__title">
            <h3>{{ name }}</h3>
            <p class="dashboard__title--sub" v-if="getSingleCollection.length > 0">
                {{ getSingleCollection.length }} Stocks
            </p>
        </section>
        <template v-if="getWindowWidth === 'desktop'">
            <section v-if="getSingleCollection.length > 0" class="instrument-base">
                <InstrumentCard
                    v-for="(instrument, index) in getSingleCollection"
                    :key="index"
                    :instrument="instrument"
                />
            </section>
        </template>
        <section v-else>
            <template v-if="getSingleCollection.length > 0">
                <InstrumentMobile
                    v-for="(instrument, index) in getSingleCollection"
                    :key="index"
                    :instrument="instrument"
            /></template>
        </section>
    </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name: "explore-collection",
    components: {
        InstrumentCard: () => import("../../components/Instrument/InstrumentCard"),
        InstrumentMobile: () => import("../../components/watchlist/MobileWatchlist")
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["getSingleCollection", "getWindowWidth", "getCollectionStocks"]),
        name() {
            return this.$route.params.name;
        }
    },
    methods: {
        ...mapActions(["GET_SINGLE_COLLECTION"]),
        ...mapMutations(["SET_SINGLE_COLLECTION", "SET_COLLECTION_STOCKS"])
    },
    async mounted() {
        if (this.getCollectionStocks.length <= 0) {
            this.$router.replace({ name: "explore" });
        } else await this.GET_SINGLE_COLLECTION();
    },
    beforeDestroy() {
        this.SET_SINGLE_COLLECTION([]);
        this.SET_COLLECTION_STOCKS([]);
    }
};
</script>
<style src="../../assets/scss/components/_desktopstocks.scss" lang="scss" scoped />
