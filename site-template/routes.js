import React from 'react'
import { Route } from 'react-router'

import Base from './components/Base/index'
import Home from './screens/Home/index'
import NotFound from './screens/NotFound/index'
import GetStarted from './screens/GetStarted/index'

const routes = (
  <Route component={Base} >
    <Route component={Home} path="/" />
    <Route component={Home} path="index" />
    <Route component={GetStarted} path="get-started" />
    <Route component={NotFound} path="*" />
  </Route>
)

export default routes
