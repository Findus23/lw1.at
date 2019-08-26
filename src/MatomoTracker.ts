export default class MatomoTracker {
    init() {
        if (typeof _paq === 'undefined' && !window.__PRERENDER_INJECTED) { // should only occur with hot reloading
            let _paq = _paq || [];
            _paq.push(['setRequestMethod', 'POST']);
            _paq.push(['enableHeartBeatTimer']);
            _paq.push(['HeatmapSessionRecording::disableAutoDetectNewPageView']);
            if (process.env.NODE_ENV === "production") {
                _paq.push(["setDoNotTrack", true]);
            }
            (function() {
                let u = (process.env.NODE_ENV === "production") ? "https://matomo.lw1.at/" : "//localhost/piwik/";
                _paq.push(['setTrackerUrl', u + ((process.env.NODE_ENV === "production") ? 'statistics.php' : 'piwik.php')]);
                _paq.push(['setSiteId', (process.env.NODE_ENV === "production") ? 14 : 5]);
                let d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                g.type = 'text/javascript';
                g.async = true;
                g.defer = true;
                g.src = u + ((process.env.NODE_ENV === "production") ? 'statistics.js' : 'piwik.js');
                s.parentNode.insertBefore(g, s);
            })();
            window._paq = _paq;
        } else {
            console.info("Piwik already initialized");
        }
    }
}
