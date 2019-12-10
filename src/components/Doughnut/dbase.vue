<template>
    <div class="container-packet">
        <section class="dashboard__title">
            <h3>Positions</h3>
            <p class="dashboard__title--sub">View your positions</p>
        </section>
        <template v-if="loading">
            <div class="graphholder container-packet__placeholder loader-gif__big">
                <img :src="require('../../assets/img/loader.gif')" alt="Loader" />
            </div>
        </template>
        <template v-else-if="isGraphValid === 1">
            <div class="graphholder container-packet__placeholder">
                <img
                    :src="require('../../assets/img/gifs/positions.gif')"
                    alt="Positions Chart demo"
                />
            </div>
        </template>
        <template v-else-if="isGraphValid === 2">
            <div class="graphholder container-packet__placeholder caution__big">
                <img :src="require('../../assets/img/caution.svg')" alt="Caution" />
                <a class="caution__reload" @click="reload">Reload</a>
            </div>
        </template>
        <template v-else>
            <section class="graphholder">
                <DoughnutGrapgh
                    :percentage="getDoughnutWeightpercentage"
                    :symbol="getDoughnutWeightsymbol"
                />
            </section>
        </template>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import DoughnutGrapgh from "./doughnut";

export default {
    name: "dbase",
    components: {
        DoughnutGrapgh
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        ...mapGetters(["getDoughnutWeightsymbol", "getDoughnutWeightpercentage"]),
        isGraphValid() {
            if (this.getDoughnutWeightpercentage.length <= 0) {
                return 1;
            }
            const checkForNull = this.getDoughnutWeightpercentage.filter(
                el => el === null || el === undefined
            );
            if (checkForNull.length > 0) {
                return 2;
            }
            return 3;
        }
    },
    methods: {
        ...mapActions(["GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA"]),
        async reload() {
            this.loading = true;
            await this.GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA();
            this.loading = false;
        }
    },
    async mounted() {
        this.reload();
    }
};
</script>

<style src="../../assets/scss/components/doughnut.scss" lang="scss" scoped />
