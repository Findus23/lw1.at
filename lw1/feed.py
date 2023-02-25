import json
from pathlib import Path
from xml.etree import ElementTree
from xml.etree.ElementTree import SubElement

from lw1.post import Post
from lw1.settings import DOMAIN, GENERATOR_URL


class RSSFeed:
    def __init__(self, lang: str, feed_name: str):
        self.feed_name = feed_name
        self.lang = lang
        self.root = ElementTree.Element("rss", {"version": "2.0"})
        self.feed = {
            "version": "https://jsonfeed.org/version/1.1",
            "title": "Lukas Winkler - lw1.at",
            "language": lang,
            "home_page_url": DOMAIN,
            "feed_url": DOMAIN + "/" + lang + "/" + feed_name + ".json",
            "generator": GENERATOR_URL,
            "authors": [{"name": "Lukas Winkler"}],
            "items": []
        }
        self.channel = SubElement(self.root, "channel")
        SubElement(self.channel, "title").text = self.feed["title"]
        SubElement(self.channel, "lang").text = self.feed["language"]
        SubElement(self.channel, "link").text = self.feed["home_page_url"]
        SubElement(self.channel, "generator").text = self.feed["generator"]
        SubElement(self.channel, "description").text = self.feed["title"]

    # self.root.attrib["xmlns"] = ""
    # self.root.attrib["{http://www.sitemaps.org/schemas/sitemap/0.9}xhtml"] = "http://www.w3.org/1999/xhtml"

    def dump(self, output_dir: Path):
        tree = ElementTree.ElementTree(self.root)
        ElementTree.indent(tree, space="\t", level=0)
        with (output_dir / self.lang / (self.feed_name + ".xml")).open("wb") as f:
            tree.write(f, xml_declaration=True, encoding="utf-8")
        with (output_dir / self.lang / (self.feed_name + ".json")).open("w") as f:
            json.dump(self.feed, f, indent=2)

    def add_post(self, post: Post):
        item = {
            "id": post.absolute_url_with_domain,
            "url": post.absolute_url_with_domain,
            "content_html": str(post.html),
            "title": post.title,
            "date_published": post.date.isoformat(),
            "tags": post.tags
        }
        if post.description:
            item["summary"] = post.description
        self.feed["items"].append(item)
        item_el = SubElement(self.channel, "item")
        SubElement(item_el, "title").text = item["title"]
        SubElement(item_el, "link").text = post.absolute_url_with_domain
        SubElement(item_el, "guid", {"isPermaLink": "true"}).text = post.absolute_url_with_domain
        SubElement(item_el, "pubdate").text = post.date.strftime("%a, %d %b %Y %H:%M:%S %z")
        SubElement(item_el, "description").text = item["content_html"]
        SubElement(item_el, "author").text = "Lukas Winkler"
