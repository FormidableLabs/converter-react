/**
 * Demo / live web server.
 *
 * This server showcases tests and documentation along with the webapp
 * and is _not_ what we are creating for the workshop.
 */
var express = require("express");
var app = require("../../server");
var PORT = process.env.PORT || 3000;

var marked = require("marked");
var renderer = new marked.Renderer();

// Serve the application.
app.use("/public/", express.static("heroku/doc/public"));
app.indexRoute("/app");

// Marked options and custom rendering.
// Skip intro heading.
renderer.heading = function (text, level) {
  if (text === "Converter - React" && level === 1) { return ""; }
  return marked.Renderer.prototype.heading.apply(this, arguments);
};

// Convert `.md` internal links to full links via a map.
var linkMap = {
  "127.0.0.1:3000": "converter-react.formidablelabs.com/app"
};
renderer.link = function (href, title, text) {
  // Mutate the links for production.
  Object.keys(linkMap).forEach(function (key) {
    var regex = new RegExp(key);
    href = href.replace(regex, linkMap[key]);
    text = text.replace(regex, linkMap[key]);
  });

  return marked.Renderer.prototype.link.apply(this, [href, title, text]);
};

marked.setOptions({
  gfm: true,
  tables: true,
  renderer: renderer
});

// Serve docs as root.
app.engine("jade", require('jade').__express);
app.get("/", function (req, res) {
  res.render("../heroku/doc/index.jade");
});
app.get("/DEVELOPMENT.md", function (req, res) {
  res.render("../heroku/doc/development.jade");
});
app.get("/CONTRIBUTING.md", function (req, res) {
  res.render("../heroku/doc/contributing.jade");
});

// Start server.
app.listen(PORT);
