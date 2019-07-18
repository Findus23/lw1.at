import Vue from 'vue';
import VueHead from 'vue-head';
import App from './App.vue';
import router from './router/routes';
import MatomoTracker from './MatomoTracker';
const hljs = require('./highlightjs.scss');
const style = require('./global_styles.scss');

const Raven = require("raven-js");
const RavenVue = require("raven-js/plugins/vue");
Raven
    .config('https://ecdf31be6a0748488b07147a5e864a47@sentry.lw1.at/10')
    .addPlugin(RavenVue)
    .install();

Vue.use(VueHead);

let matomo = new MatomoTracker;
matomo.init();

if ((typeof [].find) !== "undefined") { // only start vue if the browser supports modern Javascript
    let app = new Vue({
        el: '#app',
        router,
        render: h => h(App),
        comments: true
    });
}

console.info("Hi, it looks like you are interested in how this website works...");
console.info("The license of open source libraries used can be found at https://lw1.at/licenses.txt");
console.info("The whole website is Open Source, so you can find the source here: https://github.com/Findus23/lw1.at");
