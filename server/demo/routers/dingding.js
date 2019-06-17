const routerUtil = require('chestnut-router');
const router = routerUtil.create('/access/dingding');// 代表父目录为/insterface

const dingdingController = require('../controllers/dingding');

module.exports = router
    // .get('/launchApp.html', dingdingController.dingdingPage)
    .get('/config', dingdingController.getConfig);// get请求，请求路径即为/interface/list，如果config中配置了projectPath则需要在路径前加上