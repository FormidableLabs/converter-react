/**
 * Convert output.
 */
import React from "react";
import OutputPanel from "./output-panel";
import ErrorPanel from "./error-panel";

export default class Output extends React.Component {
  render() {
    const content = this.props.conversionError ?
      <ErrorPanel>{this.props.conversionError}</ErrorPanel> :
      this.props.conversions.map(conv =>
        <OutputPanel {...conv} key={conv.title} />
      );

    return (
      <div>
        {content}
      </div>
    );
  }
}

Output.propTypes = {
  conversionError: React.PropTypes.object,
  conversions: React.PropTypes.array
};
