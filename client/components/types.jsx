/**
 * Conversion types.
 */
import React from "react";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

import Title from "./types-title";

export default class Types extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: undefined };
  }

  _setType(type) {
    this.setState({ title: type });
  }

  render() {
    return (
      <DropdownButton
        className="input-group-btn"
        pullRight
        title=<Title title={this.state.title} />
        >
        <MenuItem onClick={this._setType.bind(this, "camel case")}>
          camel case
        </MenuItem>
        <MenuItem onClick={this._setType.bind(this, "snake case")}>
          snake case
        </MenuItem>
        <MenuItem onClick={this._setType.bind(this, "dasherized")}>
          dasherized
        </MenuItem>
        <MenuItem divider />
        <MenuItem onClick={this._setType.bind(this, "all the things")}>
          <strong>all the things</strong>
        </MenuItem>
      </DropdownButton>
    );
  }
}
