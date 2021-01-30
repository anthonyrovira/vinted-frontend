import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const Offer = (props) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-hysteria9.herokuapp.com/offer/${id}`
      );
      setData(response.data.offer);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  //console.log(data);
  return (
    <div className="offer-bg">
      {isLoading ? (
        <div className="wrapper offer-container">
          <h1>Loading page...</h1>
          {/*//! A remplacer par des emplacements vides */}
        </div>
      ) : (
        <div className="wrapper offer-container">
          <div className="carousel-container">
            <img
              className="carousel-img"
              src={data.product_image[0].secure_url}
              alt={data.product_name}
            />
          </div>
          <div className="offer-info-container">
            <h2>
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(data.product_price)}
            </h2>
            <div>
              {Object.keys(data.product_details[0]).map((item, index) => {
                return (
                  <div className="offer-info-top" key={index}>
                    <div>
                      <h6>{item}</h6>
                    </div>
                    <div>
                      <h5>{data.product_details[0][item].toUpperCase()}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="offer-bottom">
              <h3>{data.product_name}</h3>
              <h6>{data.product_description}</h6>
              <div>
                <img
                  className="avatar-img-m"
                  src={data.owner.account.avatar.secure_url}
                  alt={data.owner.account.username}
                />
                <span className="user">{data.owner.account.username}</span>
              </div>
            </div>
            <div>
              <button type="button" className="btn-blue buy-btn">
                Acheter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
