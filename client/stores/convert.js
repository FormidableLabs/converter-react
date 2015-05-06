/**
 * Stores: Convert
 */
import alt from "../alt";
import ConvertActions from "../actions/convert";

class ConvertStore {
  constructor() {
    // Auto-magically bind to methods with `onACTION` or `ACTION`.
    // See: http://alt.js.org/docs/createStore/#storemodelbindactions
    this.bindActions(ConvertActions);

    // TODO: Switch to immutable-js + alt integration.
    this.conversions = [];
  }

  onFetchConversions(/*conversions*/) {
    this.conversions = [{
      title: "camel",
      content: "todo"
    }];
  }
}

export default alt.createStore(ConvertStore);
