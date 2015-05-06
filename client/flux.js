/**
 * Flux wrapper.
 */
import { Flummox } from "flummox";
import ConvertActions from "./actions/convert";
import ConvertStore from "./stores/convert";

export default class Flux extends Flummox {
  constructor() {
    super();

    const convertActions = this.createActions('conversions', ConvertActions);
    this.createStore("conversions", ConvertStore, { convertActions });
  }
}
