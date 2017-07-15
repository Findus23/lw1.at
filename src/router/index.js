import Vue from 'vue'
import Router from 'vue-router'
import Overview from '../Overview.vue'
import ItemModal from '../ItemModal.vue'
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Overview',
            component: Overview,
            children: [
                {path: ':id', component: ItemModal, name: 'itemModal'}
            ]
        }
    ]
})
