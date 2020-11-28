import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
        </Switch>
      </>
    );
  }
}
