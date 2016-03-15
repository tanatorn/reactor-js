import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Base from 'components/Base/index'
import Home from 'screens/Home/index'
// import NotFound from 'screens/error/index'

// <Route component={NotFound} path="*" />
const routes = (
  <Route path="/" component={Base} >
    <IndexRoute component={Home} />
  </Route>
)

export default routes
