import Vue from 'vue';
import VueHead from 'vue-head';
import App from './App.vue';
import router from './router/routes';
import MatomoTracker from './MatomoTracker';

Vue.use(VueHead);

let matomo = new MatomoTracker;
matomo.init();

if ((typeof [].find) !== "undefined") { // if the browser doesn't support modern IE 
    var noscript_el = document.getElementById("noscript");
    if (noscript_el) {
        noscript_el.style.display = "none";
    }
    let app = new Vue({
        el: '#app',
        router,
        render: h => h(App),
        comments: true
    });
}
