import webpack from 'webpack'
import getConfig from './webpack.config.js'
import fse from 'fs-extra'
import Promise from 'bluebird'
import GeneratorPlugin from '../plugin/index'
import { parseConfig } from './helper'

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
    .then(() => fs.remove(`${process.cwd()}/site`))
    .then(() => {
      const userConfig = require(REACTOR_CONFIG)
      const { baseUrl, name } = userConfig
      const reactorConfig = parseConfig(config, userConfig, false)
      reactorConfig.plugins.unshift(new GeneratorPlugin({
        js: 'bundle.js',
        css: 'bundle.css',
        noJS: true,
        baseUrl,
        name,
      }))
      compile(reactorConfig)
    })
    .catch(() => compile(config))

}


export default build
