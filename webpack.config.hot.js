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
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loaders: ["react-hot", "babel-loader?optional=runtime&stage=2"]
      }
    ]
  },
  resolve: base.resolve,
  devtool: "source-map",
  plugins: base.plugins
};
