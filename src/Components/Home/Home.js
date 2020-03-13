import React, { useState, useEffect } from 'react';
import './home.scss';
// import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [carData, setCarData] = useState([]);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    axios.get('http://178.128.180.91:8080/cars').then(res => {
      console.log(res.data.cars);
      setCarData(res.data.cars);
    });
    axios.get('http://178.128.180.91:8080/items').then(res => {
      console.log(res.data.items);
      setItemData(res.data.items);
    });
  }, []);

  const displayCarData = !carData
    ? null
    : carData.map(car => {
        const carIndex =
          Math.floor(Math.random() * 100 + 1) *
          Math.floor(Math.random() * 100 + 1) *
          car.price;
        return (
          <div key={carIndex} className="car">
            <div className="image-wrap">
              <img
                src={`http://178.128.180.91:8080/${car.imageUrls[0]}`}
                alt="car"
                style={{ display: 'block', width: '200px', height: '100%' }}
              />
            </div>
            <ul>
              <li>{car.title}</li>
              <li>{car.location}</li>
              <li>{car.sellerType}</li>
            </ul>
          </div>
        );
      });

  const displayItemData = !itemData
    ? null
    : itemData.map(item => {
        const itemIndex =
          Math.floor(Math.random() * 100 + 1) *
          Math.floor(Math.random() * 100 + 1) *
          item.price;
        return (
          <div key={itemIndex} className="item">
            <div className="image-wrap">
              <img
                src={`http://178.128.180.91:8080/${item.imageUrls[0]}`}
                alt="Item"
                style={{ display: 'block', width: '200px', height: '100%' }}
              />
            </div>
            <ul>
              <li>{item.title}</li>
              <li>{item.price}</li>
              <li>{item.location}</li>
            </ul>
          </div>
        );
      });

  return (
    <div className="home-wrap">
      <h2>Cars</h2>
      <div className="car-wrap">{displayCarData}</div>
      <h2>Items</h2>
      <div className="item-wrap">{displayItemData}</div>
    </div>
  );
}

export default Home;
