const routerUtil = require('chestnut-router');
const router = routerUtil.create('/access');// 代表父目录为/access

const accessController = require('../controllers/access');

const fetch = require('chestnut-utils').fetch;

module.exports = router
    .get('/download', async function(ctx){
        var rsp = await fetch('https://www.baidu.com/img/baidu_jgylogo3.gif', {
            encoding: null // 当设置为null时， rsp.body的类型为buffer
        });
        body = rsp.body;
        ctx.type = 'gif'; // 建议设置，相当于设置content-type
        ctx.length = Buffer.byteLength(body); // 建议设置，相当于设置content-length
        ctx.body = body; // buffer可以直接返回

    })
    .get('/download-pipe', async function(ctx){
        ctx.body = fetch('https://www.baidu.com/img/baidu_jgylogo3.gif', {
            
        }, true); // fetch第三个设置为true返回是可pipe类型，也可以是一个function，可以接收到到三个参数err, rsp, body用于判断是否请求成功和失败处理

    })
    .post('/login', accessController.login);// post请求，请求路径即为/access/login，如果config中配置了projectPath则需要在路径前加上