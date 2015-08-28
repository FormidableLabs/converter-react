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
    // `this` is the promise.
    /*eslint-disable no-invalid-this*/
    var self = this;
    /*eslint-enable no-invalid-this*/

    // Ensure only called _once_ and first with _error_ if any.
    done = _.once(done);

    return self
      .catch(function (err) {
        if (err) { return done(err); }
      })
      .call(done);
  };
};
