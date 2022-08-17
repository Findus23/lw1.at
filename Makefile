babel: extract update compile

publish: rmpublic esbuild build upload


extract:
	pybabel extract -F mapping.ini -o translations/messages.pot templates/*

update:
	pybabel update -i translations/messages.pot -d translations

compile:
	pybabel compile  -d translations --statistics

upload:
	rsync -aPz --delete --delete-after public lw1.at:/var/www/lw1.at/

esbuild:
	npm run build

build:
	/home/lukas/.virtualenvs/lw1/bin/python -m lw1.main

rmpublic:
	rm -r public/
	mkdir public/
