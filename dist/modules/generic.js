'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _message = require('../constant/message');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _bson = require('bson');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverError = function serverError() {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _message.BAD_REQUEST_MESSAGE;

    if (typeof message == 'string') {
        message = { message: message };
    }
    return {
        response: response,
        message: message
    };
};
var validateEmail = function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

var checkBlank = function checkBlank(arr) {
    _lodash2.default.map(arr, function (val, key) {
        if (val == '' || val === "" || val == undefined) {
            return 'Some parameters missing';
        } else {
            if (key == _lodash2.default.size(arr) - 1) {
                return null, 'done';
            }
        }
    });
};

var mergeArray = function mergeArray() {
    var arr1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var arr2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return (0, _lodash2.default)(arr1).keyBy('id').merge(_lodash2.default.keyBy(arr2, 'id')).values().value();
};

var countryCode = function countryCode(country_code) {
    if (!country_code.includes("+")) {
        country_code = '+' + country_code;
    };
    return country_code;
};

var generateRandomString = function generateRandomString() {
    return Math.floor(1000 + Math.random() * 9000);
};

var successResult = function successResult() {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '{}';
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _message.SUCCESS_MESSAGE;
    var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    if (typeof message == 'string') {
        message = { message: message };
    }
    return {
        response: response,
        message: message,
        flag: flag
    };
};

var invalidToken = function invalidToken() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _message.INVALID_ACCESS_TOKEN_MESSAGE;
    var response = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return {
        response: response,
        message: message
    };
};

var parameterMissing = function parameterMissing() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _message.PARAMETER_MISSING_MESSAGE;
    var response = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof message == 'string') {
        message = { message: message };
    }
    return {
        response: response,
        message: message
    };
};

// verify the key's and return only those key's which have value
var verifyData = function verifyData() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var result = {};
    var count = 0;
    _lodash2.default.map(data, function (val, key) {
        if (val && val.length || _lodash2.default.isInteger(val)) {
            result[key] = val;
        }
    });
    return result;
};

// validate the key's and return the missing keys otherwise return the valid json
var validate = function validate() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var result = {};
    var resp = {};
    var count = 0;
    _lodash2.default.map(data, function (val, key) {
        if (val && val.length || _lodash2.default.isInteger(val)) {
            if (key == 'email') {
                if (!validateEmail(val)) {
                    resp[key] = 'invalid  ' + key;
                }
            }
            result[key] = val;
        } else {
            resp[key] = key + ' is missing';
        }
    });
    if (resp && _lodash2.default.size(resp)) {
        return { status: false, data: resp };
    } else {
        return { status: true, data: result };
    }
};

var encodePassword = function encodePassword() {
    var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var md5 = _crypto2.default.createHash('md5');
    md5.update(password);
    var pass_md5 = md5.digest('hex');
    return pass_md5;
};

var encodeEmail = function encodeEmail() {
    var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return _crypto2.default.createHash('md5').update(email).digest("hex");
};

/*create unique id*/
var createUniqueId = function createUniqueId() {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var id = new _bson.ObjectID();
    return start + '_' + id.toString();
};

var timeStamp = function timeStamp() {
    return Math.round(new Date().getTime() / 1000);
};

module.exports = {
    serverError: serverError,
    validateEmail: validateEmail,
    checkBlank: checkBlank,
    mergeArray: mergeArray,
    countryCode: countryCode,
    generateRandomString: generateRandomString,
    successResult: successResult,
    invalidToken: invalidToken,
    parameterMissing: parameterMissing,
    verifyData: verifyData,
    validate: validate,
    encodePassword: encodePassword,
    createUniqueId: createUniqueId,
    timeStamp: timeStamp,
    encodeEmail: encodeEmail
};
//# sourceMappingURL=generic.js.map