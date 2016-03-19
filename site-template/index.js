import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from 'routes'
import './styles/common.scss'

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Router routes={routes} history={browserHistory} />,
    document.getElementById('react-root'))
}


export default routes
