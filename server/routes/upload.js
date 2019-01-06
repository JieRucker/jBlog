/**
 * @Author: jrucker
 * @Date: 2018-08-22 11:46:36
 * @Last Modified by: jrucker
 * @Last Modified time: 2018-09-06 16:33:43
 */
const router = require('koa-router')();
const fs = require('fs');
// const COS = require('cos-nodejs-sdk-v5');
const multer = require('koa-multer');
const uploadModel = require('../models/upload');
const Upload = require('../db').Upload;
const UPYUN = require('upyun-classic');
const {judge_source} = require("../libs/token");
const Mongoose = require('mongoose');
const ObjectId = Mongoose.Types.ObjectId;

router.prefix('/api/upload');

/*let cos = new COS({
    AppId: '1257113200',
    SecretId: 'AKID7DMTXS9Zt493oNe6HXMB2pRQK8wdtTbW',
    SecretKey: 'xqnU3RiqKvWzHDJ8sVfhXOBxY0SmxGUW',
});

let tengxun_cos = {
    bucket: 'blog-image-dev-1257113200',
    region: 'ap-chengdu',
};*/

let upyun_cos = {
    bucket: 'blog-image-dev',
    operatorname: 'jrucker',
    operatorpwd: 'asia162012',
    endpoint: 'v0'
};

let upyun = new UPYUN(upyun_cos.bucket, upyun_cos.operatorname, upyun_cos.operatorpwd, upyun_cos.endpoint);

//文件上传配置
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
router.post('/pic/:id', upload.single('file'), async (ctx, next) => {
    // console.log(ctx.req.file);

    let fold_id = ctx.params.id;

    let local_file = './' + ctx.req.file.path;
    let temp = ctx.req.file.originalname.split('.');
    let file_type = temp[temp.length - 1];
    let last_name = '.' + file_type;
    let image_name = Date.now() + last_name;

    let image_origin_name = ctx.req.file.originalname;
    let image_path = ctx.req.file.path;
    let image_size = ctx.req.file.size;

    try {
        /*let params = {
            Bucket: tengxun_cos.Bucket,
            Region: tengxun_cos.Region,
            fileName: fileName,
            FilePath: local_file
        };*/

        let params = {
            bucket: upyun_cos.bucket,
            image_name: image_name,
            local_file: local_file
        };

        const uploadImage = params => {
            return new Promise((resolve, reject) => {
                upyun.uploadFile(`/image/${params.image_name}`, params.local_file, null, null, null, (err, result) => {
                    if (!err) {
                        let url = `http://${params.bucket}.test.upcdn.net/image/${params.image_name}`;
                        resolve({err, url});
                    } else {
                        resolve({err});
                    }
                })

                /*cos.sliceUploadFile(params, (err, data) => {
                    if (!err) {
                        let url = `https://${params.bucket}.file.myqcloud.com/${params.fileName}`;
                        resolve({err, url});
                    } else {
                        resolve({err});
                    }
                })*/
            })
        };

        let res = await uploadImage(params);

        if (res.err) {
            fs.unlinkSync(local_file);
            ctx.body = {
                code: 101,
                msg: '上传失败',
            }
        } else {
            fs.unlinkSync(local_file);
            let upload = new Upload({
                image_origin_name, image_path, image_size, image_name, image_url: res.url, fold_id
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
    let {id, current_page = 1, page_size = 10} = ctx.query;

    try {
        let mark = await judge_source(ctx);
        if (!mark) {
            return false
        }

        let querys = {
            fold_id: new ObjectId(id)
        };

        let fields = {
            fold_id: 0
        };

        let options = {
            sort: {'create_date': '-1'},
            skip: Number((current_page - 1) * page_size),
            limit: Number(page_size)
        };
        let res = await uploadModel.find_all({querys, fields, options});
        let total = await Upload.countDocuments(querys);

        ctx.body = {
            code: 200,
            msg: '查询成功！',
            data: {
                list: res || [],
                total
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '获取列表失败！'
        }
    }
});

/*修改文件目录*/
router.patch('/:id', async ctx => {
    let {
        _id,
        fold_id = ''
    } = ctx.request.body;

    try {
        let res = await uploadModel.update(_id, {
            fold_id
        });
        if (res) {
            ctx.body = {
                code: 200,
                msg: '修改成功！',
                data: res
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '修改失败！'
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: '修改失败！！'
        }
    }
});

/*删除文件*/
router.delete('/list/:id', async ctx => {
    let _id = ctx.params.id;
    let [upload] = await uploadModel.find_by_id(_id);

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
            return new Promise(resolve => {
                upyun.removeFile(`/image/${params.image_name}`, (err, result) => resolve({err, result}))
                /*cos.deleteMultipleObject({
                    Bucket: params.bucket, // Bucket 格式：test-1250000000
                    Region: params.region,
                    Objects: [
                        {Key: params.file_key}
                    ]
                }, (err, data) => {
                    err || resolve({err, data});
                });*/
            })
        };

        /*let res = await deleteFile({
            bucket: tengxun_cos.Bucket,
            region: tengxun_cos.Region,
            file_key: query.file_key
        });*/

        let res = await deleteFile({
            image_name: upload.image_name
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