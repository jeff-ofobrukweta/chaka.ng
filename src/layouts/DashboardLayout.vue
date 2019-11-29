<template>
    <Fragment>
        <Navbar />
        <main role="main">
            <KYC />
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
import { mapActions } from "vuex";

export default {
    name: "dashboard-layout",
    components: {
        Navbar,
        KYC,
        Fragment
    },
    methods: {
        ...mapActions(["GET_LOGGED_USER", "GET_NEXT_KYC"])
    },
    mounted() {
        document.title = "Chaka - Dashboard";
        this.GET_LOGGED_USER().then(() => {
            this.GET_NEXT_KYC();
        });
    }
};
</script>
