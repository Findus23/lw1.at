import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../Hello.vue'
import ItemModal from '../ItemModal.vue'
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello,
            children: [
                {path: ':id', component: ItemModal, name: 'itemModal'}
            ]
        }
    ]
})
