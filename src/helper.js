import { createRoutes } from 'react-router'
import {
    renderToStaticMarkup,
    renderToString,
} from 'react-dom/server'
import { html } from 'js-beautify'

export const render = (route, options) => {
  const body = options.debug || options.enableReactMarkup ? renderToString(route)
    : renderToStaticMarkup(route)

  let debug = ''

  if (options.debug) {
    debug = '<script src="http://localhost:8080/webpack-dev-server.js"></script>\n' +
            '<script src="http://localhost:8080/bundle.js" charset="utf-8"></script>'
  }

  const markup = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <div id="react-root">${body}</div>
      <script src="${options.source}"></script>
      ${debug}
    </body>
  </html>
  `
  return options.enableReactMarkup || options.debug ? markup : html(markup)

}

const getDeepDirectory = (route, directories, currentPosition) => {
  if (!route) {
    return
  }

  if (route.path) {
    directories.push(`${currentPosition.join('/')}/${route.path}`)
  }


  if (route.childRoutes) {
    route.childRoutes.forEach((childRoute) => {
      getDeepDirectory(childRoute, directories, [...currentPosition, route.path])
    })
  }

}

export const getDirectory = (routes) => {
  const primaryRoute = createRoutes(routes)[0]
  const directories = []
  getDeepDirectory(primaryRoute, directories, [])
  return directories.map(directory => directory.replace('//', '/'))
}

export const isRoute = (element) => element.type && element.type.displayName === 'Route'
