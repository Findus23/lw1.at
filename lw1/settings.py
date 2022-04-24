from typing import List, Dict

from lw1.types import Language

LANGUAGES: List[Language] = ["en", "de"]

FALLBACK_LANGUAGES: Dict[Language, Language] = {
    "en": "de",
    "de": "en"
}

