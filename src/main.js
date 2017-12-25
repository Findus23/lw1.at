import Vue from 'vue';
import router from './router';
import VueHead from 'vue-head';

import App from './App.vue';

import PiwikTracker from './PiwikTracker';

Vue.use(VueHead);

let piwik = new PiwikTracker;
piwik.init();

let app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    methods: {
        gotoOverview(e) {
            this.$router.back();

        }
    }
});