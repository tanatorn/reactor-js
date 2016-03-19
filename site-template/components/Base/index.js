import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const navigations = [
  { url: '/', name: 'Home' },
  { url: '404', name: 'Error' },
  { url: 'get-started', name: 'Get Started'}
]

const Base = ({ children }) => {

  const navigationItems = navigations.map((navigation, index) => (
      <li className="list-item" key={index}>
        <Link to={navigation.url} className="link">{navigation.name}</Link>
      </li>
    )
  )

  return (
    <div className="container">
      <ul className="navigation">
        {navigationItems}
      </ul>
      <div className="content-body">{children}</div>
    </div>
  )

}


Base.propTypes = {
  children: PropTypes.node,
}

export default Base
