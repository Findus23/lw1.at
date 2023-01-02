import inspect
import sys
import traceback
from importlib import reload
from typing import Set

from watchfiles import DefaultFilter
from watchfiles.main import FileChange, watch

from lw1.main import main


def callback(changes: Set[FileChange]):
    print("changed:")
    for change, file in changes:
        print("-", file.split("../")[-1])


def reload_modules():
    for module in list(sys.modules.values()):
        try:
            if "lw1.at" in inspect.getfile(module) and module.__name__ != "__main__":
                reload(module)
        except (TypeError, ModuleNotFoundError):
            continue


class CustomFilter(DefaultFilter):
    ignore_dirs = list(DefaultFilter.ignore_dirs) + ["public", "cache"]


if __name__ == '__main__':
    # run_process('..', target=main, callback=callback, watch_filter=CustomFilter())
    main(debug=True)
    for changes in watch("..", watch_filter=CustomFilter()):
        callback(changes)
        reload_modules()
        try:
            main(debug=True)
        except Exception as e:
            traceback.print_exc()
