"use strict";
/**
 * Webpack frontend test configuration.
 */
var path = require("path");
var _ = require("lodash");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var prodCfg = require("./webpack.config");

module.exports = {
  cache: true,
  context: path.join(__dirname, "test/client"),
  entry: "./main",
  output: {
    path: __dirname,
    filename: "main.js",
    publicPath: "/assets/"
  },
  resolve: _.merge({}, prodCfg.resolve, {
    alias: {
      // Allow root import of `client/FOO` from ROOT/client.
      client: path.join(__dirname, "client")
    }
  }),
  module: prodCfg.module,
  devtool: "source-map",
  plugins: [
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
  ]
};
