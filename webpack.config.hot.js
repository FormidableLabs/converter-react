/**
 * Webpack production configuration
 */
/*globals __dirname:false */
var path = require("path");
var webpack = require("webpack");
var base = require("./webpack.config");

module.exports = {
  cache: true,
  context: base.context,
  entry: [
    "webpack-dev-server/client?http://127.0.0.1:3000",
    "webpack/hot/only-dev-server",
    base.entry
  ],
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "bundle.hot.js",
    publicPath: "http://127.0.0.1:2992/js"
  },
  module: {
    loaders: [
      { test: /\.js(x|)?$/, include: path.join(__dirname, "client"),
        loaders: ["react-hot", "babel-loader"] }
    ]
  },
  resolve: base.resolve,
  devtool: "eval-source-map",
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
