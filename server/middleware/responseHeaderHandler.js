"use strict";
const connectHistory = require('connect-history-api-fallback');

module.exports = function () {
    const middleware = connectHistory();
    const noop = () => {

    };
    return async function (ctx, next) {
        const path = ctx.path;
        const rootUrl = path.substring(0, gConfig.apiRoot.length)
        if (rootUrl != gConfig.apiRoot) {
            ctx.set('Cache-Control', 'max-age=' + gConfig.staticCacheAge);
            middleware(ctx, null, noop);
        } else {
            ctx.set('Cache-Control', 'max-age=0');
        }
        await next();
    };
};
