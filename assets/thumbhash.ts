import {thumbHashToRGBA} from "thumbhash";


function base64ToBinary(base64: string) {
    return new Uint8Array(atob(base64).split('').map(x => x.charCodeAt(0)))
}

function drawThumbhash(canvasEl: HTMLCanvasElement) {
    const hash = canvasEl.getAttribute("data-thumbhash")
    if (!hash) {
        return
    }
    const hashBin = base64ToBinary(hash)

    const image = thumbHashToRGBA(hashBin)

    const ctx = canvasEl.getContext("2d")!;
    const imageData = new ImageData(new Uint8ClampedArray(image.rgba), image.w, image.h);
    ctx.putImageData(imageData, 0, 0);
    ctx.drawImage(canvasEl, 0, 0);
}


export function initThumbhash() {
    const canvasList: HTMLCanvasElement[] = Array.from(document.querySelectorAll("canvas[data-thumbhash]"))
    canvasList.slice(0, 5)
        .forEach(drawThumbhash)

    function loadRemaining() {
        canvasList.slice(5)
            .forEach(drawThumbhash)

    }

    if (canvasList.length > 5) {
        if (document.readyState !== "loading") {
            loadRemaining()
        } else {
            document.addEventListener("DOMContentLoaded", loadRemaining)
        }
    }
}
