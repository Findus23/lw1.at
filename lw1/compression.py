from subprocess import run

from lw1.paths import output_dir


def compress_files():
    for file in output_dir.glob("**/*"):
        if file.is_dir():
            continue
        if file.suffix not in {".html", ".css", ".js", ".xml", ".map", ".json", ".woff", ".woff2", ".ttf", ".svg"}:
            continue
        run(["gzip", "-k", "-f", "--best", str(file)], check=True)
        run(["brotli", "-f", "--best", str(file)], check=True)
