import { createRoutes } from 'react-router'
import {
    renderToStaticMarkup,
    renderToString,
} from 'react-dom/server'
import { html } from 'js-beautify'

export const render = (route, options, assets) => {

  const style = `<link rel="stylesheet" type="text/css" href="${assets.css}">`

  const body = !options.noJS ? `<div id="react-root">${renderToString(route)}</div>`
    : renderToStaticMarkup(route)

  const script = !options.noJS ? `<script src="${assets.js}"></script>` : ''

  const markup = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${style}
    </head>
    <body>
      ${body}
      ${script}
    </body>
  </html>
  `
  return !options.noJS ? markup : html(markup)

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
