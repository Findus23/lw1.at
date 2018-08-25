const yaml = require('js-yaml');
const md = require('markdown-it')();
const fs = require('fs');
const path = require('path');
const loaderUtils = require("loader-utils");
const regex = /local:\/\/([\w.]*)/gm;
const dataPath = "./src/data/";

function markdown2html(input) {
    let html = md.render(input);
    // console.log(html);
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
                item.description.de = markdown2html(item.description.de);
                item.description.en = markdown2html(item.description.en);
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

    }
    catch (err) {
        this.emitError(err);
        return false;
    }
};
