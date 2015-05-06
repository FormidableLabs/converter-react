/**
 * Actions: Convert
 */
import alt from "../alt";

class ConvertActions {
  constructor() {
    this.generateActions(
      "fetchConversions",
      "setConversionTypes",
      "setConversionValue"
    );
  }
}

export default alt.createActions(ConvertActions);
