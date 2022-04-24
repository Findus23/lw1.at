from dataclasses import dataclass

from lw1.types import Language
from lw1.utils import custom_slugify


@dataclass
class Tag:
    id: str
    name_de: str
    name_en: str
    hidden: bool = False

    def name_in_lang(self, lang: Language):
        if lang == "de":
            return self.name_de
        else:
            return self.name_en

    def slug_in_lang(self, lang: Language):
        return custom_slugify(self.name_in_lang(lang))
