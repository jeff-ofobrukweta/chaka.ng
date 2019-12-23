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
                <div ref="infinitesscrolltrigger" id="scroll-trigger">
                    <img
                        class="middle-loader"
                        v-if="infiniteLoader" 
                        :src="require('../../assets/img/loader.gif')"
                        alt="spin"
                    />
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
                <div ref="infinitesscrolltrigger" id="scroll-trigger">
                    <img
                        class="middle-loader"
                        v-if="infiniteLoader" 
                        :src="require('../../assets/img/loader.gif')"
                        alt="spin"
                    />
                </div>
            </section>
        </template>
    </section>
</template>
<script>
const options = {
	root: null /* uses the page as root */,
	rootMargin: '400px',
	threshold: 0
};

import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'Categories',
    data() {
        return {
            newInstrument: [],
            page: 0,
            perPage:6,
            infiniteLoader: false,
            loaderState:false,

            // 
            loading: false,
            loadingTags: false,
            selectedTag: 'ALL',
            currentTag: { filter: 'ALL' },
            tagCategories: [
                {
                    name: 'All',
                    value: 'ALL'
                },
                {
                    name: 'Featured',
                    value: 'FEATURED'
                },
                {
                    name: 'Industries',
                    value: 'INDUSTRIES'
                },
                {
                    name: 'Countries',
                    value: 'COUNTRIES'
                }
            ]
        };
    },
    components: {
        InstrumentCard: () => import('../../components/Instrument/InstrumentCard'),
        InstrumentMobile: () => import('../../components/watchlist/MobileWatchlist'),
        Tag: () => import('../../components/SingleTag')
    },
    computed: {
        ...mapGetters([
            'gettagslistsArray',
            'getInstrumentsListArray',
            'getWindowWidth',
            'getInstrumentsPayload',
            'getErrorLog',
            'getpagination',
            'getMostPopular'
        ]),
        instrumentLength() {
            if (Object.keys(this.getpagination).length > 0) {
                if (this.getpagination === '') {
                    return 0;
                }
                const length = this.getpagination.total;
                return length;
            }
            return false;
        }
    },
    methods: {
        ...mapMutations([
            'SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS',
            'SET_INSTRUMENT_BY_TAGS',
            'SET_TAGS_LISTS',
            'SET_SLUG_FOR_INSTRUMENT'
        ]),
        ...mapActions(["GET_TAGS_CATEGORIES", "GET_INSTRUMENT_BY_TAGS", "GET_MOST_POPULAR"]),
        handlescrollinfinitly(from, to) {
			this.observer = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (entry && entry.isIntersecting) {
                        console.log('>>>>>>>>>>>isIntersecting>>>>>>>booooooom>')
						const pagenation = {
							page: ++this.page,
							perPage: ++this.perPage
						};
						if (this.newInstrument.length !== this.getInstrumentsListArray.length) {
							this.infiniteLoader = true;
							this.loaderState = true;
							this.GET_INSTRUMENT_BY_TAGS(pagenation).then(() => {
								this.infiniteLoader = false;
								this.loaderState = false;
                                this.newInstrument.push(...this.getInstrumentsListArray);
                                console.log('handlescrollinfinitly?????????????',this.newInstrument)
							});
						}
					}
				});
            }, options);   
        },
        handleSelect(response) {
            this.loading = true;
            const payload = { slug: response.slug, page :0 ,perPage: 20};
            this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(response);
            if (payload.slug === '') {
                this.loading = false;
                this.SET_INSTRUMENT_BY_TAGS([]);
                return true;
            }
            this.GET_INSTRUMENT_BY_TAGS(payload).then(() => {
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
            this.GET_MOST_POPULAR();
            this.loading = true;
            this.loadingTags = true;
            await this.GET_TAGS_CATEGORIES(this.currentTag);
            this.loadingTags = false;
            if (this.gettagslistsArray.length > 0) {
                this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(this.getInstrumentsPayload ? this.getInstrumentsPayload : {});
                 const payloadGetInstrument = { slug: this.getInstrumentsPayload.slug, page:0, perPage:20};

                await this.GET_INSTRUMENT_BY_TAGS(payloadGetInstrument).then(()=>{
                   
                });

                // this.handlescrollinfinitly();
            }
            this.loading = false;
        },
        async OnclickhandleTaToogle(){
            this.loading = true;
            this.loadingTags = true;
            await this.GET_TAGS_CATEGORIES(this.currentTag);
            this.loadingTags = false;
            if (this.gettagslistsArray.length > 0) {
                this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(this.gettagslistsArray ? this.gettagslistsArray[0] : {});
                 const payloadGetInstrument = { slug: this.getInstrumentsPayload.slug, page:0, perPage:20};

                await this.GET_INSTRUMENT_BY_TAGS(payloadGetInstrument).then(()=>{
                    console.log('the payload after toogle',this.getInstrumentsPayload);
                });
            }
            this.loading = false;
        }
    },
    async mounted() {
        await this.mount();
    },
    beforeRouteLeave(to, from, next) 
    {
        this.SET_INSTRUMENT_BY_TAGS([]);
        next();
    },
    beforeRouteUpdate(to, from, next) {
		if (this.observer) {
			this.observer.unobserve(this.$refs.infinitesscrolltrigger);
		}
		this.page = 0;
		this.loaderState = true;
		this.SET_INSTRUMENT_BY_TAGS([]);
		const pagenation = {
			page: this.page,
            perPage: this.perPage,
            slug: this.getInstrumentsPayload.slug
		};
		this.newInstrument = [];
		this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(pagenation).then(() => {
			if (this.getInstrumentsListArray.length === 0) {
				this.newInstrument = ['No Instruments for this collection'];
			} else {
				this.newInstrument = [...this.getInstrumentsListArray];
				this.observer.observe(this.$refs.infinitesscrolltrigger);
			}
			this.loaderState = false;
		});
		next();
    },
    watch:{
        // selectedTag(newValue,oldValue){
           
        //      this.loading = true;
        //     // if (this.gettagslistsArray.length > 0) {
        //     //     this.loadingTags = false;
        //     // }
        //     if (this.gettagslistsArray.length > 0) {
        //         this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(this.getInstrumentsPayload ? this.getInstrumentsPayload : {});
                 
        //         //  const payloadGetInstrument = { slug: this.getInstrumentsPayload.slug, page:0, perPage:20};

        //         //  this.GET_INSTRUMENT_BY_TAGS(payloadGetInstrument).then(()=>{
        //         //     console.log('GGGGGGGGGGGGGGGGGGG',this.getInstrumentsListArray)
        //         // });

        //         // this.handlescrollinfinitly();
        //     }
        //     this.loading = false;
        //     // console.log('getInstrumentsPayload >>>>AAAAAAAAAAAAAAAADDDDDDDDDDDDD>>>>>>>>',this.getInstrumentsPayload);
        // }
    }
};
</script>

<style src="../../assets/scss/components/_categorieslayout.scss" lang="scss" scoped />
