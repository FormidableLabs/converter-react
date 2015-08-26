"use strict";
/*eslint-disable max-statements*/

/**
 * Base server unit test initialization / global before/after's.
 *
 * This file has should be included in any test run, filtered or not.
 *
 * **Note**: Because there is a global sandbox server unit tests should always
 * be run in a separate process from other types of tests.
 */
var path = require("path");

// Set test environment
process.env.NODE_ENV = process.env.NODE_ENV || "test-func";

// ----------------------------------------------------------------------------
// Selenium (Webdriverio/Rowdy) initialization
// ----------------------------------------------------------------------------
// **Note** Can stash adapter, but not `adapter.client` because it is a lazy
// getter that relies on the global `before|beforeEach` setup.
var adapter = global.adapter;
var ELEM_WAIT = 200; // Global wait.

adapter.before();
before(function (done) {
  adapter.client
    // Set timeout for waiting on elements.
    .timeoutsImplicitWait(ELEM_WAIT)
    .call(done);
});

adapter.beforeEach();
adapter.afterEach();
adapter.after();

// ----------------------------------------------------------------------------
// Globals and dev. server initialization.
// ----------------------------------------------------------------------------
var app = require("../../../server");
var APP_PORT = process.env.TEST_FUNC_PORT || 3030;
var server;
var wdsServer;

// ----------------------------------------------------------------------------
// Globals
// ----------------------------------------------------------------------------
before(function () {
  // Export global base server URL for tests to hit.
  global.TEST_FUNC_BASE_URL = process.env.TEST_FUNC_BASE_URL ||
    "http://127.0.0.1:" + APP_PORT + "/";

  // Signal to all tests whether we are running against local server or not.
  // Any tests that stub / spy server code should check this variable first
  // as the functional tests should be able to hit a remote server too.
  global.IS_REMOTE = process.env.TEST_FUNC_IS_REMOTE === "true";
});

before(function (done) {
  // Run webpack dev server if not localhost.
  // **Note**: Generally want more sophisticated logic than this.
  if (global.IS_REMOTE) { return done(); }

  // --------------------------------------------------------------------------
  // Webpack JS server - Use existing WDS from `npm run dev`
  // --------------------------------------------------------------------------
  if (process.env.WEBPACK_TEST_BUNDLE) { return done(); }

  // --------------------------------------------------------------------------
  // Webpack JS server - Create ephemeral WDS for this test run.
  // --------------------------------------------------------------------------
  var WDS_PORT = process.env.TEST_FUNC_WDS_PORT || 3031;
  var WDS_HOST = "127.0.0.1";

  var webpack = require("webpack");
  var WebpackDevServer = require("webpack-dev-server");

  // Get config and inject bundle path into application server.
  var webpackCfg = require("../../../webpack.config.dev");
  var out = webpackCfg.output;

  // Hard-code the test bundle to our emphemeral webpack-dev-server.
  process.env.WEBPACK_TEST_BUNDLE = "http://" + WDS_HOST + ":" + WDS_PORT +
    path.join("/", out.publicPath, out.filename);

  // Spawn the webpack dev server
  var compiler = webpack(webpackCfg);
  wdsServer = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, "../../.."),
    host: WDS_HOST,
    port: WDS_PORT,
    outputPath: "/",
    publicPath: out.publicPath,
    filename: out.filename,
    quiet: true,
    noInfo: true,
    hot: false
  });

  // **Note**: Looking at the source, no way to cleanly `.close()` the WDS
  // since it hides the `server.listen()` call internally.
  wdsServer.listen(WDS_PORT, WDS_HOST, function () {
    console.log("TODO: NEED TO GET _ACTUAL_ BUNDLE DONE EVENT");
    done();
  });
});

// ----------------------------------------------------------------------------
// App server
// ----------------------------------------------------------------------------
before(function (done) {
  // Run webpack dev server if not localhost.
  // **Note**: Generally want more sophisticated logic than this.
  if (global.IS_REMOTE) { return done(); }

  // Start up the local application server.
  app.indexRoute(/^\/$/);
  server = app.start(APP_PORT, done);
});

after(function (done) {
  if (!server) { return done(); }
  server.close(done);
});
