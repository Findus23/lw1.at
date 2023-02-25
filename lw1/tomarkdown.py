import markdown_katex
from markdown import markdown
from markupsafe import Markup

from lw1.cache import cache
from lw1.utils import long_hash


def markdown2html(md: str) -> Markup:
    key = "md" + long_hash(md)
    cached = cache.get(key)
    if cached:
        return Markup(cached)
    html = markdown(
        md,
        extensions=[
            "codehilite",
            "fenced_code",
            markdown_katex.KatexExtension(insert_fonts_css=False),
        ]
    )
    cache.set(key, html)
    return Markup(html)

if __name__ == '__main__':
    with open("content/numba-timing/en.md") as f:
        md = f.read()
    print(markdown2html(md))
