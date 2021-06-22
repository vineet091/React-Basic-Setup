import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import apiService from "../../../public/apiService";
import "./about.scss";

const Pop = styled("p")`
  display: table;
`;

class About extends Component {
  static componentWillServerRender = ({ store: { dispatch } }) => {
    const promises = [];
    console.log("working ssr");
    var a = apiService("https://api.github.com/users/iliakan", { method: "get" }).then(
      response => {
        if (response) {
            console.log(response)
            dispatch({ type: "CHANGE_CONTENT", data: JSON.stringify(response)});
          // changeTitle(JSON.stringify(response));
        }
      }
    );
    // var a = fetch('https://sit-digital.ril.com/rildigitalws/v2/rrldigital/cms/pagedata?pageId=headerpage&pageType=contentPage')
    // .then((response) => response.json())
    // .then((response) => console.log(response));

    promises.push(a);
    return Promise.all(promises);
  };

  getData = () => {
    const { changeContent } = this.props;

    apiService("https://api.github.com/users/iliakan", { method: "get" }).then(
      response => {
        if (response) {
            console.log(response)
          changeContent(JSON.stringify(response));
        }
      }
    );
  };
  render() {
    const {
      $home: { title, content },
      history
    } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <h2>{title}</h2>
        </div>
        <Pop className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </Pop>
        <Pop className="App-intro">
          <button onClick={() => this.getData()}>Change Content</button>
        </Pop>
        <Pop className="App-intro">
          <div>{content}</div>
        </Pop>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    $home: state.$home
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeTitle: title => dispatch({ type: "CHANGE_TITLE", data: title }),
    changeContent: content => dispatch({ type: "CHANGE_CONTENT", data: content }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(About));
