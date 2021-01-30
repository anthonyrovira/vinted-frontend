import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  /*useHistory,*/
} from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";
import qs from "qs";
import { useDebounce } from "use-debounce";

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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [range, setRange] = useState([0, 1000]);
  const [sortByPrice, setSortByPrice] = useState(true); // ordre décroissant par défaut
  const [debouncedTitle] = useDebounce(title, 1000);
  const [debouncedRange] = useDebounce(range, 1000);

  //const history = useHistory();

  const handleLogin = (token) => {
    setAuthToken(token);
    Cookies.set("user_token", token);
  };

  const handleLogout = () => {
    setAuthToken("");
    Cookies.remove("user_token");
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSortByPrice = (value) => {
    setSortByPrice(value);
  };

  const handleRangeChange = (event, newValue) => {
    //console.log(newValue);
    setRange(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        title: debouncedTitle,
        sort: sortByPrice ? "price-asc" : "price-desc",
        priceMin: debouncedRange[0],
        priceMax: debouncedRange[1],
      };

      const queryParams = qs.stringify(params);

      const response = await axios.get(
        `https://vinted-hysteria9.herokuapp.com/offers?${queryParams}`
      );
      setData(response.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, [debouncedTitle, debouncedRange, sortByPrice]);

  return (
    <Router>
      {/* Insérer le headers et tous les éléments communs aux pages */}
      <Header
        username={username}
        setUsernameMain={setUsername}
        title={title}
        authToken={authToken}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        handleTitle={handleTitle}
        handleSortByPrice={handleSortByPrice}
        sortByPrice={sortByPrice}
        handleRangeChange={handleRangeChange}
        range={range}
        //cursorText={cursorText}
      ></Header>
      <Switch>
        <Route path="/offer/:id">
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
          <Home data={data} isLoading={isLoading}></Home>
        </Route>
      </Switch>
    </Router>
  );
}
