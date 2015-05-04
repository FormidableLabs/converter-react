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
    this.state = { title: Types._TYPES.camel };
  }

  _setType(key) {
    const title = Types._TYPES[key] ||
      (key === Types._ALL ? Types._ALL_DESC : undefined);
    this.setState({ title: title });
  }

  render() {
    const types = Types._TYPES;
    const items = Object.keys(types).map(key => (
      <MenuItem key={key} onClick={this._setType.bind(this, key)}>
        {types[key]}
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
        <MenuItem onClick={this._setType.bind(this, Types._ALL)}>
          <strong>{Types._ALL_DESC}</strong>
        </MenuItem>
      </DropdownButton>
    );
  }
}

// All the individual types.
Types._TYPES = {
  camel: "camel case",
  snake: "snake case",
  dash: "dasherized"
};

// Special case "all types".
Types._ALL = Object.keys(Types._TYPES);
Types._ALL_DESC = "all the things";
