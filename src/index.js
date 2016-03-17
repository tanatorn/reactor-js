const getPosts = (directory) => {
  if (typeof document !== 'undefined') {
    const collection = require.context('posts', true, /.md$/)
    let keys = collection.keys()

    if (directory) {
      keys = keys.filter(key => key.indexOf(`${directory}/`) !== -1)
    }

    return keys.map(key => collection(key))
  }
  return []
}

const Reactor = {
  getPosts,
}

export default Reactor
