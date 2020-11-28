import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:3030/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:3030/users/", {
          headers: { "x-auth-token": token },
        });
        console.log(tokenRes.data);
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div>
      <>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/register"} component={Register} />
          </Switch>
        </UserContext.Provider>
      </>
    </div>
  );
}
