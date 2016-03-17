const getPosts = (directory) => {

  const collection = require.context('posts', true, /.md$/)
  let keys = collection.keys()

  if (directory) {
    keys = keys.filter(key => key.indexOf(`${directory}/`) !== -1)
  }

  return keys.map(key => collection(key))
}

const Reactor = {
  getPosts,
}

export default Reactor
