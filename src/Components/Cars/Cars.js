import React, { useState, useEffect } from 'react';
import './cars.scss';
import CarsItem from './CarsItem';
import axios from 'axios';

function Cars() {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/cars').then((res) => {
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
            year={car.year}
            make={car.make}
            model={car.model}
            price={car.price}
            mileage={car.mileage}
            location={car.location}
            imageUrls={car.imageUrls}
            imageUrl={car.imageUrl}
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
