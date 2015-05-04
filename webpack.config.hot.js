/**
 * Webpack production configuration
 */
/*globals __dirname:false */
var path = require("path");
var base = require("./webpack.config.dev");

module.exports = {
  cache: true,
  context: base.context,
  entry: [
    "webpack-dev-server/client?http://127.0.0.1:3000",
    "webpack/hot/only-dev-server",
    base.entry
  ],
  output: base.output,
  module: {
    loaders: [
      { test: /\.js(x|)?$/, include: path.join(__dirname, "client"),
        loaders: ["react-hot", "babel-loader"] }
    ]
  },
  resolve: base.resolve,
  devtool: "eval-source-map",
  plugins: base.plugins
};
