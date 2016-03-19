import webpack from 'webpack'
import path from 'path'
import Reactor from '../plugin/index'

const getConfig = (debug) => {

  const config = {
    context: path.join(process.cwd(), '/'),
    entry: {
      app: ['./index.js'],
    },
    module: {
      loaders: [
        {
          test: /\.(jsx|js)?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0'],
          },
        },
        {
          test: /\.md$/,
          exclude: /(node_modules)/,
          loaders: ['markdown-front-matter'],
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules)/,
          loaders: ['style', 'css', 'sass'],
        },
        {
          test: /\.css$/,
          exclude: /(node_modules)/,
          loaders: ['style', 'css'],
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.md'],
      modulesDirectories: ['web_modules', 'node_modules',
        path.join(__dirname, '../../', 'node_modules')],
      root: path.resolve(process.cwd()),
    },
    devServer: {
      contentBase: path.resolve(process.cwd()),
      publicPath: 'http://localhost:8080/',
    },
    output: {
      path: path.join(process.cwd(), 'site'),
      filename: 'bundle.js',
      libraryTarget: 'umd',
    },
    resolveLoader: {
      root: path.join(__dirname, '../../', 'node_modules'),
    },
    plugins: [],
  }

  if (debug) {
    config.devtool = 'cheap-module-source-map'
    config.output.publicPath = 'http://localhost:8080/'
    config.entry.app.unshift('webpack-hot-middleware/client?reload=true')
    config.plugins.unshift(new webpack.optimize.OccurrenceOrderPlugin())
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
    config.plugins.unshift(new webpack.NoErrorsPlugin())
  } else {
    config.plugins.unshift(new Reactor.GeneratorPlugin({ source: 'bundle.js' }))
    config.plugins.unshift(new webpack.optimize.OccurenceOrderPlugin())
    config.plugins.unshift(new webpack.optimize.DedupePlugin())
    config.plugins.unshift(new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false,
    }))
  }

  return config
}


export default getConfig
