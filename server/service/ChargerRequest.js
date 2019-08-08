const request = require('request-promise')
const SERVER_ROOT = gConfig.chargerServer;

module.exports = {

    /**
     * 二级通证列表
     * @author sunjialei
     * @date 2019-3-14 10:40
     * @param {*} ctx 
     */
    secondCurrencyList(ctx, next) {
        let page = ctx.request.query.page
        let rows = ctx.request.query.rows
        return request({
            method: 'post',
            uri: `${SERVER_ROOT}/currency/getCurrencyPaLists`,
            form: {
                page: page,
                rows: rows
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            json: true
        }).then(res => {
            ctx.responseData(res)
        }).catch(err => {
            ctx.responseError(err)
        })
    },


    /**
     * 二级通证详情
     * @author sunjialei
     * @date 2019-3-22 9:26
     * @param {*} ctx 
     * @param {*} next 
     */
    secondCurrencyDetail(ctx, next) {
        let params = ctx.request.query;
        return request({
            method: 'POST',
            uri: `${SERVER_ROOT}/currency/getSingleCurrency`,
            form: {
                currency: params.currency
            },
            json: true
        }).then(res => {
            ctx.responseData(res)
        }).catch(err => {
            ctx.responseError(err)
        });
    },


    /**
     * 通证比例
     * @author sunjialei
     * @date 2019-3-14 11:03
     * @param {*} ctx 
     */
    currencyProportion(ctx) {
        let query = ctx.request.query
        return request({
            method: 'post',
            uri: `${SERVER_ROOT}/currency/getCurrencyBalancePercent`,
            form: {
                page: query.page,
                rows: query.rows,
                currency: query.currency
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            json: true
        }).then(res => {
            ctx.responseData(res)
        }).catch(err => {
            ctx.responseError(err)
        })
    }


}