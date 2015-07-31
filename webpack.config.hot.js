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
    "webpack/hot/only-dev-server",
    base.entry
  ],
  output: base.output,
  module: {
    loaders: [
      { test: /\.jsx?$/, include: path.join(__dirname, "client"),
        loaders: ["react-hot", "babel-loader?optional=runtime&stage=2"] }
    ]
  },
  resolve: base.resolve,
  devtool: "eval-source-map",
  plugins: base.plugins
};
