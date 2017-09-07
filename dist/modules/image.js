"use strict";

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _mime = require("mime");

var _mime2 = _interopRequireDefault(_mime);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _status = require("../constant/status");

var _generic = require("./generic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// image path for uploading image
var STORAGE = function STORAGE() {
    var uploadPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return _multer2.default.diskStorage({
        destination: function destination(req, file, callback) {
            var dest = "uploads/" + uploadPath;
            _mkdirp2.default.sync(dest);
            callback(null, dest);
        },
        filename: function filename(req, file, callback) {
            var fileUniquename = Date.now();
            callback(null, fileUniquename + _path2.default.extname(file.originalname));
        }
    });
};

//get profile picture format 1 for video and 2 for image
var PROFILE_IMAGE_FORMAT = function PROFILE_IMAGE_FORMAT() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    // PROFILE_IMAGE_FORMAT(req.file.filename)
    var typeOf = _mime2.default.lookup(path);
    return typeOf.includes('video') ? 1 : typeOf.includes('image') ? 2 : 0;
};

//remove the image from system
var DELETE_IMAGE = function DELETE_IMAGE(path) {
    // DELETE_IMAGE(req.file.path);
    _fs2.default.unlink(path, function () {
        return;
    });
};

var DEFAULT_FILE = function DEFAULT_FILE() {
    var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var data = {};
    data.actual_path = file.path;
    data.post_url = file.path.replace('uploads/', "");
    data.file_format = PROFILE_IMAGE_FORMAT(file.filename);
    return data;
};
module.exports = {
    STORAGE: STORAGE,
    PROFILE_IMAGE_FORMAT: PROFILE_IMAGE_FORMAT,
    DELETE_IMAGE: DELETE_IMAGE,
    DEFAULT_FILE: DEFAULT_FILE
};
//# sourceMappingURL=image.js.map