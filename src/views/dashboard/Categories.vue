<template>
    <section class="dashboard__main">
        <section class="dashboard__title">
            <h3>Categories</h3>
            <p class="dashboard__title--sub">View all categories</p>
        </section>
        <template>
            <section class="tags-container__box">
                <div class="tags-container__overlay" v-if="loading"></div>
                <div class="tags-container">
                    <template v-if="loadingTags">
                        <Tag v-for="item in 10" :key="item" :tag="{}" dummy />
                    </template>
                    <div
                        class="caution__big"
                        v-else-if="getErrorLog.type === 'tags' && gettagslistsArray.length <= 0"
                    >
                        <img :src="require('../../assets/img/caution.svg')" alt="Caution" />
                        <a class="caution__reload" @click="mount">Reload</a>
                    </div>
                    <template v-else-if="gettagslistsArray.length > 0">
                        <Tag
                            v-for="item in gettagslistsArray"
                            :key="item.id"
                            :tag="item"
                            @click="handleSelect"
                            :active="getInstrumentsPayload.slug === item.slug"
                        />
                    </template>
                    <section class="empty-center" v-else>
                        <img
                            width="50px"
                            :src="require('../../assets/img/papers.svg')"
                            alt="Papers"
                        />
                        <p>There are no available categories at the moment</p>
                    </section>
                </div>
            </section>
        </template>
        <template v-if="gettagslistsArray.length > 0 && !loadingTags">
            <hr class="division-logger" />
            <section class="dashboard__title" v-if="Object.keys(getInstrumentsPayload).length > 0">
                <h3>{{ getInstrumentsPayload.name }}</h3>
                <p class="dashboard__title--sub" v-if="instrumentLength !== false">
                    {{ instrumentLength }} Stock{{ instrumentLength === 1 ? "" : "s" }}
                </p>
            </section>
            <section v-if="getWindowWidth === 'desktop'">
                <div class="instrument-base">
                    <template v-if="loading">
                        <InstrumentCard dummy v-for="i in 10" :key="i" :instrument="{}" />
                    </template>
                    <template v-else-if="getInstrumentsListArray.length > 0">
                        <InstrumentCard
                            v-for="(instrument, index) in getInstrumentsListArray"
                            :key="index"
                            :instrument="instrument"
                        />
                    </template>
                    <section class="empty-center" v-else>
                        <img
                            width="50px"
                            :src="require('../../assets/img/papers.svg')"
                            alt="Papers"
                        />
                        <p>There are no stocks in this collection</p>
                    </section>
                </div>
            </section>
            <section v-else>
                <template v-if="loading">
                    <InstrumentMobile v-for="i in 3" :key="i" :instrument="{}" dummy
                /></template>
                <template v-else-if="getInstrumentsListArray.length > 0">
                    <transition-group name="kyc-navbar">
                        <InstrumentMobile
                            v-for="(instrument, index) in getInstrumentsListArray"
                            :key="index"
                            :instrument="instrument"
                        />
                    </transition-group>
                </template>
                <section class="empty-center" v-else>
                    <img width="50px" :src="require('../../assets/img/papers.svg')" alt="Papers" />
                    <p>There are no stocks in this collection</p>
                </section>
            </section>
        </template>
    </section>
</template>
<script>
import Tag from "../../components/SingleTag";
import InstrumentCard from "../../components/Instrument/InstrumentCard";
import InstrumentMobile from "../../components/watchlist/MobileWatchlist";
import Instrumentbase from "../../components/Instrument/instrumentbase";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    name: "Categories",
    data() {
        return {
            loading: false,
            loadingTags: false
        };
    },
    components: {
        Instrumentbase,
        InstrumentCard,
        InstrumentMobile,
        Tag
    },
    computed: {
        ...mapGetters([
            "gettagslistsArray",
            "getInstrumentsListArray",
            "getWindowWidth",
            "getInstrumentsPayload",
            "getErrorLog"
        ]),
        instrumentLength() {
            if (Object.keys(this.getInstrumentsPayload).length > 0) {
                if (this.getInstrumentsPayload.Instruments === "") {
                    return 0;
                }
                const length = this.getInstrumentsPayload.Instruments.split(",");
                return length.length;
            }
            return false;
        }
    },
    methods: {
        ...mapMutations([
            "SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS",
            "SET_INSTRUMENT_BY_TAGS",
            "SET_TAGS_LISTS"
        ]),
        ...mapActions(["GET_TAGS_CATEGORIES", "GET_INSTRUMENT_BY_TAGS"]),
        handleSelect(response) {
            this.loading = true;
            const payload = { symbols: response.Instruments };
            this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(response);
            if (payload.symbols === "") {
                this.loading = false;
                this.SET_INSTRUMENT_BY_TAGS([]);
                return true;
            }
            this.GET_INSTRUMENT_BY_TAGS(payload).then(() => {
                this.loading = false;
            });
        },
        async mount() {
            this.loading = true;
            this.loadingTags = true;
            await this.GET_TAGS_CATEGORIES();
            this.loadingTags = false;
            if (this.gettagslistsArray.length > 0) {
                const payloadGetInstrument = { symbols: this.gettagslistsArray[0].Instruments };
                this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(
                    this.gettagslistsArray.length > 0 ? this.gettagslistsArray[0] : {}
                );
                await this.GET_INSTRUMENT_BY_TAGS(payloadGetInstrument);
            }
            this.loading = false;
        }
    },
    async mounted() {
        await this.mount();
    },
    beforeRouteLeave(to, from, next) {
        this.SET_INSTRUMENT_BY_TAGS([]);
        this.SET_TAGS_LISTS([]);
        next();
    }
};
</script>

<style src="../../assets/scss/components/_categorieslayout.scss" lang="scss" scoped />
