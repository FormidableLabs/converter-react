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
      "setConversionValue",
      "conversionError"
    );
  }

  fetchConversions(types, value) {
    this.dispatch();

    Promise
      // Invoke fetches for each of the different data types.
      .all(types.split(",").map(type => {
        return fetch(`/api/${type}?from=${encodeURIComponent(value)}`)
          .then(res => {
            if (res.status >= 400) {
              throw new Error("Bad server response");
            }
            return res.json();
          })
          .then(data => ({
            title: type,
            content: data.to
          }));
      }))
      .then(datas => {
        this.actions.updateConversions(datas);
      })
      .catch(err => {
        this.actions.conversionError(err);
      });
  }
}

export default alt.createActions(ConvertActions);
