<template>
    <section class="dashboard__main">
        <Calculator />
    </section>
</template>

<script>
export default {
    name: 'DashboardCalculator',
    components: {
        Calculator: () => import('../../components/Calculator')
    }
};
</script>
