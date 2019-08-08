'use strict'
const request = require('request-promise')


async function cableHealth(){
  let rst = {}
  try {
    rst =  await request({
      method: 'GET',
      uri: gConfig.cableServer + '/server',
      qs: {},
      json: true
    })
  } catch (e) {
    rst.error = e.message;
    gLog.error(e);
  }
  return rst
}

async function dataHealth(){
  let rst = {}
  try {
    rst =  await request({
      method: 'GET',
      uri: gConfig.dataAPIServer + '/ledgers',
      qs: {},
      json: true
    })
  } catch (e) {
    rst.error = e.message;
  }
  return rst
}

async  function inspect (ctx, next) {
  const querys = ctx.query;
  if (querys.token != gConfig.token) {
    ctx.responseError('token error');
      return;
  }
  const health = {
    status: 'UP',
    dataapi: {
      status: 'UP',
      url: gConfig.dataAPIServer
    },
    cable: {
      status: 'UP',
      url: gConfig.cableServer
    }
  }
  const rss = await Promise.all([cableHealth(), dataHealth()]);
  let status = true;
  if (rss[0].error) {
    health.cable.status = 'DOWN'
    status = false;
  }
  if (rss[1].error) {
    health.dataapi.status = 'DOWN'
    status = false;
  }
  if(!status){
    health.status = 'DOWN'
  }
  ctx.responseData(health);
}

function tokenDetail (ctx, next) {
  const currency=gConfig.tokenDetail
  ctx.responseData(currency);
}



module.exports = {
  inspect,
  tokenDetail
}
