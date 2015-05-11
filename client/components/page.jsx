/**
 * Container page.
 */
import React from "react";
import Jumbotron from "react-bootstrap/lib/Jumbotron";

import Convert from "./convert";
import Input from "./input";
import Types from "./types";
import Output from "./output";

import AltContainer from "alt/AltContainer";

// Helper for adding stores.
const addStore = (component, store) => (
  <AltContainer store={store}>
    {component}
  </AltContainer>
);

export default class Page extends React.Component {
   render() {
    const store = this.props.flux.getStore("ConvertStore");

    return (
      <div className="container">
        <Jumbotron>
          <h1>The Converter!</h1>
          <p>Camel, snake and dasherize to awesomeness!</p>
        </Jumbotron>
        <div className="input-group">
          {addStore(<Convert />, store)}
          {addStore(<Input />, store)}
          {addStore(<Types />, store)}
        </div>
        {addStore(<Output />, store)}
      </div>
    );
  };
}

Page.propTypes = {
  flux: React.PropTypes.object.isRequired
};
