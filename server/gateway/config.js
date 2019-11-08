

var URL = require('url');
var bodyParser = require('co-body');
class ProxyResponse{
    constructor(res, methods){
        this.initMethods(methods);
        this.useProxy = false;
        this.res = res;
        this.hackRes();
    }

    initMethods(methods){
        this.methods = Object.assign({
            write: {},
            end: {}
        }, methods||{});
    }

    hackMethods(){
        for(const method in this.methods){
            const _origin = this.methods[method] = this.res[method];
            const _temps = [];
            this.res[method] = (...args)=>{
                if(!this.useProxy){
                    let cur;
                    while(cur=_temps.shift()){
                        _origin.apply(this.res, cur);
                    }
                    _origin.apply(this.res, args);
                    return;
                }
                _temps.push(args);
            };
        }
    }

    hackRes(){
        this.hackMethods();
        this.res.on('finish', ()=>{
            this.res = null;
        });
    }

    exeMethod(method, ...args){
        const _origin = this.methods[method] || (this.res && this.res[method]);
        _origin && _origin.apply(this.res, args);
    }
}
const gatewayRule = function (options) {
    
	return async function (req, res, proxy) {
        
        var referer = req.headers.referer, refererPath = referer ? URL.parse(referer).pathname : '';
        var target = '';
        var proxyRes = new ProxyResponse(res);
        if(req.url==='/error'){
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.write('访问错了');
            res.end();
            return;
        }else if(req.url.indexOf('/www')===0 || refererPath.indexOf('/www')===0){
            req.headers.host = 'zt.zhizhangyi.com';
            // req.headers.port = 9074;
            // req.url = req.url.replace('/www', '/www');
            var urlObj = URL.parse(req.url, true);
            if(urlObj.pathname.indexOf('/www/index.php')===0 && req.method==='POST'){

                proxyRes.useProxy = true;

                var body = bodyParser.form(req);

                body.then((rs)=>{
                    if(['zhangsan', 'lisi', 'wangwu'].indexOf(rs.account)>-1){
                        proxyRes.exeMethod('setHeader', 'Content-Type', 'text/html;charset=utf-8');
                        proxyRes.exeMethod('write', `<html><meta charset='utf-8'/><style>body{background:white}</style><script>alert('自定义拦截内容：登录用户${rs.account}已受限')
                        </script>
                        <html><meta charset='utf-8'/><style>body{background:white}</style><script>if(window.parent) window.parent.$.enableForm();
                        </script>
                        `);
                        proxyRes.exeMethod('end');
                    }else{
                        proxyRes.useProxy = false;
                    }
                });
                
            }
            target = 'http://zt.zhizhangyi.com';
        }else{
            req.headers.host = 'www.baidu.com';
            target = 'https://www.baidu.com';
        }
        

        let opts = { target: target, headers: {}, secure: false };
       
        // 其他请求响应
        proxy.web(req, res, opts);
        
    }
};


module.exports = {
    port: 80,
	rule: gatewayRule,
};