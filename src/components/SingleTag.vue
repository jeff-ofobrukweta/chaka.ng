<template>
    <div @click="tagSelect" class="tag-item pointer">
        <template v-if="!tag.imageurl">
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
        <section class="tag-name" :class="{ active: active }">{{ tag.name }}</section>
    </div>
</template>

<script>
export default {
    name: "single-tag",
    props: {
        tag: {
            type: Object,
            required: true
        },
        active: {
            type: Boolean
        }
    },
    methods: {
        tagSelect() {
            this.$emit("click", this.tag);
        }
    }
};
</script>
<style src="../assets/scss/components/_tags.scss" lang="scss" scoped />
