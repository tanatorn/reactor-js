import React from 'react'

const generateMarkup = (content) => ({ __html: content })

const getPosts = (directory, mappingCallback) => {

  const collection = require.context('posts', true, /.md$/)
  let keys = collection.keys()

  if (directory) {
    keys = keys.filter(key => key.indexOf(`${directory}/`) !== -1)
  }

  const collections = keys.map(key => collection(key))

  if (!mappingCallback) {
    return collections.map((post, index) => (
        <div key={index}>
          <h3 className="post-title">{post.attributes.title}</h3>
          <hr />
          <h4 className="post-description">{post.attributes.description}</h4>
          <div className="post-body" dangerouslySetInnerHTML={generateMarkup(post.body)} />
        </div>
    ))
  }

  return collections.map(mappingCallback)

}

const Reactor = {
  getPosts,
}

export default Reactor
