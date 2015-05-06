/**
 * Convert output.
 */
import React from "react";
import OutputPanel from "./output-panel";
import ConvertStore from "../stores/convert";

export default class Output extends React.Component {
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

  render() {
    return (
      <div>
        {this.state.conversions.map(conv =>
          <OutputPanel {...conv} key={conv.title} />
        )}
      </div>
    );
  }
}
