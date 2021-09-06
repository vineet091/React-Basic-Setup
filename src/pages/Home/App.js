import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import apiService from "../../../public/apiService";
import "./App.scss";

const Pop = styled("p")`
  display: table;
`;

class App extends Component {
  getData = () => {
    const { changeTitle } = this.props;

    //  apiService('https://api.github.com/users/iliakan', { method: 'get' }).then((response) => {
    //   if(response) {
    //     changeTitle(JSON.stringify(response));
    //   }
    // })
    changeTitle("This is new Title");
  };
  render() {
    const {
      changeTitle,
      $home: { title },
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
          <button onClick={() => this.getData()}>Change Title</button>
          <Link to="/about">Route To New About</Link>
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
    changeTitle: title => dispatch({ type: "CHANGE_TITLE", data: title })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
