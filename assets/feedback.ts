export function initFeedback() {
    const feedbackButton = document.getElementById("readmore")
    const feedbackDiv = document.getElementById("sentReadmore")
    if (feedbackButton) {
        feedbackButton.addEventListener("click", ev => {
            const id = feedbackButton.dataset.id
            // @ts-ignore
            if (typeof window._paq != "undefined") {
                // @ts-ignore
                window._paq.push(['trackEvent', 'Feedback', 'readmore', id]);
            } else {
                console.info("Feedback not sent as Matomo isn't loaded");
            }
            feedbackDiv.style.display = "block"
        })
    }
}
