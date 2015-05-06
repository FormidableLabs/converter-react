/**
 * Stores: Convert
 */
import alt from "../alt";
import ConvertActions from "../actions/convert";

import types from "../utils/types";

class ConvertStore {
  constructor() {
    // Auto-magically bind to methods with `onACTION` or `ACTION`.
    // See: http://alt.js.org/docs/createStore/#storemodelbindactions
    this.bindActions(ConvertActions);

    // TODO: Switch to immutable-js + alt integration.
    this.conversions = [];
    this.conversionError = null;
    this.types = types.DEFAULT_TYPE;
    this.value = "";
  }

  onUpdateConversions(conversions) {
    this.conversions = conversions;
  }

  onFetchConversions() {
    // Empty out errors.
    this.conversionError = null;
    // **Note**: _Could_ empty out conversions during fetch with following:
    // this.conversions = [];
  }

  onSetConversionTypes(conversionTypes) {
    this.types = conversionTypes;
  }

  onSetConversionValue(value) {
    this.value = value;
  }

  onConversionError(err) {
    this.conversionError = err.message || err.toString();
  }
}

export default alt.createStore(ConvertStore, "ConvertStore");
