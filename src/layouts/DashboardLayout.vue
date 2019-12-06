<template>
    <Fragment>
        <Navbar />
        <main role="main">
            <transition name="kyc-navbar">
                <KYC v-if="showNavbarKYC" />
            </transition>
            <section class="container">
                <router-view />
            </section>
        </main>
    </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import KYC from "../components/kyc/NavbarKYC";
import Navbar from "../components/Navbar";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "dashboard-layout",
    components: {
        Navbar,
        KYC,
        Fragment
    },
    computed: {
        ...mapGetters(["showNavbarKYC"])
    },
    methods: {
        ...mapActions(["GET_LOGGED_USER", "GET_NEXT_KYC", "GET_ACCOUNT_SUMMARY"])
    },
    mounted() {
        document.title = "Chaka - Dashboard";
        this.GET_LOGGED_USER().then(async () => {
            Promise.all([this.GET_ACCOUNT_SUMMARY(), this.GET_NEXT_KYC()]);
        });
    }
};
</script>
