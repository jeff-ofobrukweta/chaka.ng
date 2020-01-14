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
    store.commit("RESET_MODALS");
    store.commit("RESET_COMPONENT_LOADER",true);
    store.commit("SEARCH_OPENED", false);
    next();
});

router.afterEach((to, from) => {
    store.commit("RESET_COMPONENT_LOADER",false);
    store.commit("SET_SHOW_NAVBAR_KYC", true);
});
router.onError(error => {
    console.log("Router Error:::", error);
    if (/loading chunk \d* failed./i.test(error.message)) {
        window.location.reload();
    }
});

export default router;
