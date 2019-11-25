<template>
    <Fragment>
        <div class="parent-container">
            <section class="title-tag">Categories</section>
            <section class="info-tag">Lorem ipsum blala</section>
        </div>
        <div class="container-tag">
            <div class="tag-item">
                <img
                    class="course-item-main-list-flex"
                    id="tag"
                    :src="require(`../assets/Instrument_assets/topgainer.png`)"
                    alt="courses"
                />
                <section class="tag-name">Popular</section>
            </div>
            <div class="tag-item">
                <img
                    class="course-item-main-list-flex"
                    id="tag"
                    :src="require(`../assets/Instrument_assets/looser.png`)"
                    alt="courses"
                />
                <section class="tag-name">Top Gainers</section>
            </div>
            <div class="tag-item">
                <img
                    class="course-item-main-list-flex"
                    id="tag"
                    :src="require(`../assets/Instrument_assets/looser.png`)"
                    alt="courses"
                />
                <section class="tag-name">Top Gainers</section>
            </div>
            <div class="tag-item">
                <img
                    class="course-item-main-list-flex"
                    id="tag"
                    :src="require(`../assets/Instrument_assets/looser.png`)"
                    alt="courses"
                />
                <section class="tag-name">Top Gainers</section>
            </div>
            <div class="tag-item">
                <img
                    class="course-item-main-list-flex"
                    id="tag"
                    :src="require(`../assets/Instrument_assets/popular.png`)"
                    alt="courses"
                />
                <section class="tag-name">Bottom Losers</section>
            </div>
            <div class="tag-item">
                <img
                    class="course-item-main-list-flex"
                    id="tag"
                    :src="require(`../assets/Instrument_assets/topgainer.png`)"
                    alt="courses"
                />
                <section class="tag-name">New</section>
            </div>
            <div class="tag-item">
                <img
                    class="course-item-main-list-flex"
                    id="tag"
                    :src="require(`../assets/Instrument_assets/popular.png`)"
                    alt="courses"
                />
                <section class="tag-name">Popular</section>
            </div>
            <div class="tag-item">
                <img
                    class="course-item-main-list-flex"
                    id="tag"
                    :src="require(`../assets/Instrument_assets/topgainer.png`)"
                    alt="courses"
                />
                <section class="tag-name">Popular</section>
            </div>
        </div>
    </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
export default {
    name: "",
    components: {
        Fragment
    }
};
</script>

<style src="../assets/scss/components/_tags.scss" lang="scss" scoped />
