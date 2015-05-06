/**
 * Action: Convert
 */
import { Actions } from "flummox";

export default class ConvertActions extends Actions {
  getConversions(types) {
    try {
      return "TODO FETCH" + types;
    } catch (error) {
      return "TODO ERROR" + types;
    }
  }
}
