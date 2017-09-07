"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conn = _mongoose2.default.createConnection("mongodb://localhost/exalt_auto");
// the middleware function
module.exports = function () {
    // create schema
    var model_schema_user = _mongoose2.default.Schema({}, {
        strict: false,
        collection: 'user'
    });
    var collection_model_user = conn.model('user', model_schema_user);

    // let model_schema_image = mongoose.Schema({}, {
    //     strict: false,
    //     collection: 'image'
    // });
    // let collection_model_image = conn.model('image', model_schema_image);


    var model_interest = _mongoose2.default.Schema({}, {
        strict: false,
        collection: 'interest'
    });
    var collection_model_interest = conn.model('interest', model_interest);

    /*model for user_post*/
    var model_article = _mongoose2.default.Schema({}, {
        strict: false,
        collection: 'article'
    });
    var collection_model_article = conn.model('post', model_article);

    // /*model for comment*/
    // let model_comment = mongoose.Schema({}, {
    //     strict: false,
    //     collection: 'comment'
    // });
    // let collection_model_comment = conn.model('comment', model_comment);

    // /*model for like*/
    // let model_like = mongoose.Schema({}, {
    //     strict: false,
    //     collection: 'like'
    // });
    // let collection_model_like = conn.model('like', model_like);

    return function (req, res, next) {
        req.User = collection_model_user;
        // req.Image = collection_model_image;
        req.Interest = collection_model_interest;
        req.Article = collection_model_article;
        // req.Comment = collection_model_comment;
        // req.Like = collection_model_like;
        next();
    };
};
//# sourceMappingURL=db.js.map