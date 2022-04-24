import {decode} from "blurhash";
import {initFeedback} from "./feedback";
import {initSearch} from "./search";

const width = 32;
const height = width / 2;

function drawBlurhash(canvasEl: HTMLCanvasElement) {
    const hash = canvasEl.getAttribute("data-blurhash")

    const pixels = decode(hash, width, height);

    const ctx = canvasEl.getContext("2d");
    const imageData = new ImageData(pixels, width, height);
    // ctx.scale(10, 10);
    ctx.putImageData(imageData, 0, 0);
    ctx.drawImage(canvasEl, 0, 0);

}


const canvasList = Array.from(document.querySelectorAll("canvas[data-blurhash]"))
canvasList.slice(0, 5)
    .forEach(drawBlurhash)

function loadRemaining() {
    canvasList.slice(5)
        .forEach(drawBlurhash)

}

if (canvasList.length > 5) {
    if (document.readyState !== "loading") {
        loadRemaining()
    } else {
        document.addEventListener("DOMContentLoaded", loadRemaining)
    }
}

initFeedback()
initSearch()
