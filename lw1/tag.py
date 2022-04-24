from dataclasses import dataclass

from slugify import slugify

from lw1.types import Language


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

    def slug_in_lang(self,lang:Language):
        return slugify(self.name_in_lang(lang))
