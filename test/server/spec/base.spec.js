"use strict";

/**
 * Base server unit test initialization / global before/after's.
 *
 * This file has should be included in any test run, filtered or not.
 *
 * **Note**: Because there is a global sandbox server unit tests should always
 * be run in a separate process from other types of tests.
 */

var sinon = require("sinon");

before(function () {
  // Set test environment
  process.env.NODE_ENV = process.env.NODE_ENV || "test-rest-unit";
});

beforeEach(function () {
  global.sandbox = sinon.sandbox.create({
    useFakeTimers: true
  });
});

afterEach(function () {
  global.sandbox.restore();
});
