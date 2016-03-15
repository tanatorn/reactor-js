import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import getConfig from './webpack.config.js'

const serve = () => {
  // Check if current working directory has an index.js
  // If it does, use it as an entrypoint
  const config = getConfig(true)
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, {
    contentBase: config.devServer.contentBase,
    // hot: true,
    publicPath: config.devServer.publicPath,
  })
  server.listen(8080)

}

export default serve
