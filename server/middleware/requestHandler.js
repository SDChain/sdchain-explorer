"use strict";
const util = require('util');

module.exports = function () {
    return async function (ctx, next) {
        const method = ctx.method;
        const path = ctx.path;
        let requestParams = '';
        if (ctx.request.query) { // 请求参数
            requestParams = JSON.stringify(ctx.request.query);
        }
        let requestBody = '';
        if (ctx.request.body) { // 请求body
            requestBody = JSON.stringify(ctx.request.body);
        }
        const message = util.format('request: %s - %s ? %s => %s', method, path, requestParams, requestBody);
        gLog.debug(message);
        await next();
    }
};
