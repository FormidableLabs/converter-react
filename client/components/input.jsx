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
      ConvertActions.fetchConversions();
    }
  }

  render() {
    return (
      <Input
        className="form-control"
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        placeholder="Text to convert..."
        type="text"
      />
    );
  }
}
