import React from 'react'
import Reactor from 'reactor-js'

const Home = () => {
  const posts = Reactor.getPosts('blog')

  return (
    <div>
      <h1 className="header">World's Greatest Detective</h1>
      <hr className="header-underline" />
      <div className="post-container">
        {posts}
      </div>
      </div>
  )
}

export default Home
