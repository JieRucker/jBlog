/*
 * @Author: Pawn 
 * @Date: 2018-08-14 11:33:10 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-08-19 14:05:44
 */
const Setting = require("../db").Setting;

module.exports = {
    find_all(querys = {}, fields = null) {
        // let querys = {}, fields = null;
        return Setting.find(querys, fields, (err, doc) => {
            return err ? [] : doc;
        })
    },
    find_by_id(_id) {
        return Setting.find({_id}, (err, doc) => {
            return err ? [] : doc;
        })
    },
    update(_id, json) {
        return Setting.findByIdAndUpdate(_id, json, {new: true}, (err, doc) => {
            return err ? false : true;
        })
    }
};