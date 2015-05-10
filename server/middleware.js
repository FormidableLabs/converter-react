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
var Flux = require("../client/flux");
var ActionListeners = require("alt/utils/ActionListeners");
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
  fetchFirst: function (Component) {
    // Flux singleton for atomic actions.
    var flux = new Flux();

    return function (req, res, next) {
      // Check query string.
      var queryBootstrap = _getQueryBootstrap(req);
      if (!queryBootstrap) { return next(); }
      var types = queryBootstrap.types;
      var value = queryBootstrap.value;

      // Fetch from localhost.
      fetchConversions(types, value)
        .then(function (conversions) {
          // Bootstrap, snapshot data to res.locals and flush for next request.
          flux.bootstrap(JSON.stringify({
            ConvertStore: {
              conversions: conversions,
              types: types,
              value: value
            }
          }));

          // Stash bootstrap, and _fully-rendered-page_ with proper data.
          res.locals.bootstrapData = flux.takeSnapshot();
          if (req.query.__mode !== "noss") {
            // **Note**: Component rendering could be made much more generic
            // with a simple callback of `function (flux)` that the upstream
            // component can use however it wants / ignore.
            res.locals.bootstrapComponent =
              React.renderToString(new Component({ flux: flux }));
          }

          // Restore for next request.
          flux.flush();

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
   * **Flux Instance**: This middleware creates ephemeral flux instances to
   * allow async actions free reign to mutate store state before snapshotting.
   *
   * @param   {Object}    Component React component to render.
   * @returns {Function}            middleware function
   */
  actions: function (Component) {
    return function (req, res, next) {
      // Check query string.
      var queryBootstrap = _getQueryBootstrap(req);
      if (!queryBootstrap) { return next(); }
      var types = queryBootstrap.types;
      var value = queryBootstrap.value;

      // Flux instance for this single request / callback.
      var flux = new Flux();
      var listener = new ActionListeners(flux);
      var actions = flux.actions.ConvertActions;

      // Wrap
      var _done = function (err) {
        listener.removeAllActionListeners();
        flux.flush();
        next(err);
      };

      // **Strategy**: Execute a series of Flux Actions that end with the
      // correct data store results we can snapshot.
      //
      // There's only one listener here, but it could be a series that would
      // at the end result in this callback.
      listener.addActionListener(actions.UPDATE_CONVERSIONS, function () {
        // Ignore actual result, instead relying on being "done" with actions.
        // Snapshot data results.
        res.locals.bootstrapData = flux.takeSnapshot();

        // Pre-render page if applicable.
        if (req.query.__mode !== "noss") {
          res.locals.bootstrapComponent =
            React.renderToString(new Component({ flux: flux }));
        }

        _done();
      });

      // Error-handling.
      listener.addActionListener(actions.CONVERSION_ERROR, _done);

      // Invoke fetching actions.
      actions.fetchConversions(types, value);
    };
  }
};
