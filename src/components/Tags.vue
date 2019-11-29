<template>
    <Fragment>
        <div class="parent-container">
            <section class="title-tag">Categories</section>
            <section class="info-tag">Lorem ipsum blala</section>
        </div>
        <div class="container-tag">
            <div
            v-for="item in taglists"
            :key="item.id"
            @click="onsearchBytagfilter(item.Instruments)"
            class="tag-item">
                <img
                    class="course-item-main-list-flex"
                    id="tag"
                    :src="require(`../assets/Instrument_assets/topgainer.png`)"
                    alt="courses"
                />
                <section class="tag-name">{{item.name}}</section>
            </div>
        </div>
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    name: '',
    components: {
        Fragment
    },
    props:{
        taglists: {
			type: Array,
			required: false
        }
    },
    methods:{
         ...mapActions([,'GET_INSTRUMENT_BY_TAGS','GET_INSTRUMENT_BY_TAGS']),
         ...mapMutations(['SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS']),
        onsearchBytagfilter(response){
            const payload = {symbols:response}
             this.SET_TAGS_PAYLOAD__INSTRUMENT_BY_TAGS(response);
                this.GET_INSTRUMENT_BY_TAGS(payload).then(()=>{
                    console.log('completed clicking tag ?????',this.getInstrumentsListArray)
                })
            console.log('tag details here',response);
        },

        mounting(){
            
        }
    },
     computed:{
        ...mapGetters(['getInstrumentsListArray']),
    },
    mounted(){
        console.log('>>>>>props tag details on mount>>>>>>',this.tagdetails);
        this.mounting();
    }
};
</script>

<style src="../assets/scss/components/_tags.scss" lang="scss" scoped />
