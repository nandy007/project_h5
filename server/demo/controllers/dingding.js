const code = require('../configs/code');

// 页面抓取相关工具集
const { fetch, jqlite, oauth } = require('chestnut-utils');

const appKey = 'dinglsttbc57rdj4dimy', appSecret = 'm5wCQfGJkDEPVsEHkUxqgdwEANwzeAGI7qjqrBdPCRA67L-9BoXVjC6rq9RMbBd6',
agentId = '270181607', corpId = 'ding59876f8d16e27a9235c2f4657eb6378f';

function sign(ticket, url){
    const nonceStr = oauth.createNonceStr(), timeStamp = oauth.createTimeStamp();
    const plain = oauth.raw({
        jsapi_ticket: ticket,
        noncestr: noncestr,
        timestamp: timeStamp,
        url: url
    });

    // url，nonceStr，agentId，timeStamp，corpId，signature
    return {
        signature: oauth.getSign(plain),
        nonceStr: nonceStr,
        timeStamp: timeStamp,
        ticket: ticket,
        url: url,
        agentId: agentId,
        corpId: corpId
    };
};

module.exports = {
    async getConfig(ctx){

        const accessTokenRs = await fetch(`https://oapi.dingtalk.com/gettoken?appkey=${appKey}&appsecret=${appSecret}`, {});

        const accessTokenInfo = oauth.getBody(accessTokenRs);
// console.log(accessTokenInfo)
        const ticketRs = await fetch(`https://oapi.dingtalk.com/get_jsapi_ticket?access_token=${accessTokenInfo.access_token}`, {});

        const ticketInfo = oauth.getBody(ticketRs);
        console.log(ticketInfo)
        const url = ctx.headers['referer'];

        const config = sign(ticketInfo.ticket, url);

        ctx.body = `
            var dingJsConfig = ${JSON.stringify(config)};
        `;
        
    },
    // async dingdingPage(ctx){
    //     await ctx.render('dingdingPage.ejs')
    // }
};