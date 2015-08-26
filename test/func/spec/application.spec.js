"use strict";

/**
 * Application functional tests
 *
 * **Note**: As opposed to client / server unit tests tha follow file structure
 * and server REST tests that follow the API, functional tests have a bit
 * looser organizational structure. Some time should be spent coming up with
 * a good file organizational / test suite naming hierachy for your specific
 * project.
 */
var _ = require("lodash");
var adapter = global.adapter;
var promiseDone = require("../util/promise-done");

describe("func/application", function () {
  // --------------------------------------------------------------------------
  // Suites
  // --------------------------------------------------------------------------
  describe("camel", function () {
    it("should convert complex input w/ extra spaces + click", function (done) {
      adapter.client
        // **Note**: First time a page is requested can wait over 5 seconds,
        // so consider adding `this.timeout(/*ms time*/)` in `it` or `describe`
        // scope to adjust the test timeout values.
        .url(global.TEST_FUNC_BASE_URL)

        // Check we start with empty text.
        //
        // **Note**: We use `e2e-*` for "end to end" functional test selectors.
        //
        // **Note**: Use `.ACTION().then(function (val) { })` form of promise
        // chains for `webdriverio` commands.
        .getValue(".e2e-input").then(function (text) {
          expect(text).to.equal("");
        })

        // Type a complex string.
        .setValue(".e2e-input", "  my   new-string_rocks")

        // Select the "Convert" button and click it.
        .click(".e2e-convert")

        // Verify we created an output panel with proper camel casing.
        //
        // **Note**: Using `.panel-body` subselector because part of
        // `react-bootstrap` which we don't control. Otherwise, _should_ use
        // an `e2e-` prefixed selector name.
        .getText(".e2e-output-panel .panel-body").then(function (text) {
          expect(text).to.equal("myNewStringRocks");
        })

        // **Finish the assertions**: this wrapper of `promiseDone(done)`
        // ensures any error is correctly passed to `done` and it is called
        // exactly once.
        .finally(promiseDone(done));
    });

    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should display result for empty input");
    it("should convert simple input 'hi there' to 'hiThere'");
  });

  // **No Server Render**: These type of tests aren't strictly necessary, but
  // _are_ a nice sanity check that you can truly run the application in pure
  // JS mode.
  describe("camel without server-render (noss)", function () {
    // With the `noss` no-server-render, this page is going to take even longer
    // to have DOM elements available for the test assertions to act upon.
    // Thus, we dramatically bump up our timeout.
    this.timeout(20000)

    // The _same_ test, just without server bootstrap.
    it("should convert complex input w/ extra spaces + click", function (done) {
      adapter.client
        // **Note**: Add no server render flag.
        .url(global.TEST_FUNC_BASE_URL + "?__mode=noss")

        // Check we start with empty text.
        .getValue(".e2e-input").then(function (text) {
          expect(text).to.equal("");
        })

        // Type a complex string.
        .setValue(".e2e-input", "  my   new-string_rocks")

        // Select the "Convert" button and click it.
        .click(".e2e-convert")

        // Verify we created an output panel with proper camel casing.
        .getText(".e2e-output-panel .panel-body").then(function (text) {
          expect(text).to.equal("myNewStringRocks");
        })

        .finally(promiseDone(done));
    });
  });

  // **No JavaScript**: These type of tests are a bit special-cased, because
  // there is no functionality on the page. They instead check SEO compatibility
  // and other things for just a pure static view of the page.
  describe("camel without JavaScript (nojs)", function () {
    // A _different_ test because
    it("should have expected HTML server-rendered elements", function (done) {
      adapter.client
        // **Note**: Add no server render flag.
        .url(global.TEST_FUNC_BASE_URL + "?__mode=nojs")

        // Check we start with empty text.
        .getValue(".e2e-input").then(function (text) {
          expect(text).to.equal("");
        })

        // Validate button text.
        .getText(".e2e-convert").then(function (text) {
          expect(text).to.equal("Convert");
        })

        .finally(promiseDone(done));
    });
  });

  describe("snake", function () {
    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should display result for empty input");
    it("should convert simple input 'hi there' to 'hi_there'");
  });

  describe("dash", function () {
    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should display result for empty input");
    it("should convert simple input 'hi there' to 'hi-there'");
  });

  // TODO: IMPLEMENT
  describe.skip("all the things", function () {
    it("should convert complex input w/ enter key", function (done) {
      client
        // Get the web application page.
        .get(HOST)

        // Click the conversion types drowpdown.
        .waitForElementByCss(".js-convert-label")
        .click()

        // Click the "all the things" option.
        .waitForElementByCss(
          ".js-convert-types[data-convert='camel,snake,dash']")
        .click()

        // Type a complex string and the "enter key" to invoke a conversion.
        .waitForElementByCss(".js-input")
        .type(" all_the things!" + ENTER_KEY)

        // Get all of the result panels using JavaScript!
        .safeEval(helpers.js.fn(function () {
          /*global $*/
          // This is a **client-side** JavaScript function, returning values
          // from the web application page.
          //
          // Here, we're going to extract the three values from converting to
          // all the different types.
          return $(".panel-body")
            .map(function () { return $(this).text(); })
            .toArray();
        }))
        .then(function (values) {
          // Here's a tricky part -- our conversion results can come back in
          // any order. So, we either have to sort on the array, or check that
          // the array contains values in any position.
          expect(values)
            .to.have.length(3).and
            .to.contain("allTheThings!").and
            .to.contain("all-the-things!").and
            .to.contain("all_the_things!");
        })

        // ... and we're done!
        .nodeify(done);
    });

    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should display three empty results for empty input");
    it("should convert simple input 'hi there' using a click on 'Convert'");
  });

});
