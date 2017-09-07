"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _db = require("./mongodb/db.js");

var _db2 = _interopRequireDefault(_db);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appConfig = require('./../config/app.js'); /* eslint-disable*/


var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// logger
app.use((0, _morgan2.default)("dev"));
app.use((0, _cors2.default)());
app.use((0, _db2.default)());

// 3rd party middleware
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static(_path2.default.join(__dirname, '../uploads')));
var initRoutes = function initRoutes(app) {
    // including all routes
    (0, _glob2.default)("./routes/*.js", {
        cwd: _path2.default.resolve("./src")
    }, function (err, routes) {
        if (err) {
            console.log(_chalk2.default.red("Error occured including routes"));
            return;
        }
        routes.forEach(function (routePath) {
            require(routePath).default(app); // eslint-disable-line
        });
        console.log(_chalk2.default.green("included " + routes.length + " route files"));
    });
};
initRoutes(app);

app.server.listen(process.env.PORT || 3003);
console.log("Started on port " + 3003);
// Setup API document
var setupSwagger = require('./../config/swagger');

exports.default = setupSwagger(_express2.default, app);
//# sourceMappingURL=index.js.map