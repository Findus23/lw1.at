const yaml = require('js-yaml');
const md = require('markdown-it')();
const loaderUtils = require("loader-utils");
const regex = /local:\/\/([\w.]*)/gm;

function markdown2html(input) {
    let html = md.render(input);
    // console.log(html);
    return html;
}

module.exports = function(source) {
    try {
        let data = yaml.safeLoad(source);

        this.cacheable && this.cacheable();
        if (!this.resourcePath.endsWith("data.yaml")) {
            return "module.exports =" + JSON.stringify(data);
        }
        data.forEach(function(item) {
            item.description.de = markdown2html(item.description.de);
            item.description.en = markdown2html(item.description.en);
        });
        let datastring=JSON.stringify(data);
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
