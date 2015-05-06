/**
 * Client entry point.
 */
/*globals document:false, location:false */
import React from "react";
import Page from "./components/page";

import alt from "./alt";
import { parseBootstrap } from "./utils/query";

const rootEl = document.querySelector(".js-content");

// Try server bootstrap _first_ because doesn't need a fetch.
const serverBootstrapEl = document.querySelector(".js-bootstrap");
let serverBootstrap;
if (serverBootstrapEl) {
  try {
    serverBootstrap = JSON.parse(serverBootstrapEl.innerHTML);
    alt.bootstrap(JSON.stringify(serverBootstrap));
  } catch (err) {
    // Ignore error.
  }
}

// Then try client bootstrap: Get types, value from URL, then _fetch_ data.
if (!serverBootstrap) {
  const clientBootstrap = parseBootstrap(location.search);

  if (clientBootstrap) {
    alt.bootstrap(JSON.stringify({
      ConvertStore: clientBootstrap
    }));
    alt.getActions("ConvertActions").fetchConversions(
      clientBootstrap.types,
      clientBootstrap.value
    );
  }
}

// Note: Change suffix to `.js` if not using actual JSX.
React.render(<Page />, rootEl);
