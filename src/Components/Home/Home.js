import React, { useState, useEffect } from 'react';
import './home.scss';
// import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [carData, setCarData] = useState([]);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const graphqlQuery = {
      query: `
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
      `,
    };
    axios.get('http://178.128.180.91:8080/cars').then((res) => {
      console.log(res.data.cars);
      setCarData(res.data.cars);
    });
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((resData) => {
        if (resData.errors) {
          throw new Error('Fetching status failed!');
        }
        // setItemData(resData);
        console.log(resData);
      })
      .catch((err) => {
        throw err;
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

  // const displayItemData

  return (
    <div className="home-wrap">
      <h2>Cars</h2>
      <div className="home-car-wrap">{displayCarData}</div>
    </div>
  );
}

export default Home;
