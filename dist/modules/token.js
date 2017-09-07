"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _generic = require("../modules/generic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeToken = function encodeToken(email) {
    return _jsonwebtoken2.default.sign({ token: email }, "secret_key", { expiresIn: 60 * 60 });
};

// const decodeToken = (token) => {
//     try {
//         return (jwt.decode(token, secret));
//     } catch (err) {
//         return (err);
//     }
// };

module.exports = {
    encodeToken: encodeToken
    // decodeToken
};
//# sourceMappingURL=token.js.map