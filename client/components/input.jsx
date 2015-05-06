/**
 * Convert input.
 */
import React from "react";
import Input from "react-bootstrap/lib/Input";

import ConvertActions from "../actions/convert";

export default class UserInput extends React.Component {
  onChange(ev) {
    ConvertActions.setConversionValue(ev.target.value);
  }

  onKeyDown(ev) {
    if (ev.which === 13 /* Enter key */) {
      ConvertActions.fetchConversions(this.props.types, this.props.value);
    }
  }

  render() {
    return (
      <Input
        className="form-control"
        onChange={this.onChange}
        onKeyDown={this.onKeyDown.bind(this)}
        placeholder="Text to convert..."
        type="text"
        value={this.props.value}
      />
    );
  }
}

UserInput.propTypes = {
  types: React.PropTypes.array,
  value: React.PropTypes.string
};
