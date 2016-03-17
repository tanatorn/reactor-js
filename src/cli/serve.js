import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import React from 'react'
import ReactDOM from 'react-dom/server'

import { RouterContext, match } from 'react-router'
import getConfig from './webpack.config.js'
import express from 'express'


// const REACTOR_CONFIG = path.join(process.cwd(), 'routes.js')


const render = (body) => (
  `<!DOCTYPE html>
  <html>
    <head>
      <title>Reactor</title>
    </head>

    <body>
      <div id="react-root">${body}</div>
    </body>
    <script src="bundle.js"></script>
  </html>`
)


const startServer = (routes) => {
  const webpackConfig = getConfig(true)
  const compiler = webpack(webpackConfig)
  const app = express()
  app.use(webpackDevMiddleware(compiler, {
    contentBase: webpackConfig.devServer.contentBase,
    publicPath: webpackConfig.devServer.publicPath,
    stats: { colors: true },
    // noInfo: true,
  }))
  app.use(webpackHotMiddleware(compiler))

  app.get('*', (req, res) => {
    match({ routes, location: req.url }, (error, redirectLocation, props) => {
      res.status(200).send(render(ReactDOM.renderToString(<RouterContext {...props} />)))
    })
  })
  app.listen(8080)
  /* const server = new WebpackDevServer(compiler, {
    contentBase: webpackConfig.devServer.contentBase,
    publicPath: webpackConfig.devServer.publicPath,
  })
  server.listen(8080)
  */

}


const serve = (routes) => {
  startServer(routes)
  /* fs.accessAsync(REACTOR_CONFIG, 'fs.R_OK')
    .then(() => fs.readFileAsync(REACTOR_CONFIG, 'utf8'))
    .then((data) => {
      const transpiledData = babel.transform(data, { presets: ['es2015', 'stage-0', 'react'] }).code
      const routes = _eval(transpiledData, true)
      startServer(routes)
    })*/


  // Check if current working directory has an index.js
  // If it does, use it as an entrypoint
  /* fs.accessAsync(REACTOR_CONFIG, 'fs.R_OK')
    // If config file exist
    .then(readReactorConfig)
    .then(startServer)
    .catch(startServer) */

}

export default serve
