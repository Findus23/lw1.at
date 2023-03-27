import {initFeedback} from "./feedback";
import {initSearch} from "./search";
import {initMatomo} from "./matomo";
import {initBlurhash} from "./blurhash";

initBlurhash()
initFeedback()
initSearch()
initMatomo()

const articleEl = document.querySelector("article")
if (articleEl && articleEl.id.includes("rainbowroad")) {
    console.log("bla")
    import("./leafs").then((module) => {
        module.addLeaf()
    })
}
