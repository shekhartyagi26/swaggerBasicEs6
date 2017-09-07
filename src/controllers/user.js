import BaseAPIController from "./BaseAPIController";
import User from "../models/User.js";
import generatePassword from 'password-generator';
import config from "../../config.json";
import { successResult, verifyData, encodePassword, encodeEmail, serverError, mergeArray, countryCode, generateRandomString, validate, parameterMissing } from "../modules/generic";
import twilio from "../modules/twilio";
import mail from "../modules/mail";
import constant from "../models/constant";
import { encodeToken } from "../modules/token";
import async from "async";
import _ from "lodash";
import { PARAMETER_MISSING_STATUS, INVALID_CREDENTIAL, BAD_REQUEST_STATUS, ALREADY_EXIST, SUCCESS_STATUS } from '../constant/status';
import { USERNAME_EXIST, INVALID_ARRAY, INVALID_LOGIN_TYPE, INVALID_LOGIN_MESSAGE, USER_EXIST, LOGIN_SUCCESSFULLY_MESSAGE, MOBILE_NUMBER_MESSAGE, OTP_MATCHED, INVALID_VERIFICATION_CODE, USER_LOGOUT_MESSAGE, PASSWORD_CHANGE_MESSAGE, INVALID_MOBILE_EMAIL, OTP_SENT, VERIFICATION_MESSAGE } from '../constant/message';
import { DELETE_IMAGE, DEFAULT_FILE } from "../modules/image";
import jwt from "jsonwebtoken";

export class UserController extends BaseAPIController {

    /*Controller for create User*/
    create = (req, res) => {
        const UserModel = req.User;
        let { first_name, last_name, email, password, phone_number, country_code } = req.body;
        let data = validate({ first_name, last_name, email, password });
        if (data.status) {

            User.findOne(UserModel, { email }).then((result) => {
                if (result) {
                    res.status(ALREADY_EXIST).json(parameterMissing(USER_EXIST));
                } else {
                    data = _.merge(data.data, verifyData({ phone_number, country_code }));
                    data.password = encodePassword(password);
                    data.date_created = new Date();
                    data.timestamp = new Date().getTime();
                    let access_token = encodeToken(email);
                    data.access_token = access_token;
                    User.save(UserModel, data).then((response) => {
                        res.status(SUCCESS_STATUS).json(successResult({ email, access_token }));
                    });
                }
            }).catch((e) => {
                res.status(BAD_REQUEST_STATUS).json(serverError(e));
            });
        } else {
            res.status(PARAMETER_MISSING_STATUS).json(parameterMissing(data.data))
        }
    }

    /* Controller for User Login  */
    login = (req, res) => {
        let { email, password } = req.body;
        let data = validate({ email, password });
        if (data.status) {
            data = data.data;
            let UserModel = req.User;
            data.password = encodePassword(password);
            User.findOne(UserModel, data).then((user) => {
                if (user) {
                    let access_token = encodeToken(user._id)
                    User.update(UserModel, data, { access_token }).then((result) => {
                        res.status(SUCCESS_STATUS).json(successResult(result, LOGIN_SUCCESSFULLY_MESSAGE))
                    }).catch((e) => { res.status(BAD_REQUEST_STATUS).json(serverError(e)); });
                } else {
                    res.status(PARAMETER_MISSING_STATUS).json(parameterMissing(INVALID_LOGIN_MESSAGE));
                }
            }).catch((e) => { res.status(BAD_REQUEST_STATUS).json(serverError(e)); });
        } else {
            res.status(INVALID_CREDENTIAL).json(parameterMissing(data.data));
        }
    }


    /*Controller for forgot password*/
    forgotPassword = (req, res) => {
        let { email } = req.body;
        const UserModel = req.User;
        if (email) {
            User.findOne(UserModel, { email }).then((user) => {
                if (!user) {
                    res.status(PARAMETER_MISSING_STATUS).json(parameterMissing(INVALID_MOBILE_EMAIL));
                } else {
                    let href = 'https://www.google.co.in/?gfe_rd=cr&dcr=0&ei=PNanWaC7Bcf08weuzJ7oBQ'
                    let html = `<!DOCTYPE html><html><head><title>Page Title</title></head><body><h1>Please verify your email address</h1><p><pre>Hi,<br>Please verify your email address so we know that it's really you!.</pre></p><a style="font-size:16px;font-family:Helvetica,Helvetica neue,Arial,Verdana,sans-serif;font-weight:none;color:#ffffff;text-decoration:none;background-color:#3572b0;border-top:11px solid #3572b0;border-bottom:11px solid #3572b0;border-left:20px solid #3572b0;border-right:20px solid #3572b0;border-radius:5px;display:inline-block" class="m_-96280054845025976mobile-button" shape="rect" href=${href} target="_blank"><span class="il">Verify</span> my email address</a><pre>Happy working,The ReadFry Crew</pre></body></html>`
                    mail.sendMail(email, constant().nodeMailer.subject, constant().nodeMailer.text, config.nodeMailer_email, html)
                        .then((mailsent) => {
                            res.status(SUCCESS_STATUS).json(successResult({ email, access_token }, OTP_SENT))
                        }).catch((e) => { res.status(BAD_REQUEST_STATUS).json(serverError(e)); });
                }
            }).catch((e) => { res.status(BAD_REQUEST_STATUS).json(serverError(e)); });
        } else {
            res.status(PARAMETER_MISSING_STATUS).json(parameterMissing())
        }
    }

    /*Controller for verify email*/
    verifyEmail = (req, res) => {
        let { email, verification_code } = req.body;
        const UserModel = req.User;
        if (email) {
            User.findOne(UserModel, { email, verification_code }).then((user) => {
                if (!user) {
                    res.status(PARAMETER_MISSING_STATUS).json(parameterMissing(INVALID_MOBILE_EMAIL));
                } else {
                    res.status(SUCCESS_STATUS).json(successResult({ access_token }))

                }
            }).catch((e) => { res.status(BAD_REQUEST_STATUS).json(serverError(e)); });
        } else {
            res.status(PARAMETER_MISSING_STATUS).json(parameterMissing())
        }
    }

    /*Controller for reset password*/
    resetPassword = (req, res) => {
        let UserModel = req.User;
        let { email, password } = req.body;
        let data = validate({ email, password });
        if (data.status) {
            data = data.data;
            User.update(UserModel, data, { password: encodePassword(password) }).then((insertData) => {
                if (insertData) {
                    res.status(SUCCESS_STATUS).json(successResult({}, PASSWORD_CHANGE_MESSAGE))
                } else {
                    res.status(PARAMETER_MISSING_STATUS).json(parameterMissing(INVALID_MOBILE_EMAIL))
                }
            }).catch((e) => { res.status(BAD_REQUEST_STATUS).json(serverError(e)) });
        } else {
            res.status(PARAMETER_MISSING_STATUS).json(parameterMissing(data.data))
        }
    }

    /*Controller for logout*/
    logout = (req, res) => {
        let { access_token } = req.headers;
        let UserModel = req.User;
        User.update(UserModel, { access_token }, { access_token: '' }).then((insertData) => {
            res.status(SUCCESS_STATUS).json(successResult({}, USER_LOGOUT_MESSAGE))
        }).catch((e) => { res.status(BAD_REQUEST_STATUS).json(serverError(e)) });
    }

    /*Controller for upload image and edit profile*/
    editProfile = (req, res) => {
        let { access_token } = req.headers;
        let { full_name, profession, dob, bio, latitude, longitude, address } = req.body;
        let data = req.file ? DEFAULT_FILE(req.file) : data = {};
        let UserModel = req.User;
        let verifiedData = verifyData({ full_name, profession, dob, bio, latitude, longitude, address })
        verifiedData = _.merge(data, verifiedData)
        User.update(UserModel, { access_token }, verifiedData).then((result) => {
            res.status(SUCCESS_STATUS).json(successResult(result))
        }).catch((e) => {
            DELETE_IMAGE(req.actual_path);
            res.status(BAD_REQUEST_STATUS).json(serverError(e));
        });
    }

}

const controller = new UserController();
export default controller;