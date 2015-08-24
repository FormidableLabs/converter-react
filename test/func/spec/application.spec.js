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

describe("func/application", function () {

  // --------------------------------------------------------------------------
  // Suites
  // --------------------------------------------------------------------------
  describe("camel", function () {
    it("should convert complex input w/ extra spaces + click", function (done) {
      done = _.once(done);

      adapter.client
        .url(global.TEST_FUNC_BASE_URL)

        // Check we start with empty text.
        // **Note**: We use `e2e-*` for "end to end" functional test selectors.
        .getText(".e2e-input", function (err, text) {
          if (err) { return done(err); }
          expect(text).to.equal("");
        })

        // // Create a note.
        // .setValue("input#note-new-input", "Delete Test")
        // .click("button#note-create")
        // .getText(".notes-item .note-title", function (err, text) {
        //   if (err) { return done(err); }
        //   expect(text).to.equal("Delete Test");
        // })

        // // Delete a note
        // .click(".notes-item .note-delete")
        // .waitForExist(".notes-item .note-delete", false)

        .call(done);







      // adapter.client

      //   // Type a complex string.
      //   .waitForElementByCss(".js-input")
      //   .type("  my   new-string_rocks")

      //   // Select the "Convert" button and click it.
      //   .waitForElementByCss(".js-submit")
      //   .click()

      //   // Verify the conversion
      //   .waitForElementByCss(".panel-body")
      //   .text()
      //   .then(function (text) {
      //     expect(text).to.equal("myNewStringRocks");
      //   })

      //   // ... and we're done!
      //   .nodeify(done);
    });

    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should display result for empty input");
    it("should convert simple input 'hi there' to 'hiThere'");
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
