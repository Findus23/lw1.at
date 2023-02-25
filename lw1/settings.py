from typing import List, Dict

from lw1.utils import Language

LANGUAGES: List[Language] = ["en", "de"]

FALLBACK_LANGUAGES: Dict[Language, Language] = {
    "en": "de",
    "de": "en"
}

DOMAIN = "https://lw1.at"

GENERATOR_URL = "https://github.com/Findus23/lw1.at/"
