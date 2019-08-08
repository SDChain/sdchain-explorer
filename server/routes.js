'use strict';
const Router = require('koa-router');
const service = require('./service');

class Routes {
    constructor() {
    }

    router() {
        const self = this;
        const options = {};
        if (gConfig.apiRoot) {
            options.prefix = gConfig.apiRoot;
        }
        const router = new Router(options);

        router.get('/cable/server', async (ctx, next) => {
           await service.server(ctx, next);
        });
        router.get('/cable/accounts/balances/:account', async (ctx, next) => {
            await service.balances(ctx, next);
        });


        // 二级通证列表
        router.get('/charger/secondCurrencyList', async (ctx, next) => {
            await service.secondCurrencyList(ctx, next)
        })

        // 二级通证详情
        router.get('/charger/secondCurrencyDetail', async (ctx, next) => {
            await service.secondCurrencyDetail(ctx, next)
        })

        //二级通证流通总量
        router.get('/cable/totalCirculation', async (ctx, next) => {
            await service.totalCirculation(ctx, next)
        })

        // 通证比例
        router.get('/charger/currencyProportion', async (ctx, next) => {
            await service.currencyProportion(ctx, next)
        })

        //是否是发行商
        router.get('/cable/isIssuer', async(ctx, next) => {
            await service.isIssuer(ctx, next)
        })

        //二级通证详情chart
        router.get('/data/currencyChart', async(ctx, next) => {
            await service.currencyChart(ctx, next)
        })

        // router.get('/data/ledgers', async (ctx, next) => {
        //     await service.ledgers(ctx, next);
        // });
        // router.get('/data/cLedgers', async (ctx, next) => {
        //     await service.cLedgers(ctx, next);
        // });
        router.get('/data/cTransactions', async (ctx, next) => {
            await service.cTransactions(ctx, next);
        });
        router.get('/data/payments', async (ctx, next) => {
            await service.payments(ctx, next);
        });

        // 通证交易记录
        router.get('/data/accounts/:account/transactions', async (ctx, next) => {
            await service.transactionsAccount(ctx, next);
        });
        router.get('/data/payments/:currency', async (ctx, next) => {
            await service.paymentsCurrency(ctx, next);
        });

        /* add */

        router.get('/data/txCharts', async (ctx, next) => {
            await service.txCharts(ctx, next);
        });

        router.get('/data/transactionsTotal', async (ctx, next) => {
            await service.transactionsTotal(ctx, next);
        });

        router.get('/data/ledgers', async (ctx, next) => {
            await service.ledgerList(ctx, next);
        });

        router.get('/data/ledgers/:ledger', async (ctx, next) => {
            await service.ledgerDetail(ctx, next);
        });
        router.get('/data/transactions', async (ctx, next) => {
            await service.transactions(ctx, next);
        });
        router.get('/data/transactions/:hash', async (ctx, next) => {
            await service.transaction(ctx, next);
        });
        router.get('/health', async (ctx, next) => {
            await service.health(ctx, next);
        });
        router.get('/cache/tokenDetail', async (ctx, next) => {
            await service.tokenDetail(ctx, next);
        });
        return router;


    }
}

module.exports = Routes;