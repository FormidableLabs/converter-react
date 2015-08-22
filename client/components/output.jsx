/**
 * Convert output.
 */
import React from "react";
import OutputPanel from "./output-panel";
import ErrorPanel from "./error-panel";

export default class Output extends React.Component {
  render() {
    const store = this.props.ConvertStore;
    const content = store.conversionError ?
      <ErrorPanel>{store.conversionError}</ErrorPanel> :
      store.conversions.map((conv) =>
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
  ConvertStore: React.PropTypes.object
};
