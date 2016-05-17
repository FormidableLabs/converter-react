/**
 * Conversion types title.
 */
import React from "react";

export default class Title extends React.Component {
  render() {
    return (
      <span>
        <span>to&nbsp;</span>
        <span>{this.props.title}</span>
        <span>&nbsp;!</span>
      </span>
    );
  }
}

Title.propTypes = {
  title: React.PropTypes.string
};
