/**
 * Convert button.
 */
import React from "react";
import Button from "react-bootstrap/lib/Button";

export default class Convert extends React.Component {
  render() {
    return (
      <span className="input-group-btn">
        <Button>
          Convert
        </Button>
      </span>
    );
  }
}
