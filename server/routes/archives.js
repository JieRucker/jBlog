/**
 * @Author: jrucker
 * @Date: 2018-09-01 09:20:34 
 * @Last Modified by: jrucker
 * @Last Modified time: 2018-09-05 19:30:56
 */
const router = require('koa-router')();
const articleModel = require('../models/article');
const Article = require('../db').Article;
router.prefix('/api/archives');

// 获取归档列表 => 文章和作品
router.get('/', async ctx => {
    let {current_page = 1, page_size = 10, keyword = ''} = ctx.query;

    try {
        let yearList = [];
        let result = [];
        let querys = {};
        let fields = null;

        let options = {
            skip: Number((current_page - 1) * page_size),
            limit: Number(page_size)
        };

        if (keyword != '') {
            let keywordReg = new RegExp(keyword);
            querys.$or = [
                {'article_title': keywordReg},
                // {'article_content': keywordReg},
                // {'article_desc': keywordReg}
            ]
        }

        let list = await articleModel.find_all({querys, fields, options});
        let total = await Article.countDocuments(querys);

        for (let i = 0; i < list.length; i++) {
            let article_create_time = new Date(list[i].article_create_time);
            let getFullYear = article_create_time.getFullYear();
            yearList.push(getFullYear)
        }

        yearList = [...new Set(yearList)];

        for (let i = 0; i < yearList.length; i++) {
            let obj = {
                year: yearList[i],
                list: []
            };
            for (let j = 0; j < list.length; j++) {
                let article_create_time = new Date(list[j].article_create_time);
                let getFullYear = article_create_time.getFullYear();

                if (yearList[i] === getFullYear) {
                    obj.list.push(list[j])
                }
            }
            result.push(obj)
        }

        ctx.body = {
            code: 200,
            msg: '获取归档成功',
            data: {
                list: result || [],
                total: total
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '归档查询失败!'
        }
    }
});

module.exports = router;