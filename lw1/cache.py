import yaml
from redis.client import Redis

from lw1.paths import cache_file


class LegacyCache:
    def __init__(self):
        if cache_file.exists():
            with cache_file.open() as f:
                self.cache = yaml.safe_load(f)
        else:
            self.cache = {}

    def set(self, key, value) -> None:
        self.cache[key] = value

    def get(self, key, *args, **kwargs):
        return self.cache.get(key, *args, **kwargs)

    def safe(self):
        with cache_file.open("w") as f:
            yaml.safe_dump(self.cache, f)


class Cache:
    def __init__(self):
        self.r = Redis(db=6, decode_responses=True)

    def set(self, key, value) -> None:
        self.r.set(key, value, ex=60 * 60 * 12)

    def get(self, key):
        return self.r.get(key)


cache = Cache()
