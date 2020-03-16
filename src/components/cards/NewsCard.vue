<template>
    <div v-if="dummy" class="card-news loader">
        <div class="loader-div" />
    </div>
    <a
        class="card-news"
        :class="{ flex: !news.imageUrl }"
        target="_blank"
        rel="noreferrer noopener"
        :href="news.url || news.pageUrl"
        v-else-if="!collection"
    >
        <img v-if="news.imageUrl" class="card-news__img" :src="news.imageUrl" :alt="news.title" />
        <img
            v-else
            class="card-news__img faded"
            :src="require('../../assets/img/chaka-icon.svg')"
            :alt="news.title"
        />
        <div class="card-news__title">
            <h5>{{ news.name || news.title | truncate(48) }}</h5>
        </div>
    </a>
    <a class="card-news" :class="{ flex: !news.imageUrl }" @click="setCollectionStocks" v-else>
        <img v-if="news.imageUrl" class="card-news__img" :src="news.imageUrl" :alt="news.title" />
        <img
            v-else
            class="card-news__img faded"
            :src="require('../../assets/img/chaka-icon.svg')"
            :alt="news.title"
        />
        <div class="card-news__title">
            <h5>{{ news.name || news.title | truncate(48) }}</h5>
        </div>
    </a>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'news-card',
    props: {
        news: {
            type: Object,
            required: true
        },
        collection: {
            type: Boolean,
            default: false
        },
        dummy: {
            type: Boolean
        }
    },
    methods: {
        ...mapMutations(['SET_COLLECTION_STOCKS', 'SET_SELECTED_COLLECTION']),
        setCollectionStocks() {
            this.SET_SELECTED_COLLECTION(this.news);
            this.SET_COLLECTION_STOCKS(this.news.stocks);
            this.$router.push({ name: 'explore-collection', params: { name: this.news.name } });
        }
    }
};
</script>
