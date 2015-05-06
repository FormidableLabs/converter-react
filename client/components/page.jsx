/**
 * Container page.
 */
import React from "react";
import Jumbotron from "react-bootstrap/lib/Jumbotron";

import Convert from "./convert";
import Input from "./input";
import Types from "./types";
import Output from "./output";

export default class Page extends React.Component {
   render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>The Converter!</h1>
          <p>Camel, snake and dasherize to awesomeness!</p>
        </Jumbotron>
        <div className="input-group">
          <Convert />
          <Input />
          <Types />
        </div>
        <Output />
      </div>
    );
  };
}
