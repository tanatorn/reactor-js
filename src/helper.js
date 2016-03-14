import { createRoutes } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import { html } from 'js-beautify'

export const render = (route) => {
  const body = renderToStaticMarkup(route)
  return html(`
  <!doctype html>
   <html>
     <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
     </head>
     <body>
       <div>${body}</div>
     </body>
   </html>
  `)
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
