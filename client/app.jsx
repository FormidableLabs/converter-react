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

// Client-side bootstrap: Get types, value from URL, then _fetch_ data.
if (clientBootstrap) {
  alt.bootstrap(JSON.stringify({
    ConvertStore: clientBootstrap
  }));
  alt.actions.ConvertActions.fetchConversions(
    clientBootstrap.types,
    clientBootstrap.value
  );
}

// Note: Change suffix to `.js` if not using actual JSX.
React.render(<Page />, rootEl);
