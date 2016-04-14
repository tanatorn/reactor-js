import React, { Component } from 'react'
import Reactor from 'reactor-js'

export default class Home extends Component {
  render() {
    const posts = Reactor.getPosts('blog')

    return (
      <div>
        <h1 className="header">World's Greatest Detective</h1>
        <div className="post-container">
          {posts}
        </div>
        </div>
    )
  }
}
