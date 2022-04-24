from pathlib import Path

from lw1.file import Image
from lw1.paths import output_dir


class Writer:
    def write(self, url: Path, html: str):
        output_url = output_dir / url
        print(url)
        output_url.mkdir(exist_ok=True, parents=True)
        index_file = output_url / "index.html"
        with index_file.open("w") as f:
            f.write(html)

    def writeImage(self, url: Path, image: Image):
        image_file = output_dir / url
        image_file.parent.mkdir(exist_ok=True, parents=True)
        image.copy_to(image_file)
