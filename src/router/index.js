import Vue from 'vue';
import Router from 'vue-router';
import Overview from '../Overview.vue';
import ItemModal from '../ItemModal.vue';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: function() {
                if (navigator.language.toLowerCase().includes("de")) {
                    return "de";
                } else if (navigator.language.toLowerCase().includes("en")) {
                    return "en";
                }
                return "en";
            }
        },
        {
            path: '/:language/',
            name: 'Overview',
            component: Overview,
            props: true,
            children: [
                {path: '/:language/:id', component: ItemModal, name: 'itemModal'}
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