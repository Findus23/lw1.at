const sharp = require('sharp');
const blurhash = require("blurhash");
const loaderUtils = require('loader-utils');

module.exports = function(source) {
    const loaderCallback = this.async();

    const options = loaderUtils.getOptions(this) || {};
    if (this.request.includes("skip=true")) {
        loaderCallback(null, source);
        return true;
    }
    const path = source.split(" = ")[1].slice(0, -1);
    // console.warn("\n\n");
    // console.warn(path);

    // console.log(filename);
    sharp(this.resource)
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
