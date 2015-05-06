/**
 * Actions: Convert
 */
import alt from "../alt";

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

    // TODO: IMPLEMENT **REAL** FETCH
    /*globals setTimeout*/
    setTimeout(() => {
      this.actions.updateConversions(types.split(",").map(type => ({
        title: type,
        content: "TODO " + value
      })));
    }, 100);
  }
}

export default alt.createActions(ConvertActions);
