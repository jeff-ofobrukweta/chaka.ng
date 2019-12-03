<template>
    <Fragment>
        <Tags :taglists="gettagslistsArray" />
        <hr class="division-logger" />
        <template v-if="getWindowWidth === 'desktop'">
            <section v-if="getInstrumentsListArray.length > 0" class="instrument-base">
                <InstrumentCard
                    v-for="(instrument, index) in getInstrumentsListArray"
                    :key="index"
                    :instrument="instrument"
                />
            </section>
        </template>
        <section v-else>
            <template v-if="getInstrumentsListArray.length > 0">
                <InstrumentMobile
                    v-for="(instrument, index) in getInstrumentsListArray"
                    :key="index"
                    :instrument="instrument"
            /></template>
        </section>
        <!-- <Instrumentbase :loadercardState="cardState" :instrumentsList="getInstrumentsListArray" /> -->
    </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import InstrumentCard from "../../components/Instrument/InstrumentCard";
import InstrumentMobile from "../../components/watchlist/MobileWatchlist";
import Instrumentbase from "../../components/Instrument/instrumentbase";
import Tags from "../../components/Tags";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    name: "Categories",
    data() {
        return {
            cardState: true
        };
    },
    components: {
        Fragment,
        Instrumentbase,
        Tags,
        InstrumentCard,
        InstrumentMobile
    },
    computed: {
        ...mapGetters(["gettagslistsArray", "getInstrumentsListArray", "getWindowWidth"])
    },
    methods: {
        ...mapMutations(["SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS"]),
        ...mapActions(["GET_TAGS_CATEGORIES", "GET_INSTRUMENT_BY_TAGS"]),
        mountingActions() {
            this.$store.dispatch("GET_TAGS_CATEGORIES").then(() => {
                const payloadGetInstrument = { symbols: this.gettagslistsArray[0].Instruments };
                this.cardState = true;
                this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(
                    this.gettagslistsArray[0].Instruments
                        ? this.gettagslistsArray[0].Instruments
                        : null
                );
                this.cardState = true;
                this.GET_INSTRUMENT_BY_TAGS(payloadGetInstrument).then(response => {
                    this.cardState = response;
                    console.log("here is the gertter???????", this.getInstrumentsListArray);
                });
            });
        }
    },
    mounted() {
        this.mountingActions();
    }
};
</script>

<style src="../../assets/scss/components/_categorieslayout.scss" lang="scss" scoped />
