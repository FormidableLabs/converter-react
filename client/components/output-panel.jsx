/**
 * Convert output panel
 */
import React from "react";
import Panel from "react-bootstrap/lib/Panel";

export default class OutputPanel extends React.Component {
  render() {
    return (
      <Panel
        className="output-panel"
        header=<h3>{this.props.title}</h3>
        >
        {this.props.content}
      </Panel>
    );
  }
}

OutputPanel.propTypes = {
  content: React.PropTypes.string,
  title: React.PropTypes.string
};
