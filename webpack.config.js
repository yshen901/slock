const path = require('path');

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: './frontend/slack-clone.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      },
      {
        test: /\.jpeg?$/,
        use: 'url-loader'
      }
    ]
  },
  devtool: 'source-map'
};