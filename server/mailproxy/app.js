

const {ReceiveReverseProxy, SendReverseProxy} = require('./mail');

new ReceiveReverseProxy({
    local: {
        port: 11024
    },
    target: {
        port: 995,
        host: 'partner.outlook.cn'
    }
});

new SendReverseProxy({
    local: {
        port: 11025
    },
    target: {
        port: 25,
        host: 'partner.outlook.cn'
    }
});