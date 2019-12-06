<template>
    <Fragment>
        <!-- <section
        v-if="(!loadercardState)" 
        class="card-container-holder-parent">
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
        </section> -->
        <section v-if="instrumentsList.length <= 0">no Instrument loaded at this time</section>
        <div v-else v-for="(item, index) in instrumentsList" :key="index" class="card-container">
            <section class="section1">
                <router-link
                    class="section1 linking"
                    :to="{ name: 'singlestock', params: { symbol: item.symbol } }"
                >
                    <img
                        class="course-item-main-list-flex"
                        id="company"
                        :src="item.logoUrl"
                        :alt="item.symbol"
                    />
                </router-link>
                <img
                    class="course-item-main-list-flex"
                    id="watch-icon"
                    :src="require(`../../assets/Instrument_assets/watch.png`)"
                    alt="watch"
                />
                <div class="symbol">{{ item.symbol }}</div>
            </section>
            <router-link :to="{ name: 'singlestock', params: { symbol: item.symbol } }">
                <section class="section2">
                    <div
                        :title="item.InstrumentDynamic.askPrice | currency(item.currency, true)"
                        class="price"
                    >
                        {{ item.InstrumentDynamic.askPrice | currency(item.currency) }}
                    </div>
                    <div class="level">
                        <!-- <img class="direct"
                        id="direct"
                        :src='require(`../../assets/Instrument_assets/up.png`)' alt="arrow"/> -->
                        <img
                            v-if="item.derivedPrice >= 0"
                            src="../../assets/img/watchlist-up.svg"
                            alt="Growth"
                        />
                        <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
                        <span :class="[item.derivedPrice >= 0 ? 'green' : 'red']"
                            >{{ item.derivedPrice | units(2) }}({{
                                item.derivedPricePercentage | units(2)
                            }})</span
                        >
                    </div>
                    <img
                        :src="
                            require(`../../assets/img/flags/${
                                item.countryCode ? item.countryCode.toLowerCase() : 'zz'
                            }-flag.svg`)
                        "
                        class="watchlist-country"
                        alt="US"
                        width="24px"
                    />
                </section>
            </router-link>
            <section class="section3">
                Buy
            </section>
        </div>
    </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    name: "Instrumentdesk",
    components: {
        Fragment
    },
    computed: {
        ...mapGetters(["gettagslistsArray"])
    },
    methods: {
        //    ...mapActions(['GET_INSTRUMENT_BY_TAGS']),
    },
    props: {
        instrumentsList: {
            type: Array,
            required: false
        },
        tagdetails: {
            type: Object,
            required: false
        },
        loadercardState: {
            type: Boolean,
            required: false
        }
    },
    mounted() {
        console.log("RRRRRRRRRRRRRRRRRRRRRRRR", this.loadercardState);
    },
    watch: {
        instrumentsList(newInstrument, oldInstrument) {
            console.log("Array change here JJJJJJJJJJJJJJJJJJJJJJJ", newInstrument, oldInstrument);
        }
    }
};
</script>

<style src="../../assets/scss/components/_desktopstocks.scss" lang="scss" scoped />
