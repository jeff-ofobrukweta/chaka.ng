import Vue from "vue";
import AOS from "aos";
import App from "./App";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import GlobalComponents from "./plugins/globalComponents";
import "aos/dist/aos.css";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import filters from "./filters";

Vue.config.productionTip = false;

// Vue Global Components Plugin
Vue.use(GlobalComponents);

// Vue filters
Vue.filter("truncate", filters.truncate);
Vue.filter("kobo", filters.kobo);
Vue.filter("currency", filters.currency);
Vue.filter("date", filters.resolveDate);
Vue.filter("units", filters.units);

new Vue({
    router,
    store,
    created() {
        AOS.init({
            duration: 400,
            delay: 100,
            easing: "ease-in-out",
            mirror: false,
            startEvent: "DOMContentLoaded",
            anchorPlacement: "top-center",
            // once: true,
            offset: 50
        });
    },
    render: h => h(App)
}).$mount("#app");
