import React from 'react'
import Reactor from '../../../lib/index'

const Home = () => {

  const posts = Reactor.getPosts('blog').map((post, index) => {
    const generateMarkup = () => ({ __html: post.body })
    return (
      <div key={index}>
        <h3 className="post-title">{post.attributes.title}</h3>
        <div dangerouslySetInnerHTML={generateMarkup()} />
      </div>
    )
  })

  return (
    <div>
      <h1 className="reactor-header">Welcome to Reactor!</h1>
      {posts}
    </div>)
}


export default Home
