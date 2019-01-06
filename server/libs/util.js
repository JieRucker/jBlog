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

    /*格式化时间*/
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

    /*列表树*/
    listToTree(list) {
        const copyList = JSON.parse(JSON.stringify(list));
        const tree = [];
        for (let i = 0; i < copyList.length; i++) {
            for (let j = 0; j < copyList.length; j++) {
                if (copyList[i].parentId === copyList[j]._id) {
                    if (typeof copyList[j].children === 'undefined') copyList[j].children = [];
                    copyList[j].children.push(copyList[i])
                }
            }
            // parentId为-1是根节点
            if (copyList[i].parentId === '-1') tree.push(copyList[i])
        }

        return tree
    }
}

module.exports = new Util();