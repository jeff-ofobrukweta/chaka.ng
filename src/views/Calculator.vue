<template>
    <main class="main" role="main">
        <Calculator />
    </main>
</template>

<script>
export default {
    name: 'AppCalculator',
    components: {
        Calculator: () => import('../components/Calculator')
    },
    mounted() {
        document.title = 'Chaka - Calculator';
    }
};
</script>
