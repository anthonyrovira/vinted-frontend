import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";

const Login = (props) => {
  const { handleLogin, setUsernameMain } = props;
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!email) {
        return setErrorMessage("Missing email");
      }
      if (!password) {
        return setErrorMessage("Missing password");
      }
      setErrorMessage("");
      const data = { email, password };
      const response = await axios.post(
        "https://vinted-hysteria9.herokuapp.com/user/login",
        data
      );
      if (response.data) {
        const token = response.data.token;
        //console.log(token);
        handleLogin(token);
        const username = response.data.account.username;
        setUsernameMain(username);

        history.push("/");
      } else {
        alert("L'utilisateur ne possède pas de compte ");
        console.log(errorMessage);
      }
      //axios.post('https://vinted-hysteria9.herokuapp.com/login')

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="centered-container">
        <h2>Se Connecter</h2>
        <form
          className="form-container"
          action=""
          method="post"
          onSubmit={handleSubmit}
        >
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
          <button type="submit" className="btn-blue">
            Se Connecter
          </button>
          <Link to="/signup" className="hyperlink">
            Pas encore de compte ? Inscris-toi !
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
