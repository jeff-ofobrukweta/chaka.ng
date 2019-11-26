<template>
    <Fragment>
        <div class="card-container">
            <section class="section1">
                <img class="course-item-main-list-flex"
                    id="company"
                    :src='require(`../../assets/Instrument_assets/companylogo.png`)' alt="courses"/>
                <img class="course-item-main-list-flex"
                    id="watch-icon"
                    :src='require(`../../assets/Instrument_assets/watch.png`)' alt="watch"/>
                <div class="symbol">NFLT</div>
            </section>
            <section class="section2">
                <div class="price">₦1.3452</div>
                <div class="level">
                    <img class="direct"
                    id="direct"
                    :src='require(`../../assets/Instrument_assets/up.png`)' alt="watch"/>
                    <span>+1,23 (2,14%)</span></div>
                 <img class="country"
                    id="country"
                    :src='require(`../../assets/Instrument_assets/united-states.png`)' alt="watch"/>
            </section>
            <section class="section3">
                Buy
            </section>
        </div>
    </Fragment>
</template>
<script>
import { Fragment } from 'vue-fragment';

export default {
    name: 'Instrumentdesk',
    components: {
        Fragment
    }
};
</script>

<style src="../../assets/scss/components/_desktopstocks.scss" lang="scss" scoped/>
