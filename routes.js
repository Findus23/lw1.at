fs = require('fs');
const dataPath = "./src/data/";

// Get document, or throw exception on error

routes = ["/de", "/en", "/de/impressum", "/en/imprint", "/en/lightningtalks"];
try {
    const files = fs.readdirSync(dataPath);
    files.forEach(function(file) {
        if (file.includes("yaml")) {
            const id = file.replace(".yaml", "");
            routes.push("/de/" + id);
            routes.push("/en/" + id);
        }
    });
} catch (e) {
    console.log(e);
}


module.exports = routes;
