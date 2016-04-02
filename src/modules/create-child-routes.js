import React from 'react'
import { Route } from 'react-router'


export const createChildRoutes = (posts) => (
  posts.map((post, index) => {
    const RouteComponentWrapper = () => post
    return <Route component={RouteComponentWrapper} path={index.toString()} key={index} />
  })
)
