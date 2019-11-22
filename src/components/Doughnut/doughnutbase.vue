<template>
    <div class="graphholder">
        <DoughnutGraph/>
    </div>
</template>
<script>
import DoughnutGraph from './doughnut'
export default {
    name:"Doughnutbase",
    components:{
        DoughnutGraph
    }
}
</script>
<style src="../../assets/scss/components/doughnut.scss" lang="scss" scoped />