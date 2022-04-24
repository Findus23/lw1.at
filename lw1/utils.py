import hashlib
from pathlib import Path

BUF_SIZE = 65536


def long_hash(input: str) -> str:
    return hashlib.sha256(input.encode('utf-8')).hexdigest()


def hash_file(path: Path) -> str:
    hash = hashlib.sha256()
    with path.open("rb") as f:
        while True:
            data = f.read(BUF_SIZE)
            if not data:
                break
            hash.update(data)
    return hash.hexdigest()


def short_hash(input: str) -> str:
    return long_hash(input)[:5]
