import React, { PropTypes } from 'react'

const Base = ({ children }) => <div>{children}</div>

Base.propTypes = {
  children: PropTypes.node,
}

export default Base
