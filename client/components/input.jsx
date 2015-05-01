/**
 * Convert input.
 */
import React from "react";

export default class Input extends React.Component {
  render() {
    return (
      <input type="text" className="form-control"
             placeholder="Text to convert..." />
    );
  }
}
