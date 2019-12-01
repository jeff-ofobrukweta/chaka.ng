<template>
    <Fragment>
        <section
        v-if="(instrumentsList.length <= 0)" 
        class="card-container-holder-parent">
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
            <div class="card-container-holder"></div>
        </section>
        <div
        v-else
        v-for="(item,index) in instrumentsList" 
        :key="index"
        class="card-container">
            <section class="section1">
                <router-link class="section1 linking" :to="{name:'singlestock',params:{symbol:item.symbol}}">
                <img class="course-item-main-list-flex"
                    id="company"
                    :src='require(`../../assets/Instrument_assets/companylogo.png`)' alt="courses"/>
                </router-link>
                <img class="course-item-main-list-flex"
                    id="watch-icon"
                    :src='require(`../../assets/Instrument_assets/watch.png`)' alt="watch"/>
                <div class="symbol">{{item.symbol}}</div>
            </section>
            <router-link :to="{name:'singlestock',params:{symbol:item.symbol}}">
                <section class="section2">
                    <div class="price">{{item.InstrumentDynamic.askPrice ? item.InstrumentDynamic.askPrice : '-'}}</div>
                    <div class="level">
                        <img class="direct"
                        id="direct"
                        :src='require(`../../assets/Instrument_assets/up.png`)' alt="arrow"/>
                        <span>+1,23 (2,14%)</span></div>
                    <img class="country"
                        id="country"
                        :src='require(`../../assets/Instrument_assets/united-states.png`)' alt="states"/>
                </section>
            </router-link>
            <section class="section3">
                Buy
            </section>
        </div>
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'Instrumentdesk',
    components: {
        Fragment
    },
    computed:{
       ...mapGetters(['gettagslistsArray']),
    },
    methods:{
    //    ...mapActions(['GET_INSTRUMENT_BY_TAGS']),
    },
     props:{
        instrumentsList: {
			type: Array,
			required: false
        },
        tagdetails:{
            type: Object,
			required: false
        }
    },
    mounted(){
    }
};
</script>

<style src="../../assets/scss/components/_desktopstocks.scss" lang="scss" scoped/>
