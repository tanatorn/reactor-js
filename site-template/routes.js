import React from 'react'
import { Route } from 'react-router'

import Base from './components/Base/index'
import Home from './screens/Home/index'
import Contact from './screens/Contact/index'
import NotFound from './screens/NotFound/index'

const routes = (
  <Route component={Base} >
    <Route component={Home} path="/" />
    <Route component={Home} path="index" />
    <Route component={Contact} path="contact" />
    <Route component={NotFound} path="*" />
  </Route>
)

export default routes
