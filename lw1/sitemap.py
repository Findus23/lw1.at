from pathlib import Path
from xml.etree import ElementTree
from xml.etree.ElementTree import SubElement

from lw1.post import Post


class Sitemap:
    def __init__(self):
        ElementTree.register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")
        self.root = ElementTree.Element("{http://www.sitemaps.org/schemas/sitemap/0.9}urlset")

    def add_page(self, context: dict) -> None:
        cur_url = f"https://lw1.at{context['url']}"
        lang = context["lang"]
        otherlang_url = f"https://lw1.at{context['otherlang_url']}"
        otherlang = context["otherlang"]
        url = SubElement(self.root, "url")
        loc = SubElement(url, "loc")
        loc.text = cur_url
        xlink = SubElement(url, "{http://www.w3.org/1999/xhtml}link")
        xlink.attrib.update({
            "rel": "alternate",
            "hreflang": lang,
            "href": cur_url,
        })
        xlink = SubElement(url, "{http://www.w3.org/1999/xhtml}link")
        xlink.attrib.update({
            "rel": "alternate",
            "hreflang": otherlang,
            "href": otherlang_url,
        })

    def add_post(self, post: Post) -> None:
        url = SubElement(self.root, "url")
        loc = SubElement(url, "loc")
        loc.text = post.absolute_url_with_domain
        for p in [post, post.other_lang_post]:
            xlink = SubElement(url, "{http://www.w3.org/1999/xhtml}link")
            xlink.attrib.update({
                "rel": "alternate",
                "hreflang": p.lang,
                "href": p.absolute_url_with_domain,
            })

    def dump(self, file: Path):
        tree = ElementTree.ElementTree(self.root)
        ElementTree.indent(tree, space="\t", level=0)
        with file.open("wb") as f:
            tree.write(f, xml_declaration=True, encoding="utf-8")
