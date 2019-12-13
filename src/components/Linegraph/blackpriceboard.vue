<template>
    <Fragment>
        <section class="board-container-price">
            <img
                v-if="instrument && instrument.derivedPricePercentage < 0"
                class="direct"
                id="direct"
                :src='require(`../../assets/Instrument_assets/redarrow.svg`)' alt="decline"/>
                <img v-else-if="!instrument || Number.isNaN(instrument.derivedPricePercentage)" class="middle-loader" :src="require('../../assets/img/loader.gif')" alt="spin" />
                <img
                v-else 
                class="direct"
                id="direct"
                :src='require(`../../assets/Instrument_assets/arrow_growth.png`)' alt="growth"/>
                <section class="section-price">
                    <h1
                    v-if="instrument.currency" 
                    class="price">
                        {{(instrument.currency == 'USD' ? '$' :'₦')}}{{instrument.askPrice}}
                    </h1>
                    <h1 v-else></h1>
                    <section 
                        v-if="instrument.derivedPrice && instrument.derivedPricePercentage" class="info-details">
                        <span class="increase">
                        <span
                        :class="[instrument.derivedPrice < 0 ? 'red' : 'green']">
                        {{instrument.derivedPrice}}
                        </span><Fragment>
                            <span
                            :class="[instrument.derivedPricePercentage < 0 ? 'red' : 'green']"
                            >({{instrument.derivedPricePercentage}}%)</span></Fragment>
                            </span>
                        <span v-if="timingStatement">from {{timingStatement}}</span>
                        <span v-else></span>
                    </section>
                    <section v-else></section>
                </section>
            </section>
    </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import EventBus from '../../event-bus';

export default {
    name:"Blackcard",
    data(){
        return{
            timingStatement:null,
            valueTiming:''
        }
    },
    components: {
        Fragment
    },
    methods:{
        checkTimevariantForPriceCardonToogle(value){
            switch (value) {
            case '1D':
                this.timingStatement = "Last 24 Hours"
                return this.timingStatement;
            case '1W':
                this.timingStatement = "Last One Week"
                return this.timingStatement;
            case '1M':
                this.timingStatement = "Last One Month"
                return this.timingStatement;
            case '3M':
                this.timingStatement = "Last Three Months"
                return this.timingStatement;
            case '1Y':
                this.timingStatement = "Last One Year"
                return this.timingStatement;
            case '5Y':
                this.timingStatement = "Last Five Years"
                return this.timingStatement;
            default: 
                this.timingStatement = "Last Five Years"
                return this.timingStatement;
            }
            
            
        }
    },
    props:{
        instrument:{
            type:Object,
            required:true
        }
    },
    mounted () {
        EventBus.$on('GET_DAYS', (payLoad)=> {
            this.valueTiming = payLoad
             this.checkTimevariantForPriceCardonToogle(this.valueTiming);
        });
  }
};
</script>

<style src="../../assets/scss/components/_blackpriceboard.scss" lang="scss" scoped />
