import webpack from 'webpack'
import path from 'path'
import Reactor from '../plugin/index'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const getConfig = (debug) => {

  const config = {
    context: path.join(process.cwd(), '/'),
    entry: {
      bundle: ['./index.js'],
    },
    module: {
      loaders: [
        {
          test: /\.(jsx|js)?$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-0'],
          },
        },
        {
          test: /\.md$/,
          exclude: /(node_modules)/,
          loader: 'markdown-front-matter',
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules)/,
          loader: debug ? 'style!css!sass' : ExtractTextPlugin.extract('style', 'css!sass'),
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
      filename: '[name].js',
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
    config.entry.bundle.unshift('webpack-hot-middleware/client?reload=true')
    config.plugins.unshift(new webpack.optimize.OccurrenceOrderPlugin())
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
    config.plugins.unshift(new webpack.NoErrorsPlugin())
  } else {
    config.plugins.unshift(new Reactor.GeneratorPlugin({
      source: 'bundle.js',
      noJS: true,
    }))
    config.plugins.unshift(new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }))
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
