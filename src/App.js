import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import App from "../src/pages/Home/App";
import About from "../src/pages/About/About";

export default class AppContainer extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Switch>
          <Route exact path="/" component={App} key="home" />
          <Route path="/about" component={About} key="about" />
          <Route path="/career" component={App} key="career" />
          <Route path="/info" component={App} key="info" />
        </Switch>
      </div>
    );
  }
}
