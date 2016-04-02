import Promise from 'bluebird'
import path from 'path'
import fse from 'fs-extra'

const fs = Promise.promisifyAll(fse)

export const parseConfig = (baseConfig, userConfig, debug) => {
  const config = baseConfig

  const { entry, module, resolve } = userConfig.webpack
  if (module) {
    const { loaders } = module
    // Add all the custom loaders
    if (Array.isArray(loaders)) {
      loaders.forEach(loader => config.module.loaders.push(loader))
    }
  }

  if (entry) {
    config.entry = entry

    // Main module is currently the first one
    const mainBundle = Object.keys(entry)[0]
    if (debug) {
      config.entry[mainBundle].push('webpack-hot-middleware/client?reload=true')
    }
  }

  if (resolve) {
    if (Array.isArray(resolve.extensions)) {
      resolve.extensions.forEach(extension => config.resolve.extensions.push(extension))
    }
  }

  return config
}

// Generate custom index file with the site name as the title
export const createCustomIndex = ({ name }, directory) => {
  const content = `
  <!doctype html>
  <html>
    <head>
      <title>${name}</title>
      <base href="/" />
    </head>
    <body>
      <div id="react-root"></div>
      <script src="bundle.js"></script>
    </body>
  </html>`
  return fs.writeFileAsync(path.resolve(`${directory}/index.html`), content)
}

export const createReactorConfig = ({ name, baseUrl }, directory) => {
  const configTemplate = `
  module.exports = {
    name: '${name}'
  }`
  return fs.writeFileAsync(`${directory}/reactor.config.js`, configTemplate)
}
