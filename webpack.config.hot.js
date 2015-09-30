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
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|svg|woff|woff2|ttf|eot)$/i,
        loader: "url-loader?limit=10000"
      }
    ]
  },
  resolve: base.resolve,
  devtool: "source-map",
  plugins: base.plugins
};
