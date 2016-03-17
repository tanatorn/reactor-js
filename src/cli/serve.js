import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import path from 'path'
import getConfig from './webpack.config.js'
import express from 'express'

const serve = () => {
  const webpackConfig = getConfig(true)
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
