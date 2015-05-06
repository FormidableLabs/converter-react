/**
 * Client entry point.
 */
/*globals document:false*/
import React from "react";
import Page from "./components/page";

import FluxComponent from "flummox/component";
import Flux from "./flux";

const rootEl = document.querySelector(".js-content");
const flux = new Flux();

// Note: Change suffix to `.js` if not using actual JSX.
React.render(
  <FluxComponent flux={flux}>
    <Page />
  </FluxComponent>,
  rootEl
);
