/**
 * Express web server.
 */
var path = require("path");
var express = require("express");
var exphbs = require("express-handlebars");

var app = module.exports = express();
var converter = require("./converter");

var PORT = process.env.PORT || 3000;
var RENDER_JS = true;

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
// Setup, Static Routes
// ----------------------------------------------------------------------------
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "../templates"));

// Static libraries and application HTML page.
app.use("/js", express.static("dist/js"));

// Application.
app.use("/", function (req, res) {
  var stats = require("../dist/server/stats.json");

  res.render("index", {
    layout: false,
    render: {
      js: RENDER_JS
    },
    bundles: {
      js: stats.assetsByChunkName.main[0] // First file is JS path.
    },
    content: "TODO"
  });
});

// Actually start server if script.
/* istanbul ignore next */
if (require.main === module) {
  app.listen(PORT);
}
