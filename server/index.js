/**
 * Express web server.
 */
// Babel hook.
require("babel/register");

var path = require("path");
var express = require("express");
var exphbs = require("express-handlebars");
var compress = require("compression");

var app = module.exports = express();
var converter = require("./converter");

var PORT = process.env.PORT || 3000;
var WEBPACK_DEV = process.env.WEBPACK_DEV === "true";
var RENDER_JS = true;
var RENDER_SS = true;

// ----------------------------------------------------------------------------
// Setup, Static Routes
// ----------------------------------------------------------------------------
app.use(compress());
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "../templates"));

// Static libraries and application HTML page.
app.use("/js", express.static("dist/js"));

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

app.use("/", function (req, res) {
  // Render JS? Server-side?
  var mode = req.query.__mode;
  var renderJs = RENDER_JS && mode !== "nojs";
  var renderSs = RENDER_SS && mode !== "noss";
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

  res.render("index", {
    layout: false,
    render: {
      js: renderJs
    },
    bundles: {
      js: bundleJs
    },
    content: renderSs ? React.renderToString(new Page()) : null
  });
});

// Actually start server if script.
/* istanbul ignore next */
if (require.main === module) {
  app.listen(PORT);
}
