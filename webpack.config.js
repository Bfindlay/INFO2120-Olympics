const path = require('path');
module.exports = {
  entry: './src/index.jsx',
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, '/dist/build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}