from pathlib import Path

basedir = Path(__file__).parent.parent

templates_dir = basedir / "templates"
content_dir = basedir / "content"
output_dir = basedir / "public"
post_img_dir = output_dir / "img"
cache_dir = basedir / "cache"
cache_file = cache_dir / "cache.yaml"
