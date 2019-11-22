import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import AOS from "aos";
import GlobalComponents from "./plugins/globalComponents";
import "aos/dist/aos.css";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

Vue.config.productionTip = false;

Vue.use(GlobalComponents);

new Vue({
  router,
  store,
  created() {
    AOS.init({
      duration: 500,
      delay: 100,
      easing: 'ease-in-out',
      mirror: false,
      startEvent: 'DOMContentLoaded',
      anchorPlacement: 'top-center',
      // once: true,
      offset: 50,
    });
  },
  render: h => h(App),
}).$mount('#app');
