/**
 * Container page.
 */
import React from "react";
import Jumbotron from "react-bootstrap/lib/Jumbotron";
import AltContainer from "alt/AltContainer";

import Convert from "./convert";
import Input from "./input";
import Types from "./types";
import Output from "./output";

export default class Page extends React.Component {
  // Helper for adding stores.
  _wrapAlt(component) {
    const ConvertStore = this.props.flux.getStore("ConvertStore");
    const ConvertActions = this.props.flux.getActions("ConvertActions");

    return (
      <AltContainer
        actions={{ ConvertActions: ConvertActions }}
        stores={{ ConvertStore: ConvertStore }}
        >
        {component}
      </AltContainer>
    );
  }

  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>The Converter!</h1>
          <p>Camel, snake and dasherize to awesomeness!</p>
        </Jumbotron>
        <div className="input-group">
          {this._wrapAlt(<Convert />)}
          {this._wrapAlt(<Input />)}
          {this._wrapAlt(<Types />)}
        </div>
        {this._wrapAlt(<Output />)}
      </div>
    );
  };
}

Page.propTypes = {
  flux: React.PropTypes.object.isRequired
};
