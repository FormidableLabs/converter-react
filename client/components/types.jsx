/**
 * Conversion types.
 */
import React from "react";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

import Title from "./types-title";

export default class Types extends React.Component {
  render() {
    return (
      <DropdownButton
        className="input-group-btn"
        pullRight
        title=<Title />
        >
        <MenuItem>camel case</MenuItem>
        <MenuItem>snake case</MenuItem>
        <MenuItem>dasherized</MenuItem>
        <MenuItem divider />
        <MenuItem><strong>all the things</strong></MenuItem>
      </DropdownButton>
    );
  }
}
