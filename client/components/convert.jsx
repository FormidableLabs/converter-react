/**
 * Convert button.
 */
import React from "react";
import Button from "react-bootstrap/lib/Button";
import FluxComponent from "flummox/component";

export default class Convert extends React.Component {
  _onClick() {
    console.log("TODO CLICK", this.props.flux);
  }

  render() {
    return (
      <FluxComponent connectToStores={["conversions"]}>
        <span
          className="input-group-btn"
          onClick={this._onClick.bind(this)}>
          <Button>
            Convert
          </Button>
        </span>
      </FluxComponent>
    );
  }
}
