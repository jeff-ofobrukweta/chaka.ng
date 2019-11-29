<template>
    <Fragment>
        <Tags 
        :taglists="gettagslistsArray"/>
        <div class="division-logger"></div>
        <Instrumentbase
         :instrumentsList="getInstrumentsListArray"/>
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';
import Instrumentbase from '../../components/Instrument/instrumentbase';
import Tags from '../../components/Tags';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'Categories',
    components: {
        Fragment,
        Instrumentbase,
        Tags
    },
     computed:{
        ...mapGetters(['gettagslistsArray','getInstrumentsListArray']),
    },
    methods:{
        ...mapMutations(['SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS']),
         ...mapActions(['GET_TAGS_CATEGORIES','GET_INSTRUMENT_BY_TAGS']),
            mountingActions(){
                
                this.$store.dispatch('GET_TAGS_CATEGORIES').then(()=>{
                    const payloadGetInstrument = {
                        symbols:this.gettagslistsArray[0].Instruments
                    }
                    console.log('payload>>>>>>>>>>',this.gettagslistsArray[0].Instruments)
                    this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(this.gettagslistsArray[0].Instruments ?this.gettagslistsArray[0].Instruments :null );
                    this.GET_INSTRUMENT_BY_TAGS(payloadGetInstrument)
                    console.log('here is the gertter???????',this.getInstrumentsListArray)
                });
            }
    },
    mounted(){
        this.mountingActions()
    }
};
</script>

<style src="../../assets/scss/components/_categorieslayout.scss" lang="scss" scoped />
