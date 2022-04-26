import {matomo} from "./matomo";

export function initFeedback() {
    const feedbackButton = document.getElementById("readmore")
    const feedbackDiv = document.getElementById("sentReadmore")!
    if (feedbackButton) {
        feedbackButton.addEventListener("click", () => {
            const id = feedbackButton.dataset["id"]
            if (matomo) {
                matomo.trackEvent('Feedback', 'readmore', id);
            } else {
                console.info("Feedback not sent as Matomo isn't loaded");
            }
            feedbackDiv.style.display = "block"
        })
    }
}
