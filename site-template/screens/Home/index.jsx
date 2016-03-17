import React from 'react'
import Reactor from '../../../lib/index'

const postTitle = {
  color: 'blue',
}

const Home = () => {

  const posts = Reactor.getPosts('blog').map((post, index) => {
    const generateMarkup = () => ({ __html: post.body })
    return (
      <div key={index}>
        <h3 style={postTitle}>{post.attributes.title}</h3>
        <div dangerouslySetInnerHTML={generateMarkup()} />
      </div>
    )
  })

  return (
    <div>
      <h1>Welcome to Reactor! Cancer Wow Live Reload</h1>
      {posts}
    </div>)
}

export default Home
