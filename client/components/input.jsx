/**
 * Convert input.
 */
import React from "react";
import Input from "react-bootstrap/lib/Input";

export default class UserInput extends React.Component {
  onChange(ev) {
    this.props.ConvertActions.setConversionValue(ev.target.value);
  }

  onKeyDown(ev) {
    if (ev.which === 13 /* Enter key */) {
      const store = this.props.ConvertStore;
      this.props.ConvertActions.fetchConversions(store.types, store.value);
    }
  }

  render() {
    return (
      <Input
        className="form-control"
        onChange={this.onChange.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
        placeholder="Text to convert..."
        type="text"
        value={this.props.ConvertStore.value}
      />
    );
  }
}

UserInput.propTypes = {
  ConvertActions: React.PropTypes.object,
  ConvertStore: React.PropTypes.object
};
