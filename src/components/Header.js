import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../assets/vinted-logo.svg";

const Header = (props) => {
  const { authToken, handleLogout, username } = props;
  const history = useHistory();

  return (
    <header>
      <div className="wrapper">
        <div className="header-container">
          <Link to="/">
            <img className="logo" src={logo} alt="Vinted logo" />
          </Link>
          <div className="search-bar-container">
            <FontAwesomeIcon
              icon={faSearch}
              size="1x"
              className="search-logo"
            ></FontAwesomeIcon>
            <input type="text" className="search-bar" />
          </div>
          <nav>
            {authToken ? (
              <div className="btn-connection-container">
                <p>
                  Bienvenue{" "}
                  {username.charAt(0).toUpperCase() + username.slice(1)}
                </p>
                <button
                  onClick={handleLogout}
                  className="header-btn btn-connection"
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <div className="btn-connection-container">
                <button
                  onClick={() => history.push("/signup")}
                  className="header-btn btn-connection btn-signup"
                >
                  S'inscrire
                </button>
                <button
                  onClick={() => history.push("/login")}
                  className="header-btn btn-connection btn-login"
                >
                  Se connecter
                </button>
              </div>
            )}
          </nav>
          <button type="button" className="header-btn btn-blue">
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
