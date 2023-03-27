import shutil
from functools import cached_property
from pathlib import Path
from subprocess import run
from typing import List, Optional

from PIL import Image as PILImage
from thumbhash_python import ThumbhashEncoder

from lw1.cache import cache
from lw1.paths import cache_dir, output_dir
from lw1.utils import short_hash, hash_file


def logged_run(cmd: List[str]):
    print(cmd)
    run(cmd, check=True)


def optimize_png(file: Path) -> None:
    logged_run(["oxipng", "-o", "max", str(file)])


def replace_transparency_png(file: Path, bg_color: str) -> None:
    logged_run([
        "mogrify",
        "-background", bg_color,
        "-alpha", "remove",
        "-alpha", "off",
        str(file)
    ])


def replace_transparency_svg(file: Path, bg_color: str) -> None:
    svg = file.read_text()
    if "<!-- no-bg -->" in svg:
        return
    lineno = 1
    if "<?xml" in svg:
        lineno += 1
    lines = svg.split("\n")
    bg_svg = f"<rect width='100%' height='100%' fill='{bg_color}' />"
    lines.insert(lineno, bg_svg)
    file.write_text("\n".join(lines))


def svg2png(file: Path, outfile: Path) -> None:
    logged_run(["inkscape", "-h", "1000", str(file), "-o", str(outfile)])


def get_by_extension(file: Path) -> Path:
    for extension in [".svg", ".png", ".jpg"]:
        ext_file = file.with_suffix(extension)
        print(ext_file)
        if ext_file.exists():
            return ext_file
    raise FileNotFoundError(file)


def shorten_filename(path: Path) -> Path:
    return path.relative_to(Path(__file__).parent.parent)


def logged_copy(source: Path, target: Path):
    print(shorten_filename(source), "->", shorten_filename(target))
    shutil.copy(source, target)


def logged_move(source: Path, target: Path):
    print(shorten_filename(source), "|->", shorten_filename(target))
    shutil.move(source, target)


class File:
    def __init__(self, source_file: Path, type: Optional[Path] = None):
        self.source_file = source_file
        self.type = type
        self.public_url: Optional[str] = None
        self.target_file: Optional[str] = None

    @property
    def modtime(self) -> float:
        return self.source_file.stat().st_mtime

    @cached_property
    def hashkey(self) -> str:
        hash_data = [str(a) for a in [self.modtime, self.source_file, self.type]]
        return f"{self.source_file.parent.name}-{short_hash(''.join(hash_data))}" \
            + self.source_file.suffix

    def postprocess(self, file: Path):
        ...

    def copy_to(self, target: Path) -> None:
        cached_file = cache_dir / self.hashkey
        if not cached_file.exists():
            tmpfile = (cache_dir / "tmpfile").with_suffix(cached_file.suffix)
            logged_copy(self.source_file, tmpfile)
            self.postprocess(tmpfile)
            logged_move(tmpfile, cached_file)
        key = f"hash_{shorten_filename(cached_file)}"
        file_hash = cache.get(key)
        if not file_hash:
            file_hash = hash_file(cached_file)
            cache.set(key, file_hash)
        real_target = target.with_name(target.stem + "-" + file_hash[:5] + cached_file.suffix)
        logged_copy(cached_file, real_target)
        self.public_url = Path("/") / real_target.relative_to(output_dir)
        self.target_file = real_target


class Image(File):
    @classmethod
    def from_dir(cls, dir: Path, type: str = "image"):
        try:
            file = get_by_extension(dir / type)
        except FileNotFoundError:
            file = get_by_extension(dir / "image")
        return cls(file, type)

    @property
    def thumbhash(self):
        k = "thumbhash-" + self.hashkey
        cached = cache.get(k)
        if cached:
            return cached
        hash_file = self.target_file
        if hash_file.suffix == ".svg":
            tmpfile = cache_dir / "tmp.png"
            svg2png(hash_file, tmpfile)
            hash_file = tmpfile
        with hash_file.open("rb") as f:
            img = PILImage.open(f)
            img.thumbnail((100, 100))
            thumbhash = ThumbhashEncoder(img)
            b64 = thumbhash.to_base64().decode()
        cache.set(k, b64)
        return b64

    def postprocess(self, file: Path):
        bg_color = "#31363b" if self.type == "thumbnail" else "white"
        if file.suffix == ".png":
            replace_transparency_png(file, bg_color)
            optimize_png(file)
        if file.suffix == ".svg":
            replace_transparency_svg(file, bg_color)
