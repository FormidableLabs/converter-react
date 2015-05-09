/**
 * Alt instance.
 */
import Alt from "alt";

import ConvertActions from "./actions/convert";
import ConvertStore from "./stores/convert";

export default class Flux extends Alt {
  constructor(config = {}) {
    super(config);

    this.addActions("ConvertActions", ConvertActions);
    this.addStore("ConvertStore", ConvertStore);
  }
}
