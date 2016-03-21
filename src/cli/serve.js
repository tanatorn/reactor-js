import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import path from 'path'
import getConfig from './webpack.config.js'
import express from 'express'
import fse from 'fs-extra'
import Promise from 'bluebird'

const fs = Promise.promisifyAll(fse)

const REACTOR_CONFIG = `${process.cwd()}/reactor.config.js`

const startServer = (webpackConfig) => {
  const compiler = webpack(webpackConfig)
  const server = express()

  server.use(webpackDevMiddleware(compiler, {
    contentBase: webpackConfig.devServer.contentBase,
    publicPath: webpackConfig.devServer.publicPath,
    stats: { colors: true },
    noInfo: true,
  }))
  server.use(webpackHotMiddleware(compiler))

  server.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'))
  })
  server.listen(8080)

}

const serve = () => {
  fs.accessAsync(REACTOR_CONFIG, 'fs.R_OK')
    .then(() => {
      const reactorConfig = require(REACTOR_CONFIG)
      if (reactorConfig && reactorConfig.webpack && Object.keys(reactorConfig.webpack).length > 0) {
        startServer(reactorConfig)
      } else {
        startServer(getConfig(true))
      }
    })
    .catch(() => startServer(getConfig(true)))

}

export default serve
