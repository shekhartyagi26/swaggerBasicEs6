import jwt from "jsonwebtoken";
import { successResponse } from "../modules/generic";


const encodeToken = (email) => {
    return jwt.sign({ token: email }, "secret_key", { expiresIn: 60 * 60 })
}

// const decodeToken = (token) => {
//     try {
//         return (jwt.decode(token, secret));
//     } catch (err) {
//         return (err);
//     }
// };

module.exports = {
    encodeToken
    // decodeToken
};