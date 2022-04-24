all: extract update compile


extract:
	pybabel extract -F mapping.ini -o translations/messages.pot templates/*

update:
	pybabel update -i translations/messages.pot -d translations

compile:
	pybabel compile  -d translations --statistics

publish:
	rsync -aPz public/* lw1.at:/var/www/beta.lw1.at/
