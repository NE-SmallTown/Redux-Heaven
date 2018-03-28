var path = require('path');
var webpack = require('webpack');
var env = require('yargs').argv.mode;

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var plugins = [];
var outputFile;

if (env === 'build') {
  plugins = [new UglifyJsPlugin({ minimize: true })];
  outputFile = 'redux-heaven.min.js';
} else {
  outputFile = 'redux-heaven.js';
}

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve('./dist'),
    filename: outputFile,
    library: 'ReduxHeaven',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins
};
