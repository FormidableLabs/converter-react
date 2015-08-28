"use strict";

/**
 * Express web server.
 */
// Globals
var HOST = process.env.HOST || "127.0.0.1";
var PORT = process.env.PORT || 3000;
var RENDER_JS = true;
var RENDER_SS = true;

// Hooks / polyfills
require("babel/register");
var clientApi = require("../client/utils/api");

var path = require("path");
var express = require("express");
var compress = require("compression");
var mid = require("./middleware");

var app = module.exports = express();
var converter = require("./converter");

// ----------------------------------------------------------------------------
// Setup, Static Routes
// ----------------------------------------------------------------------------
app.use(compress());

// Static libraries and application HTML page.
app.use("/js", express.static(path.join(__dirname, "../dist/js")));

// ----------------------------------------------------------------------------
// REST API
// ----------------------------------------------------------------------------
app.get("/api/camel", function (req, res) {
  var from = req.query.from || "";
  res.json({ from: from, to: converter.camel(from) });
});
app.get("/api/snake", function (req, res) {
  var from = req.query.from || "";
  res.json({ from: from, to: converter.snake(from) });
});
app.get("/api/dash", function (req, res) {
  var from = req.query.from || "";
  res.json({ from: from, to: converter.dash(from) });
});

// ----------------------------------------------------------------------------
// Application.
// ----------------------------------------------------------------------------
// Client-side imports
var React = require("react");
var Page = React.createFactory(require("../client/components/page"));
var Flux = require("../client/flux");

// Server-side React
var Index = React.createFactory(require("../templates/index"));
// Have to manually hack in the doctype because not contained with single
// element for full page.
var renderIndex = function (component) {
  return "<!DOCTYPE html>" + React.renderToStaticMarkup(component);
};

app.indexRoute = function (root) {
  // --------------------------------------------------------------------------
  // Middleware choice!
  // --------------------------------------------------------------------------
  //
  // We support two different flux bootstrap data/component middlewares, that
  // can be set like:
  //
  // var fluxMiddleware = mid.flux.fetch(Page);   // Fetch manually
  // var fluxMiddleware = mid.flux.actions(Page); // Instance actions.
  //
  var fluxMiddleware = mid.flux.actions(Page); // Instance actions.

  app.use(root, [fluxMiddleware], function (req, res) {
    /*eslint max-statements:[2,20]*/
    // JS Bundle sources.
    var WEBPACK_TEST_BUNDLE = process.env.WEBPACK_TEST_BUNDLE;  // Switch to test webpack-dev-server
    var WEBPACK_DEV = process.env.WEBPACK_DEV === "true";       // Switch to dev webpack-dev-server

    // Render JS? Server-side? Bootstrap?
    var mode = req.query.__mode;
    var renderJs = RENDER_JS && mode !== "nojs";
    var renderSs = RENDER_SS && mode !== "noss";

    // JS bundle rendering.
    var bundleJs;
    if (renderJs) {
      if (WEBPACK_TEST_BUNDLE) {
        bundleJs = WEBPACK_TEST_BUNDLE;
      } else if (WEBPACK_DEV) {
        bundleJs = "http://127.0.0.1:2992/js/bundle.js";
      } else {
        // First file is JS path.
        var stats = require("../dist/server/stats.json");
        bundleJs = path.join("/js", stats.assetsByChunkName.main[0]);
      }
    }

    // Server-rendered client component.
    var content;
    if (renderSs) {
      content = res.locals.bootstrapComponent ||
        React.renderToString(new Page({ flux: new Flux() }));
    }

    // Response.
    res.send(renderIndex(new Index({
      bootstrap: res.locals.bootstrapData,
      render: {
        js: renderJs
      },
      bundles: {
        js: bundleJs
      },
      content: content
    })));
  });
};

// Start helper.
app.start = function (port, callback) {
  var noop = function () {};
  clientApi.setBase(HOST, PORT);
  app.listen(port || PORT, callback || noop);
};

// Actually start server if script.
/* istanbul ignore next */
if (require.main === module) {
  app.indexRoute(/^\/$/);
  app.start();
}
