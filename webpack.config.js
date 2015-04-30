/**
 * Webpack production configuration
 */
/*globals __dirname:false */
var path = require("path");
var webpack = require("webpack");
var CleanPlugin = require("clean-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = {
  cache: true,
  context: path.join(__dirname, "client"),
  entry: "./app.js",
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "bundle.[hash].js"
  },
  module: {
    loaders: [
      { test: /\.js(x|)?$/, exclude: /node_modules/,
        loaders: ["babel-loader?optional=runtime"] }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    // Clean
    new CleanPlugin(["dist"]),

    // Optimize
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),

    // Meta, debug info.
    new webpack.SourceMapDevToolPlugin(
      "../map/bundle.[hash].js.map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/dist/map/[url]"
    ),
    new StatsWriterPlugin({
      path: path.join(__dirname, "dist/server"),
      filename: "stats.json"
    })
  ]
};
