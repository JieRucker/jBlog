const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const redis = require('redis');
const config = require('./config');

const util = require('./libs/util');
global.util = util;

const routes = require('./routes/index');
const {check_token} = require('./libs/token');

let client = redis.createClient(config.redis_port, config.redis_host);
app.keys = ['keys', 'f_blog_keys'];

app.use(session({
    store: redisStore({
        // db:config.redis_db,
        client: client
    })
}));

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    jsonLimit: '10mb', // 控制body的parse转换大小 default 1mb
    formLimit: '10mb',// 控制post的大小  default 56kb
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(check_token);

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
    const start = new Date();

    // console.log(ctx.session);

    Object.assign(ctx.state, {
        user: ctx.session.user
    });

    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});


//添加模板所需的三个变量
/*app.use(async (ctx, next) => {


    await next();
});*/


// routes
// console.log(index.routes())
// app.use(index.routes(), index.allowedMethods())
routes(app);

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
