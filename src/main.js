import Vue from 'vue'
import router from './router'
import App from './App.vue'
import vmodal from 'vue-js-modal'
Vue.use(vmodal);

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});


