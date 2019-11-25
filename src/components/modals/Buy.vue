<template>
    <modal :close-on-click="false" no-header @close="closeModal">
        <section class="action">
            Buy
        </section>
    </modal>
</template>

<script>
export default {
    name: "accounts-menu",
    props: {
        routes: {
            type: Array,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        linkClick(route) {
            this.$router.push({ name: route });
            this.closeModal();
        }
    }
};
</script>
