export function defaultLanguage(): string {
    const lang = navigator.language.toLowerCase()
    if (lang.includes("de")) {
        return "de"
    }
    return "en"
}

export function redirect(): void {
    const l = window.location
    const imprintName = {"de": "impressum", "en": "imprint"}

    const currentPath = l.pathname
    const lang = defaultLanguage()
    if (currentPath.startsWith("/i")) {
        l.replace("/" + lang + "/" + imprintName[lang] + "/")
        return

    }
    l.replace("/" + defaultLanguage() + l.pathname)
}

redirect()
