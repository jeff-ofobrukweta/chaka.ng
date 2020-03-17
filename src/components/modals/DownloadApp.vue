<template>
    <modal close-on-click :full-on-mobile="false" @close="closeModal">
        <template slot="header">Do Much More</template>
        <section class="modal__download">
            <a href="https://play.google.com/store/apps/details?id=ng.chaka.android" target="_blank" rel="noreferrer noopener" class="modal__download--link">
                <img src="../../assets/img/playstore.svg" alt="Play Store" />
            </a>
            <div class="modal__download--images">
                <img src="../../assets/img/download-app-images.png" alt="Download App" />
            </div>
        </section>
    </modal>
</template>

<script>
export default {
    name: "download-app",
    methods: {
        closeModal() {
            this.$emit("close");
        }
    }
};
</script>
