<template>
    <!-- <span v-if="dummy"
        class="card-news flex"
        target="_blank"
    >
        <img
            class="card-news__img faded"
            :src="require('../../assets/img/chaka-icon.svg')"
            :alt="news.title"
        />
    </span> -->
    <a
        class="card-news"
        :class="{ flex: !news.imageUrl }"
        target="_blank"
        :href="news.pageUrl"
        v-if="!collection"
    >
        <img v-if="news.imageUrl" class="card-news__img" :src="news.imageUrl" :alt="news.title" />
        <img
            v-else
            class="card-news__img faded"
            :src="require('../../assets/img/chaka-icon.svg')"
            :alt="news.title"
        />
        <div class="card-news__title">
            <h5>{{ news.name || "" | truncate(48) }}</h5>
        </div>
    </a>
    <a
        class="card-news"
        :class="{ flex: !news.imageUrl }"
        @click="setCollectionStocks(news.stocks)"
        v-else
    >
        <img v-if="news.imageUrl" class="card-news__img" :src="news.imageUrl" :alt="news.title" />
        <img
            v-else
            class="card-news__img faded"
            :src="require('../../assets/img/chaka-icon.svg')"
            :alt="news.title"
        />
        <div class="card-news__title">
            <h5>{{ news.name || "" | truncate(48) }}</h5>
        </div>
    </a>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "news-card",
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
        ...mapMutations(["SET_COLLECTION_STOCKS"]),
        setCollectionStocks(stocks) {
            this.SET_COLLECTION_STOCKS(stocks);
            this.$router.push({ name: "explore-collection", params: { name: this.news.name } });
        }
    }
};
</script>
