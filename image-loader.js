const sharp = require('sharp');
const blurhash = require("blurhash");


module.exports = function(source) {
    const loaderCallback = this.async();
    const path = source.split(" = ")[1].slice(0, -1);
    // console.warn("\n\n");
    // console.warn(path);

    const filename = path.split(" + \"")[1].split("?hash")[0];
    // console.log(filename);
    sharp("./src/assets/" + filename)
        .resize(50)
        .ensureAlpha()
        .raw().toBuffer()
        .then(data => blurhash.encode(data, 50, data.length / 4 / 50, 5, 3))
        .then(hash => {
            const result = 'module.exports = {' +
                'path:' + path + ',\n' +
                'hash:"' + hash + '"\n' +
                '};';
            // console.log(result);
            loaderCallback(null, result);

        })
        .catch(err => loaderCallback(err));
};
