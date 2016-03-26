import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const navigations = [
  { url: 'index', name: 'Home' },
  { url: 'contact', name: 'Contact' },
]

const navigationItems = navigations.map((navigation, index) => (
    <li className="list-item" key={index}>
      <Link to={navigation.url} className="link">{navigation.name}</Link>
    </li>
  )
)

const Base = ({ children }) => (
    <div className="container">
      <div className="navigation">
        <span className="navigation-brand">Batman</span>
        <ul className="navigation-list">
          {navigationItems}
        </ul>
      </div>
      <div className="content-body">{children}</div>
    </div>
)


Base.propTypes = {
  children: PropTypes.node,
}

export default Base
