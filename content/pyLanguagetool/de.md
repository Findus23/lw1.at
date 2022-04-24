[LanguageTool](https://languagetool.org/) ist ein Open Source Textprüfung für Grammatik, Stil und Rechtschreibung, welche als LibreOffice-Erweiterung oder als Server verwendet werden kann.

pyLanguagetool ist eine Python library und ein Client für LanguageTool.

## Verwendung
pyLanguagetool kann mithilfe von pip installiert werden.
```
$ pip install pylanguagetool
```
pyLanguagetool kann Text von vielen verschiedenen Quellen überprüfen und unterstützt unter anderem HTML, Markdown, reStructuredText und Python Notebooks:
```
$ echo "This is a example" | pylanguagetool

$ pylanguagetool textfile.txt

$ pylanguagetool < textfile.txt

$ pylanguagetool -c # get text from system clipboard
```

Mehr Informationen findet man auf der Webseite zu dem Projekt: [pylanguagetool.lw1.at](https://pylanguagetool.lw1.at/)
