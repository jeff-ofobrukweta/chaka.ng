<template>
    <section class="dashboard__main">
        <Gifts />
    </section>
</template>

<script>
export default {
    name: "DashboardGifts",
    components: {
        Gifts: () => import("../../components/Gifts")
    }
};
</script>
