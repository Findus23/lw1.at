import Vue from 'vue';
import Overview from '../Overview.vue';
import ItemModal from '../ItemModal.vue';
import Router from 'vue-router';

const Imprint = () => import(/* webpackChunkName: "imprint" */ '../Imprint.vue');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (to.name === "itemModal" || from.name === "itemModal") {
            return;
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    },
    routes: [
        {
            path: '/',
            redirect: function () {
                if (navigator.language.toLowerCase().includes("de")) {
                    return "de";
                } else if (navigator.language.toLowerCase().includes("en")) {
                    return "en";
                }
                return "en";
            }
        },
        {
            path: '/i/',
            redirect: function () {
                if (navigator.language.toLowerCase().includes("de")) {
                    return "de/impressum";
                } else if (navigator.language.toLowerCase().includes("en")) {
                    return "en/imprint";
                }
                return "en/imprint";
            }
        },
        {
            path: '/de/impressum',
            name: 'Impressum',
            component: Imprint,
            props: {
                language: "de"
            }
        },
        {
            path: '/en/imprint',
            name: 'Imprint',
            component: Imprint,
            props: {
                language: "en"
            }
        },
        {
            path: '/:language',
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
const _paq = window._paq || []; 
router.afterEach((to, from) => {
    if (from.name === "itemModal" && to.name === "Overview") {
        document.title = "Lukas Winkler - lw1.at";
        setTimeout(function () { // delay before making background scrollable again
            document.body.style.overflow = "";
        }, 300);
    }
    _paq.push(['setCustomUrl', to.fullPath]);
    if (from.matched.length !== 0 && from.fullPath !== "/") {
        _paq.push(['setReferrerUrl', from.fullPath]);
    }
    _paq.push(['setGenerationTimeMs', 0]);
    if (to.name === "Overview") {
        document.title = "Lukas Winkler - lw1.at";
        _paq.push(['setDocumentTitle', document.title]);
        _paq.push(['trackPageView']);
    } else if (to.name === "Imprint") {
        document.title = "Imprint - lw1.at";
        _paq.push(['setDocumentTitle', document.title]);
        _paq.push(['trackPageView']);
    } else if (to.name === "Impressum") {
        document.title = "Impressum - lw1.at";
        _paq.push(['setDocumentTitle', document.title]);
        _paq.push(['trackPageView']);
    }
    _paq.push(['enableLinkTracking']);

});
export default router;
