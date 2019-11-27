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

export default {
    name: "dashboard-layout",
    components: {
        Navbar,
        KYC,
        Fragment
    },
    mounted() {
        document.title = "Chaka - Dashboard";
    }
};
</script>
