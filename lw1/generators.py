from pathlib import Path
from typing import List, Dict

from babel.support import Translations
from jinja2 import Environment, FileSystemLoader, select_autoescape, StrictUndefined, FileSystemBytecodeCache

from lw1.paths import templates_dir, cache_dir
from lw1.post import Post
from lw1.settings import FALLBACK_LANGUAGES
from lw1.tag import Tag
from lw1.types import Language
from lw1.writer import Writer

env = Environment(
    loader=FileSystemLoader(templates_dir),
    autoescape=select_autoescape(),
    undefined=StrictUndefined,
    bytecode_cache=FileSystemBytecodeCache(directory=cache_dir),
    extensions=['jinja2.ext.i18n']
)


class Generator:
    template_name = "base.html"
    js_entry_point = "assets/main.ts"
    type = ""

    def __init__(self, translations: Translations, context: Dict, posts: List[Post], tags: Dict[str, Tag],
                 lang: Language, ):
        self.posts = posts
        self.tags = tags
        self.lang = lang
        self.context = context.copy()
        self.context["js_entry_point"] = self.js_entry_point
        self.context["type"] = self.type
        self.translations = translations
        env.install_gettext_translations(translations)

        self.template = env.get_template(self.template_name)


class PostsGenerator(Generator):
    template_name = "page.html"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def url(self, post: Post) -> Path:
        print(post.title)
        return Path("") / self.lang / post.slug

    def generate(self, writer: Writer) -> None:
        for post in self.posts:
            if post.lang != self.lang:
                continue
            for image in {post.content_img, post.thumbnail_img}:
                writer.writeImage((Path("") / "img" / post.id), image)
            self.context["post"] = post
            self.context["otherlang_url"] = post.other_lang_post.absolute_url
            html = self.template.render(**self.context)
            url = self.url(post)
            writer.write(url, html)


class HomepageGenerator(Generator):
    template_name = "home.html"
    type = "home"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def generate(self, writer: Writer) -> None:
        other_lang = FALLBACK_LANGUAGES[self.lang]
        self.context["tags"] = self.tags
        self.context["current"] = "all"
        self.context["posts"] = [p for p in self.posts if p.lang == self.lang]
        self.context["otherlang_url"] = Path("/") / other_lang
        html = self.template.render(**self.context)
        url = Path("") / self.lang
        writer.write(url, html)
        for tag in self.tags.values():
            self.context["current"] = tag.id

            if tag.hidden:
                continue
            self.context["posts"] = [p for p in self.posts if p.lang == self.lang and tag.id in p.tags]
            url = Path("") / self.lang / "t" / tag.slug_in_lang(self.lang)
            self.context["otherlang_url"] = Path("/") / other_lang / "t" / tag.slug_in_lang(other_lang)
            html = self.template.render(**self.context)

            writer.write(url, html)


class ImprintGenerator(Generator):
    template_name = "imprint.html"

    slugs = {
        "de": "impressum",
        "en": "imprint"
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def generate(self, writer: Writer) -> None:
        fb_lang = FALLBACK_LANGUAGES[self.lang]
        self.context["otherlang_url"] = Path("/") / fb_lang / self.slugs[fb_lang]
        html = self.template.render(**self.context)
        url = Path("") / self.lang / self.slugs[self.lang]
        writer.write(url, html)


class LangRedirectGenerator(Generator):
    template_name = "langpick.html"
    js_entry_point = "assets/redirector.ts"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def generate(self, writer: Writer) -> None:
        html = self.template.render(**self.context)
        root = Path("")
        for url in [root, root / "i"]:
            writer.write(url, html)
