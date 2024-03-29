from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from functools import cached_property
from pathlib import Path

from babel import dates
from markupsafe import Markup

from lw1.file import Image
from lw1.settings import DOMAIN
from lw1.tomarkdown import markdown2html
from lw1.utils import custom_slugify, Language


@dataclass
class License:
    id: str
    url: str


@dataclass
class iFrame:
    url: str
    color: str
    sandbox: str = None
    allowfullscreen: bool = False


@dataclass
class Post:
    title: str
    tags: list[str]
    date: datetime
    markdown: str
    content_img: Image
    thumbnail_img: Image
    id: str = None
    description: str = None
    url: str = None
    image_separator: bool = False
    tryout: bool = False
    github: str = None
    gitlab: str = None
    subtitle: str = None
    single_language: Language = None
    license: License = None
    iframe: iFrame = None
    lang: Language = None
    other_lang_post: Post = None

    @classmethod
    def from_meta(cls, meta: dict):
        if "license" in meta:
            meta["license"] = License(**meta["license"])
        if "iframe" in meta:
            meta["iframe"] = iFrame(**meta["iframe"])
        return cls(**meta)

    @cached_property
    def slug(self) -> str:
        if self.id:
            return self.id
        return custom_slugify(self.title)

    @property
    def githuburl(self) -> str:
        return "https://github.com/" + self.github

    @property
    def html(self) -> Markup:
        return markdown2html(self.markdown)

    @property
    def absolute_url(self) -> Path:
        return Path("/") / self.lang / self.slug

    @property
    def absolute_url_with_domain(self) -> str:
        return DOMAIN + str(self.absolute_url)

    def __str__(self):
        return f"Post({self.id}, {self.lang})"

    @property
    def date_year_month(self):
        return dates.format_date(self.date, 'MMMM yyyy', locale=self.lang)

    @property
    def contains_math(self):
        return "$`" in self.markdown or "```math" in self.markdown
