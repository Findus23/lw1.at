const yaml = require('js-yaml');
const hljs = require('highlightjs');
const md = require('markdown-it')({
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {
            }
        }
        return ''; // use external default escaping
    }
});
const fs = require('fs');
const path = require('path');
const loaderUtils = require("loader-utils");
const renderMath = require("./math");
const regex = /local:\/\/([\w.]*)/gm;
const dataPath = "./src/data/";

function markdown2html(input) {
    let html = md.render(input);
    html = renderMath(html);
    return html;
}

module.exports = function(source) {
    try {
        const tags = yaml.safeLoad(source);

        this.cacheable && this.cacheable();
        this.addContextDependency(path.resolve(dataPath));
        let data = [];
        const files = fs.readdirSync(dataPath);
        files.forEach(file => {
            if (!file.includes("yaml")) {
                return;
            }
            const content = fs.readFileSync(dataPath + file);
            let item = yaml.safeLoad(content);
            if (item.id !== file.replace(".yaml", "")) {
                this.emitError(new Error(file.replace(".yaml", "") + " != " + item.id));
            }
            if (item !== "undefined") {
                if (item.description.de) {
                    item.description.de = markdown2html(item.description.de);
                    item.description.en = markdown2html(item.description.en);
                } else {
                    item.description = markdown2html(item.description);
                }
                data.push(item);
            }
        });
        let datastring = JSON.stringify({
            data: data,
            tags: tags
        });
        // datastring=datastring.replace(regex, function(bla, matched) {
        //     // console.log(require('./src/assets/content/' + matched));
        //     console.log("     -      ");
        //     console.log(loaderUtils.stringifyRequest(this, loaderUtils.urlToRequest('src/assets/content/' + matched)));
        //     return '" + require(' + loaderUtils.stringifyRequest(this,
        //         loaderUtils.urlToRequest('src/assets/content/' + matched)) + ') + "';
        // });
        // console.log(datastring);
        return "module.exports =" + datastring;

    } catch (err) {
        this.emitError(err);
        return false;
    }
};
