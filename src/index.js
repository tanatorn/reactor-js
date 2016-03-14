import React from 'react'
import _eval from 'eval'

import {
  getDirectory,
  render,
} from './helper'

import {
  match,
  RouterContext,
} from 'react-router'

const Multiply = () => {

}

Multiply.prototype.apply = (compiler) => {
  compiler.plugin('emit', (compilation, callback) => {
    // TODO: Remove hardcode and actually find the right one by using user configuration
    const src = 'bundle.js'
    const asset = compilation.assets[src]
    const source = _eval(asset.source(), true)

    // Trying to find the base route
    let routes
    if (React.isValidElement(source.default)) {
      routes = source.default
    } else if (React.isValidElement(source.routes)) {
      routes = source.routes
    } else if (React.isValidElement(source)) {
      routes = source
    }

    const directories = getDirectory(routes)
    directories.forEach(directory => {
      // Match each directory to a route and render out the page
      match({ routes, location: directory }, (error, redirect, renderProps) => {
        const file = render(<RouterContext {...renderProps} />)

        // Adding a .html suffix to the directory as well as checking to see if it is an index route
        // If it is an index route, we have to rename the directory from '/.html' to '/index.html'
        let fullPath = `${directory}.html`
        if (fullPath.indexOf('/.html') !== -1) {
          fullPath = fullPath.replace('/.html', '/index.html')
        }

        // Wrting file back into the assets
        compilation.assets[fullPath] = { source: () => file, size: () => file.length }

      })
    })

    // Proceed with the with build
    callback()

  })
}

module.exports = Multiply
