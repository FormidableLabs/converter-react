"use strict";

/**
 * Base server unit test initialization / global before/after's.
 *
 * This file has should be included in any test run, filtered or not.
 *
 * **Note**: Because there is a global sandbox server unit tests should always
 * be run in a separate process from other types of tests.
 */
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
var PORT = process.env.TEST_FUNC_PORT || 3030;
var server;

before(function (done) {
  // Export global base server URL for tests to hit.
  global.TEST_FUNC_BASE_URL = process.env.TEST_FUNC_BASE_URL || "http://127.0.0.1:" + PORT + "/";

  // Signal to all tests whether we are running against local server or not.
  // Any tests that stub / spy server code should check this variable first
  // as the functional tests should be able to hit a remote server too.
  global.IS_REMOTE = process.env.TEST_FUNC_IS_REMOTE === "true";

  // Run local server if not localhost.
  // **Note**: Generally want more sophisticated logic than this.
  if (global.IS_REMOTE) { return done(); }

  app.indexRoute(/^\/$/);
  server = app.listen(PORT, done);
});

after(function (done) {
  if (!server) { return done(); }
  server.close(done);
});
