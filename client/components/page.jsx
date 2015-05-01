/**
 * Container page.
 */
import React from "react";
import Convert from "./convert";
import Input from "./input";
import Types from "./types";

export default class Page extends React.Component {
   render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>The Converter!</h1>
          <p>Camel, snake and dasherize to awesomeness!</p>
        </div>
        <div className="input-group">
          <Convert />
          <Input />
          <Types />
        </div>
      </div>
    );
  };
}
