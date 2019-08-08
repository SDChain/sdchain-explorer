const request = require('request-promise');
const SERVER_ROOT = gConfig.cableServer;
module.exports = {
    newWallet: function (ctx, next) {
        let params = ctx.params;
        return request({
            uri: SERVER_ROOT + '/wallet/new',
            qs: params,
            json: true
        }).then(ctx.responseData, ctx.responseError);
    },
    balances: function (ctx, next) {
        let query = ctx.request.query
        let account = ctx.params.account;
        let url = SERVER_ROOT + '/accounts/balances/'+account

        return request({
            uri: url,
            qs: query,
            json: true
        }).then(ctx.responseData, ctx.responseError);
    },
    gatewayBalances: async function (ctx, next) {
        let params = ctx.request.query
        let account = ctx.params.account;
        const postData = {
            uri: SERVER_ROOT + '/accounts/gatewayBalances/'+account,
            qs: params,
            json: true
        }
        const res = await request(postData);
        if(res.result == 'success'){
          ctx.responseData(res)
        }else{
          ctx.responseError(res)
        }
    },
    tokenDetail: async function (ctx, next) {
        const tokenDetail = gConfig.tokenDetail
        let params = ctx.request.query
        let account =tokenDetail.issuer;
        const postData = {
            uri: SERVER_ROOT + '/accounts/gatewayBalances/'+account,
            qs: params,
            json: true
        }
        const res = await request(postData);
        if(res.success === true){
            const lang = params.lang||tokenDetail.lang
            const _res = {
                currency:tokenDetail.currency,
                issuer:tokenDetail.issuer,
                image:tokenDetail.image,
                total:Number(res.obligations[tokenDetail.currency]).toFixed(0).toString(),
                lang: lang,
                dec:tokenDetail.desc[lang]
            }
          ctx.responseData(_res)
        }else{
          ctx.responseError(res)
        }
    },
    server: function (ctx, next) {
        let params = ctx.params;
        return request({
            uri: SERVER_ROOT + '/server',
            qs: params,
            json: true
        }).then(ctx.responseData, ctx.responseError);
    },


    /**
     * 二级通证流通总量
     * @author sunjialei
     * @date 2019-3-22 10:29
     * @param {*} ctx 
     * @param {*} next 
     */
    totalCirculation(ctx, next) {
        let query = ctx.request.query
        return request({
            uri: `${SERVER_ROOT}/accounts/gatewayBalances/${query.address}`,
            method: 'get',
            json: true
        }).then(res => {
            ctx.responseData(res)
        }).catch(err => {
            ctx.responseError(err)
        })
    },


    /**
     * 判断是否是发行商
     * @author sunjialei
     * @date 2019-3-22 14:08
     * @param {*} ctx 
     */
    isIssuer(ctx) {
        let query = ctx.request.query
        return request({
            uri: `${SERVER_ROOT}/accounts/settings/${query.address}`,
            method: 'get',
            json: true
        }).then(res => {
            ctx.responseData(res)
        }).catch(err => {
            ctx.responseError(err)
        })
    }
}