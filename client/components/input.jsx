/**
 * Convert input.
 */
import React from "react";
import Input from "react-bootstrap/lib/Input";

export default class UserInput extends React.Component {
  render() {
    return (
      <Input
        className="form-control"
        placeholder="Text to convert..."
        type="text"
      />
    );
  }
}
