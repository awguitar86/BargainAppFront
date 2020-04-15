import React, { useState, useEffect } from 'react';
import './home.scss';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
  const [carData, setCarData] = useState([]);
  const { loading, error, data } = useQuery(ITEMS);

  console.log(data ? data.Items : null);

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

  const displayItems = !data
    ? null
    : data.Items.map((item) => {
        return (
          <div key={item.id} className="home-car">
            <div className="home-image-wrap">
              <img
                src={`http://localhost:8080/${item.imageUrl}`}
                alt="car"
                className="home-car-img"
              />
            </div>
            <ul className="home-car-info">
              <li className="home-car-info-item car-title">{item.title}</li>
              <li className="home-car-info-item car-price">${item.price}</li>
              <li className="home-car-info-item car-location">
                {item.location}
              </li>
            </ul>
          </div>
        );
      });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="home-wrap">
      <h2>Cars</h2>
      <div className="home-car-wrap">{displayCarData}</div>
      <h2>Item</h2>
      <div className="home-car-wrap">{displayItems}</div>
    </div>
  );
}

export default Home;
