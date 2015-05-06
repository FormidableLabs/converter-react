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

  render() {
    return (
      <Input
        className="form-control"
        onChange={this.onChange.bind(this)}
        placeholder="Text to convert..."
        type="text"
      />
    );
  }
}
