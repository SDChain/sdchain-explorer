'use strict'
const Koa = require('koa')
const koaStatic = require('koa-static')
const koaBodyparser = require('koa-bodyparser')
const koaJson = require('koa-json')
const cors = require('koa2-cors')
const Routes = require('./routes')
const requestHandler = require('./middleware/requestHandler.js')
const responseHandler = require('./middleware/responseHandler.js')
const responseHeaderHandler = require('./middleware/responseHeaderHandler.js')
const NodeCache = require('node-cache')

const txCache = new NodeCache()
global.txCache = txCache
class Server {
  constructor() {
    this._port = gConfig.port
    this._staticDir = gConfig.staticDir
    this._apiRoot = gConfig.apiRoot
  }

  start() {
    const app = new Koa()
    this.app = app
    const router = new Routes().router()
    app.on('error', err => {
      console.error('server error', err)
    })

    app
      .use(router.allowedMethods())

      .use(responseHeaderHandler())

      .use(koaStatic(this._staticDir))

      .use(koaBodyparser())
      .use(koaJson())

      .use(requestHandler())
      .use(responseHandler())

      .use(cors({
        origin: function (ctx) {
          if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
          }
          return '*'; // 允许来自所有域名请求
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      }))
      .use(router.routes())


    app.listen(this._port)
    console.log('The server is listening on ' + this._port)
  }
}

module.exports = Server
