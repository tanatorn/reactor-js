---
title: Introducing Reactor
description: A Jekyll inspired React-based static site generator
code: javascript
---

Reactor is a React-based static site generator. Reactor the usage of developers' existing knowledge
to rapidly create a static website. Leveraging the power of `react-router`, routing is made easy
using a declaration that is already known by most React users.

```
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
```

Reactor also comes with a built in development server, allowing for live editing of the contents.
Importing SCSS files is supported out of the box, and can be imported and used like so,
```
// Importing a file path-relative
import './styles/common.scss'
// OR
require('./styles/common.scss')
```
