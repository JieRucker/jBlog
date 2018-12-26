/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/12/26 下午10:23
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/12/26 下午10:23
 */

class Util {
    constructor() {
    }

    isBlank(varValue) {
        if (varValue !== null && varValue !== undefined && varValue !== '' && varValue !== 'null') {
            return false;
        }
        return true;
    }

    formatDate(date, format = 'YY-MM-DD hh:mm:ss') {
        let year = date.getFullYear(),
            month = date.getMonth() + 1,//月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();

        let prefix = Array.apply(null, Array(10)).map(function (elem, index) {
            return '0' + index;
        });//开个长度为10的数组 格式为 00 01 02 03

        let fullTime = format.replace(/YY/g, year)
            .replace(/MM/g, prefix[month] || month)
            .replace(/DD/g, prefix[day] || day)
            .replace(/hh/g, prefix[hour] || hour)
            .replace(/mm/g, prefix[min] || min)
            .replace(/ss/g, prefix[sec] || sec);

        return fullTime;
    }

}

module.exports = new Util();