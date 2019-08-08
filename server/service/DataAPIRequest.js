const request = require('request-promise')
const utils = require('../common/utils')
const SERVER_ROOT = gConfig.dataAPIServer
module.exports = {
  balances: function (ctx, next) {
    let params = ctx.request.query
    let account = ctx.params.account
    return request({
      uri: SERVER_ROOT + '/accounts/' + account + '/balances',
      qs: params,
      json: true
    }).then(ctx.responseData, ctx.responseError)
  },
  ledgers: function (ctx, next) {
    let params = ctx.request.query
    return request({
      uri: SERVER_ROOT + '/ledgers',
      qs: params,
      json: true
    }).then(ctx.responseData, ctx.responseError)
  },
  payments: function (ctx, next) {
    let params = ctx.request.query
    return request({
      uri: SERVER_ROOT + '/payments',
      qs: params,
      json: true
    }).then(ctx.responseData, ctx.responseError)
  },
  paymentsCurrency: function (ctx, next) {
    let params = ctx.request.query
    let currency = ctx.params.currency
    return request({
      uri: SERVER_ROOT + '/payments/' + currency,
      qs: params,
      json: true
    }).then(ctx.responseData, ctx.responseError)
  },
  
  /* add */
  transactionsTotal: async function (ctx, next) {
    let params = ctx.request.query
    const postData = {
      uri: SERVER_ROOT + '/transactionsCount',
      qs: params,
      json: true
    }
    const res = await request(postData);
    if(res.result == 'success'){
      const _res = res.total
      ctx.responseData(_res)
    }else{
      ctx.responseError(res)
    }

  },
  ledgerList: async function (ctx, next) {
    let params = ctx.request.query
    const postData ={
      uri: SERVER_ROOT + '/ledgerList',
      qs: params,
      json: true
    }
    const res = await request(postData);
    if(res.result == 'success'){
      ctx.responseData(res)
    }else{
      ctx.responseError(JSON.stringify(res))
    }
  },
  ledgerDetail: async function (ctx, next) {
    let params = ctx.request.query
    let ledger = ctx.params.ledger
    const postData = {
      uri: SERVER_ROOT + '/ledgerList/'+ledger,
      qs: params,
      json: true
    }
    const res = await request(postData);
    if(res.result == 'success'){
      ctx.responseData(res)
    }else{
      ctx.responseError(JSON.stringify(res))
    }
  },
  transactions: async function (ctx, next) {
    let params = ctx.request.query
    const postData = {
      uri: SERVER_ROOT + '/transactions',
      qs: params,
      json: true
    }
    const res = await request(postData);
    if(res.result == 'success'){
      const _transactions = res.transactions.map(utils.parseTransaction);
      const _res = {
        count:res.count,
        total:res.total,
        marker:res.marker,
        transactons:_transactions
      }
      ctx.responseData(_res)
    }else{
      ctx.responseError(JSON.stringify(res))
    }
  },
  transaction: async function (ctx, next) {
    let params = ctx.request.query
    let hash = ctx.params.hash
    const postData = {
      uri: SERVER_ROOT + '/transactions/' + hash,
      qs: params,
      json: true
    }
    const res = await request(postData);
    if(res.result == 'success'){
      const _transaction = utils.parseTransaction(res.transaction,true)
      const _res = _transaction
      ctx.responseData(_res)
    }else{
      ctx.responseError(JSON.stringify(res))
    }
  },
  transactionsAccount: async function (ctx, next) {
    let params = ctx.request.query
    let account = ctx.params.account
    const postData = {
      uri: SERVER_ROOT + '/accounts/'+account+'/transactions',
      qs: params,
      json: true
    }
    const res = await request(postData);
    if(res.result == 'success'){
      const _transactions = res.transactions.map(utils.parseTransaction);
      const _res = {
        count:res.count,
        total:res.total,
        marker:res.marker,
        transactons:_transactions
      }
      ctx.responseData(_res)
    }else{
      ctx.responseError(JSON.stringify(res))
    }
  },
}
