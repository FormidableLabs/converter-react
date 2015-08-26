"use strict";

/**
 * Development server.
 */
// Set environment.
process.env.WEBPACK_DEV = "true"; // Switch to dev webpack-dev-server

// Proxy existing server.
var app = module.exports = require("./index");

// Actually start server if script.
/* istanbul ignore next */
if (require.main === module) {
  app.indexRoute(/^\/$/);
  app.start();
}
