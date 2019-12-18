<template>
    <div v-if="dummy" class="tag-item loader tag-item__placeholder">
        <img
            src="../assets/img/chaka-icon.svg"
            class="faded"
            alt="Chaka"
            width="90px"
            height="90px"
        />
    </div>
    <div v-else @click="tagSelect" class="tag-item pointer">
        <template v-if="!tag.imageUrl">
            <img
                v-if="!active"
                class="card-news__img faded"
                :src="require('../assets/img/chaka-icon.svg')"
                :alt="tag.name"
            />
            <img
                v-else
                class="card-news__img faded"
                :src="require('../assets/img/chaka-icon-white.svg')"
                :alt="tag.name"
            />
        </template>
        <img
            class="course-item-main-list-flex"
            id="tag"
            v-else
            :src="tag.imageUrl"
            :alt="tag.name"
        />
        <router-link
            class="taglinking"
            :to="{ name: 'categories', params: { category: tag.slug } }">
            <section class="tag-name" :class="{ active: active }">{{ tag.name }}</section>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'single-tag',
    props: {
        tag: {
            type: Object,
            required: true
        },
        active: {
            type: Boolean
        },
        dummy: {
            type: Boolean
        }
    },
    methods: {
        tagSelect() {
            this.$emit('click', this.tag);
        }
    }
};
</script>
<style src="../assets/scss/components/_tags.scss" lang="scss" scoped />
