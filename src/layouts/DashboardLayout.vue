<template>
    <Fragment>
        <Navbar />
        <main role="main">
            <transition name="kyc-navbar" v-if="showPending">
                <KYCPending />
            </transition>
            <transition name="kyc-navbar" v-else>
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
import { mapActions, mapGetters } from "vuex";

export default {
    name: "dashboard-layout",
    components: {
        Navbar: () => import("../components/Navbar"),
        KYC: () => import("../components/kyc/NavbarKYC"),
        KYCPending: () => import("../components/kyc/NavbarKYCPending"),
        Fragment
    },
    computed: {
        ...mapGetters(["showNavbarKYC", "getLoggedUser", "getNavbarNextKYC"]),
        showPending() {
            if (this.getNavbarNextKYC.status === "COMPLETE") return true;
            return false;
        }
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
