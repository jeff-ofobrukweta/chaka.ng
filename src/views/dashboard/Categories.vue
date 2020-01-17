<template>
    <section class="dashboard__main">
        <section class="accounts__title">
            <div>
                <h3>Categories</h3>
                <p class="dashboard__title--sub">Discover new stocks</p>
            </div>
            <select
                class="form__input"
                @change="getNewTags"
                v-model="selectedTag"
                :disabled="loadingTags"
            >
                <option v-for="(option, i) in tagCategories" :key="i" :value="option.value">
                    {{ option.name }}
                </option>
            </select>
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
            <section
                class="dashboard__title flex_container_title"
                v-if="Object.keys(getInstrumentsPayload).length > 0"
            >
                <section>
                    <h3>{{ getInstrumentsPayload.name }}</h3>
                    <p class="dashboard__title--sub" v-if="instrumentLength !== false">
                        {{ instrumentLength }} Stock{{ instrumentLength === 1 ? "" : "s" }}
                    </p>
                </section>
                <section>
                    <button class="btn-container-main">
                        <!-- <button
                            v-for="(page, index) in paginate"
                            :key="index"
                            @click="handlescrollinfinitly(page.uid)"
                            class="buttton"
                        >
                            {{ page.sign }}
                        </button> -->
                        <template >
                            <button
                                :disabled="page === 0 "
                                @click="handlescrollinfinitly('regression')"
                                class="buttton">
                                ❮ 
                            </button>
                            <button
                                :disabled="page == instrumentPageLength -1 "
                                @click="handlescrollinfinitly('progression')"
                                class="buttton">
                                ❯ 
                            </button>
                        </template>
                        <!-- progression -->
                    </button>
                </section>
            </section>
            <section v-if="getWindowWidth === 'desktop'">
                <div class="instrument-base">
                    <template v-if="loading">
                        <InstrumentCard dummy v-for="i in 10" :key="i" :instrument="{}" />
                    </template>
                    <template 
                      v-else-if="getInstrumentsListArray && getInstrumentsListArray.length > 0">
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
                <div
                    class="caution__big"
                    v-else-if="
                        getErrorLog.type === 'tag-instruments' &&
                            getInstrumentsListArray.length <= 0
                    "
                >
                    <img :src="require('../../assets/img/caution.svg')" alt="Caution" />
                    <a class="caution__reload" @click="mount">Reload</a>
                </div>
                <section class="empty-center" v-else-if="getInstrumentsListArray.length == 0">
                    <img width="50px" :src="require('../../assets/img/papers.svg')" alt="Papers" />
                    <p>There are no stocks in this collection</p>
                </section>
                <template v-else>
                    <transition-group name="kyc-navbar">
                        <section key="1">
                            <InstrumentMobile
                                v-for="(instrument, index) in getInstrumentsListArray"
                                :key="index"
                                :instrument="instrument"
                            />
                        </section>
                    </transition-group>
                </template>
                
            </section>
            <div ref="infinitesscrolltrigger" id="scroll-trigger">
                <img
                    class="middle-loader"
                    v-if="infiniteLoader"
                    :src="require('../../assets/img/loader.gif')"
                    alt="spin"
                />
            </div>
        </template>
    </section>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    name: "Categories",
    data() {
        return {
            newInstrument: [],
            page: 0,
            perPage: 20,
            infiniteLoader: false,
            loaderState:false,
            InstrumentsListArray:[],
            paginate:[
                {
                    name: "Previous",
                    uid: "regression",
                    sign: "❮ "
                },
                {
                    name: "Next",
                    uid: "progression",
                    sign: "❯ "
                }
            ],

            //
            loading: false,
            loadingTags: false,
            selectedTag: "ALL",
            currentTag: { filter: "ALL" },
            tagCategories: [
                {
                    name: "All",
                    value: "ALL"
                },
                {
                    name: "Featured",
                    value: "FEATURED"
                },
                {
                    name: "Industries",
                    value: "INDUSTRIES"
                },
                {
                    name: "Countries",
                    value: "COUNTRIES"
                }
            ]
        };
    },
    components: {
        InstrumentCard: () => import("../../components/Instrument/InstrumentCard"),
        InstrumentMobile: () => import("../../components/watchlist/MobileWatchlist"),
        Tag: () => import("../../components/SingleTag")
    },
    computed: {
        ...mapGetters([
            "gettagslistsArray",
            "getInstrumentsListArray",
            "getWindowWidth",
            "getInstrumentsPayload",
            "getErrorLog",
            "getpagination"
        ]),
        instrumentLength() {
            if (Object.keys(this.getpagination).length > 0) {
                if (this.getpagination === "") {
                    return 0;
                }
                const length = this.getpagination.total;
                return length;
            }
            return false;
        },
        instrumentPageLength() {
            if (Object.keys(this.getpagination).length > 0) {
                if (this.getpagination === "") {
                    return 0;
                }
                const length = (this.getpagination.total / 20);
                const ceilLength = Math.ceil(length);
                return ceilLength;
            }
            return false;
        }
    },
    methods: {
        ...mapMutations([
            "SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS",
            "SET_INSTRUMENT_BY_TAGS",
            "SET_TAGS_LISTS",
            "SET_SLUG_FOR_INSTRUMENT"
        ]),
        ...mapActions(["GET_TAGS_CATEGORIES", "GET_INSTRUMENT_BY_TAGS"]),
        handlescrollinfinitly(signType) {
					if (signType) {
                        if(signType == "regression"){
                            if(this.page == 0){
                                const pageCount = 0;
                                const pagenation = {
                                page:pageCount,
                                perPage:this.perPage,
                                slug:this.getInstrumentsPayload.slug
                                };
                                // this.infiniteLoader = true;
                                this.loading = true
                                this.SET_INSTRUMENT_BY_TAGS([])
                                this.GET_INSTRUMENT_BY_TAGS(pagenation).then(() => {
                                    // this.infiniteLoader = false;
                                    this.loading = false;
                                    this.SET_INSTRUMENT_BY_TAGS([...this.getInstrumentsListArray])
                                });
                            }else{
                                const pagenation = {
                                page: --this.page,
                                perPage:this.perPage,
                                slug:this.getInstrumentsPayload.slug
                                };
                                // this.infiniteLoader = true;
                                this.loading = true;
                                this.SET_INSTRUMENT_BY_TAGS([])
                                this.GET_INSTRUMENT_BY_TAGS(pagenation).then(() => {
                                    // this.infiniteLoader = false;
                                    this.loading = false;
                                    this.SET_INSTRUMENT_BY_TAGS([...this.getInstrumentsListArray])
                                });
                            }
                        }
                        // if the numberof pages is < Math.ceil(totalPaginationlength / 20)
                        else{
                            if(this.page < this.instrumentPageLength - 1){
                                const pagenation = {
                                page: ++this.page,
                                perPage:this.perPage,
                                slug:this.getInstrumentsPayload.slug
                            };
                            // this.infiniteLoader = true;
                            this.loading = true;
                            this.SET_INSTRUMENT_BY_TAGS([])
							this.GET_INSTRUMENT_BY_TAGS(pagenation).then(() => {
								// this.infiniteLoader = false;
                                this.loading = false;
                                this.SET_INSTRUMENT_BY_TAGS([...this.getInstrumentsListArray])
							});
                            }
                            // else if(){

                            // }
                        }
						// if (this.newInstrument.length !== this.getInstrumentsListArray.length) {
							
						// }
					}   
        },
        handleSelect(response) {
            this.loading = true;
            this.infiniteLoader = true;
            this.page = 0; //this is to set the page back to the default when tags are clicked.
            const payload = { slug: response.slug, page: 0, perPage: 20 };
            this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(response || {});
            if (payload.slug === "") {
                this.loading = false;
                this.SET_INSTRUMENT_BY_TAGS([]);
                return true;
            }
          
            this.GET_INSTRUMENT_BY_TAGS(payload).then(() => {
                this.loading = false;
                this.infiniteLoader = false;
                this.loading = false;
            });
        },
        getNewTags() {
            if (this.selectedTag !== this.currentTag.filter) {
                this.SET_TAGS_LISTS([]);
                this.SET_INSTRUMENT_BY_TAGS([]);
                this.currentTag.filter = this.selectedTag;
                this.OnclickhandleTaToogle();
            }
        },
        async mount() {
            this.loading = true;
            this.infiniteLoader = true;
            this.page = 0; //this is to set the page back to the default when tags are clicked.
            this.loadingTags = true;
            await this.GET_TAGS_CATEGORIES(this.currentTag);
            this.loadingTags = false;
            if (this.gettagslistsArray.length > 0) {
                this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(this.getInstrumentsPayload ? this.getInstrumentsPayload : {});
                 const payloadGetInstrument = { slug: this.getInstrumentsPayload.slug, page:0, perPage:20};
                 this.SET_INSTRUMENT_BY_TAGS([])
                    await this.GET_INSTRUMENT_BY_TAGS(payloadGetInstrument).then(()=>{
                        this.infiniteLoader = false;
                        this.loading = false;
                        this.SET_INSTRUMENT_BY_TAGS([...this.getInstrumentsListArray])
                });
            }
            this.loading = false;
        },
        async OnclickhandleTaToogle() {
            this.loading = true;
            this.loadingTags = true;
            this.page = 0; //this is to set the page back to the default when tags are clicked.
            await this.GET_TAGS_CATEGORIES(this.currentTag);
            this.loadingTags = false;
            if (this.gettagslistsArray.length > 0) {
                this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(
                    this.gettagslistsArray ? this.gettagslistsArray[0] : {}
                );
                const payloadGetInstrument = {
                    slug: this.getInstrumentsPayload.slug,
                    page: 0,
                    perPage: 20
                };

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
        next();
    },
    beforeRouteUpdate(to, from, next) {
        this.page = 0; //this is to set the page back to the default when tags are clicked.
        next();
    },
    watch: {}
};
</script>

<style src="../../assets/scss/components/_categorieslayout.scss" lang="scss" scoped />
