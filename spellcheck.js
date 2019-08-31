const fs = require('fs');
const yaml = require('js-yaml');

const dataPath = "./src/data/";

const files = fs.readdirSync(dataPath);

let en_markdown = "";
let de_markdown = "";
let titles = [];

files.forEach(file => {
	if (!file.includes("yaml")) {
		return;
	}
	const content = fs.readFileSync(dataPath + file);
	let item = yaml.safeLoad(content);
	if (item.description.de) {
		de_markdown += item.description.de + "\n\n";
		en_markdown += item.description.en + "\n\n";
	} else {
		if (item.single_language === "de") {
			de_markdown += item.description + "\n\n";
		} else {
			en_markdown += item.description + "\n\n";
		}
	}
	if (item.title.de) {
		titles.push(item.title.de);
		titles.push(item.title.en);
	} else {
		titles.push(item.title);
	}

	fs.writeFileSync("spellcheck_de.md", de_markdown);

	fs.writeFileSync("spellcheck_en.md", en_markdown);

	fs.writeFileSync("spellcheck_title.md", titles.join("\n"));

});
