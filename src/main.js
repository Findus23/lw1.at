import Vue from 'vue'
import router from './router'
import App from './App.vue'
// import vmodal from 'vue-js-modal'
// Vue.use(vmodal);

let app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    methods: {
        gotoOverview(e) {
            this.$router.push('/')

        }
    }
});

window.addEventListener('keydown', function(e) {
    if (e.keyCode === 27) {
        app.gotoOverview(e)
    }
});