"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _twilio = require("twilio");

var _twilio2 = _interopRequireDefault(_twilio);

var _config = require("../../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendMessageTwilio = function sendMessageTwilio(body, to) {
    return new Promise(function (resolve, reject) {
        var client = new _twilio2.default(_config2.default.twilio_accountSid, _config2.default.twilio_authToken);
        client.messages.create({
            body: body,
            to: to, // Text this number
            from: _config2.default.twilio_number // From a valid Twilio number
        }, function (err, message) {
            if (err) {
                reject(err);
            } else {
                resolve(message.sid);
            }
        });
    });
};

exports.default = {
    sendMessageTwilio: sendMessageTwilio
};
//# sourceMappingURL=twilio.js.map