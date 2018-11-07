/*
 * @Author: jrucker
 * @Date: 2018-08-22 11:46:36
 * @Last Modified by: jrucker
 * @Last Modified time: 2018-09-06 16:33:43
 */
const router = require('koa-router')();
const fs = require('fs');
const COS = require('cos-nodejs-sdk-v5');
const multer = require('koa-multer');
const uploadModel = require('../models/upload');
const Upload = require('../db').Upload;

router.prefix('/api/upload');

let cos = new COS({
    AppId: '1257113200',
    SecretId: 'AKID7DMTXS9Zt493oNe6HXMB2pRQK8wdtTbW',
    SecretKey: 'xqnU3RiqKvWzHDJ8sVfhXOBxY0SmxGUW',
});

let tengxun_cos = {
    Bucket: 'blog-image-dev-1257113200',
    Region: 'ap-chengdu',
};

//文件上传
//配置
let storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'tmp/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

// 创建文件夹
let createFolder = function (folder) {
    try {
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    } catch (e) {
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

// let upload = multer({dest: './tmp/'});
let uploadFolder = './tmp/';
createFolder(uploadFolder);

// 创建 multer 对象
let upload = multer({storage: storage});

/*图片上传*/
router.post('/pic', upload.single('file'), async (ctx, next) => {
    let filePath = './' + ctx.req.file.path;
    let temp = ctx.req.file.originalname.split('.');
    let fileType = temp[temp.length - 1];
    let lastName = '.' + fileType;
    let fileName = Date.now() + lastName;

    console.log(ctx.req.file);
    let file_name = ctx.req.file.originalname;
    let file_desc = ctx.req.file.path;
    let file_size = ctx.req.file.size;

    try {
        // let localFile = './' + fileName;
        let localFile = filePath;
        let params = {
            Bucket: tengxun_cos.Bucket,
            Region: tengxun_cos.Region,
            Key: fileName,
            FilePath: localFile
        };

        const uploadFile = params => {
            return new Promise((resolve, reject) => {
                cos.sliceUploadFile(params, (err, data) => {
                    if (!err) {
                        let url = `https://${params.Bucket}.file.myqcloud.com/${params.Key}`;
                        resolve({err, url});
                    } else {
                        resolve({err});
                    }
                })
            })
        };

        let res = await uploadFile(params);

        if (res.err) {
            fs.unlinkSync(localFile);
            ctx.body = {
                code: 101,
                msg: '上传失败',
            }
        } else {
            fs.unlinkSync(localFile);
            let upload = new Upload({
                file_name, file_desc, file_size, file_key: fileName, file_url: res.url
            });
            await upload.save();
            ctx.body = {
                code: 200,
                msg: '上传成功'
            }
        }
    } catch (e) {
        ctx.body = {
            code: 101,
            msg: '上传失败'
        }
    }
});

/*查询上传列表*/
router.get('/list', async ctx => {
    let {current_page = 1, page_size = 10} = ctx.query;
    try {
        let options = {
            sort: {'file_time': '-1'},
            skip: Number((current_page - 1) * page_size),
            limit: Number(page_size)
        };

        let res = await uploadModel.find_all({options});
        ctx.body = {
            code: 200,
            msg: '查询成功！',
            data: res
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '获取列表失败！'
        }
    }
});

router.delete('/list/:id', async ctx => {
    let _id = ctx.params.id;
    const obj = query => new Promise(resolve => Upload.find(query, (err, doc) => resolve(err ? [] : doc)));
    let [query] = await obj({_id: _id});

    try {
        if (_id.length != 24) {
            ctx.body = {
                code: 401,
                msg: '删除失败，id有误!'
            };
            return;
        }
        await uploadModel.delete(_id);

        const deleteFile = params => {
            return new Promise((resolve, reject) => {
                cos.deleteMultipleObject({
                    Bucket: params.Bucket, // Bucket 格式：test-1250000000
                    Region: params.Region,
                    Objects: [
                        {Key: params.file_key}
                    ]
                }, (err, data) => {
                    err || resolve({err, data});
                });
            })
        };

        let res = await deleteFile({
            Bucket: tengxun_cos.Bucket,
            Region: tengxun_cos.Region,
            file_key: query.file_key
        });

        if (!res.err) {
            ctx.body = {
                code: 200,
                msg: '删除成功！'
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '删除失败！'
        }
    }
});


/*router.post('/pic', upload.single('file'), async (ctx, next) => {
    console.log(ctx);
    // 文件路径
    let filePath = './' + ctx.req.file.path;
    // 文件类型
    let temp = ctx.req.file.originalname.split('.');
    let fileType = temp[temp.length - 1];
    let lastName = '.' + fileType;
    // 构建图片名
    let fileName = Date.now() + lastName;
    // 图片重命名
    fs.rename(filePath, fileName, (err) => {
        if (err) {
            ctx.body = {
                code: 102,
                msg: '文件写入失败'
            }
        } else {
            let localFile = './' + fileName;
            let key = fileName;

            // 腾讯云 文件上传
            let params = {
                Bucket: tengxun_cos.Bucket, /!* 必须 *!/
                Region: tengxun_cos.Region, /!* 必须 *!/
                Key: key, /!* 必须 *!/
                FilePath: localFile, /!* 必须 *!/
            };
            cos.sliceUploadFile(params, function (err, data) {
                if (err) {
                    fs.unlinkSync(localFile);
                    ctx.body = {
                        code: 101,
                        msg: '上传失败',
                    }
                    // res.end(JSON.stringify({status: '101', msg: '上传失败', error: JSON.stringify(err)}));
                } else {
                    fs.unlinkSync(localFile);
                    let imageSrc = 'http://devimage-1***********4.cossh.myqcloud.com/' + data.Key;
                    ctx.body = {
                        code: 100,
                        msg: '上传成功',
                        data: imageSrc
                    }
                    // res.end(JSON.stringify({status: '100', msg: '上传成功', imageUrl: imageSrc}));
                }
            });
        }
    });
});*/

module.exports = router;