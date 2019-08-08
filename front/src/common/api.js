const api = {
    transactionsTotal:'api/data/transactionsTotal', //交易总量
    txCharts:'api/data/txCharts', //交易统计
    ledgers:'api/data/ledgers', //区块高度列表 （详情）param: ledger
    
    transactions:'api/data/transactions', //交易记录 （详细）  param :hash
    accounts:'api/data/accounts', // 账户交易历史 :account/transactions
    balances:'api/cable/accounts/balances', //账户余额 :account
    tokenDetail:'api/cache/tokenDetail', //
    
    secondCurrencyList: 'api/charger/secondCurrencyList', //二级通证列表
    secondCurrencyDetail: 'api/charger/secondCurrencyDetail', //二级通证详情
    totalCirculation: 'api/cable/totalCirculation', //二级通证流通总量
    secondCurrencyTransactionList(account) {              //二级通证交易记录
        return `api/data/accounts/${account}/transactions`
    },
    secondCurrencyProportion: 'api/charger/currencyProportion', //二级通证比例
    isIssuer: 'api/cable/isIssuer', //判断是否是发行商
    currencyChart: 'api/data/currencyChart', //二级通证详情chart
}

export default api