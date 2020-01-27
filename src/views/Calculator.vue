<template>
    <main class="main" role="main">
        <div class="app-body">
            <Calculator />
        </div>
    </main>
</template>

<script>
export default {
    name: "AppCalculator",
    components: {
        Calculator: () => import("../components/Calculator")
    },
    mounted() {
        document.title = "Chaka - Calculator";
        mixpanel.track("CALCULATOR_PAGE") //tracks the calculatorpage
    }
};
</script>
