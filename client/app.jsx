/**
 * Client entry point.
 */
/*globals document:false*/
import React from "react";
import Page from "./components/page";
const rootEl = document.querySelector(".js-content");

// Note: Change suffix to `.js` if not using actual JSX.
React.render(<Page />, rootEl);
