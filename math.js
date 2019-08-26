const MathJax = require('mathjax3/mathjax3/mathjax.js').MathJax;
const TeX = require('mathjax3/mathjax3/input/tex.js').TeX;
const SVG = require('mathjax3/mathjax3/output/svg.js').SVG;

require('mathjax3/mathjax3/input/tex/base/BaseConfiguration.js');
require('mathjax3/mathjax3/input/tex/ams/AmsConfiguration.js');
require('mathjax3/mathjax3/input/tex/noundefined/NoUndefinedConfiguration.js');
require('mathjax3/mathjax3/input/tex/newcommand/NewcommandConfiguration.js');
require('mathjax3/mathjax3/input/tex/boldsymbol/BoldsymbolConfiguration.js');
require('mathjax3/mathjax3/input/tex/braket/BraketConfiguration.js');
// require('mathjax3/mathjax3/input/tex/mhchem/MhchemConfiguration.js'); // seems to be causing errors since beta 3
require('mathjax3/mathjax3/input/tex/physics/PhysicsConfiguration.js');
require('mathjax3/mathjax3/input/tex/verb/VerbConfiguration.js');
require('mathjax3/mathjax3/input/tex/cancel/CancelConfiguration.js');
require('mathjax3/mathjax3/input/tex/enclose/EncloseConfiguration.js');


const EM_SIZE = 14;
const EX_SIZE = 8;

//
//  Create DOM adaptor and register it for HTML documents
//
const adaptor = require('mathjax3/mathjax3/adaptors/liteAdaptor.js').liteAdaptor({fontSize: EM_SIZE});
require('mathjax3/mathjax3/handlers/html.js').RegisterHTMLHandler(adaptor);


//
//  Create input and output jax and a document using them on the content from the HTML file
//
const tex = new TeX({
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    packages: ["base", "ams", "noundefined", "newcommand", "boldsymbol", "bracket", "mhchem", "physics", "verb", "cancel", "enclose"]
});
const svg = new SVG({exFactor: EX_SIZE / EM_SIZE, fontCache: "none"});

module.exports = function renderMath(rawhtml) {


    const html = MathJax.document(rawhtml, {InputJax: tex, OutputJax: svg});

//
//  Typeset the document
//
    html.findMath()
        .compile()
        .getMetrics()
        .typeset()
        .updateDocument();

//
//  Output the resulting HTML
//
    // don't add CSS style block to nodes
    return adaptor.outerHTML(adaptor.body(html.document));
    // return adaptor.outerHTML(adaptor.parent(adaptor.body(html.document)));
};
