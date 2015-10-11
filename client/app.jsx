/**
 * Client entry point.
 */
/*globals document:false, location:false */
import React from "react";
import Page from "./components/page";

import Flux from "./flux";
import ActionListeners from "alt/utils/ActionListeners";
import { parseBootstrap } from "./utils/query";

const rootEl = document.querySelector(".js-content");

// Although our Flux store is not a singleton, from the point of view of the
// client-side application, we instantiate a single instance here which the
// entire app will share. (So the client app _has_ an effective singleton).
const flux = new Flux();

// Render helpers -- may defer based on client-side actions.
let deferRender = false;
const render = () => { React.render(<Page flux={flux} />, rootEl); };

// Try server bootstrap _first_ because doesn't need a fetch.
const serverBootstrapEl = document.querySelector(".js-bootstrap");
let serverBootstrap;
if (serverBootstrapEl) {
  try {
    serverBootstrap = JSON.parse(serverBootstrapEl.innerHTML);
    flux.bootstrap(JSON.stringify(serverBootstrap));
  /*eslint-disable no-empty*/
  } catch (err) { /* Ignore error. */ }
  /*eslint-enable no-empty*/
}

// Then try client bootstrap: Get types, value from URL, then _fetch_ data.
if (!serverBootstrap) {
  const clientBootstrap = parseBootstrap(location.search);

  if (clientBootstrap) {
    // Bootstrap.
    flux.bootstrap(JSON.stringify({
      ConvertStore: clientBootstrap
    }));

    // Set up listeners to render.
    // Need the update conversions to **fully complete** to be consistent for
    // the rendering.
    deferRender = true;
    const actions = flux.getActions("ConvertActions");
    const listener = new ActionListeners(flux);
    const _done = () => {
      // Render
      render();

      // Remove all of the listeners for our custom action listener.
      listener.removeAllActionListeners();
    };
    listener.addActionListener(actions.UPDATE_CONVERSIONS, _done);
    listener.addActionListener(actions.CONVERSION_ERROR, _done);

    // Trigger fetch.
    actions.fetchConversions(
      clientBootstrap.types,
      clientBootstrap.value
    );
  }
}

// Do a straight render.
if (!deferRender) {
  render();
}
