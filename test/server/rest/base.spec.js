"use strict";

/**
 * Base server REST test initialization / global before/after's.
 *
 * This file has should be included in any test run, filtered or not.
 *
 * **Note**: Because there is a global sandbox REST tests should always be run
 * in a separate process from other types of tests.
 */
// Set test environment
process.env.NODE_ENV = process.env.NODE_ENV || "test-rest-spec";

var sinon = require("sinon");
var app = require("../../../server");
var PORT = process.env.TEST_REST_PORT || 3020;
var server;

before(function (done) {
  // Export global base REST API URL for tests to hit.
  global.TEST_REST_BASE_URL = process.env.TEST_REST_BASE_URL || "http://127.0.0.1:" + PORT + "/";

  // Signal to all tests whether we are running against local server or not.
  // Any tests that stub / spy server code should check this variable first
  // as the REST tests should be able to hit a remote server too.
  global.IS_REMOTE = process.env.TEST_REST_IS_REMOTE === "true";

  // Only set up the sandbox _once_ so that it is available if needed to
  // other `before`'s. But restore after each tests.
  global.sandbox = sinon.sandbox.create({
    useFakeTimers: false
  });

  // Run local server if not localhost.
  // **Note**: Generally want more sophisticated logic than this.
  if (global.IS_REMOTE) { return done(); }

  app.indexRoute(/^\/$/);
  server = app.start(PORT, done);
});

after(function (done) {
  if (!server) { return done(); }
  server.close(done);
});

afterEach(function () {
  global.sandbox.restore();
});
