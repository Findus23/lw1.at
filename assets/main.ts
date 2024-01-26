import {initFeedback} from "./feedback";
import {initSearch} from "./search";
import {initMatomo} from "./matomo";
import {initThumbhash} from "./thumbhash";

initThumbhash()
initFeedback()
initSearch()
initMatomo()

const articleEl = document.querySelector("article")
if (articleEl && articleEl.id.includes("rainbowroad")) {
    import("./leafs").then((module) => {
        module.addLeaf()
    })
}
