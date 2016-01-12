/**
 * Convert output panel
 */
import React from "react";
import Panel from "react-bootstrap/lib/Panel";

export default class ErrorPanel extends React.Component {
  render() {
    return (
      <Panel
        bsStyle="danger"
        className="output-panel"
        header=<h3>Conversion Error</h3>
      >
        <code>{this.props.children}</code>
      </Panel>
    );
  }
}

ErrorPanel.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element)
};
