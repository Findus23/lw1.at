[LanguageTool](https://languagetool.org/) is an open source proof­reading (spellchecking and grammar checking) service for many languages including English and German
which can be run as a server providing an JSON API.

pyLanguagetool is an Python library and command line interface for LanguageTool

## How to use
pyLanguagetool can be installed from pip.
```
$ pip install pylanguagetool
```
Then pyLanguagetool can check text froum various sources and supports HTML, Markdown, reStructuredText and python notebooks:
```
$ echo "This is a example" | pylanguagetool

$ pylanguagetool textfile.txt

$ pylanguagetool < textfile.txt

$ pylanguagetool -c # get text from system clipboard
```

More information can be found on the website of the project: [pylanguagetool.lw1.at](https://pylanguagetool.lw1.at/)
