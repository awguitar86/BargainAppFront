import React, { useState } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const { carData, setCarData } = useState([]);
  const { itemData, setItemData } = useState([]);

  const handleGetCars = () => {
    axios.get('http://localhost:8080/cars').then(res => {
      console.log(res.data.cars);
    });
  };
  return (
    <div className="home-wrap">
      <h1>Home</h1>
      <button onClick={handleGetCars}>Click</button>
    </div>
  );
}

export default Home;
