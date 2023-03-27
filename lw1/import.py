import shutil
from pathlib import Path

import yaml
from yaml import CSafeLoader

from lw1.paths import content_dir
from lw1.settings import LANGUAGES

import_dir = Path("/home/lukas/public_html/lw1.at/src")

for article in import_dir.glob("data/*.yaml"):

    id = article.stem
    target_dir = content_dir / id
    if target_dir.exists():
        continue
    print(id)
    target_dir.mkdir(exist_ok=True)
    meta_file = target_dir / "meta.yaml"
    shutil.copy(article, meta_file)
    with meta_file.open() as f:
        meta = yaml.load(f, Loader=CSafeLoader)
    for lang in LANGUAGES:
        file = target_dir / f"{lang}.md"
        try:
            description = meta["description"][lang]
        except TypeError:
            description = meta["description"]
            file = target_dir / "??.md"
        file.write_text(description)
    content_img = import_dir / "assets" / "contentimages" / meta["image"]
    shutil.copy(content_img, (target_dir / "image").with_suffix(content_img.suffix))
    thumb_img = import_dir / "assets" / "thumbnails" / meta["image"]
    if not thumb_img.is_symlink():
        shutil.copy(thumb_img, (target_dir / "thumbnail").with_suffix(content_img.suffix))

    exit()
