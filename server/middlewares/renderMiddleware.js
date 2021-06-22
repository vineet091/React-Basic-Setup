const fs = require("fs");
const path = require("path");
import React from "react";
import { Router, StaticRouter } from "react-router-dom";
import history from "../../public/history";
import { Provider } from "react-redux";
import { matchRoutes } from "react-router-config";
import { renderToString } from "react-dom/server";
import execComponentWillServerRender from "./execComponentWillServerRender";
import CreateStore from "../../src/store/configureStore";
import App from "../../src/App";
import routes from "../../public/routes";
const APP_SSR = process.env.APP_SSR === "true";
const store = CreateStore({ history, isBrowser: false });

export default async (req, res) => {
  console.log("APP_SSR1", APP_SSR, req.url);
  const branches = matchRoutes(routes, req.originalUrl.split("?")[0]);
  const branch = branches[branches.length - 1];
  history.replace(req.originalUrl);
  const context = {};
  if (APP_SSR) {
    await execComponentWillServerRender(branches, {
      store,
      route: branch.route,
      req,
      res
    });
  }
  const app = renderToString(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  // read `index.html` file

  const preLoadedState = store.getState();
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../../dist/index.html"),
    {
      encoding: "utf8"
    }
  );
  indexHTML = indexHTML.replace(
    '<div id="root"></div>',
    `<div id="root">${app}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(
      preLoadedState
    ).replace(/</g, "\\u003c")}</script>`
  );
  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
  // set header and status
};
