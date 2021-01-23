import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header";

import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

//* HTML
//* Etats
//* Intéractions
//* CSS

export default function App() {
  const [authToken, setAuthToken] = useState(Cookies.get("user_token") || null);
  const [username, setUsername] = useState("");

  const handleLogin = (token) => {
    Cookies.set("user_token", token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    Cookies.remove("user_token");
    setAuthToken(null);
  };

  return (
    <Router>
      {/* Insérer le headers et tous les éléments communs aux pages */}
      <Header
        username={username}
        authToken={authToken}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      ></Header>
      <Switch>
        <Route path="/offer">
          <Offer></Offer>
        </Route>
        <Route path="/signup">
          <Signup
            handleLogin={handleLogin}
            setUsernameMain={setUsername}
          ></Signup>
        </Route>
        <Route path="/login">
          <Login
            handleLogin={handleLogin}
            setUsernameMain={setUsername}
          ></Login>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}
