export function initSearch() {
    const searchWrapper = document.getElementById("search") as HTMLInputElement
    const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(".card")
    if (searchWrapper) {
        searchWrapper.addEventListener("input", () => {
            const query = searchWrapper.value.toLowerCase()
            cards.forEach((card: HTMLDivElement) => {
                const title = card.dataset["title"]
                if (!title) {
                    return
                }
                card.style.display = title.includes(query) ? "block" : "none"
            })
        })
    }
}
