<template>
    <div class="mobile-container">
        <section class="section1">
             <img class="course-item-main-list-flex"
                id="watch-icon"
                :src='require(`../../assets/Instrument_assets/watch.png`)' alt="watch"/>
            <div class="container-company">
             <img class="company"
                id="country"
                :src='require(`../../assets/Instrument_assets/SPOTIFY.svg`)' alt="watch"/>
                <section class="info">
                    <h1 class="topic">Spotify</h1>
                    <h1 class="sub-topic">2 shares</h1>
                </section>
            </div>
        </section>
        <section class="section2">
            <div class="buy">+ Buy</div>
             <div class="level">
                    <img class="direct"
                    id="direct"
                    :src='require(`../../assets/Instrument_assets/up.png`)' alt="watch"/>
                    <span>+1,23 (2,14%)</span>
             </div>
            <aside class="section2--footer">
                <div class="price">₦10,353</div>
                <img class="country"
                id="country"
                :src='require(`../../assets/Instrument_assets/united-states.png`)' alt="watch"/>
            </aside>
        </section>
    </div>
</template>
<script>
export default {

};
</script>
<style src="../../assets/scss/components/_mobilestocks.scss" lang="scss" scoped/>
