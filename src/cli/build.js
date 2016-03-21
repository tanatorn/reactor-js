import webpack from 'webpack'
import getConfig from './webpack.config.js'
import fse from 'fs-extra'
import Promise from 'bluebird'
import Reactor from '../plugin/index'

const fs = Promise.promisifyAll(fse)

const REACTOR_CONFIG = `${process.cwd()}/reactor.config.js`

const compile = (config) => {
  const compiler = webpack(config)
  compiler.run((err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Successfullly generated website!')
  })
}

const build = () => {
  const config = getConfig(false)

  fs.accessAsync(REACTOR_CONFIG, 'fs.R_OK')
    .then(() => {
      const { baseUrl, name } = require(REACTOR_CONFIG)
      config.plugins.unshift(new Reactor.GeneratorPlugin({
        js: 'bundle.js',
        css: 'bundle.css',
        noJS: true,
        baseUrl,
        name,
      }))
      compile(config)
    })
    .catch(() => compile(config))

}


export default build
