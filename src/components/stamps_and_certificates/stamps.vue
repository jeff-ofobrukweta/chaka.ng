<template>
    <Fragment>
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
        </flickity>
        <div class="btn-container-parent">
            <img
                    src="../../assets/img/stamps_dummy/leftarrow.png"
                    class="v2-landing__vector--img arrowleft"
                    alt="Landing Vector"
                    @click="previous()"
            />
            <img
                    src="../../assets/img/stamps_dummy/rightarrow.png"
                    class="v2-landing__vector--img arrowright"
                    @click="next()"
                    alt="Landing Vector"
            />
            <!-- rightarrow.png -->
            <!-- <input
             @click="previous()"
             type="submit" value="Prev Button"/>
            <input
            @click="next()"
            type="submit" value="Custom Next Button"/> -->
        </div>
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
                prevNextButtons: false,
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
