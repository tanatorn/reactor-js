import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Base = ({ children }) => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="error">404</Link>
      </li>
    </ul>
    <div>{children}</div>
  </div>
)


Base.propTypes = {
  children: PropTypes.node,
}

export default Base
