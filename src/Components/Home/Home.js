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
        const carIndex = `${car._id[-5]}${car._id[-4]}${car._id[-3]}${
          car._id[-2]
        }${car._id[-1]}`;
        return (
          <div key={carIndex}>
            <div className="image-wrap">
              <img
                src={`http://178.128.180.91:8080/${car.imageUrls[0]}`}
                alt="car"
                style={{ display: 'block', width: '200px', height: '100%' }}
              />
            </div>
            <ul>
              <li>{car.title}</li>
              <li>{car.description}</li>
              <li>{car.year}</li>
              <li>{car.make}</li>
              <li>{car.model}</li>
              <li>{car.bodyType}</li>
              <li>{car.mileage}</li>
              <li>{car.vin}</li>
              <li>{car.titleType}</li>
              <li>{car.color}</li>
              <li>{car.transmission}</li>
              <li>{car.cylinders}</li>
              <li>{car.fuelType}</li>
              <li>{car.doorCount}</li>
              <li>{car.condition}</li>
              <li>{car.driveType}</li>
              <li>{car.price}</li>
              <li>{car.isFirmOnPrice ? 'Firm on Price' : 'Open to offers'}</li>
              <li>{car.location}</li>
              <li>{car.sellerType}</li>
            </ul>
          </div>
        );
      });

  const displayItemData = !itemData
    ? null
    : itemData.map(item => {
        const itemIndex = `${item._id[-5]}${item._id[-4]}${item._id[-3]}${
          item._id[-2]
        }${item._id[-1]}`;
        return (
          <div key={itemIndex}>
            <div className="image-wrap">
              <img
                src={`http://178.128.180.91:8080/${item.imageUrls[0]}`}
                alt="Item"
                style={{ display: 'block', width: '200px', height: '100%' }}
              />
            </div>
            <ul>
              <li>{item.title}</li>
              <li>{item.description}</li>
              <li>{item.condition}</li>
              <li>{item.category}</li>
              <li>{item.price}</li>
              <li>{item.location}</li>
            </ul>
          </div>
        );
      });

  return (
    <div className="home-wrap">
      <h2>Cars</h2>
      {displayCarData}
      <h2>Items</h2>
      {displayItemData}
    </div>
  );
}

export default Home;
