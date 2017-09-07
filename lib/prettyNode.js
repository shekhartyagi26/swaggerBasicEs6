// A small tool to see node.js errors with less clutter
// https://github.com/AriaMinaei/pretty-error#integrating-with-express
const PrettyError = require('pretty-error');

pe = new PrettyError();

// this will skip events.js and http.js and similar core node files
pe.skipNodeFiles();
// this will skip all the trace lines about express` core and sub-modules
pe.skipPackage('express');

pe.start();