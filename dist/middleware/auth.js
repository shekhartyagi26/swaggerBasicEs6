'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _status = require('../constant/status');

var _generic = require('../modules/generic');

var _message = require('../constant/message');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthController = exports.AuthController = function () {
    function AuthController() {
        _classCallCheck(this, AuthController);
    }

    _createClass(AuthController, [{
        key: 'requiresLogin',


        // middleware for logged in users
        value: function requiresLogin(req, res, next) {
            var access_token = req.headers.access_token;

            if (access_token) {
                req.User.findOne({ access_token: access_token }, function (error, user) {
                    if (error) {
                        next(res.status(_status.BAD_REQUEST_STATUS).json((0, _generic.serverError)()));
                    } else if (user === null || user.length === 0) {
                        next(res.status(_status.INVALID_ACCESS_TOKEN_STATUS).json((0, _generic.invalidToken)()));
                    } else {
                        req.user = user;
                        next();
                    }
                });
            } else {
                next(res.status(_status.PARAMETER_MISSING_STATUS).json((0, _generic.parameterMissing)(_message.ACCESS_TOKEN_MISSING)));
            }
        }
    }]);

    return AuthController;
}();

var controller = new AuthController();
exports.default = controller;
//# sourceMappingURL=auth.js.map