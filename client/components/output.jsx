/**
 * Convert output.
 */
import React from "react";
import { connect } from 'react-redux';
import OutputPanel from "./output-panel";
import ErrorPanel from "./error-panel";

class Output extends React.Component {
  render() {
    const content = this.props.conversionError ?
      <ErrorPanel>{this.props.conversionError}</ErrorPanel> :
      this.props.conversions.map((conv) =>
        <OutputPanel {...conv} key={conv.title} />
      );

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default connect((state)=> ({
  conversions: state.conversions.conversions,
  conversionError: state.conversions.conversionError
}))(Output)
