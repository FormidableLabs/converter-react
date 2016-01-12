"use strict";
/*
 * Karma Configuration: "full" version.
 *
 * This configuration runs a temporary `webpack-dev-server` and builds
 * the test files one-off for just a single run. This is appropriate for a
 * CI environment or if you're not otherwise running `npm run dev|hot`.
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


var webpackCfg = {
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
  // Start with the "dev" (webpack-dev-server is already running) config
  // and add in the webpack stuff.
  require("./karma.conf.dev")(config);

  // Overrides.
  config.set({
    preprocessors: {
      "test/client/main.js": ["webpack"]
    },
    files: [
      // Sinon has issues with webpack. Do global include.
      "node_modules/sinon/pkg/sinon.js",

      // Test bundle (created via local webpack-dev-server in this config).
      "test/client/main.js"
    ],
    webpack: webpackCfg,
    webpackServer: {
      port: 3010, // Choose a non-conflicting port.
      quiet: false,
      noInfo: true,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    }
  });
};
