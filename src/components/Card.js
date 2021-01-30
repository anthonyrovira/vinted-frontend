import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { offer } = props;

  return (
    <div className="card-container">
      <div className="avatar-container">
        <img
          className="avatar-img-s"
          src={offer.owner.account.avatar.secure_url}
          alt={`avatar ${offer.owner.account.username}`}
        />
        <span className="user">{offer.owner.account.username}</span>
      </div>
      <Link to={`/offer/${offer._id}`}>
        <div className="product-image-container">
          <img
            className="product-image"
            src={offer.product_image[0].secure_url}
            alt={`produit: ${offer.product_name}`}
          />
        </div>
      </Link>
      <div className="card-info-container">
        <h3>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(offer.product_price)}
        </h3>
        {offer.product_details[0]["TAILLE"] && (
          <h4>{offer.product_details[0]["TAILLE"]}</h4>
        )}
        <h4>{offer.product_details[0]["MARQUE"]}</h4>
      </div>
    </div>
  );
};

export default Card;
