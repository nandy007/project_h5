

// 添加反向代理设置x-forwarded-for头信息
const rule4 = function (options) {
	return function (req, res, proxy) {
        const target = options.servers.shift();
        let opts = { target: target, headers: {}, secure: false };
        options.servers.push(target);
        req.headers.host = target.split('://')[1];
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
        if(req.headers['access-control-request-headers']) {
            res.setHeader("Access-Control-Allow-Headers", options.allowHeaders || req.headers['access-control-request-headers']);
        }

	    // 通过代理指向分配的服务器
	    if(req.method.toLowerCase()==='options') {
            // 复杂请求响应
            res.writeHead(204);
            res.write('');
            res.end('');
        }else{
            // 其他请求响应
            proxy.web(req, res, opts);
        }
    }
};

const rule1 = function (options) {
	return function (req, res, proxy) {
        req.headers.host = 'www.baidu.com';
        const target = 'https://www.baidu.com';
        let opts = { target: target, headers: {}, secure: false };
       
        // 其他请求响应
        proxy.web(req, res, opts);
        
    }
};


module.exports = {
    port: 80,
	rule: rule4,
	servers: [
        'http://172.16.70.240:8666'
	]
};