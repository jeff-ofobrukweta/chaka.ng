<template>
    <Fragment>
        <Navbar />
        <main role="main">
            <section class="container">
                <router-view />
            </section>
        </main>
    </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import Navbar from "../components/Navbar";

export default {
    name: "dashboard-layout",
    components: {
        Navbar,
        Fragment
    }
};
</script>
