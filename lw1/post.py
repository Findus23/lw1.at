from __future__ import annotations

from dataclasses import dataclass
from functools import cached_property
from typing import Dict, List

from slugify import slugify

from lw1.file import Image
from lw1.tomarkdown import markdown2html
from lw1.types import Language


@dataclass
class License:
    id: str
    url: str


@dataclass
class iFrame:
    url: str
    allowfullscreen: bool
    sandbox: str
    color: str


@dataclass
class Post:
    id: str
    title: str
    tags: List[str]
    date: str
    markdown: str
    content_img: Image
    thumbnail_img: Image
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
    def from_meta(cls, meta: Dict):
        if "license" in meta:
            meta["license"] = License(**meta["license"])
        if "iFrame" in meta:
            meta["iFrame"] = iFrame(**meta["iFrame"])
        return cls(**meta)

    @cached_property
    def slug(self) -> str:
        if self.id:
            return self.id
        return slugify(self.title)

    @property
    def githuburl(self) -> str:
        return "https://github.com/" + self.github

    @property
    def html(self) -> str:
        return markdown2html(self.markdown)

    @property
    def absolute_url(self):
        return f"/{self.lang}/{self.slug}/"

    def __str__(self):
        return f"Post({self.id}, {self.lang})"

    @property
    def contains_math(self):
        return "$`" in self.markdown or "```math" in self.markdown
