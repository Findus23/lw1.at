import Vue from 'vue';
import VueHead from 'vue-head';
import App from './App.vue';
import router from './router/routes';
import PiwikTracker from './PiwikTracker';

Vue.use(VueHead);

let piwik = new PiwikTracker;
piwik.init();

let app = new Vue({
    el: '#app',
    router,
    render: h => h(App),
    comments: true
});