import Vue from 'vue'
import router from './router'
import App from './App.vue'

import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/refresh'
import 'vue-awesome/icons/random'


Vue.component('icon', Icon);


let app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    methods: {
        gotoOverview(e) {
            this.$router.back()

        }
    }
});

window.addEventListener('keydown', function(e) {
    if (e.keyCode === 27) {
        app.gotoOverview(e)
    }
});