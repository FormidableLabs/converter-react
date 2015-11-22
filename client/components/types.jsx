/**
 * Conversion types.
 */
import React from "react";
import { connect } from "react-redux";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";
import { setConversionTypes } from "../actions/";

import Title from "./types-title";
import types from "../utils/types";

const noop = () => {};

class Types extends React.Component {
  setTypes(conversionTypes) {
    this.props.dispatch(setConversionTypes(conversionTypes));
  }

  render() {
    const items = Object.keys(types.TYPES).map((type) => (
      <MenuItem key={type} className={`e2e-convert-type-${type}`}
                onClick={this.setTypes.bind(this, type)}>
        {types.getTitle(type)}
      </MenuItem>
    ));

    return (
      <DropdownButton
        className="input-group-btn e2e-convert-label"
        // BUG: Dropdowns don't close by default. Here's a patch.
        // See: https://github.com/react-bootstrap/react-bootstrap/pull/195
        onSelect={noop}
        pullRight
        title=<Title title={types.getTitle(this.props.types)} />
        >
        {items}
        <MenuItem divider />
        <MenuItem className="e2e-convert-type-all"
                  onClick={this.setTypes.bind(this, types.ALL)}>
          <strong>{types.ALL_DESC}</strong>
        </MenuItem>
      </DropdownButton>
    );
  }
}

Types.propTypes = {
  dispatch: React.PropTypes.func,
  types: React.PropTypes.string
};

export default connect((state) => ({
  types: state.conversions.types,
  value: state.conversions.value
}))(Types);
