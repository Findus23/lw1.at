export function initSearch() {
    const searchWrapper = document.getElementById("search") as HTMLInputElement
    const cards = document.querySelectorAll(".card")
    if (searchWrapper) {
        searchWrapper.addEventListener("input", ev => {
            const query = searchWrapper.value.toLowerCase()
            cards.forEach((card: HTMLDivElement) => {
                const title = card.dataset.title
                card.style.display = title.includes(query) ? "block" : "none"
            })
        })
    }
}
