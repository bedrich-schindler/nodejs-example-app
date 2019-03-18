const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
