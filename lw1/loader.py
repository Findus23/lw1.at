import json
from itertools import permutations

import yaml
from yaml import CSafeLoader

from lw1.file import Image
from lw1.paths import content_dir, output_dir
from lw1.post import Post
from lw1.settings import LANGUAGES, FALLBACK_LANGUAGES
from lw1.tag import Tag
from lw1.utils import Language


class PostLoader():
    @staticmethod
    def load_posts() -> list[Post]:
        posts = []
        for post_dir in content_dir.glob("*"):
            if not post_dir.is_dir():
                continue
            with (post_dir / "meta.yaml").open() as f:
                all_meta = yaml.safe_load(f)
            content_img = Image.from_dir(post_dir)
            thumbnail_img = Image.from_dir(post_dir, type="thumbnail")
            lang: Language
            for lang in LANGUAGES:
                if lang not in all_meta:
                    all_meta[lang] = {}
                try:
                    all_meta[lang]["markdown"] = (post_dir / f"{lang}.md").read_text()
                except FileNotFoundError:
                    continue
            postgroup: list[Post] = []
            for lang in LANGUAGES:
                fallback_lang = FALLBACK_LANGUAGES[lang]
                data = all_meta | all_meta[fallback_lang] | all_meta[lang]
                del data["de"]
                del data["en"]
                data["lang"] = lang
                data["content_img"] = content_img
                data["thumbnail_img"] = thumbnail_img
                post = Post.from_meta(data)
                postgroup.append(post)
                posts.append(post)
            a: Post
            b: Post
            for a, b in permutations(postgroup, 2):
                a.other_lang_post = b
                b.other_lang_post = a
        posts.sort(key=lambda p: p.date, reverse=True)
        # exit()
        return posts


class TagsLoader():
    @staticmethod
    def load_tags() -> dict[str, Tag]:
        tags = {}
        with (content_dir / "tags.yaml").open() as f:
            tag_data = yaml.load(f, Loader=CSafeLoader)
        for id, data in tag_data.items():
            hidden = False
            if "hidden" in data:
                hidden = data["hidden"]
            name = data["name"]
            if isinstance(name, str):
                tag = Tag(id=id, name_de=name, name_en=name, hidden=hidden)
            else:
                tag = Tag(id=id, name_en=name["en"], name_de=name["de"], hidden=hidden)
            tags[id] = tag
        return tags


class AssetsLoader():
    @staticmethod
    def load_entrypoints(debug=False) -> dict[str, str]:
        if debug:
            return {
                "assets/main.ts": "assets/main.js",
                "assets/redirector.ts": "assets/redirector.js",
                "assets/scss/main.scss": "assets/main.css",
                "assets/katex.css": "assets/katex.css"
            }
        with (output_dir / "assets" / "meta.json").open() as f:
            meta = json.load(f)
        entrypoints = {}
        for outputfile, data in meta["outputs"].items():
            if "entryPoint" not in data:
                continue
            entrypoints[data["entryPoint"]] = outputfile.replace("public/", "")
        return entrypoints
