import Vue from 'vue';
import Router from 'vue-router';
import Overview from '../Overview.vue';
import ItemModal from '../ItemModal.vue';
import Imprint from '../Imprint.vue';

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
            path: '/i/',
            redirect: function() {
                if (navigator.language.toLowerCase().includes("de")) {
                    return "de/impressum";
                } else if (navigator.language.toLowerCase().includes("en")) {
                    return "en/imprint";
                }
                return "en";
            }
        },
        {
            path: '/de/impressum',
            name: 'Impressum',
            component:Imprint,
            props: {
                language: "de"
            }
        },
        {
            path: '/en/imprint',
            name: 'Imprint',
            component:Imprint,
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

router.afterEach((to, from) => {
    if (from.name === "itemModal" && to.name === "Overview") {
        document.title = "Lukas Winkler - lw1.at";
        setTimeout(function() { // delay before making background scrollable again
            document.body.style.overflow = "";
        }, 300);
    }
    _paq.push(['setCustomUrl', to.path]);
    _paq.push(['setReferrerUrl', from.path]);
    _paq.push(['setGenerationTimeMs', 0]);
    if (to.name!=="itemModal") {
        _paq.push(['setDocumentTitle', document.title]);
        _paq.push(['trackPageView']);
    }
    _paq.push(['enableLinkTracking']);

});
export default router;