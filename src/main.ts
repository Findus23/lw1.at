import Vue from 'vue';
import VueHead from 'vue-head';
import App from './App.vue';
import router from './router/routes';
import MatomoTracker from './MatomoTracker';
import './highlightjs.scss';
import './global_styles.scss';


Vue.use(VueHead);

const matomo = new MatomoTracker;
matomo.init();

if ((typeof [].find) !== "undefined") { // only start vue if the browser supports modern Javascript
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const app = new Vue({
        el: '#app',
        router,
        render: h => h(App),
        comments: true
    });
}

console.info("Hi, it looks like you are interested in how this website works...");
console.info("The license of open source libraries used can be found at https://lw1.at/licenses.txt");
console.info("The whole website is Open Source, so you can find the source here: https://github.com/Findus23/lw1.at");
