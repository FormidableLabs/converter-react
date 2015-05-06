/**
 * Convert button.
 */
import React from "react";
import Button from "react-bootstrap/lib/Button";
import ConvertActions from "../actions/convert";

export default class Convert extends React.Component {
  onClick() {
    ConvertActions.fetchConversions();
  }

  render() {
    return (
      <span className="input-group-btn">
        <Button onClick={this.onClick.bind(this)}>
          Convert
        </Button>
      </span>
    );
  }
}
