/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/9/5 下午11:59
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/11/5 下午11:59
 */

const Upload = require("../db").Upload;

module.exports = {
    find_all(json) {
        let {querys = {}, fields = {}, options = {}} = json;
        return Upload.find(querys, fields, options, (err, doc) => {
            console.log(doc);
            return err ? [] : doc;
        })
    },
    update(_id, json) {
        return Upload.findByIdAndUpdate(_id, json, {new: true}, (err, doc) => {
            return err ? false : true;
        })
    },
    delete(_id) {
        return Upload.findByIdAndRemove(_id, (err, doc) => {
            return err ? false : true;
        })
    }
};