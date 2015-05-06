/**
 * Conversion types.
 */
import React from "react";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

import Title from "./types-title";
import types from "../utils/types";

export default class Types extends React.Component {
  getStoreState() {
    return { title: "camel" };
  }

  constructor(props) {
    super(props);
    this.state = this.getStoreState();
  }

  setType(key) {
    const title = types.getTitle(key);
    this.setState({ title: title });
  }

  render() {
    const items = Object.keys(types.TYPES).map(key => (
      <MenuItem key={key} onClick={this.setType.bind(this, key)}>
        {types.getTitle(key)}
      </MenuItem>
    ));

    return (
      <DropdownButton
        className="input-group-btn"
        pullRight
        title=<Title title={this.state.title} />
        >
        {items}
        <MenuItem divider />
        <MenuItem onClick={this.setType.bind(this, types.ALL)}>
          <strong>{types.ALL_DESC}</strong>
        </MenuItem>
      </DropdownButton>
    );
  }
}
