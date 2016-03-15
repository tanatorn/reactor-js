import webpack from 'webpack'
import getConfig from './webpack.config.js'

const build = () => {
  const config = getConfig(false)
  const compiler = webpack(config)
  compiler.run((err) => {
    if (err) {
      console.error(err)
    }
  })
}

export default build
