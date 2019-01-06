/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/1/5 下午4:40
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/1/5 下午4:40
 */

const Fold = require("../db").Fold;

module.exports = {
    find_all(json) {
        let {querys = {}, fields = null, options = {}} = json;
        return Fold.find(querys, fields, options, (err, doc) => {
            return err ? [] : doc;
        })
    },
    find_by_id(_id) {
        return Fold.find({_id}, (err, doc) => {
            return err ? [] : doc;
        })
    },
    update(_id, json) {
        return Fold.findByIdAndUpdate(_id, json, {new: true}, (err, doc) => {
            return err ? false : true;
        })
    },
    delete(_id) {
        return Fold.findByIdAndRemove(_id, (err, doc) => {
            return err ? false : true;
        })
    }
};