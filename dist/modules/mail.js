"use strict";

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSmtpTransport = require("nodemailer-smtp-transport");

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

var _config = require("../../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    sendMail: function sendMail(email, subject, text, from, html) {
        return new Promise(function (resolve, reject) {
            var mailer = _nodemailer2.default.createTransport((0, _nodemailerSmtpTransport2.default)({
                host: _config2.default.SMTP_HOST,
                port: _config2.default.SMTP_PORT,
                auth: {
                    user: _config2.default.SMTP_USER,
                    pass: _config2.default.SMTP_PASS
                }
            }));
            mailer.sendMail({
                from: from,
                to: email,
                subject: subject,
                template: text,
                html: html
            }, function (error, response) {
                if (error) {
                    reject("Email not send successfully");
                } else {
                    resolve({ message: "Email send successfully" });
                }
                mailer.close();
            });
        });
    }
};
//# sourceMappingURL=mail.js.map