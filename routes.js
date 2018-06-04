yaml = require('js-yaml');
fs = require('fs');

// Get document, or throw exception on error

routes = ["/de", "/en", "/de/impressum", "/en/imprint"];
try {
    let doc = yaml.safeLoad(fs.readFileSync('./src/data.yaml', 'utf8'));
    doc.forEach(function(bla) {
        routes.push("/de/" + bla["id"]);
        routes.push("/en/" + bla["id"]);
    });
} catch (e) {
    console.log(e);
}


module.exports = routes;
