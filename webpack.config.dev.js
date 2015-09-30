/**
 * Webpack development configuration
 */
/*globals __dirname:false */
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var base = require("./webpack.config");

module.exports = {
  cache: true,
  context: base.context,
  entry: base.entry,
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/js/"
  },
  module: base.module,
  resolve: base.resolve,
  devtool: "source-map",
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
  ]
};
