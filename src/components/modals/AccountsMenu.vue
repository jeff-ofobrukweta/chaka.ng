<template>
    <modal :close-on-click="false" no-header full-on-mobile @close="closeModal">
        <section class="modal__accounts">
            <a
                class="modal__accounts--link"
                @click="linkClick(link.link)"
                v-for="(link, i) in routes"
                :key="i"
                >{{ link.name }}</a
            >
        </section>
    </modal>
</template>

<script>
export default {
    name: 'accounts-menu',
    props: {
        routes: {
            type: Array,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        linkClick(route) {
            if (this.$route.name !== route) this.$router.push({ name: route });
            this.closeModal();
        }
    }
};
</script>
