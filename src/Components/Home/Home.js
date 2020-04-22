import React, { useState, useEffect } from 'react';
import './home.scss';
// import { Link } from 'react-router-dom';
import Items from '../Items/Items';
import axios from 'axios';

function Home() {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    axios.get('http://178.128.180.91:8080/cars').then((res) => {
      console.log(res.data.cars);
      setCarData(res.data.cars);
    });
  }, []);

  const displayCarData = !carData
    ? null
    : carData.map((car) => {
        const carIndex =
          Math.floor(Math.random() * 100 + 1) *
          Math.floor(Math.random() * 100 + 1) *
          car.price;
        return (
          <div key={carIndex} className="home-car">
            <div className="home-image-wrap">
              <img
                src={`http://178.128.180.91:8080/${car.imageUrls[0]}`}
                alt="car"
                className="home-car-img"
              />
            </div>
            <ul className="home-car-info">
              <li className="home-car-info-item car-title">{car.title}</li>
              <li className="home-car-info-item car-price">${car.price}</li>
              <li className="home-car-info-item car-mileage">
                Mileage: {car.mileage}
              </li>
              <li className="home-car-info-item car-location">
                {car.location}
              </li>
            </ul>
          </div>
        );
      });

  return (
    <div className="home-wrap">
      <h2>Cars</h2>
      <div className="home-car-wrap">{displayCarData}</div>
      <Items />
    </div>
  );
}

export default Home;
