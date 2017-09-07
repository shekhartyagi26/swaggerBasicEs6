"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("../controllers/user");

var _user2 = _interopRequireDefault(_user);

var _auth = require("../middleware/auth");

var _auth2 = _interopRequireDefault(_auth);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _image = require("../modules/image");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

    /* Route for login */
    app.route("/user/login").post(_user2.default.login);

    /* Route for create Account */
    app.route("/user/create").post(_user2.default.create);

    /* Route for forgot Password */
    app.route("/user/forgotPassword").post(_user2.default.forgotPassword);

    /* Route for verify email */
    app.route("/user/verifyEmail").post(_user2.default.verifyEmail);

    /* Route for reset Password */
    app.route("/user/resetPassword").post(_user2.default.resetPassword);

    /* Route for logout */
    app.route("/user/logout").post(_auth2.default.requiresLogin, _user2.default.logout);

    /*Route for upload profile picture and edit profile*/
    app.post('/user/editProfile', _auth2.default.requiresLogin, (0, _multer2.default)({ storage: (0, _image.STORAGE)('profile') }).single('file'), _user2.default.editProfile);

    return app;
};
//# sourceMappingURL=user.js.map