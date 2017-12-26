export default class PiwikTracker {
    init() {
        if (typeof _paq === 'undefined') { // should only occur with hot reloading
            let _paq = _paq || [];
            // _paq.push(["setCookieDomain", ".gattinger-wachau.at"]); //TODO: set
            _paq.push(['enableHeartBeatTimer']);
            _paq.push(['enableLinkTracking']);
            (function() {
                let u = "//localhost/piwik/";
                _paq.push(['setTrackerUrl', u + 'piwik.php']);
                _paq.push(['setSiteId', 5]);
                let d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                g.type = 'text/javascript';
                g.async = true;
                g.defer = true;
                g.src = u + 'piwik.js';
                s.parentNode.insertBefore(g, s);
            })();
            window._paq = _paq;
        } else {
            console.info("Piwik already initialized");
        }
    }
}