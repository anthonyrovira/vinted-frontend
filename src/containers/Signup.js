import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

const Signup = (props) => {
  const { handleLogin, setUsernameMain } = props;
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewsletterChange = () => {
    setNewsletter(!newsletter);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      if (!username) {
        return setErrorMessage("Missing name");
      }
      if (!email) {
        return setErrorMessage("Missing email");
      }
      if (!password) {
        return setErrorMessage("Missing password");
      }
      //console.log({ email, username, password, newsletter });
      setErrorMessage("");
      setSubmitted(true);
    } catch (error) {
      console.log(errorMessage, error);
    }
  };

  //https://vinted-hysteria9.herokuapp.com/user/signup

  useEffect(() => {
    if (submitted) {
      const fetchData = async () => {
        try {
          const data = { email, username, password, newsletter };
          const response = await axios.post(
            "https://vinted-hysteria9.herokuapp.com/user/signup",
            data
          );
          if (response.data) {
            const token = response.data.token;
            console.log(token);
            handleLogin(token);

            setUsernameMain(username);

            history.push("/");
          } else {
            console.log("no token returned");
          }
        } catch (error) {
          alert("L'utilisateur n'a pas pu être inscrit");
          console.log(error);
        }
      };

      fetchData();
    }
  }, [submitted]);

  return (
    <div className="wrapper">
      <div className="centered-container">
        <h2>S'inscrire</h2>
        <form
          className="form-container"
          action=""
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="reveal-password-container checkbox-container">
            <input type="checkbox" id="reveal-password" />
            <label htmlFor="reveal-password">Afficher le mot de passe</label>
          </div>
          <div className="newsletter-container checkbox-container">
            <input
              type="checkbox"
              id="newsletter"
              checked={newsletter}
              onChange={handleNewsletterChange}
            />
            <label htmlFor="newsletter">S'inscrire à la newsletter</label>
            <p className="disclaimer-newsletter">
              En m'inscrivant je confirme avoir lu et accepté les{" "}
              <span>Termes & Conditions</span> et{" "}
              <span>Politique de Confidentialité</span> de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <button type="submit" className="btn-blue">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
