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
                <div class="btn-viewmore" >
                        <section
                            :title="'click to view details'" 
                            @click="toDetailsPage('local')" 
                            @mouseover="hover = true"
                            @mouseleave="hover = false">
                            <template v-if="hover">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                            version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 31.49 31.49" 
                            style="enable-background:new 0 0 31.49 31.49;" xml:space="preserve" width="40px" height="40px"><g><path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" data-original="#1E201D" class="active-path" data-old_color="#1E201D" fill="#FFFFFF"/></g> 
                            </svg>
                            </template>
                            <template v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                            version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 31.49 31.49" 
                            style="enable-background:new 0 0 31.49 31.49;" xml:space="preserve" width="40px" height="40px"><g>
                            <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" data-original="#1E201D" class="active-path" data-old_color="#1E201D" fill="#575756"/></g> 
                            </svg>
                            </template>
                        </section>
                </div>
            </section>
        </template>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import DoughnutGrapgh from './doughnut';

export default {
    name: 'dbase',
    components: {
        DoughnutGrapgh
    },
    data() {
        return {
            loading: false,
            hover:false,
        };
    },
    computed: {
        ...mapGetters(['getDoughnutWeightsymbol', 'getDoughnutWeightpercentage']),
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
        ...mapActions(['GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA']),
        async reload() {
            this.loading = true;
            await this.GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA();
            this.loading = false;
        },
        toDetailsPage(type) {
            this.$router.push({ name: 'portfolio-details', params: { type } });
        }
    },
    async mounted() {
        this.reload();
    }
};
</script>

<style src="../../assets/scss/components/doughnut.scss" lang="scss" scoped />
