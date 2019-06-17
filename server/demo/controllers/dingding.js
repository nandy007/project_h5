const code = require('../configs/code');

// 页面抓取相关工具集
const { fetch, jqlite, oauth } = require('chestnut-utils');

const appKey = 'dinglsttbc57rdj4dimy', appSecret = 'm5wCQfGJkDEPVsEHkUxqgdwEANwzeAGI7qjqrBdPCRA67L-9BoXVjC6rq9RMbBd6',
agentId = '270181607', corpId = 'ding59876f8d16e27a9235c2f4657eb6378f';

function sign(ticket, url){
    // if(!ticket) return {};
    const nonceStr = oauth.createNonceStr(), timeStamp = oauth.createTimeStamp();
    const plain = oauth.raw({
        jsapi_ticket: ticket,
        noncestr: nonceStr,
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

let _token;
async function getToken(){
    if(_token && oauth.isExpi(_token.ts)){
        return _token
    }
    const ts = oauth.createTimeStamp();
    const accessTokenRs = await fetch(`https://oapi.dingtalk.com/gettoken?appkey=${appKey}&appsecret=${appSecret}`, {});
    const accessTokenInfo = oauth.getBody(accessTokenRs);
    if(accessTokenInfo.access_token){
        accessTokenInfo.ts = ts;
        _token = accessTokenInfo;
    }
    return _token;
}
let _ticket;
async function getTicket(access_token){
    if(!access_token) return null;
    if(_ticket && oauth.isExpi(_ticket.ts)){
        return _ticket;
    }
    const ticketRs = await fetch(`https://oapi.dingtalk.com/get_jsapi_ticket?access_token=${access_token}`, {});
    const ticketInfo = oauth.getBody(ticketRs);
    if(ticketInfo.ticket){
        ticketInfo.ts = oauth.createTimeStamp();
        _ticket = ticketInfo;
    }
    return _ticket;
}

module.exports = {
    async getConfig(ctx){

        const accessTokenInfo = await getToken();

        const ticketInfo = await getTicket(accessTokenInfo && accessTokenInfo.access_token);

        const url = ctx.headers['referer'];

        const config = sign(ticketInfo && ticketInfo.ticket, url);

        ctx.body = `
            var dingJsConfig = ${JSON.stringify(config)};
        `;
        
    },
    // async dingdingPage(ctx){
    //     await ctx.render('dingdingPage.ejs')
    // }
};