import Vue from "vue";
import App from "./App";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import GlobalComponents from "./plugins/globalComponents";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import filters from "./filters";
import Toaster from "vue-toasted";

import VueAxios from "vue-axios";
import VueAuthenticate from "vue-authenticate";
import axios from "axios";

Vue.config.productionTip = false;

const toasterOptions = {
    duration: 4000,
    keepOnHover: true,
    action: {
        text: "X",
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
    },
    type: "info"
};

// Vue Global Components Plugin
Vue.use(GlobalComponents);
Vue.use(Toaster, toasterOptions);

// Vue Global Mixins

Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
    baseUrl: "http://localhost:8080", // Your API domain
    providers: {
        facebook: {
            clientId: "724818008039885", //your Facebook App ID e.g. 12345667890
            url: 'http://localhost:8080/auth/facebook',
            authorizationEndpoint: "https://www.facebook.com/v5.0/dialog/oauth",
            redirectUri:"http://localhost:8080/auth/google/callback", // Your client app URL
            responseType: "token",
            requiredUrlParams: ["scope"],
            optionalUrlParams: ["display"],
            scope: ["public_profile","email"],
            scopeDelimiter: ",",
            display: "popup",
            oauthType: "2.0",
            popupOptions: { width: 452, height: 633 }
        },
        google: {
            clientId: "769520289802-7090leoee2v0ia47ekpjagh0o7jiultm.apps.googleusercontent.com", //your Facebook App ID e.g. 12345667890
            url: 'http://localhost:8080/auth/google',
            redirectUri: "http://localhost:8080/auth/google/callback", // Your client app URL
            responseType: "token",
            requiredUrlParams: ["scope"],
            scope: ["profile", "email"],
            scopePrefix: "openid",
            scopeDelimiter: " ",
            display: "popup",
            oauthType: "2.0",
            popupOptions: { width: 452, height: 633 },
            authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth"
        },
        twitter: {
            clientId: "K5Y6eGGIG3Zuj4yPCR05Veh50", //your Facebook App ID e.g. 12345667890
            redirectUri: "https://test-api.chaka.io/auth/twitter/callback", // Your client app URL
            responseType: "token",
            oauthType: '1.0',
            authorizationEndpoint: "https://api.twitter.com/oauth/authenticate"
        },
        linkedin: {
            clientId: "774vno6jt44oxb", //your Facebook App ID e.g. 12345667890
            clientSecret: "lE0STGyjYn2qUzvk",
            redirectUri: "http://localhost:8080/auth/linkedin/callback", // Your client app URL
            responseType: "code",
            authorizationEndpoint: "https://www.linkedin.com/oauth/v2/authorization",
            requiredUrlParams: ["state"],
            scope: ["r_emailaddress", "r_liteprofile"],
            scopeDelimiter: " ",
            state: "DCEeFWf45A53sdfKef424774vno6jt44oxb",
            oauthType: "2.0",
            popupOptions: { width: 527, height: 582 }
        }
    }
});

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
    render: h => h(App)
}).$mount("#app");
