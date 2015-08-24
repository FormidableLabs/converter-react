"use strict";

/**
 * Test setup for functional tests.
 */
var chai = require("chai");

// Enable Rowdy with webdriverio.
var _ = require("lodash");
var rowdy = require("rowdy")(_.merge({}, require("rowdy/config"), {
  options: {
    driverLib: "webdriverio"
  }
}));
var Adapter = rowdy.adapters.mocha;

// Add test lib globals.
global.expect = chai.expect;
global.adapter = new Adapter();

// Set test environment
process.env.NODE_ENV = "test-func";
