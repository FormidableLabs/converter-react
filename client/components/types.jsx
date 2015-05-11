/**
 * Conversion types.
 */
import React from "react";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

import Title from "./types-title";
import types from "../utils/types";

const noop = () => {};

export default class Types extends React.Component {
  setTypes(conversionTypes) {
    this.props.ConvertActions.setConversionTypes(conversionTypes);
  }

  render() {
    const items = Object.keys(types.TYPES).map(type => (
      <MenuItem key={type} onClick={this.setTypes.bind(this, type)}>
        {types.getTitle(type)}
      </MenuItem>
    ));

    return (
      <DropdownButton
        className="input-group-btn"
        // BUG: Dropdowns don't close by default. Here's a patch.
        // See: https://github.com/react-bootstrap/react-bootstrap/pull/195
        onSelect={noop}
        pullRight
        title=<Title title={types.getTitle(this.props.ConvertStore.types)} />
        >
        {items}
        <MenuItem divider />
        <MenuItem onClick={this.setTypes.bind(this, types.ALL)}>
          <strong>{types.ALL_DESC}</strong>
        </MenuItem>
      </DropdownButton>
    );
  }
}

Types.propTypes = {
  ConvertActions: React.PropTypes.object,
  ConvertStore: React.PropTypes.object
};
