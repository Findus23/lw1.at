import Vue from 'vue';
import router from './router';
import App from './App.vue';

import Icon from 'vue-awesome/components/Icon.vue';
import 'vue-awesome/icons/refresh';
import 'vue-awesome/icons/random';
import PiwikTracker from './PiwikTracker';

Vue.component('icon', Icon);


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