import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import createStore from "../src/store/configureStore";
import App from "../src/App";

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__ || {}

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

ReactDOM.render(
  <Provider store={createStore({ isBrowser: true, initialState: preloadedState })}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
