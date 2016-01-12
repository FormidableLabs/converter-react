"use strict";
/**
 * Webpack all-in-one configuration */
/*globals __dirname:false */

require("es6-promise").polyfill();

var path = require("path");
var webpack = require("webpack");
var CleanPlugin = require("clean-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
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


// production = webpack.config.js -- Replacing: loaders: ["babel-loader?optional=runtime&stage=2"]
var production = {
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

// development = webpack.config.dev.js
var development = {
  cache: true,
  devtool: "source-map",
  context: path.join(__dirname, "client"),
  entry: "./app.jsx",
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/js/"
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
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
  ]
};


// developmentHot = webpack.config.hot.js -- Replacing: loaders: ["react-hot", "babel-loader?optional=runtime&stage=2"]
var developmentHot = {
  cache: true,
  context: path.join(__dirname, "client"),
  entry: [
    "webpack/hot/only-dev-server",
    "./app.jsx"
  ],
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/js/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: "babel",
        query: HOT
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
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devtool: "source-map",
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
  ]
};

// testBasic = webpack.config.test.js
var testBasic = {
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


// testCoverage = webpack.config.coverage.js -- Replacing: loader: "isparta?{ babel: { stage: 2 } }"
var testCoverage = {
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


var configs = {production, development, developmentHot, testBasic, testCoverage};
var build = process.env.BUILD || process.env.NODE_ENV || "production";

module.exports = configs[build];
