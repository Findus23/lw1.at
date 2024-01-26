from lw1.utils import Language

LANGUAGES: list[Language] = ["en", "de"]

FALLBACK_LANGUAGES: dict[Language, Language] = {
    "en": "de",
    "de": "en"
}

DOMAIN = "https://lw1.at"

GENERATOR_URL = "https://github.com/Findus23/lw1.at/"
