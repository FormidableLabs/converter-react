/**
 * Client entry point.
 */
/*globals document:false*/
import React from "react";
import Page from "./components/page";

import alt from "./alt";
import { parseBootstrap } from "./utils/query";

const rootEl = document.querySelector(".js-content");
const clientBootstrap = parseBootstrap(location.search);

// Bootstrap (if applicable).
if (clientBootstrap) {
  alt.bootstrap(JSON.stringify({
    ConvertStore: clientBootstrap
  }));
  console.log("TODO HERE", clientBootstrap, require("./stores/convert"));
  console.log("TODO HERE", alt.takeSnapshot());
}

// Note: Change suffix to `.js` if not using actual JSX.
React.render(<Page />, rootEl);
