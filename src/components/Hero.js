import React from "react";
//import hero from "../assets/hero.jpeg";
import forme from "../assets/forme.svg";
import { Link } from "react-router-dom";

const Hero = (props) => {
  return (
    <div className="hero">
      <div className="hero-img-container"></div>
      <div>
        <img className="hero-torn" src={forme} alt="torn effect" />
      </div>
      <div className="CTA-container">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        <Link to="/login" className="btn-blue CTA-btn">
          Commencer à vendre
        </Link>
      </div>
    </div>
  );
};

export default Hero;
