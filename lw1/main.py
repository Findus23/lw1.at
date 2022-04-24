from time import perf_counter_ns

from babel.support import Translations

from lw1.generators import PostsGenerator, HomepageGenerator, ImprintGenerator, LangRedirectGenerator
from lw1.loader import PostLoader, TagsLoader, AssetsLoader
from lw1.settings import LANGUAGES
from lw1.writer import Writer


def main(debug=False):
    start = perf_counter_ns()
    posts = PostLoader.load_posts()
    tags = TagsLoader.load_tags()
    entrypoints = AssetsLoader.load_entrypoints(debug=debug)
    context = {"debug": debug, "entrypoints": entrypoints}
    writer = Writer()
    for lang in LANGUAGES:
        translations: Translations = Translations.load("../translations", [lang])
        context["lang"] = lang
        generators = [
            PostsGenerator,
            HomepageGenerator,
            ImprintGenerator,
            LangRedirectGenerator
        ]
        for cls in generators:
            g = cls(posts=posts, tags=tags, lang=lang, context=context, translations=translations)
            g.generate(writer)
    end = perf_counter_ns()
    print(f"{(end - start) / 1000 / 1000:.2f} ms")


if __name__ == '__main__':
    main(debug=False)
