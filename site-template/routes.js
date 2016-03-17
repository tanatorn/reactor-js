import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Base from './components/Base/index'
import Home from './screens/Home/index'
import NotFound from './screens/NotFound/index'


const routes = (
  <Route path="/" component={Base} >
    <IndexRoute component={Home} />
    <Route component={NotFound} path="*" />
  </Route>
)

export default routes
