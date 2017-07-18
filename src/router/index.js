import Vue from 'vue'
import Router from 'vue-router'
import Overview from '../Overview.vue'
import ItemModal from '../ItemModal.vue'

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Overview',
            component: Overview,
            children: [
                {path: ':id', component: ItemModal, name: 'itemModal'}
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

router.afterEach((to, from) => {
    if (from.name === "itemModal" && to.name === "Overview") {
        setTimeout(function() { // delay before making background scrollable again
            document.body.style.overflow = "";
            document.title = "lw1.at";
        }, 300);
    }
});
export default router;