/**
 * Actions: Convert
 */
import alt from "../alt";
import { fetchConversions } from "../utils/api";


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

    fetchConversions(types, value)
      .then(datas => {
        this.actions.updateConversions(datas);
      })
      .catch(err => {
        this.actions.conversionError(err);
      });
  }
}

export default alt.createActions(ConvertActions);
