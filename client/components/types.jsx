/**
 * Conversion types.
 */
import React from "react";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

import Title from "./types-title";
import types from "../utils/types";

import ConvertActions from "../actions/convert";
import ConvertStore from "../stores/convert";

export default class Types extends React.Component {
  constructor(props) {
    super(props);
    this.state = ConvertStore.getState();

    // TODO: Get auto-binding or descriptor thingy.
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ConvertStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ConvertStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(ConvertStore.getState());
  }

  setTypes(conversionTypes) {
    ConvertActions.setConversionTypes(conversionTypes);
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
        pullRight
        title=<Title title={types.getTitle(this.state.types)} />
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
