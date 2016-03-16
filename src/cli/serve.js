import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import getConfig from './webpack.config.js'

const startServer = () => {
  const webpackConfig = getConfig(true)
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, {
    contentBase: webpackConfig.devServer.contentBase,
    publicPath: webpackConfig.devServer.publicPath,
  })
  server.listen(8080)
}


const serve = () => {
  startServer()
  // Check if current working directory has an index.js
  // If it does, use it as an entrypoint
  /* fs.accessAsync(REACTOR_CONFIG, 'fs.R_OK')
    // If config file exist
    .then(readReactorConfig)
    .then(startServer)
    .catch(startServer) */

}

export default serve
