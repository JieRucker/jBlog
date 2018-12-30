/**
 * @Author: jrucker
 * @Date: 2018-08-14 16:16:17
 * @Last Modified by: jrucker
 * @Last Modified time: 2018-08-31 09:04:51
 */
const router = require('koa-router')();
const Admin = require('../db').Admin;
const adminModel = require('../models/admin');
const sha1 = require('sha1');
const SHA1_ADD_STR = "pawn_blog_encrypted_string";
const {create_token, check_token, check_token_code} = require('../libs/token');
const Checkcode = require('../db').Checkcode;
// const {check_token} = require('./libs/token');
const Koa = require('koa');
const app = new Koa();

const NodeRSA = require('node-rsa');
const myDecrypter = new NodeRSA({b: 1024});
myDecrypter.setOptions({encryptionScheme: 'pkcs1'});

router.prefix('/api/admin');

// 用户注册
router.post('/register', async ctx => {
    let {admin_name = '', admin_id = '', admin_pwd = ''} = ctx.request.body;

    try {
        if (admin_name == '' || admin_id == '' || admin_pwd == '') {
            ctx.body = {
                code: 401,
                msg: '注册账号失败，请填写完整注册信息!'
            };
            return;
        }
        // 判断admin_id是否重复
        let res = await adminModel.find_by_admin_id(admin_id);
        if (res.length) {
            ctx.body = {
                code: 409,
                msg: '登录账号重复了,请换一个吧!'
            };
            return;
        }

        let admin = new Admin({
            admin_name,
            admin_id,
            admin_pwd: sha1(sha1(admin_pwd + SHA1_ADD_STR))
        });
        res = await admin.save();
        if (res) {
            ctx.body = {
                code: 200,
                msg: '注册成功！'
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '注册失败!'
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '注册失败!'
        }
    }
});

// 发送公钥
router.get('/key', async ctx => {
    try {
        let public_key = myDecrypter.exportKey('pkcs8-public');//公钥,
        let private_key = myDecrypter.exportKey('pkcs8-private'); //私钥
        let format_public_key = public_key.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '').replace(/[\n]/g, "");

        ctx.session.user = {
            private_key: private_key
        };

        ctx.body = {
            code: 200,
            data: format_public_key
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '请求失败!'
        }
    }
});

// 用户登录
router.post('/login', async ctx => {
    app.use(check_token);
    let {admin_id = '', admin_pwd = '', token = '', code = ''} = ctx.request.body;

    try {
        let private_key = ctx.session.user.private_key;
        myDecrypter.importKey(private_key);

        let pwd = admin_pwd.replace(/\s+/g, '+');
        let decrypted_pwd = myDecrypter.decrypt(pwd, 'utf8'); //解密

        if (admin_id == '' || admin_pwd == '' || token == '' || code == '') {
            ctx.body = {
                code: 401,
                msg: '登录失败,请输入账号,密码或者验证码!'
            };
            return;
        }
        code = code.toUpperCase();

        // 判断验证码
        let res = await check_token_code(token);
        if (!res) {
            ctx.body = {
                code: 401,
                msg: '验证码已过期，请重新刷新！'
            };
            return;
        }

        res = await Checkcode.findOneAndRemove({token, code});
        if (!res) {
            ctx.body = {
                code: 401,
                msg: '验证码错误，请重新输入！'
            };
            return;
        }

        // 验证账号密码
        res = await Admin.find({admin_id, admin_pwd: sha1(sha1(decrypted_pwd + SHA1_ADD_STR))});
        if (!res.length) {
            ctx.body = {
                code: 401,
                msg: '登录失败，账号或者密码错误！'
            };
            return;
        }

        let new_token = create_token(admin_id);
        let [value] = res;
        value.token = new_token;
        value.save();
        ctx.body = {
            code: 200,
            msg: '登录成功！',
            data: {
                token: new_token,
                admin_id: res[0].admin_id,
                admin_name: res[0].admin_name
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '登录失败，服务器繁忙！'
        }
    }
});

// 用户密码修改
router.patch('/master', async ctx => {
    let {admin_id = '', ori_pwd = '', new_pwd = '', re_pwd = ''} = ctx.request.body;
    try {
        if (admin_id == '' || ori_pwd == '' || new_pwd == '' || re_pwd == '') {
            ctx.body = {
                code: 401,
                msg: '修改密码失败,请填写完所有信息且新密码不能为空'
            };
            return;
        }
        if (new_pwd != re_pwd) {
            ctx.body = {
                code: 401,
                msg: '修改密码失败,2次密码输入不一致！'
            };
            return;
        }

        let res = await adminModel.find_by_admin_id(admin_id);
        if (!res.length) {
            ctx.body = {
                code: 401,
                msg: '修改密码失败,没有此管理员!'
            };
            return;
        }

        if (res[0].admin_pwd == sha1(sha1(ori_pwd + SHA1_ADD_STR))) {
            res = await adminModel.update(res[0]._id, {admin_pwd: sha1(sha1(re_pwd + SHA1_ADD_STR))});
            console.log(res);
            if (res) {
                ctx.body = {
                    ctx, code: 200,
                    msg: '密码修改成功!'
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: '密码修改失败！'
                }
            }
        } else {
            ctx.body = {
                code: 401,
                msg: '修改密码失败,原始密码错误!'
            };
            return;
        }

    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '修改密码失败!'
        }
    }
});

module.exports = router;