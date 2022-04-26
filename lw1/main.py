from time import perf_counter_ns

from babel.support import Translations

from lw1.compression import compress_files
from lw1.generators import PostsGenerator, HomepageGenerator, ImprintGenerator, LangRedirectGenerator, \
    NotFoundGenerator, PermissionDeniedGenerator, ServerErrorGenerator
from lw1.loader import PostLoader, TagsLoader, AssetsLoader
from lw1.paths import output_dir, translations_dir
from lw1.settings import LANGUAGES
from lw1.sitemap import Sitemap
from lw1.writer import Writer


def main(debug=False):
    sitemap = Sitemap()
    start = perf_counter_ns()
    posts = PostLoader.load_posts()
    tags = TagsLoader.load_tags()
    entrypoints = AssetsLoader.load_entrypoints(debug=debug)
    context = {"debug": debug, "entrypoints": entrypoints}
    writer = Writer()
    for lang in LANGUAGES:
        translations: Translations = Translations.load(translations_dir, [lang])
        context["lang"] = lang
        generators = [
            PostsGenerator,
            HomepageGenerator,
            ImprintGenerator,
            LangRedirectGenerator,
            NotFoundGenerator,
            PermissionDeniedGenerator,
            ServerErrorGenerator
        ]
        for cls in generators:
            g = cls(
                posts=posts, tags=tags,
                lang=lang, context=context,
                translations=translations,
                sitemap=sitemap
            )
            g.generate(writer)
    sitemap.dump(output_dir / "sitemap.xml")
    end = perf_counter_ns()
    if not debug:
        compress_files()
    print(f"{(end - start) / 1000 / 1000:.2f} ms")


if __name__ == '__main__':
    main(debug=False)
