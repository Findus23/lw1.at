from time import perf_counter_ns

from babel.support import Translations

from lw1.compression import compress_files
from lw1.feed import RSSFeed
from lw1.generators import PostsGenerator, HomepageGenerator, ImprintGenerator, LangRedirectGenerator, \
    NotFoundGenerator, PermissionDeniedGenerator, ServerErrorGenerator
from lw1.loader import PostLoader, TagsLoader, AssetsLoader
from lw1.paths import output_dir, translations_dir
from lw1.settings import LANGUAGES
from lw1.sitemap import Sitemap
from lw1.writer import Writer


def main(debug=False):
    sitemap = Sitemap()
    rss_feed_de = RSSFeed(lang="de", feed_name="postfeed")
    rss_feed_en = RSSFeed(lang="en", feed_name="postfeed")
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
    for post in posts:
        if post.lang == "de":
            rss_feed_de.add_post(post)
        else:
            rss_feed_en.add_post(post)
    sitemap.dump(output_dir / "sitemap.xml")
    rss_feed_de.dump(output_dir)
    rss_feed_en.dump(output_dir)
    end = perf_counter_ns()
    if not debug:
        compress_files()
    print(f"{(end - start) / 1000 / 1000:.2f} ms")


if __name__ == '__main__':
    main(debug=False)
