/**
 * Webpack production configuration
 */
/*globals __dirname:false */
// css-loader requires promises and must be polyfilled for use on Node 0.10.x
require("es6-promise").polyfill();

var path = require("path");
var webpack = require("webpack");
var CleanPlugin = require("clean-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  cache: true,
  context: path.join(__dirname, "client"),
  entry: "./app.jsx",
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "bundle.[hash].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loaders: ["babel"]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.(png|svg|woff|woff2|ttf|eot)$/i,
        loader: "url-loader?limit=10000"
      }
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

    // Extract CSS
    new ExtractTextPlugin("style.[hash].css"),

    // Meta, debug info.
    new webpack.DefinePlugin({
      "process.env": {
        // Signal production mode for React JS libs.
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.SourceMapDevToolPlugin(
      "../map/[file].map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/dist/map/[url]"
    ),
    new StatsWriterPlugin({
      // Context is relative to `output.path` / `dist/js`
      filename: "../server/stats.json"
    })
  ]
};
