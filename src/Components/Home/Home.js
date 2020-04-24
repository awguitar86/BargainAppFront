import React, { useState, useEffect } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import axios from 'axios';

const ITEMS = gql`
  query {
    Items {
      id
      title
      category
      condition
      description
      price
      isFirmOnPrice
      location
      imageUrl
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(ITEMS);
  const [carData, setCarData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get('http://178.128.180.91:8080/cars').then((res) => {
      console.log(res.data.cars);
      setCarData(res.data.cars);
    });
  }, []);

  return <div className="home-wrap"></div>;
}

export default Home;
