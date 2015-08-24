"use strict";

// Wraps `superagent` with test methods.
// See: http://visionmedia.github.io/superagent/
// See: https://github.com/visionmedia/supertest
var request = require("supertest");

describe("rest/api", function () {

  describe("camel", function () {

    // Let's test using supertest to request **and** assert.
    it("should handle no query data (supertest)", function (done) {
      request(global.TEST_REST_BASE_URL)
        .get("api/camel")
        .expect("content-type", /json/)
        .expect(200)
        .expect({ from: "", to: "" })
        .end(done);
    });

    // Let's do the same test with chai asserts instead.
    it("should handle no query data (chai)", function (done) {
      request(global.TEST_REST_BASE_URL)
        .get("api/camel")
        .end(function (err, res) {
          if (err) { return done(err); }

          expect(res.headers["content-type"]).to.match(/json/);
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal({ to: "", from: "" });

          done();
        });
    });

    describe("should convert snake case", function () {
      it("GET hi-there", function (done) {
        request(global.TEST_REST_BASE_URL)
          .get("api/camel")
          .query({ from: "hi-there-REST" })
          .expect({ from: "hi-there-REST", to: "hiThereRest" })
          .end(done);
      });

      // WORKSHOP: ... should think of more REST test cases here!
    });

    // ------------------------------------------------------------------------
    // WORKSHOP: MAKE_DESCRIBES_AND_IMPLEMENT_TESTS
    //
    // These `it` pending specs should be converted to `describe` subsuites
    // and then filled in with multiple `it` specs, each `GET`-ing a different
    // query param to test agains.
    // ------------------------------------------------------------------------
    it("should not convert inapplicable strings");
    it("should leave unchanged camel case");
    it("should convert snake case");
    it("should convert dash case");
    it("should convert mixed cases");
  });

  describe("snake", function () {
    // ------------------------------------------------------------------------
    // WORKSHOP: MAKE_DESCRIBES_AND_IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should handle base cases");
    it("should not convert inapplicable strings");
    it("should leave unchanged snake case");
    it("should convert camel case");
    it("should convert dash case");
    it("should convert mixed cases");
  });

  describe("dash", function () {
    // ------------------------------------------------------------------------
    // WORKSHOP: MAKE_DESCRIBES_AND_IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should handle base cases");
    it("should not convert inapplicable strings");
    it("should leave unchanged dash case");
    it("should convert snake case");
    it("should convert camel case");
    it("should convert mixed cases");
  });

});
