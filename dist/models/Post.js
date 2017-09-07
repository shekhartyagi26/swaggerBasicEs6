"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var findOne = function findOne(db, data) {
    return new Promise(function (resolve, reject) {
        db.findOne(data, function (err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
};

var save = function save(db, data) {
    var record = new db(data);
    return new Promise(function (resolve, reject) {
        record.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
var update = function update(db, checkData, updateData) {
    return new Promise(function (resolve, reject) {
        db.findOneAndUpdate(checkData, { $set: updateData }, { new: true }, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

var updateOne = function updateOne(db) {
    var checkData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var updateData = arguments[2];

    return new Promise(function (resolve, reject) {
        db.update(checkData, updateData, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.default = {
    findOne: findOne,
    save: save,
    update: update,
    updateOne: updateOne
};
//# sourceMappingURL=Post.js.map