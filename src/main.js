import Vue from "vue";
import AOS from "aos";
import App from "./App";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import GlobalComponents from "./plugins/globalComponents";
import formMixin from "./services/mixins/form";
import "aos/dist/aos.css";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import filters from "./filters";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

// Vue Global Components Plugin
Vue.use(GlobalComponents);
Vue.use(Vuelidate);

// Vue Global Mixins
Vue.mixin(formMixin);

// Vue filters
Vue.filter("truncate", filters.truncate);
Vue.filter("kobo", filters.kobo);
Vue.filter("currency", filters.currency);
Vue.filter("date", filters.resolveDate);
Vue.filter("units", filters.units);
Vue.filter("reverseDate", filters.reverseDate);

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
