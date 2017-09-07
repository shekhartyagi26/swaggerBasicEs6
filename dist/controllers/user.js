"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserController = undefined;

var _BaseAPIController2 = require("./BaseAPIController");

var _BaseAPIController3 = _interopRequireDefault(_BaseAPIController2);

var _User = require("../models/User.js");

var _User2 = _interopRequireDefault(_User);

var _passwordGenerator = require("password-generator");

var _passwordGenerator2 = _interopRequireDefault(_passwordGenerator);

var _config = require("../../config.json");

var _config2 = _interopRequireDefault(_config);

var _generic = require("../modules/generic");

var _twilio = require("../modules/twilio");

var _twilio2 = _interopRequireDefault(_twilio);

var _mail = require("../modules/mail");

var _mail2 = _interopRequireDefault(_mail);

var _constant = require("../models/constant");

var _constant2 = _interopRequireDefault(_constant);

var _token = require("../modules/token");

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _status = require("../constant/status");

var _message = require("../constant/message");

var _image = require("../modules/image");

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserController = exports.UserController = function (_BaseAPIController) {
    _inherits(UserController, _BaseAPIController);

    function UserController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, UserController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserController.__proto__ || Object.getPrototypeOf(UserController)).call.apply(_ref, [this].concat(args))), _this), _this.create = function (req, res) {
            var UserModel = req.User;
            var _req$body = req.body,
                first_name = _req$body.first_name,
                last_name = _req$body.last_name,
                email = _req$body.email,
                password = _req$body.password,
                phone_number = _req$body.phone_number,
                country_code = _req$body.country_code;

            var data = (0, _generic.validate)({ first_name: first_name, last_name: last_name, email: email, password: password });
            if (data.status) {
                _User2.default.findOne(UserModel, { email: email }).then(function (result) {
                    if (result) {
                        res.status(_status.ALREADY_EXIST).json((0, _generic.parameterMissing)(_message.USER_EXIST));
                    } else {
                        data = _lodash2.default.merge(data.data, (0, _generic.verifyData)({ phone_number: phone_number, country_code: country_code }));
                        data.password = (0, _generic.encodePassword)(password);
                        data.date_created = new Date();
                        data.timestamp = new Date().getTime();
                        var _access_token = (0, _token.encodeToken)(email);
                        data.access_token = _access_token;
                        _User2.default.save(UserModel, data).then(function (response) {
                            res.status(_status.SUCCESS_STATUS).json((0, _generic.successResult)({ email: email, access_token: _access_token }));
                        });
                    }
                }).catch(function (e) {
                    res.status(_status.BAD_REQUEST_STATUS).json((0, _generic.serverError)(e));
                });
            } else {
                res.status(_status.PARAMETER_MISSING_STATUS).json((0, _generic.parameterMissing)(data.data));
            }
        }, _this.login = function (req, res) {
            var _req$body2 = req.body,
                email = _req$body2.email,
                password = _req$body2.password;

            var data = (0, _generic.validate)({ email: email, password: password });
            if (data.status) {
                data = data.data;
                var UserModel = req.User;
                data.password = (0, _generic.encodePassword)(password);
                _User2.default.findOne(UserModel, data).then(function (user) {
                    if (user) {
                        var _access_token2 = (0, _token.encodeToken)(user._id);
                        _User2.default.update(UserModel, data, { access_token: _access_token2 }).then(function (result) {
                            res.status(_status.SUCCESS_STATUS).json((0, _generic.successResult)(result, _message.LOGIN_SUCCESSFULLY_MESSAGE));
                        }).catch(function (e) {
                            res.status(_status.BAD_REQUEST_STATUS).json((0, _generic.serverError)(e));
                        });
                    } else {
                        res.status(_status.PARAMETER_MISSING_STATUS).json((0, _generic.parameterMissing)(_message.INVALID_LOGIN_MESSAGE));
                    }
                }).catch(function (e) {
                    res.status(_status.BAD_REQUEST_STATUS).json((0, _generic.serverError)(e));
                });
            } else {
                res.status(_status.INVALID_CREDENTIAL).json((0, _generic.parameterMissing)(data.data));
            }
        }, _this.forgotPassword = function (req, res) {
            var email = req.body.email;

            var UserModel = req.User;
            if (email) {
                _User2.default.findOne(UserModel, { email: email }).then(function (user) {
                    if (!user) {
                        res.status(_status.PARAMETER_MISSING_STATUS).json((0, _generic.parameterMissing)(_message.INVALID_MOBILE_EMAIL));
                    } else {
                        var href = 'https://www.google.co.in/?gfe_rd=cr&dcr=0&ei=PNanWaC7Bcf08weuzJ7oBQ';
                        var html = "<!DOCTYPE html><html><head><title>Page Title</title></head><body><h1>Please verify your email address</h1><p><pre>Hi,<br>Please verify your email address so we know that it's really you!.</pre></p><a style=\"font-size:16px;font-family:Helvetica,Helvetica neue,Arial,Verdana,sans-serif;font-weight:none;color:#ffffff;text-decoration:none;background-color:#3572b0;border-top:11px solid #3572b0;border-bottom:11px solid #3572b0;border-left:20px solid #3572b0;border-right:20px solid #3572b0;border-radius:5px;display:inline-block\" class=\"m_-96280054845025976mobile-button\" shape=\"rect\" href=" + href + " target=\"_blank\"><span class=\"il\">Verify</span> my email address</a><pre>Happy working,The ReadFry Crew</pre></body></html>";
                        _mail2.default.sendMail(email, (0, _constant2.default)().nodeMailer.subject, (0, _constant2.default)().nodeMailer.text, _config2.default.nodeMailer_email, html).then(function (mailsent) {
                            res.status(_status.SUCCESS_STATUS).json((0, _generic.successResult)({ email: email, access_token: access_token }, _message.OTP_SENT));
                        }).catch(function (e) {
                            res.status(_status.BAD_REQUEST_STATUS).json((0, _generic.serverError)(e));
                        });
                    }
                }).catch(function (e) {
                    res.status(_status.BAD_REQUEST_STATUS).json((0, _generic.serverError)(e));
                });
            } else {
                res.status(_status.PARAMETER_MISSING_STATUS).json((0, _generic.parameterMissing)());
            }
        }, _this.verifyEmail = function (req, res) {
            var _req$body3 = req.body,
                email = _req$body3.email,
                verification_code = _req$body3.verification_code;

            var UserModel = req.User;
            if (email) {
                _User2.default.findOne(UserModel, { email: email, verification_code: verification_code }).then(function (user) {
                    if (!user) {
                        res.status(_status.PARAMETER_MISSING_STATUS).json((0, _generic.parameterMissing)(_message.INVALID_MOBILE_EMAIL));
                    } else {
                        res.status(_status.SUCCESS_STATUS).json((0, _generic.successResult)({ access_token: access_token }));
                    }
                }).catch(function (e) {
                    res.status(_status.BAD_REQUEST_STATUS).json((0, _generic.serverError)(e));
                });
            } else {
                res.status(_status.PARAMETER_MISSING_STATUS).json((0, _generic.parameterMissing)());
            }
        }, _this.resetPassword = function (req, res) {
            var UserModel = req.User;
            var _req$body4 = req.body,
                email = _req$body4.email,
                password = _req$body4.password;

            var data = (0, _generic.validate)({ email: email, password: password });
            if (data.status) {
                data = data.data;
                _User2.default.update(UserModel, data, { password: (0, _generic.encodePassword)(password) }).then(function (insertData) {
                    if (insertData) {
                        res.status(_status.SUCCESS_STATUS).json((0, _generic.successResult)({}, _message.PASSWORD_CHANGE_MESSAGE));
                    } else {
                        res.status(_status.PARAMETER_MISSING_STATUS).json((0, _generic.parameterMissing)(_message.INVALID_MOBILE_EMAIL));
                    }
                }).catch(function (e) {
                    res.status(_status.BAD_REQUEST_STATUS).json((0, _generic.serverError)(e));
                });
            } else {
                res.status(_status.PARAMETER_MISSING_STATUS).json((0, _generic.parameterMissing)(data.data));
            }
        }, _this.logout = function (req, res) {
            var access_token = req.headers.access_token;

            var UserModel = req.User;
            _User2.default.update(UserModel, { access_token: access_token }, { access_token: '' }).then(function (insertData) {
                res.status(_status.SUCCESS_STATUS).json((0, _generic.successResult)({}, _message.USER_LOGOUT_MESSAGE));
            }).catch(function (e) {
                res.status(_status.BAD_REQUEST_STATUS).json((0, _generic.serverError)(e));
            });
        }, _this.editProfile = function (req, res) {
            var access_token = req.headers.access_token;
            var _req$body5 = req.body,
                full_name = _req$body5.full_name,
                profession = _req$body5.profession,
                dob = _req$body5.dob,
                bio = _req$body5.bio,
                latitude = _req$body5.latitude,
                longitude = _req$body5.longitude,
                address = _req$body5.address;

            var data = req.file ? (0, _image.DEFAULT_FILE)(req.file) : data = {};
            var UserModel = req.User;
            var verifiedData = (0, _generic.verifyData)({ full_name: full_name, profession: profession, dob: dob, bio: bio, latitude: latitude, longitude: longitude, address: address });
            verifiedData = _lodash2.default.merge(data, verifiedData);
            _User2.default.update(UserModel, { access_token: access_token }, verifiedData).then(function (result) {
                res.status(_status.SUCCESS_STATUS).json((0, _generic.successResult)(result));
            }).catch(function (e) {
                (0, _image.DELETE_IMAGE)(req.actual_path);
                res.status(_status.BAD_REQUEST_STATUS).json((0, _generic.serverError)(e));
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /*Controller for create User*/


    /* Controller for User Login  */


    /*Controller for forgot password*/


    /*Controller for verify email*/


    /*Controller for reset password*/


    /*Controller for logout*/


    /*Controller for upload image and edit profile*/


    return UserController;
}(_BaseAPIController3.default);

var controller = new UserController();
exports.default = controller;
//# sourceMappingURL=user.js.map