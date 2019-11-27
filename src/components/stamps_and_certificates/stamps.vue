<template>
    <Fragment>
        <section 
        class="flickity-wrapper">
                <h1 class="title-news">Certificates</h1>
                <flickity ref="flickity"
                :options="flickityOptions">
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                        <img
                            src="../../assets/img/stamps_dummy/stamp_test.png"
                            class="v2-landing__vector--img carousel-cell"
                            alt="Landing Vector"
                        />
                </flickity>
        </section>
    </Fragment>
</template>
<script>
import Flickity from 'vue-flickity';

export default {
    name: 'slider',
    components: {
        Flickity
    },
    data() {
        return {
            flickityOptions: {
                initialIndex: 0,
                prevNextButtons: true,
                pageDots: false,
                resize: true,
                wrapAround: false,
                cellAlign: 'left',
                contain: true

            }
        };
    },
    methods: {
        next() {
            console.log('>>>>>> next');
            this.$refs.flickity.next();
        },
        previous() {
            this.$refs.flickity.previous();
        }
    }
};
</script>

<style src="../../assets/scss/components/_stamps.scss" lang="scss" scoped />
