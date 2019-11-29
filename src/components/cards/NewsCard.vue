<template>
    <a class="card-news" target="_blank" :href="news.pageUrl">
        <img v-if="news.imageUrl" class="card-news__img" :src="news.imageUrl" :alt="news.title" />
        <img
            v-else
            class="card-news__img faded"
            :src="require('../../assets/img/chaka-icon.svg')"
            :alt="news.title"
        />
        <div class="card-news__title">
            <h5>{{ news.name | truncate(48) }}</h5>
        </div>
    </a>
</template>

<script>
export default {
    name: "news-card",
    props: {
        news: {
            type: Object,
            required: true
        }
    }
};
</script>
