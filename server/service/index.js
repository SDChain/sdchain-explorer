const Cable = require('./CableRequest')
const DataAPI = require('./DataAPIRequest')
const Cache = require('./CacheRequest')
const Health = require('./HealthRequest')
const Charger = require('./ChargerRequest')

module.exports = {
  newWallet: Cable.newWallet,
  server: Cable.server,
  balances: Cable.balances,
  totalCirculation: Cable.totalCirculation, //二级通证流通总量
  isIssuer: Cable.isIssuer, //是否是发行商

  secondCurrencyList: Charger.secondCurrencyList, // 二级通证列表
  secondCurrencyDetail: Charger.secondCurrencyDetail, //二级通证详情信息
  currencyProportion: Charger.currencyProportion, // 通证比例

  ledgers: DataAPI.ledgers,
  ledgerList: DataAPI.ledgerList,
  ledgerDetail: DataAPI.ledgerDetail,
  payments: DataAPI.payments,
  transactions: DataAPI.transactions,
  transaction: DataAPI.transaction,
  transactionsAccount: DataAPI.transactionsAccount,
  paymentsCurrency: DataAPI.paymentsCurrency,
  dataBalances: DataAPI.balances,
  transactionsTotal: DataAPI.transactionsTotal,

  txCharts: Cache.txCharts,
  cLedgers: Cache.ledgers,
  cTransactions: Cache.transactions,
  currencyChart: Cache.currencyChart,

  health:Health.inspect,
  tokenDetail:Cable.tokenDetail

}
