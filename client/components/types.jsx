/**
 * Conversion types.
 */
import React from "react";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

class Title extends React.Component {
  render() {
    return (
      <span>
        <span>to&nbsp;</span>
        <span>...</span>
        <span>&nbsp;!</span>
      </span>
    );
  }
}

export default class Types extends React.Component {
  render() {
    return (
      <DropdownButton className="input-group-btn" pullRight
        title=<Title />>
        <MenuItem>camel case</MenuItem>
        <MenuItem>snake case</MenuItem>
        <MenuItem>dasherized</MenuItem>
        <MenuItem divider />
        <MenuItem><strong>all the things</strong></MenuItem>
      </DropdownButton>
      /*
      <div className="input-group-btn">
        <button type="button" className="btn btn-default dropdown-toggle"
                data-toggle="dropdown" aria-expanded="false"
                >to
          <span className="js-convert-label">...</span>
          !
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu dropdown-menu-right" role="menu">
          <li><a href="#">camel case</a></li>
          <li><a href="#">snake case</a></li>
          <li><a href="#">dasherized</a></li>
          <li className="divider"></li>
          <li><a href="#"><b>all the things</b></a></li>
        </ul>
      </div>
      */
    );
  }
}
