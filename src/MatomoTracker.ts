export default class MatomoTracker {
    init(): void {
        if (!window.__PRERENDER_INJECTED) { // should only occur with hot reloading
            const _paq = window._paq || [];
            _paq.push(['setRequestMethod', 'POST']);
            _paq.push(['enableHeartBeatTimer']);

            if (process.env.NODE_ENV === "production") {
                _paq.push(["setDoNotTrack", true]);
            }
            _paq.push(['disableCookies']);
            (function () {
                const u = (process.env.NODE_ENV === "production") ? "https://matomo.lw1.at/" : "//localhost/piwik/";
                _paq.push(['setTrackerUrl', u + ((process.env.NODE_ENV === "production") ? 'statistics.php' : 'piwik.php')]);
                _paq.push(['setSiteId', (process.env.NODE_ENV === "production") ? 14 : 5]);
                const d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                g.type = 'text/javascript';
                g.async = true;
                g.defer = true;
                g.src = u + ((process.env.NODE_ENV === "production") ? 'statistics.js' : 'piwik.js');
                if (s.parentNode) {
                    s.parentNode.insertBefore(g, s);
                }
            })();
            window._paq = _paq;
        } else {
            console.info("Piwik already initialized");
        }
    }
}

declare global {
    interface Window {
        _paq: paq;
        __PRERENDER_INJECTED: boolean
    }
}

declare type paq = [[unknown, unknown, unknown, unknown] | [unknown, unknown, unknown] | [unknown, unknown] | [unknown]]
