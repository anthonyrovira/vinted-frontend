import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Switch from "react-switch";

import Slider from "@material-ui/core/Slider";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import logo from "../assets/vinted-logo.svg";

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      root: {
        width: "80%",
        marginLeft: "10px",
      },
      thumb: {
        color: "#09b1ba",
        boxShadow: "#ebebeb 0 2px 2px",
        "&:focus, &:hover, &$active": {
          boxShadow: "#ccc 0 2px 3px 1px",
        },
      },
      track: {
        color: "#09b1ba",
        borderRadius: 2,
      },
      rail: {
        color: "#09b1ba",
      },
    },
  },
});

const Header = (props) => {
  const {
    authToken,
    title,
    handleLogout,
    handleTitle,
    username,
    setUsernameMain,
    handleSortByPrice,
    sortByPrice,
    range,
    handleRangeChange,
    //cursorText,
  } = props;

  const history = useHistory();

  useEffect(() => {
    if (authToken) {
      const fetchData = async () => {
        const response = await axios.get(
          `https://vinted-hysteria9.herokuapp.com/user/${authToken}`
        );
        //console.log(response);
        setUsernameMain(response.data.user.account.username);
      };
      fetchData();
    }
  });

  return (
    <header>
      <div className="wrapper">
        <div className="header-container">
          <Link to="/">
            <img className="logo" src={logo} alt="Vinted logo" />
          </Link>
          <div className="search-engine-container">
            <div className="search-bar-container">
              <FontAwesomeIcon
                icon={faSearch}
                size="1x"
                className="search-logo"
              ></FontAwesomeIcon>
              <input
                type="text"
                placeholder="Recherche des articles"
                className="search-bar"
                value={title}
                onChange={handleTitle}
              />
            </div>
            <div className="price-filters">
              <div className="sort-container">
                <label>Trier par prix : </label>
                <Switch
                  className="sort-switch"
                  height={16}
                  width={36}
                  onChange={handleSortByPrice}
                  checked={sortByPrice}
                  onColor="#09b1ba"
                  onHandleColor="#FFF"
                  handleDiameter={14}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                />
              </div>
              <div className="price-gauge">
                <label>Prix entre : </label>
                <ThemeProvider theme={muiTheme}>
                  <Slider
                    className="gauge"
                    value={range}
                    step={5}
                    onChange={handleRangeChange}
                    valueLabelDisplay="auto"
                    //aria-labelledby="range-slider"
                  />
                </ThemeProvider>
              </div>
            </div>
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
