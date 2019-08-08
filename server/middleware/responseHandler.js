"use strict";

const util = require('util');
module.exports = function () {
    return async function (ctx, next) {
        ctx.responseError = (err, code = gErrorCode.REQUEST_ERROR) => {
            ctx.body = { code: code, message: err.message ? err.message : err.toString() };
            return false;
        }

        ctx.responseData = (data) => {
            ctx.body = { code: gErrorCode.SUCCESS, data: data };
        }

        try {
            await next();
        } catch (err) {
            ctx.body = { code: gErrorCode.UNKNOW_ERROR, message: err.toString() };
            gLog.error(err.toString());
        }
    };
};
