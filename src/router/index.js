import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    base: process.env.BASE_URL,
    linkExactActiveClass: "active",
    routes
});

router.beforeEach((to, from, next) => {
    store.commit("RESET_REQ");
    next();
});

router.afterEach((to, from) => {
    if (localStorage.getItem("AUTH_TOKEN")) {
        store.dispatch("GET_NEXT_KYC");
    }
    store.commit("SET_SHOW_NAVBAR_KYC", true);
});

export default router;
