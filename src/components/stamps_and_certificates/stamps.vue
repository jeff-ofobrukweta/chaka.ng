<template>
    <section class="flickity-wrapper">
        <h1 class="title-news">Certificates</h1>
        <flickity ref="flickity" :options="flickityOptions">
            <section class="carousel-cell" v-for="(cert, index) in stamplists" :key="index">
                <div class="stamps-container">
                    <img
                        :src="cert.logoUrl"
                        class="v2-landing__vector--img carousel-cell"
                        alt="Landing Vector"
                    />
                    <!-- <p
                        :class="{ silver: computeCert(cert) === 1,gold: computeCert(cert) === 2,dark: computeCert(cert) === 3 }"
                    >{{ cert.symbol }}</p> -->
                    <p class="symbol-text">{{ cert.symbol }}</p>
                    <img
                        v-if="true || computeCert(cert) === 1"
                        class="cert"
                        src="../../assets/img/certs/silver.svg"
                        alt
                    />
                </div>
                <!-- <img
                    v-else-if="computeCert(cert) === 2"
                    class="cert"
                    src="../../assets/img/certs/gold.svg"
                    alt
                />
                <img
                    v-else-if="computeCert(cert) === 3"
                    class="cert"
                    src="../../assets/img/certs/black.svg"
                    alt
                /> -->
            </section>
        </flickity>
    </section>
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
                wrapAround: true,
                cellAlign: 'left',
                contain: true
            }
        };
    },
    props: {
        stamplists: {
            type: Object,
            required: true
        }
    },
    methods: {
        next() {
            this.$refs.flickity.next();
        },
        previous() {
            this.$refs.flickity.previous();
        },
        computeCert(cert) {
            const val = cert.currentValue;
            switch (cert.currency) {
            case 'USD':
                if (val < 500000) return 1;
                if (val >= 500000 && val < 3000000) return 2;
                return 3;

            default:
                if (val < 100000000) return 1;
                if (val >= 100000000 && val < 1000000000) return 2;
                return 3;
            }
        }
    }
};
</script>

<style src="../../assets/scss/components/_stamps.scss" lang="scss" scoped />
