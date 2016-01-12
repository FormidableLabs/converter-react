"use strict";
/*
 * Karma Configuration: "coverage" version.
 *
 * This configuration is the same as basic one-shot version, just with coverage.
 */
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var HOT = {
  presets: ["stage-2", "es2015", "react"],
  plugins: [
    ["transform-runtime"],
    ["react-transform",
      {
        transforms: [
          {
            transform: "react-transform-hmr",
            imports:    ["react"],
            locals:     ["module"]
          }, {
            "transform": "react-transform-catch-errors",
            "imports": ["react", "redbox-react"]
          }
        ]
      }
    ]
  ]
};

var NORMAL = {
  presets: ["stage-2", "es2015", "react"],
  plugins: ["transform-runtime"]
};


var webpackCovCfg = {
  cache: true,
  devtool: "source-map",
  context: path.join(__dirname, "test/client"),
  entry: "./main",
  output: {
    path: __dirname,
    filename: "main.js",
    publicPath: "/assets/"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      // Allow root import of `client/FOO` from ROOT/client.
      client: path.join(__dirname, "client")
    }
  },
  module: {
    preLoaders: [
      // Manually instrument client code for code coverage.
      // https://github.com/deepsweet/isparta-loader handles ES6 + normal JS.
      {
        test: /client\/.*\.jsx?$/,
        exclude: /(test|node_modules)\//,
        loaders: "isparta?babel",
        query: NORMAL
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: "babel",
        query: NORMAL
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
  plugins: [
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
  ]
};

module.exports = function (config) {
  require("./karma.conf")(config);
  config.set({
    reporters: ["spec", "coverage"],
    webpack: webpackCovCfg,
    coverageReporter: {
      reporters: [
        { type: "json", file: "coverage.json" },
        { type: "lcov" },
        { type: "text-summary" }
      ],
      dir: "coverage/client"
    }
  });
};
