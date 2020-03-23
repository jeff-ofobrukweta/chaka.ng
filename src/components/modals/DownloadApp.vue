<template>
    <modal close-on-click :full-on-mobile="false" @close="closeModal">
        <template slot="header">Download App Now</template>
        <section class="modal__download">
            <div class="modal__download--images">
                <img src="../../assets/img/download-app-images.png" alt="Download App" />
            </div>
            <a href="http://bit.ly/2uOUB8y" target="_blank" rel="noreferrer noopener" class="modal__download--link">
                <img src="../../assets/img/playstore.svg" alt="Play Store" />
            </a>
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
