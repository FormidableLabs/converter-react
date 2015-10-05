"use strict";

/**
 * Middleware.
 *
 * ## Flux
 *
 * Various strategies to server-side bootstrap the data and a fully rendered
 * page into the application. If successful, adds two `res.locals` values:
 *
 * - `bootstrapData`: Data bootstrap for the app.
 * - `bootstrapComponent`: Rendered component for app.
 *
 * Strategies so far:
 *
 * - `fetch`: Manually retrieve data and send through singleton flux.
 * - `actions`: Use flux instances to invoke/listen to actions and get data.
 *
 */
var React = require("react");
var Provider = require("react-redux").Provider;

var createStore = require("../client/store/create-store");
var fetchConversions = require("../client/utils/api").fetchConversions;

// Return query bootstrap information or `null`.
var _getQueryBootstrap = function (req) {
  // Check query string.
  var bootstrap = req.query.__bootstrap;
  if (!bootstrap) { return null; }

  // Check have all parts.
  var parts = bootstrap.split(":");
  var types = parts[0];
  var value = parts[1];
  if (!types) { return null; }

  return {
    types: types,
    value: value
  };
};

module.exports.flux = {
  /**
   * "Fetch first" strategy middleware with **singleton**.
   *
   * Use the underlying API to fetch data and then manually `bootstrap`.
   *
   * The advantages of this approach are:
   *
   * - It doesn't add extra listeners, instead going straight to the source.
   * - More efficient with a singleton flux instance.
   *
   * The disadvantages of this approach are:
   *
   * - There is separate logic for retrieving data on the server vs. the client.
   * - All flux interaction has to be `synchronous` because it's a singleton.
   *   (But that part can be easily changed).
   *
   * **Flux Singleton**: This middleware uses a single flux instance across
   * all requests, which means that our sequence of:
   *
   * - `alt.bootstrap(DATA)`
   * - `alt.takeSnapshot()`
   * - React component render
   * - `alt.flush()`
   *
   * Has to be synchronous and complete in the immediate thread before handing
   * control back to another event.
   *
   * @param   {Object}    Component React component to render.
   * @returns {Function}            middleware function
   */
  fetch: function (Component) {

    return function (req, res, next) {
      // Skip if not server-rendering
      if (req.query.__mode === "noss") { return next(); }

      // Check query string.
      var queryBootstrap = _getQueryBootstrap(req);
      if (!queryBootstrap) { return next(); }
      var types = queryBootstrap.types;
      var value = queryBootstrap.value;

      // Fetch from localhost.
      fetchConversions(types, value)
        .then(function (conversions) {

          // Bootstrap, snapshot data to res.locals and flush for next request.
          var store = createStore({
            conversions: conversions,
            types: types,
            value: value
          });

          // Stash bootstrap, and _fully-rendered-page_ with proper data.
          res.locals.bootstrapData = store.getState();
          if (req.query.__mode !== "noss") {
            // **Note**: Component rendering could be made much more generic
            // with a simple callback of `function (flux)` that the upstream
            // component can use however it wants / ignore.
            res.locals.bootstrapComponent =
              React.renderToString(new Provider({ store: store }, function () {
                return new Component();
              }));
          }

          next();
        })
        .catch(function (err) { next(err); });
    };
  }
};
