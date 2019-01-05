

const {ReceiveReverseProxy, SendReverseProxy} = require('./mail');

// new ReceiveReverseProxy({
//     local: {
//         port: 11024
//     },
//     target: {
//         port: 993,
//         host: 'partner.outlook.cn'
//     }
// });

// new SendReverseProxy({
//     local: {
//         port: 11025
//     },
//     target: {
//         port: 25,
//         host: 'partner.outlook.cn'
//     }
// });

new ReceiveReverseProxy({
    local: {
        port: 11024
    },
    target: {
        port: 993,
        host: 'imap.126.com'
    }
});

new SendReverseProxy({
    local: {
        port: 11025
    },
    target: {
        port: 465,
        host: 'smtp.126.com'
    }
});



// new ReceiveReverseProxy({
//     local: {
//         port: 11026
//     },
//     target: {
//         port: 995,
//         host: 'pop.gmail.com'
//     }
// });

// new SendReverseProxy({
//     local: {
//         port: 11027
//     },
//     target: {
//         port: 465,
//         host: 'smtp.gmail.com'
//     }
// });