/**
 * Express web server.
 */
// Globals
var HOST = process.env.HOST || "127.0.0.1";
var PORT = process.env.PORT || 3000;
var WEBPACK_DEV = process.env.WEBPACK_DEV === "true";
var RENDER_JS = true;
var RENDER_SS = true;

// Hooks / polyfills
require("babel/register");
var clientApi = require("../client/utils/api");
clientApi.setBase(HOST, PORT);

var path = require("path");
var express = require("express");
var exphbs = require("express-handlebars");
var compress = require("compression");
var mid = require("./middleware");

var app = module.exports = express();
var converter = require("./converter");

// ----------------------------------------------------------------------------
// Setup, Static Routes
// ----------------------------------------------------------------------------
app.use(compress());
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "../templates"));

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

app.indexRoute = function (root) {
  app.use(root, [mid.flux.fetchFirst(Page)], function (req, res) {
    // Render JS? Server-side? Bootstrap?
    var mode = req.query.__mode;
    var renderJs = RENDER_JS && mode !== "nojs";
    var renderSs = RENDER_SS && mode !== "noss";

    // JS bundle rendering.
    var bundleJs;
    if (renderJs) {
      if (WEBPACK_DEV) {
        bundleJs = "http://127.0.0.1:2992/js/bundle.js";
      } else {
        // First file is JS path.
        var stats = require("../dist/server/stats.json");
        bundleJs = path.join("/js", stats.assetsByChunkName.main[0]);
      }
    }

    res.render("index.hbs", {
      layout: false,
      bootstrap: res.locals.bootstrapData,
      render: {
        js: renderJs
      },
      bundles: {
        js: bundleJs
      },
      content: renderSs ?
        // Try bootstraped page _first_ if we created it.
        res.locals.bootstrapComponent || React.renderToString(new Page()) :
        null
    });
  });
};

// Actually start server if script.
/* istanbul ignore next */
if (require.main === module) {
  app.indexRoute(/^\/$/);
  app.listen(PORT);
}
