<template>
    <section class="dashboard__main">
        <section class="dashboard__title">
            <h3>{{ name }}</h3>
            <p class="dashboard__title--sub" v-if="getSingleCollection.length > 0">
                {{ getSingleCollection.length }} Stocks
            </p>
        </section>
        <section v-if="getWindowWidth === 'desktop'" class="base_instrument">
            <!-- <Instrument :instrumentsList="getInstrumentsListArray" /> -->
            <section v-if="getSingleCollection.length > 0">
                <div
                    class="card-container"
                    v-for="(instrument, index) in getSingleCollection"
                    :key="index"
                >
                    <section class="section1">
                        <router-link
                            class="section1 linking"
                            :to="{ name: 'singlestock', params: { symbol: instrument.symbol } }"
                        >
                            <img
                                class="course-item-main-list-flex"
                                id="company"
                                :src="require(`../../assets/Instrument_assets/companylogo.png`)"
                                alt="courses"
                            />
                        </router-link>
                        <img
                            class="course-item-main-list-flex"
                            id="watch-icon"
                            :src="require(`../../assets/Instrument_assets/watch.png`)"
                            alt="watch"
                        />
                        <div class="symbol">{{ instrument.symbol }}</div>
                    </section>
                    <router-link
                        :to="{ name: 'singlestock', params: { symbol: instrument.symbol } }"
                    >
                        <section class="section2">
                            <div class="price">
                                {{
                                    instrument.InstrumentDynamic.askPrice
                                        ? instrument.InstrumentDynamic.askPrice
                                        : "-"
                                }}
                            </div>
                            <div class="level">
                                <img
                                    class="direct"
                                    id="direct"
                                    :src="require(`../../assets/Instrument_assets/up.png`)"
                                    alt="arrow"
                                />
                                <span>+1,23 (2,14%)</span>
                            </div>
                            <img
                                class="country"
                                id="country"
                                :src="require(`../../assets/Instrument_assets/united-states.png`)"
                                alt="states"
                            />
                        </section>
                    </router-link>
                    <section class="section3">
                        Buy
                    </section>
                </div>
            </section>
        </section>
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
        Instrument: () => import("../../components/Instrument/instrument_desk"),
        InstrumentMobile: () => import("../../components/watchlist/MobileWatchlist")
    },
    computed: {
        ...mapGetters(["getSingleCollection", "getWindowWidth"]),
        name() {
            return this.$route.params.name;
        }
    },
    methods: {
        ...mapActions(["GET_SINGLE_COLLECTION"]),
        ...mapMutations(["SET_SINGLE_COLLECTION", "SET_COLLECTION_STOCKS"])
    },
    async mounted() {
        console.log(this.name);
        await this.GET_SINGLE_COLLECTION();
    },
    beforeDestroy() {
        this.SET_SINGLE_COLLECTION([]);
        this.SET_COLLECTION_STOCKS([]);
    }
};
</script>
