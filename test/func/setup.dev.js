"use strict";

/**
 * Test setup for functional tests relying on JS assets from `npm run dev`.
 */
// Import in the rest of the global setup.
require("./setup");

// Set global value to indicate using existing dev. server.
process.env.WEBPACK_TEST_BUNDLE = "http://127.0.0.1:2992/js/bundle.js";
