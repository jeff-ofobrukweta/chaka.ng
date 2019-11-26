<template>
    <div class="card-news">
        <img
            class="card-news__img"
            src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            :alt="news.title"
        />
        <div class="card-news__title">
            <h5>{{ news.title | truncate(48) }}</h5>
            <!-- <h5>{{ line1 }}</h5>
      <h5 class="card-news__ellipsis">{{ line2 }}</h5> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'news-card',
    props: {
        news: {
            type: Object,
            required: true
        }
    },
    computed: {
        line1() {
            return this.news.title.substring(0, 20);
        },
        line2() {
            return this.news.title.substring(20);
        }
    }
};
</script>
