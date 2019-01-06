const mongoose = require('mongoose');
const db = mongoose.connect("mongodb://localhost:27017/blog", {useNewUrlParser: true}, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Connection success!")
    }
});
const Schema = mongoose.Schema;

// 文章表
let articleSchema = new Schema({
    article_title: String,
    article_tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag'
    }],
    article_create_time: {type: String, default: util.formatDate(new Date())},
    article_update_time: {type: String, default: util.formatDate(new Date())},
    article_state: {
        type: Number,
        defaule: 1 // 0 => draft  1=> published
    },
    article_cover: String,
    article_desc: String,
    article_content: String,
    article_render_content: String,
    article_navigation: [{
        name: String,
        id: String
    }],
    read_num: {
        type: Number,
        default: 0
    }
});

// 标签表
let TagsSchema = new Schema({
    tags_name: String,
    tags_desc: String
});

// 作品表
let worksSchema = new Schema({
    works_name: String,
    works_desc: String,
    works_time: String,
    works_website: String,
    works_cover: String,
});

// 上传文件表
let uploadSchema = new Schema({
    image_origin_name: String,
    image_name: String,
    create_date: {type: String, default: util.formatDate(new Date())},
    image_size: String,
    image_url: String,
    image_path: String,
    fold_id: String
});

// 文件目录表
let FoldSchema = new Schema({
    // id: mongoose.Schema.ObjectId,
    name: String,
    parentId: String
});

// 管理员表
let AdminSchema = new Schema({
    admin_name: String,
    admin_id: String,
    admin_pwd: String,
    token: {
        type: String,
        default: ''
    },
});

// 设置表
let settingSchema = new Schema({
    person_info: {
        avatar: String, /*头像*/
        cover: String, /*封面*/
        description: String, /*描述*/
        github: String,
        twitter: String,
        juejin: String,
    },
    about: {
        picture: String,
        description: String
    },
    upyun_cos: {
        bucket: String,
        operatorname: String,
        operatorpwd: String,
        endpoint: String,
    }
});

// 验证码
let checkcodeSchema = new Schema({
    token: String,
    code: String
});

exports.Article = mongoose.model('Article', articleSchema);
exports.Tag = mongoose.model('Tag', TagsSchema);
exports.Work = mongoose.model('Work', worksSchema);
exports.Upload = mongoose.model('Upload', uploadSchema);
exports.Fold = mongoose.model('Fold', FoldSchema);
exports.Admin = mongoose.model('Admin', AdminSchema);
exports.Setting = mongoose.model('Setting', settingSchema);
exports.Checkcode = mongoose.model('Checkcode', checkcodeSchema); 