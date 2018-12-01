const router = require('koa-router')();
const tags = require('./tag');
const article = require('./article');
const work = require('./work');
const admin = require('./admin');
const setting = require('./setting');
const archives = require('./archives');
const upload = require('./upload');
const fs = require("fs");
const path = require('path');

router.get('/', ctx => {
    ctx.body = 'hello!'
});

router.get('/test', async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.resolve(__dirname, '../../client/index.html'));
});

module.exports = function (app) {
    app.use(router.routes(), router.allowedMethods());
    app.use(tags.routes(), tags.allowedMethods());
    app.use(article.routes(), article.allowedMethods());
    app.use(work.routes(), work.allowedMethods());
    app.use(admin.routes(), admin.allowedMethods());
    app.use(setting.routes(), setting.allowedMethods());
    app.use(archives.routes(), archives.allowedMethods());
    app.use(upload.routes(), upload.allowedMethods());
};