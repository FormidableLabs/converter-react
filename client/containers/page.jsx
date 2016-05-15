/**
 * Container page.
 */
import React from "react";
import Jumbotron from "react-bootstrap/lib/Jumbotron";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";

import Convert from "../components/convert";
import Input from "../components/input";
import Types from "../components/types";
import Output from "../components/output";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "../styles/app.css";

class Page extends React.Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>The Converter!</h1>
          <p>Camel, snake and dasherize to awesomeness!</p>
        </Jumbotron>
        <Form inline>
          <FormGroup>
            <Convert />
            <Input />
            <Types />
          </FormGroup>
        </Form>
        <Output />
      </div>
    );
  }
}

export default Page;
