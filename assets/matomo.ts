import {isDebug} from "./utils"

declare global {
    interface Window {
        _paq: paq
        __PRERENDER_INJECTED: boolean
    }
}

declare type paq = [[string, unknown, unknown, unknown] | [string, unknown, unknown] | [string, unknown] | [string]]


export function initMatomo(): void {
    if (isDebug) {
        return
    }
    const _paq = window._paq || [] as unknown as paq
    _paq.push(['setRequestMethod', 'POST'])
    _paq.push(['enableHeartBeatTimer'])

    _paq.push(["setDoNotTrack", true])
    _paq.push(['disableCookies'])
    const matomoURL = "https://matomo.lw1.at/statistics"
    _paq.push(['setTrackerUrl', matomoURL + ".php"])
    _paq.push(['setSiteId', 14])
    const script = document.createElement('script')
    const firstScript = document.getElementsByTagName('script')[0]
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = matomoURL + ".js"
    if (firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript)
    }
    window._paq = _paq
}

