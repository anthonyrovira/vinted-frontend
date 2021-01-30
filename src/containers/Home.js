import React from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";

const Home = (props) => {
  const { data, isLoading } = props;

  return (
    <>
      {isLoading ? (
        <>
          <Hero></Hero>
          <h1>Loading page...</h1>
          {/*//! A remplacer par des emplacements vides */}
        </>
      ) : (
        <>
          <Hero></Hero>
          <div className="wrapper home-cards">
            {data.map((offer) => (
              <Card key={offer._id} offer={offer}></Card>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
