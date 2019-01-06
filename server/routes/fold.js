/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/1/5 下午4:42
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/1/5 下午4:42
 */

const router = require('koa-router')();
const Fold = require('../db').Fold;
const Upload = require('../db').Upload;
const foldModel = require('../models/fold');
router.prefix('/api/fold');
const {judge_source} = require("../libs/token");
const Mongoose = require('mongoose');
const ObjectId = Mongoose.Types.ObjectId;

/**
 * 目录 => 获取目录列表
 * 根据:current_page,page_size,keyword,tag 来检索文章
 */
router.get('/', async ctx => {
    try {
        let mark = await judge_source(ctx);
        if (!mark) {
            return false
        }

        let res = await foldModel.find_all({});
        let tree = util.listToTree(res);

        ctx.body = {
            code: 200,
            msg: '查询成功！',
            data: tree || []
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '获取目录失败！'
        }
    }

});

// 目录 => 添加目录
router.post('/', async ctx => {
    let {
        parentId = -1,
        name = ''
    } = ctx.request.body;
    try {

        let fold = new Fold({
            parentId,
            name
        });
        let res = await fold.save();
        if (res) {
            ctx.body = {
                code: 200,
                msg: '添加目录成功！'
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '添加目录失败！'
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '添加目录失败！'
        }
    }
});

// 目录 => 修改目录
router.patch('/:id', async ctx => {
    let {
        _id,
        name = ''
    } = ctx.request.body;

    try {
        let res = await foldModel.update(_id, {
            name
        });
        if (res) {
            ctx.body = {
                code: 200,
                msg: '修改目录成功！',
                data: res
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '修改目录失败！'
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '修改目录失败！！'
        }
    }
});

// 目录 => 删除目录
router.delete("/:id", async ctx => {
    let _id = ctx.params.id;

    try {
        if (_id.length != 24) {
            ctx.body = {
                code: 401,
                msg: '目录删除失败，目录id有误！'
            };
            return;
        }

        let list = await foldModel.find_all({});
        let unique = true;

        list.map(item => {
            if (_id === item.parentId) unique = false
        });

        let body;

        if (unique) {
            let querys = {
                fold_id: new ObjectId(_id)
            };

            let filter = await Upload.find(querys, null, {}, (err, doc) => err ? [] : doc);

            if (filter.length) {
                body = {
                    code: 500,
                    msg: '当前目录下有数据，请先删除数据！'
                }
            } else {
                await foldModel.delete(_id);
                body = {
                    code: 200,
                    msg: '目录删除成功！'
                }
            }

        } else {
            body = {
                code: 500,
                msg: '当前目录下有子目录，请先删除子目录！'
            }
        }

        ctx.body = body
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '目录删除失败！'
        }
    }
});

module.exports = router;