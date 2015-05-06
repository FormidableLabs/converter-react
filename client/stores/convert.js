/**
 * Store: Convert
 */
import { Store } from 'flummox';

export default class ConvertStore extends Store {
  constructor({ convertActions }) {
    super();

    this.register(convertActions.getConversions, this.handleConversions);

    // TODO: Replace with immutable-js collection.
    this.state = {
      conversions: []
    };
  }

  handleConversions(conversions) {
    this.setState({
      conversions: conversions
    });
  }
}
