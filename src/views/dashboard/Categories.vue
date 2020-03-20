<template>
  <section class="dashboard__main">
    <section class="accounts__title">
      <div>
        <h3>Categories</h3>
        <p class="dashboard__title--sub">Discover new stocks</p>
      </div>
      <div>
        <select
          class="form__input_select_opacity"
          @change="getNewTags"
          v-model="selectedTag"
          :disabled="loadingTags"
        >
          <option
            v-for="(option, i) in tagCategories"
            :key="i"
            :value="option.value"
          >{{ option.name }}</option>
        </select>
        <!-- <input class="search_categories" type="text" placeholder="search stocks?"> -->
      </div>
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
              :active="handleActiveHighlight(item)"
            />
          </template>
          <section class="empty-center" v-else>
            <img width="50px" :src="require('../../assets/img/papers.svg')" alt="Papers" />
            <p>There are no available categories at the moment</p>
          </section>
        </div>
      </section>
    </template>
    <template v-if="gettagslistsArray.length > 0 && !loadingTags">
      <hr class="division-logger" />
      <div class="main_parent_nav_container">
        <div class="inner_parent_nav_container">
          <section
            class="dashboard__title flex_container_title"
            v-if="Object.keys(getInstrumentsPayload).length > 0"
          >
            <section>
              <div class="categories_page" v-if="tagArrayList.length === 1">
                <h3>{{ getInstrumentsPayload.name }}</h3>
                <p
                  class="dashboard__title--sub"
                  v-if="instrumentLength !== false"
                >{{ instrumentLength }} Stock{{ instrumentLength === 1 ? "" : "s" }}</p>
              </div>
              <div class="tag-flex">
                <div>
                  <svg
                    width="20"
                    height="21"
                    class="tagging"
                    viewBox="0 0 13 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.30262 2.02098C6.1523 1.1713 7.53193 1.17133 8.38157 2.02098L11.4605 5.09993C12.3102 5.94957 12.3102 7.3292 11.4605 8.17888L7.69736 11.942C6.84768 12.7917 5.46806 12.7917 4.61841 11.942L1.53946 8.86309C0.689816 8.01345 0.689781 6.63382 1.53946 5.78414L5.30262 2.02098Z"
                      fill="#293D4A"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.7068 1.70679C12.7364 1.45163 12.6477 1.19704 12.4661 1.01539C12.2844 0.833736 12.0298 0.745025 11.7747 0.774659C10.4902 0.923408 8.2932 1.1778 6.68813 1.36369C6.32021 1.40622 6.00905 1.65561 5.88724 2.00545C5.76543 2.35528 5.85452 2.74399 6.11642 3.00589C7.38011 4.26958 9.22264 6.11211 10.484 7.37349C10.7444 7.63385 11.1308 7.72237 11.4785 7.60114C11.8262 7.4801 12.0743 7.17067 12.1166 6.80486C12.3025 5.19902 12.5578 2.99454 12.7068 1.70679ZM11.3925 1.3837C11.0034 1.3837 10.6874 1.69967 10.6874 2.08896C10.6874 2.47825 11.0034 2.79422 11.3925 2.79422C11.7818 2.79422 12.0977 2.47825 12.0977 2.08896C12.0977 1.69967 11.7818 1.3837 11.3925 1.3837Z"
                      fill="#293D4A"
                    />
                  </svg>
                  <span
                    v-for="(tag,index) in tagArrayList"
                    :key="index"
                    class="badge badge-pill badge-info"
                  >
                    {{tag.slug}}
                    <i
                      @click="handleremovePin(index)"
                      class="fa fa-times"
                      style="margin: 5px; cursor: pointer;"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>
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
                </button>-->
                <template>
                  <button
                    :disabled="page === 0"
                    @click="handlescrollinfinitly('regression')"
                    class="buttton"
                  >❮</button>
                  <button
                    :disabled="page == instrumentPageLength - 1"
                    @click="handlescrollinfinitly('progression')"
                    class="buttton"
                  >❯</button>
                </template>
                <!-- progression -->
              </button>
            </section>
          </section>
        </div>
      </div>
      <section v-if="getWindowWidth === 'desktop'">
        <div class="instrument-base">
          <template v-if="loading">
            <InstrumentCard dummy v-for="i in 10" :key="i" :instrument="{}" />
          </template>
          <template v-else-if="getInstrumentsListArray && getInstrumentsListArray.length > 0">
            <InstrumentCard
              v-for="(instrument, index) in getInstrumentsListArray"
              :key="index"
              :instrument="instrument"
            />
          </template>
          <section class="empty-center" v-else>
            <img width="50px" :src="require('../../assets/img/papers.svg')" alt="Papers" />
            <p>There are no stocks in this collection</p>
          </section>
        </div>
      </section>
      <section v-else>
        <template v-if="loading">
          <InstrumentMobile v-for="i in 3" :key="i" :instrument="{}" dummy />
        </template>
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
      <!-- <div ref="infinitesscrolltrigger" id="scroll-trigger">
                <img
                    class="middle-loader"
                    v-if="infiniteLoader"
                    :src="require('../../assets/img/loader.gif')"
                    alt="spin"
                />
      </div>-->
    </template>
  </section>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'Categories',
    data() {
        return {
            newInstrument: [],
            tagArrayList: [],
            page: 0,
            perPage: 20,
            infiniteLoader: false,
            loaderState: false,
            InstrumentsListArray: [],
            paginate: [
                {
                    name: 'Previous',
                    uid: 'regression',
                    sign: '❮ '
                },
                {
                    name: 'Next',
                    uid: 'progression',
                    sign: '❯ '
                }
            ],

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
            'getpagination'
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
        },
        instrumentPageLength() {
            if (Object.keys(this.getpagination).length > 0) {
                if (this.getpagination === '') {
                    return 0;
                }
                const length = this.getpagination.total / 20;
                const ceilLength = Math.ceil(length);
                return ceilLength;
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
        ...mapActions([
            'GET_TAGS_CATEGORIES',
            'GET_INSTRUMENT_BY_TAGS',
            'GET_INSTRUMENT_BY_FILTER_TAGS'
        ]),
        handleremovePin(index) {
            this.tagArrayList.splice(index, 1);
            if (this.tagArrayList.length >= 1) {
                this.loading = true;
                this.infiniteLoader = true;
                this.page = 0; // this is to set the page back to the default when tags are clicked.
                const collectionSlug = [];
                this.tagArrayList.map(index => collectionSlug.push(index.slug));
                const slugList = String(collectionSlug.join(','));
                const payload = { slug: slugList, page: 0, perPage: 20 };

                if (payload.slug === '') {
                    this.loading = false;
                    this.SET_INSTRUMENT_BY_TAGS([]);
                    return true;
                }

                this.GET_INSTRUMENT_BY_FILTER_TAGS(payload).then(() => {
                    this.loading = false;
                    this.infiniteLoader = false;
                    this.loading = false;
                });
            } else {
                this.loading = true;
                this.infiniteLoader = true;
                this.page = 0; // this is to set the page back to the default when tags are clicked.
                this.tagArrayList.push(this.gettagslistsArray[0]);
                const payload = { slug: this.gettagslistsArray[0].slug, page: 0, perPage: 20 };

                if (payload.slug === '') {
                    this.loading = false;
                    this.SET_INSTRUMENT_BY_TAGS([]);
                    return true;
                }

                this.GET_INSTRUMENT_BY_FILTER_TAGS(payload).then(() => {
                    this.loading = false;
                    this.infiniteLoader = false;
                    this.loading = false;
                });
            }
        },
        handleActiveHighlight(item) {
            const Isactive = this.tagArrayList.filter(active => active.slug === item.slug);
            if (Isactive.length >= 1) { return true; }
            return false;
        },
        handlescrollinfinitly(signType) {
            if (signType) {
                if (signType == 'regression') {
                    if (this.page == 0) {
                        const pageCount = 0;
                        const pagenation = {
                            page: pageCount,
                            perPage: this.perPage,
                            slug: this.getInstrumentsPayload.slug
                        };
                        // this.infiniteLoader = true;
                        this.loading = true;
                        this.SET_INSTRUMENT_BY_TAGS([]);
                        this.GET_INSTRUMENT_BY_TAGS(pagenation).then(() => {
                            // this.infiniteLoader = false;
                            this.loading = false;
                            this.SET_INSTRUMENT_BY_TAGS([...this.getInstrumentsListArray]);
                        });
                    } else {
                        const pagenation = {
                            page: --this.page,
                            perPage: this.perPage,
                            slug: this.getInstrumentsPayload.slug
                        };
                        // this.infiniteLoader = true;
                        this.loading = true;
                        this.SET_INSTRUMENT_BY_TAGS([]);
                        this.GET_INSTRUMENT_BY_TAGS(pagenation).then(() => {
                            // this.infiniteLoader = false;
                            this.loading = false;
                            this.SET_INSTRUMENT_BY_TAGS([...this.getInstrumentsListArray]);
                        });
                    }
                }
                // if the numberof pages is < Math.ceil(totalPaginationlength / 20)
                else {
                    if (this.page < this.instrumentPageLength - 1) {
                        const pagenation = {
                            page: ++this.page,
                            perPage: this.perPage,
                            slug: this.getInstrumentsPayload.slug
                        };
                        // this.infiniteLoader = true;
                        this.loading = true;
                        this.SET_INSTRUMENT_BY_TAGS([]);
                        this.GET_INSTRUMENT_BY_TAGS(pagenation).then(() => {
                            // this.infiniteLoader = false;
                            this.loading = false;
                            this.SET_INSTRUMENT_BY_TAGS([...this.getInstrumentsListArray]);
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
            if (!(this.tagArrayList.includes(response))) {
                this.tagArrayList.push(response);
                this.page = 0; // this is to set the page back to the default when tags are clicked.
                const collectionSlug = [];
                this.tagArrayList.map(index => collectionSlug.push(index.slug));
                const slugList = String(collectionSlug.join(','));
                const payload = { slug: slugList, page: 0, perPage: 20 };
                this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(response || {});
                if (payload.slug === '') {
                    this.loading = false;
                    this.SET_INSTRUMENT_BY_TAGS([]);
                    return true;
                }

                this.GET_INSTRUMENT_BY_FILTER_TAGS(payload).then(() => {
                    this.loading = false;
                    this.infiniteLoader = false;
                    this.loading = false;
                });
            } else {
                this.loading = false;
                this.infiniteLoader = false;
            }
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
            // this.infiniteLoader = true;
            this.page = 0; // this is to set the page back to the default when tags are clicked.
            this.loadingTags = true;
            await this.GET_TAGS_CATEGORIES(this.currentTag);
            this.loadingTags = false;
            if (this.gettagslistsArray.length > 0) {
                this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(
                    this.getInstrumentsPayload ? this.getInstrumentsPayload : {}
                );
                this.tagArrayList.push(this.getInstrumentsPayload);
                const payloadGetInstrument = {
                    slug: this.getInstrumentsPayload.slug,
                    page: 0,
                    perPage: 20
                };
                this.SET_INSTRUMENT_BY_TAGS([]);
                await this.GET_INSTRUMENT_BY_TAGS(payloadGetInstrument).then(() => {
                    this.infiniteLoader = false;
                    this.loading = false;
                    this.SET_INSTRUMENT_BY_TAGS([...this.getInstrumentsListArray]);
                });
            }
            this.loading = false;
        },
        async OnclickhandleTaToogle() {
            this.loading = true;
            this.loadingTags = true;
            this.page = 0; // this is to set the page back to the default when tags are clicked.
            await this.GET_TAGS_CATEGORIES(this.currentTag);
            this.loadingTags = false;
            if (this.gettagslistsArray.length > 0) {
                this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(
                    this.gettagslistsArray ? this.gettagslistsArray[0] : {}
                );
                this.tagArrayList = [];
                this.tagArrayList.push(this.gettagslistsArray[0]);
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
        this.page = 0; // this is to set the page back to the default when tags are clicked.
        next();
    },
    watch: {}
};
</script>

<style src="../../assets/scss/components/_categorieslayout.scss" lang="scss" scoped />
