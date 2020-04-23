import React, { useState, useEffect } from 'react';
import './cars.scss';
import CarsItem from './CarsItem';
import axios from 'axios';

function Cars() {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    axios.get('http://178.128.180.91:8080/cars').then((res) => {
      console.log(res.data.cars);
      setCarData(res.data.cars);
    });
  }, []);

  const displayCars = !carData
    ? null
    : carData.map((car) => {
        return (
          <CarsItem
            key={car._id}
            id={car._id}
            title={car.title}
            price={car.price}
            mileage={car.mileage}
            location={car.location}
            imageUrls={car.imageUrls}
          />
        );
      });

  return (
    <div className="cars-wrap">
      <h2>Cars</h2>
      <div className="cars-items-wrap">{displayCars}</div>
    </div>
  );
}

export default Cars;
