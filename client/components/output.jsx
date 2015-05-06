/**
 * Convert output.
 */
import React from "react";
import OutputPanel from "./output-panel";

export default class Output extends React.Component {
  render() {
    return (
      <div>
        {this.props.conversions.map(conv =>
          <OutputPanel {...conv} key={conv.title} />
        )}
      </div>
    );
  }
}

Output.propTypes = {
  conversions: React.PropTypes.array
};
