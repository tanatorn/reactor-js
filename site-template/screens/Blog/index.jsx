import React from 'react'
import Reactor from 'reactor-js'

const Blog = () => {
  const posts = Reactor.getPosts('blog')
  return (
    <div>
      <h1 className="reactor-header">Blog</h1>
      {posts}
    </div>
  )
}


export default Blog
