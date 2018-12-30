/**
 * @Author: jrucker
 * @Date: 2018-08-22 11:46:36
 * @Last Modified by: jrucker
 * @Last Modified time: 2018-09-06 16:33:43
 */

const router = require('koa-router')();
const Setting = require('../db').Setting;
const settingModel = require('../models/setting');
const tagModel = require('../models/tag');
const articleModel = require('../models/article');
const Checkcode = require('../db').Checkcode;
const qiniu = require('qiniu');
const fs = require("fs");
const BMP24 = require('gd-bmp').BMP24;
const {create_token, judge_source} = require('../libs/token');

router.prefix('/api/setting');

// 设置 => 导出数据库中的数据
router.get('/', async ctx => {
    try {
        let [res] = await settingModel.find_all({}, {'qiniu': false});
        let tag_list = await tagModel.find_all();
        let article_list = await articleModel.find_all({});

        let mark = await judge_source(ctx);
        if (!mark) {
            // res = await Setting.find({});
            return false
        }

        ctx.body = {
            code: 200,
            msg: '获取设置成功!',
            data: {
                info: res,
                tags_num: tag_list.length,
                article_num: article_list.length
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '请求失败!'
        }
    }
});

function setJsonFn(target, prefix, valJson) {
    for (let item in valJson) {
        valJson[item] !== '' ? target[prefix + '.' + item] = valJson[item] : '';
    }
}

// 设置 => 个人信息
router.patch('/', async ctx => {
    let {
        person_info = null,
        upyun_cos = null,
        about = null
    } = ctx.request.body;
    let setJson = {};

    try {
        // 如果数据库中没有数据，创建一个数据
        let res = await Setting.find({});
        if (!res.length) await new Setting().save();

        /*更新个人信息*/
        if (person_info) {
            let {
                avatar = '', /*头像*/
                cover = '', /*封面*/
                description = '', /*描述*/
                github = '',
                twitter = '',
                juejin = '',
            } = JSON.parse(person_info);
            setJsonFn(setJson, 'person_info', {avatar, cover, description, github, twitter, juejin});
        }

        /*更新upyun信息*/
        if (upyun_cos) {
            let {
                bucket = '',
                operatorname = '',
                operatorpwd = '',
                endpoint = '',
            } = JSON.parse(upyun_cos);
            setJsonFn(setJson, 'upyun_cos', {bucket, operatorname, operatorpwd, endpoint});
        }

        /*更新关于*/
        if (about) {
            let {
                picture = '',
                description = '',
            } = JSON.parse(about);
            setJsonFn(setJson, 'about', {picture, description});
        }

        res = await Setting.findOneAndUpdate({}, {
            '$set': setJson
        }, {new: true});

        ctx.body = {
            code: 200,
            msg: '更新设置成功!',
            data: res
        }

    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '更新设置失败!'
        }
    }
});

// 获取七牛云上传token
router.get("/token", async ctx => {
    try {
        let res = await Setting.find({});
        if (res.length == 0) {
            ctx.body = {
                code: 403,
                msg: '获取token失败，没有找到七牛云秘钥！',
                data: {
                    token: ''
                }
            };
            return;
        }

        let {ACCESS_KEY = '', SECRET_KEY = '', BUCKET = ''} = res[0].qiniu
        let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
        let options = {
            scope: BUCKET,
        };
        let putPolicy = new qiniu.rs.PutPolicy(options);
        let token = putPolicy.uploadToken(mac);
        ctx.body = {
            code: 200,
            msg: '获取七牛云上传token成功!',
            data: {
                token
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '获取七牛云token失败!',
            data: {
                token: ''
            }
        }
    }
});

// 获取登录验证码
router.get('/checkcode', async ctx => {
    try {
        let {code, img} = makeCapcha();
        let token = create_token(code);
        await new Checkcode({token, code}).save();
        ctx.body = {
            code: 200,
            msg: '获取验证码成功！',
            data: {
                token,
                img: "data:image/bmp;base64," + img.getFileData().toString('base64')
            }
        }
    } catch (e) {
        console.log(e)
    }
});

function rand(min, max) {
    return Math.random() * (max - min + 1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}

function makeCapcha() {
    var img = new BMP24(100, 40);
    img.drawCircle(rand(0, 100), rand(0, 40), rand(10, 40), rand(0, 0xffffff));
    //边框
    img.drawRect(0, 0, img.w - 1, img.h - 1, rand(0, 0xffffff));
    img.fillRect(0, 0, 100, 40, 0x252632);
    // img.fillRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0xffffff));
    img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
    //return img;
    //画曲线
    var w = img.w / 2;
    var h = img.h;
    var color = rand(0, 0xffffff);
    var y1 = rand(-5, 5); //Y轴位置调整
    var w2 = rand(10, 15); //数值越小频率越高
    var h3 = rand(4, 6); //数值越小幅度越大
    var bl = rand(1, 5);
    for (var i = -w; i < w; i += 0.1) {
        var y = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1);
        var x = Math.floor(i + w);
        for (var j = 0; j < bl; j++) {
            img.drawPoint(x, y + j, color);
        }
    }

    var p = "ABCDEFGHKMNPQRSTUVWXYZ3456789";
    var str = '';
    for (var i = 0; i < 4; i++) {
        str += p.charAt(Math.random() * p.length | 0);
    }

    var fonts = [BMP24.font12x24, BMP24.font16x32];
    // var fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
    var x = 15, y = 8;
    for (var i = 0; i < str.length; i++) {
        var f = fonts[Math.random() * fonts.length | 0];
        y = 8 + rand(-5, 5);
        img.drawChar(str[i], x, y, f, rand(0xaaaaaa, 0xffffff));
        x += f.w + rand(2, 8);
    }
    return {code: str, img}
}

module.exports = router;