"use strict";

/**
 * Manage Mocha `done` callback with error or success termination.
 *
 * This wrapper is useful to ensure that `done` is called exactly once.
 *
 * Usage:
 *
 * ```
 *  adapter.client
 *    .url(global.TEST_FUNC_BASE_URL)
 *    // Use `.then()` and just ignore errors until final catch.
 *    .getText(".e2e-input").then(function (text) {
 *      expect(text).to.equal("");
 *    })
 *
 *    // Returns a function that will catch and terminate the promise chain.
 *    .finally(promiseDone(done));
 * ```
 */
var _ = require("lodash");

module.exports = function (done) {
  return function () {
    // Ensure only called _once_ and first with _error_ if any.
    done = _.once(done);

    // `this` is the promise.
    return this
      .catch(function (err) {
        if (err) { return done(err); }
      })
      .call(done);
  }
};
