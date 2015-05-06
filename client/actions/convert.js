/**
 * Actions: Convert
 */
import alt from "../alt";
require("es6-promise").polyfill();
require("isomorphic-fetch");

class ConvertActions {
  constructor() {
    this.generateActions(
      "updateConversions",
      "setConversionTypes",
      "setConversionValue"
    );
  }

  fetchConversions(types, value) {
    this.dispatch();

    // TODO: Handle "all the things" in parallel.

    // Data URL.
    const url = `/api/${types}?from=${encodeURIComponent(value)}`;

    // Fetch.
    fetch(url)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad server response");
        }
        return res.json();
      })
      .then(data => {
        this.actions.updateConversions(types.split(",").map(type => ({
          title: type,
          content: data.to
        })));
      })
      .catch(err => {
        this.actions.conversionError(err);
      });
  }
}

export default alt.createActions(ConvertActions);
