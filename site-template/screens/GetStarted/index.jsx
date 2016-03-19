import React from 'react'
import Reactor from '../../../lib/index'

const GetStarted = () => {
  const posts = Reactor.getPosts('get-started').map((post, index) => {
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
      <h1 className="reactor-header">Getting Started</h1>
      {posts}
    </div>
  )
}


export default GetStarted
