import React from 'react'
import _eval from 'eval'
import {
  getDirectory,
  render,
  isRoute,
} from './helper'
import {
  match,
  RouterContext,
} from 'react-router'


class GeneratorPlugin {

  constructor(options) {
    this.options = options
  }

  // Called by webpack when loading the plugin
  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {

      const js = this.options.js
      const css = this.options.css

      const asset = compilation.assets[js]
      const source = _eval(asset.source(), true)

      const name = this.options.name

      if (this.options.noJS) {
        delete compilation.assets[js]
      }

      // Trying to find the base route
      let routes
      if (React.isValidElement(source.default) && isRoute(source.default)) {
        routes = source.default
      } else if (React.isValidElement(source.routes) && isRoute(source.routes)) {
        routes = source.routes
      } else if (React.isValidElement(source) && isRoute(source)) {
        routes = source
      }

      const directories = getDirectory(routes)
      directories.forEach(directory => {
        // Match each directory to a route and render out the page
        match({ routes, location: directory }, (error, redirect, props) => {
          const file = render(<RouterContext {...props} />, this.options,
            { js, css, name })

          // Adding a .html suffix to the directory as well as checking to see if it is an index
          // route, if it is an index route, we have to rename the directory from '/.html'
          // to '/index.html'
          let fullPath = `${directory}.html`
          if (fullPath.indexOf('/.html') !== -1) {
            fullPath = fullPath.replace('/.html', '/index.html')
          }

          if (fullPath.indexOf('*.html') !== -1) {
            fullPath = fullPath.replace('*.html', '404.html')
          }

          // Wrting file back into the assets
          compilation.assets[fullPath] = { source: () => file, size: () => file.length }

        })
      })

      // Proceed with the with build
      callback()

    })

  }
}


const Reactor = {
  GeneratorPlugin,
}

export default Reactor
