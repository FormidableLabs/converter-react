/**
 * Client entry point.
 */
/*globals document:false, location:false */
import React from "react";
import { Provider } from "react-redux";

import createStore from "./store/create-store";
import { fetchConversions } from "./actions/";
import { parseBootstrap } from "./utils/query";

import Page from "./containers/page";

const rootEl = document.querySelector(".js-content");

// Although our Flux store is not a singleton, from the point of view of the
// client-side application, we instantiate a single instance here which the
// entire app will share. (So the client app _has_ an effective singleton).
let store = createStore();

// Render helpers -- may defer based on client-side actions.
let deferRender = false;
const render = () => {
  React.render(
    <Provider store={store}>
      {() => <Page />}
    </Provider>, rootEl
  );
};

// Try server bootstrap _first_ because doesn't need a fetch.
let serverBootstrap;
const serverBootstrapEl = document.querySelector(".js-bootstrap");
if (serverBootstrapEl) {
  try {
    serverBootstrap = JSON.parse(serverBootstrapEl.innerHTML);
    store = createStore(serverBootstrap);
  /*eslint-disable no-empty*/
  } catch (err) { /* Ignore error. */ }
  /*eslint-enable no-empty*/
}

// Then try client bootstrap: Get types, value from URL, then _fetch_ data.
if (!serverBootstrap) {
  const clientBootstrap = parseBootstrap(location.search);
  if (clientBootstrap) {
    // Defer render and do it after conversions are fetched.
    deferRender = true;

    store = createStore(clientBootstrap);
    store
      .dispatch(fetchConversions(
        clientBootstrap.conversions.types,
        clientBootstrap.conversions.value
      ))
      .then(render);
  }
}

// Render if not deferred.
if (!deferRender) {
  render();
}
