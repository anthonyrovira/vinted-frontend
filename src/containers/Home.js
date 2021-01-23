import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://vinted-hysteria9.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <Hero></Hero>
    </>
  );
};

export default Home;
