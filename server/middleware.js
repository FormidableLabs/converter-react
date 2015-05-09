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
 */
var React = require("react");

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
   * "Fetch first" strategy middleware.
   *
   * Use the underlying API to fetch data and then manually `bootstrap`.
   *
   * @param   {Object}    Component React component to render.
   * @returns {Function}            middleware function
   */
  fetchFirst: function (Component) {
    return function (req, res, next) {
      // Check query string.
      var queryBootstrap = _getQueryBootstrap(req);
      if (!queryBootstrap) { return next(); }
      var types = queryBootstrap.types;
      var value = queryBootstrap.value;

      // TODO: FIX
      var alt = require("../client/alt");
      var fetchConversions = require("../client/utils/api").fetchConversions;

      // Fetch from localhost.
      fetchConversions(types, value)
        .then(function (conversions) {
          // Bootstrap, snapshot data to res.locals and flush for next request.
          alt.bootstrap(JSON.stringify({
            ConvertStore: {
              conversions: conversions,
              types: types,
              value: value
            }
          }));

          // Stash bootstrap, and _fully-rendered-page_ with proper data.
          res.locals.bootstrapData = alt.takeSnapshot();
          if (req.query.__mode !== "noss") {
            res.locals.bootstrapComponent =
              React.renderToString(new Component());
          }

          // Restore for next request.
          alt.flush();

          next();
        })
        .catch(function (err) { next(err); });
    };
  },

  /**
   * "Actions" strategy middleware.
   *
   * Use store actions and listeners to inflate the store.
   *
   * @returns {Function}            middleware function
   */
  actions: function (/*TODO: Component*/) {
    return function (/*TODO: req, res, next*/) {
      // TODO: NOTE -- Doesn't look safe! Setting listeners on the singleton
      // store means potentially race conditions (?).
      //
      // Need to switch to non-singleton flux.
      // https://github.com/FormidableLabs/converter-react/issues/9
    };
  }
};
