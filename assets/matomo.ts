import {isDebug} from "./utils"
import {MatomoLiteTracker} from "matomo-lite-tracker/src/tracker"
import {PerformanceMetric} from "matomo-lite-tracker/src/performancetracking"
import {BrowserFeatures} from "matomo-lite-tracker/src/browserfeatures"
import {enableLinkTracking} from "matomo-lite-tracker/src/linktracking"
import {isDoNotTrackEnabled} from "matomo-lite-tracker/src/util"

export let matomo: MatomoLiteTracker | undefined

export function initMatomo(): void {
    if (isDebug || isDoNotTrackEnabled()) {
        return
    }
    const m = new MatomoLiteTracker("https://matomo.lw1.at", 14)
    m.performanceMetric = new PerformanceMetric()

    m.browserFeatures = new BrowserFeatures()

    enableLinkTracking(m, [])
    m.trackPageview()
    matomo = m
}

