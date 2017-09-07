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

var find = function find(db, data) {
    return new Promise(function (resolve, reject) {
        db.find(data, function (err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
};

exports.default = {
    findOne: findOne,
    save: save,
    update: update,
    find: find
};
//# sourceMappingURL=User.js.map